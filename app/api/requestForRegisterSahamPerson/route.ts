import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const RequestForRegisterSahamPerson = process.env.API_URL_REQUESTFORREGISTERSAHAMPERSON as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await axios.post(RequestForRegisterSahamPerson, body);

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch RequestForRegisterSahamPerson:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, RequestForRegisterSahamPerson, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching RequestForRegisterSahamPerson", error: err.message },
      { status: 500 }
    );
  }
}
