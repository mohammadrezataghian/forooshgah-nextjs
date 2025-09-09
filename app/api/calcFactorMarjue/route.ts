import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const CalcFactorMarjue = process.env.API_URL_CALCFACTORMARJUE as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const res = await axios.post(CalcFactorMarjue, body, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch CalcFactorMarjue:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, CalcFactorMarjue, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching CalcFactorMarjue", error: err.message },
      { status: 500 }
    );
  }
}
