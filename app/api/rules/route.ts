import { NextRequest, NextResponse } from "next/server";
import { PrometheusQueryProps, PrometheusRulesResponse } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const headers = new Headers();
    const { url, username, password }: PrometheusQueryProps = await req.json();
    const queryUrl = `${url}/api/v1/rules`;

    if (username && password) {
      headers.set(
        "Authorization",
        "Basic " + Buffer.from(username + ":" + password).toString("base64"),
      );
    }

    const response = await fetch(queryUrl, { headers });

    if (!response.ok) {
      throw response.status;
    }

    const { data, status }: PrometheusRulesResponse = await response.json();

    if (status !== "success") {
      throw 500;
    }

    return NextResponse.json({
      status: "success",
      data: { groups: data.groups },
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
      reason = "APT was not able to connect to your Prometheus. Please try again.";
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
