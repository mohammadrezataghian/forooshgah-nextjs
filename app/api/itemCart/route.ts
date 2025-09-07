import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const CheckBasketKalamojodi = process.env.API_URL_CHECKBASKETKALAMOJODI as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(CheckBasketKalamojodi, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch CheckBasketKalamojodi:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, CheckBasketKalamojodi, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching CheckBasketKalamojodi", error: err.message },
      { status: 500 }
    );
  }
}
