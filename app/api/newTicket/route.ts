import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const NewTicket = process.env.API_URL_NEWTICKET as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(NewTicket, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch NewTicket:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, NewTicket, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching NewTicket", error: err.message },
      { status: 500 }
    );
  }
}