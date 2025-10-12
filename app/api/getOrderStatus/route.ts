import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetOrderStatus = process.env.API_URL_GETORDERSTATUS as string;

export async function POST(request: Request) {
  try {

    const res = await axios.post(GetOrderStatus);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch GetOrderStatus:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, GetOrderStatus, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching GetOrderStatus", error: err.message },
      { status: 500 }
    );
  }
}
