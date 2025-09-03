import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetMainConfig = process.env.API_URL_GETMAINCONFIG as string;

export async function GET(request: Request) {
  try {

    const res = await axios.get(GetMainConfig);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch GetMainConfig:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, GetMainConfig, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching GetMainConfig", error: err.message },
      { status: 500 }
    );
  }
}