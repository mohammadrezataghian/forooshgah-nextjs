import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const DeleteKalaTaminKonande = process.env.API_URL_DELETEKALATAMINKONANDE as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const res = await axios.post(DeleteKalaTaminKonande, body, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch DeleteKalaTaminKonande:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, DeleteKalaTaminKonande, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching DeleteKalaTaminKonande", error: err.message },
      { status: 500 }
    );
  }
}
