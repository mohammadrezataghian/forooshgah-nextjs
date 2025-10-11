import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetComments = process.env.API_URL_GETCOMMENTS as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(GetComments, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch GetComments:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, GetComments, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching GetComments", error: err.message },
      { status: 500 }
    );
  }
}
