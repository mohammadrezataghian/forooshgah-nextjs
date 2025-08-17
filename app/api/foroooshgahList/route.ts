import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const ForooshgahList = process.env.API_URL_FOROOSHGAHLIST as string;

export async function GET() {
    try {

      const res = await axios.get(ForooshgahList);
      return NextResponse.json(res.data);

    } catch (err: any) {
      console.error("Failed to fetch siteAddress:", err);
  
      // Add log only in production
      if (process.env.NODE_ENV === "production") {
        await addLog(null, ForooshgahList, err.message);
      }
  
      return NextResponse.json(
        { message: "Error fetching ForooshgahList", error: err.message },
        { status: 500 }
      );
    }
  }