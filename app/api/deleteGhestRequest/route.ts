import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const DeleteGhestRequest = process.env.API_URL_DELETEGHESTREQUEST as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const res = await axios.post(DeleteGhestRequest, body, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch DeleteGhestRequest:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, DeleteGhestRequest, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching DeleteGhestRequest", error: err.message },
      { status: 500 }
    );
  }
}
