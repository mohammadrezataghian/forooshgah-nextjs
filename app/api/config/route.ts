import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const config = process.env.API_URL_CONFIG as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(config, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch config:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, config, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching config", error: err.message },
      { status: 500 }
    );
  }
}
