import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const loginuser = process.env.API_URL_LOGINUSER as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(loginuser, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch loginuser:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, loginuser, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching loginuser", error: err.message },
      { status: 500 }
    );
  }
}
