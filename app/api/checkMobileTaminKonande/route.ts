import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const checkMobileTaminKonande = process.env.API_URL_CHECKMOBILETAMINKONANDE as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(checkMobileTaminKonande, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch checkMobileTaminKonande:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, checkMobileTaminKonande, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching checkMobileTaminKonande", error: err.message },
      { status: 500 }
    );
  }
}
