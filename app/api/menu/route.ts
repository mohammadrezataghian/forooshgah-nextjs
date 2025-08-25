import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";
import Cookies from 'js-cookie';

const GetGroupKalaTreeUsed = process.env.API_URL_GETGROUPKALATREEUSED as string;

export async function GET(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.get(GetGroupKalaTreeUsed, body);
    Cookies.set("MenuData",JSON.stringify(res.data), { expires: 1 / 24 })
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
