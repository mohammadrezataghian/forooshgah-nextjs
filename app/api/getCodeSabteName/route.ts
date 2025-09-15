import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const getCodeSabteName = process.env.API_URL_GETCODESABTENAME as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(getCodeSabteName, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch getCodeSabteName:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, getCodeSabteName, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching getCodeSabteName", error: err.message },
      { status: 500 }
    );
  }
}
