import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const LoginTaminKonandeByMobile = process.env.API_URL_LOGINTAMINKONANDEBYMOBILE as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(LoginTaminKonandeByMobile, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch LoginTaminKonandeByMobile:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, LoginTaminKonandeByMobile, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching LoginTaminKonandeByMobile", error: err.message },
      { status: 500 }
    );
  }
}
