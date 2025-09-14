import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const LoginEmployee = process.env.API_URL_LOGINEMPLOYEE as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(LoginEmployee, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch LoginEmployee:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, LoginEmployee, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching LoginEmployee", error: err.message },
      { status: 500 }
    );
  }
}