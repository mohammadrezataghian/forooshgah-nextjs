import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const KalaList = process.env.API_URL_KALALIST as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(KalaList, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch KalaList:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, KalaList, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching KalaList", error: err.message },
      { status: 500 }
    );
  }
}
