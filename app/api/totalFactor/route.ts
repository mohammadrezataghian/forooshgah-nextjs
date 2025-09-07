import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const CalcKalaListPrice = process.env.API_URL_CALCKALALISTPRICE as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(CalcKalaListPrice, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch CalcKalaListPrice:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, CalcKalaListPrice, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching CalcKalaListPrice", error: err.message },
      { status: 500 }
    );
  }
}
