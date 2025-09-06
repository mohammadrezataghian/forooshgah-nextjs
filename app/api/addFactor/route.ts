import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const AddFactor = process.env.API_URL_ADDFACTOR as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const res = await axios.post(AddFactor, body, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch AddFactor:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, AddFactor, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching AddFactor", error: err.message },
      { status: 500 }
    );
  }
}
