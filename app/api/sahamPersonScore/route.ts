import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const getSahamPersonScore = process.env.API_URL_GETSAHAMPERSONSCORE as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const res = await axios.post(getSahamPersonScore, body, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch getSahamPersonScore:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, getSahamPersonScore, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching getSahamPersonScore", error: err.message },
      { status: 500 }
    );
  }
}
