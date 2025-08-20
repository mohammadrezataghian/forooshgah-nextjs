import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const CheckMobileForLogin = process.env.API_URL_CHECKMOBILEFORLOGIN as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(CheckMobileForLogin, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch CheckMobileForLogin:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, CheckMobileForLogin, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching CheckMobileForLogin", error: err.message },
      { status: 500 }
    );
  }
}
