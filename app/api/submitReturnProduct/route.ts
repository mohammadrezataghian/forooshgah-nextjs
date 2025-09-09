import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const AddFactorMarju = process.env.API_URL_ADDFACTORMARJU as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const res = await axios.post(AddFactorMarju, body, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch AddFactorMarju:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, AddFactorMarju, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching AddFactorMarju", error: err.message },
      { status: 500 }
    );
  }
}
