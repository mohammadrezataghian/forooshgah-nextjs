import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const NoeErsalList = process.env.API_URL_NOEERSALLIST as string;

export async function POST(request: Request) {
  try {

    const res = await axios.post(NoeErsalList);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch NoeErsalList:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, NoeErsalList, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching NoeErsalList", error: err.message },
      { status: 500 }
    );
  }
}
