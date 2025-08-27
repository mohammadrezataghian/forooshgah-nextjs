import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const AdvertisementList = process.env.API_URL_ADVERTISEMENTLIST as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(AdvertisementList, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch AdvertisementList:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, AdvertisementList, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching AdvertisementList", error: err.message },
      { status: 500 }
    );
  }
}
