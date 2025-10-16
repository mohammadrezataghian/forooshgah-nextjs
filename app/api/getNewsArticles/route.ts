import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetNews = process.env.API_URL_GETNEWS as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(GetNews, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch GetNews:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, GetNews, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching GetNews", error: err.message },
      { status: 500 }
    );
  }
}
