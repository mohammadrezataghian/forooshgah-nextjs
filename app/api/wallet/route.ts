import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const getWalletMoney = process.env.API_URL_GETWALLETMONEY as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const res = await axios.post(getWalletMoney, body, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch getWalletMoney:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, getWalletMoney, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching getWalletMoney", error: err.message },
      { status: 500 }
    );
  }
}
