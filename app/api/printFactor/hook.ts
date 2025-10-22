'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const usePrintFactor = (userToken: any) => {

const printfactor = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/printfactor`

  const [printDocLoading,setPrintDocLoading] = useState(false);
  const [printDocError,setPrintDocError] = useState<string | null>(null);
  const [printDocResponse,setPrintDocResponse] = useState<any>(null);

  const getPrint = async (data: any) => {
    setPrintDocLoading(true);
    setPrintDocError(null);

    try {
      const res = await axios.post(
        printfactor,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPrintDocResponse(res);
    } catch (err: any) {
        setPrintDocError(
        err.message || "An unknown error occurred in printFactor"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          printfactor,
          err.message + " , An unknown error occurred in printFactor",
          userToken
        );
      }
    } finally {
        setPrintDocLoading(false);
    }
  };

  return { printDocLoading, printDocError, printDocResponse, getPrint };
};

export default usePrintFactor;
