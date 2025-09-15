import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const ForooshgahListByDetail = process.env.API_URL_FOROOSHGAHLISTBYDETAIL as string;

export async function GET(request: Request) {
  try {

    const res = await axios.get(ForooshgahListByDetail);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch ForooshgahListByDetail:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, ForooshgahListByDetail, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching ForooshgahListByDetail", error: err.message },
      { status: 500 }
    );
  }
}
