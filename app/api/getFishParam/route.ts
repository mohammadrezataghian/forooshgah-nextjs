import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetFishParam = process.env.API_URL_GETFISHPARAM as string;

export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization");

    const res = await axios.get(GetFishParam, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch GetFishParam:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, GetFishParam, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching GetFishParam", error: err.message },
      { status: 500 }
    );
  }
}
