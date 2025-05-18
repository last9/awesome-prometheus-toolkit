import { NextRequest, NextResponse } from "next/server";
import { ComponentExpressionList } from "@/lib/discovery";
import { PrometheusQueryProps, PrometheusQueryResponse } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const headers = new Headers();
    const { url, username, password }: PrometheusQueryProps = await req.json();

    if (username && password) {
      headers.set(
        "Authorization",
        "Basic " + Buffer.from(username + ":" + password).toString("base64"),
      );
    }

    const discovery = await Promise.all(
      Object.entries(ComponentExpressionList).map(async ([component, expr]) => {
        const queryUrl = `${url}/api/v1/query?query=${encodeURIComponent(expr)}`;
        const response = await fetch(queryUrl, { headers });

        if (!response.ok) {
          throw response.status;
        }

        const { data, status }: PrometheusQueryResponse = await response.json();

        if (status !== "success") {
          throw 500;
        }

        return {
          component: component,
          exists: data.result.length > 0,
        };
      }),
    );

    const discovered = discovery.filter((component) => component && component.exists);

    if (discovered.length === 0) {
      throw 404;
    }

    return NextResponse.json({
      status: "success",
      data: { discovered },
    });
  } catch (error) {
    let code;
    let reason;

    if (typeof error !== "number") {
      code = 500;
    } else {
      code = error;
    }

    if (code === 404) {
      reason = "No components were discovered on this Prometheus server.";
    } else if (code === 401) {
      reason = "Unauthorized: Prometheus server requires username and password";
    } else if (code === 500) {
      reason = "Something went wrong. Please try again later.";
    }

    return NextResponse.json(
      {
        code,
        reason,
        status: "error",
      },
      { status: code },
    );
  }
}
