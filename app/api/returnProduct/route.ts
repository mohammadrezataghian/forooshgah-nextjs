import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetEllateMarjue = process.env.API_URL_GETELLATEMARJUE as string;

export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization");

    const res = await axios.get(GetEllateMarjue,{
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch GetEllateMarjue:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, GetEllateMarjue, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching GetEllateMarjue", error: err.message },
      { status: 500 }
    );
  }
}
