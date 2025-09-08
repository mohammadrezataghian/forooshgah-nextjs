import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetKala = process.env.API_URL_GETKALA as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(GetKala, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch GetKala:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, GetKala, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching GetKala", error: err.message },
      { status: 500 }
    );
  }
}
