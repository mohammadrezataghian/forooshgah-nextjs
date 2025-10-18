import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetBonKarts = process.env.API_URL_GETBONKARTS as string;

export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization");

    const res = await axios.get(GetBonKarts, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch GetBonKarts:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, GetBonKarts, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching GetBonKarts", error: err.message },
      { status: 500 }
    );
  }
}
