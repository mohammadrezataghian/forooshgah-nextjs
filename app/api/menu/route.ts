import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetGroupKalaTreeUsed = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/GetGroupKalaTreeUsed` as string;

export async function GET(request: Request) {
  try {

    const res = await axios.get(GetGroupKalaTreeUsed, { timeout: 10000 });
    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch GetGroupKalaTreeUsed:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, GetGroupKalaTreeUsed, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching GetGroupKalaTreeUsed", error: err.message },
      { status: 500 }
    );
  }
}