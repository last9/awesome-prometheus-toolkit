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
        const response = await fetch(queryUrl, { headers }).catch(() => null);

        if (!response) {
          return null;
        }

        // Auth failures apply to the whole server, so fail discovery outright.
        if (response.status === 401 || response.status === 403) {
          throw response.status;
        }

        if (!response.ok) {
          return null;
        }

        const body: PrometheusQueryResponse | null = await response.json().catch(() => null);

        if (!body || body.status !== "success") {
          return null;
        }

        return {
          component: component,
          exists: body.data.result.length > 0,
        };
      }),
    );

    // A single failing query only skips that component. If every query
    // failed, the server itself could not be queried.
    if (discovery.every((component) => component === null)) {
      throw 502;
    }

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
    } else if (code === 403) {
      reason = "Forbidden: these credentials cannot query this Prometheus server.";
    } else if (code === 502) {
      reason = "Could not query this Prometheus server. Check the URL and try again.";
    } else {
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
