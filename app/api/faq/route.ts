import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const getcommonquestion = process.env.API_URL_GETCOMMONQUESTION as string;

export async function GET(request: Request) {
  try {

    const res = await axios.get(getcommonquestion);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch getcommonquestion:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, getcommonquestion, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching getcommonquestion", error: err.message },
      { status: 500 }
    );
  }
}
