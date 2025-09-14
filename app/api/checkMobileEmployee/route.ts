import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const checkMobileEmployee = process.env.API_URL_CHECKMOBILEEMPLOYEE as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(checkMobileEmployee, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch checkMobileEmployee:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, checkMobileEmployee, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching checkMobileEmployee", error: err.message },
      { status: 500 }
    );
  }
}
