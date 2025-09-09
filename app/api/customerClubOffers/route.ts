import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetCustomerClubOffers = process.env.API_URL_GETCUSTOMERCLUBOFFERS as string;

export async function GET(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const res = await axios.get(GetCustomerClubOffers, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Failed to fetch GetCustomerClubOffers:", err);

    if (process.env.NODE_ENV === "production") {
      await addLog(null, GetCustomerClubOffers, err.message);
    }

    return NextResponse.json(
      { message: "Error fetching GetCustomerClubOffers", error: err.message },
      { status: 500 }
    );
  }
}
