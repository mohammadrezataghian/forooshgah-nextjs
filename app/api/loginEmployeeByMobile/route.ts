import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const LoginEmployeeByMobile = process.env.API_URL_LOGINEMPLOYEEBYMOBILE as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(LoginEmployeeByMobile, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch LoginEmployeeByMobile:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, LoginEmployeeByMobile, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching LoginEmployeeByMobile", error: err.message },
      { status: 500 }
    );
  }
}