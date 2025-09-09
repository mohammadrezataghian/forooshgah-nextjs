import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetPrintAghsatDetail = process.env.API_URL_GETPRINTAGHSATDETAIL as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const res = await axios.post(GetPrintAghsatDetail, body, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch GetPrintAghsatDetail:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, GetPrintAghsatDetail, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching GetPrintAghsatDetail", error: err.message },
      { status: 500 }
    );
  }
}
