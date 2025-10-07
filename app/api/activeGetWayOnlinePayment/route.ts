import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const activeGetWayOnlinePayment = process.env.API_URL_ACTIVEGETWAYONLINEPAYMENT as string;

export async function GET(request: Request) {
  
  try {
    const token = request.headers.get("authorization");

    const res = await axios.get(activeGetWayOnlinePayment, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch activeGetWayOnlinePayment:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, activeGetWayOnlinePayment, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching activeGetWayOnlinePayment", error: err.message },
      { status: 500 }
    );
  }
}
