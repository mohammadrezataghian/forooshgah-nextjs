import { NextResponse } from "next/server";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const GetKala = process.env.API_URL_GETKALA as string;

export async function GET(payload:any) {
    try {

      const res = await axios.post(GetKala,payload);
      return NextResponse.json(res.data);

    } catch (err: any) {
      console.error("Failed to fetch siteAddress:", err);
  
      // Add log only in production
      if (process.env.NODE_ENV === "production") {
        await addLog(null, GetKala, err.message);
      }
  
      return NextResponse.json(
        { message: "Error fetching GETKALA", error: err.message },
        { status: 500 }
      );
    }
  }