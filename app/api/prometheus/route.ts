import { NextRequest, NextResponse } from "next/server";
import { PrometheusQueryProps, PrometheusQueryResponse } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const headers = new Headers();
    const { url, query, username, password }: PrometheusQueryProps = await req.json();
    const queryUrl = `${url}/api/v1/query?query=${encodeURIComponent(query)}`;

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

    const { data, status }: PrometheusQueryResponse = await response.json();

    if (status !== "success") {
      throw 500;
    }

    return NextResponse.json({
      status: "success",
      data: { result: data.result },
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
      reason = "Unauthorized: Invalid username/password";
    } else if (code === 500) {
      reason = "APT was not able to connect to your Prometheus. Please try again.";
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
