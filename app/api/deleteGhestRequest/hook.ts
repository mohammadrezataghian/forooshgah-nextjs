'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useDelDoc = (userToken: string) => {
  const [delDocLoading,setDelDocLoading] = useState(false);
  const [delDocError,setDelDocError] = useState<string | null>(null);
  const [delDocResponse,setDelDocResponse] = useState<any>(null);

  const getDelDoc = async (data: any) => {
        setDelDocLoading(true);
        setDelDocError(null);

    try {
      const res = await axios.post(
        "/api/deleteGhestRequest", // call YOUR Next.js API route
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setDelDocResponse(res);
    } catch (err: any) {
        setDelDocError(
        err.message || "An unknown error occurred in deleteGhestRequest"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          "/api/deleteGhestRequest",
          err.message + " , An unknown error occurred in deleteGhestRequest",
          userToken
        );
      }
    } finally {
        setDelDocLoading(false);
    }
  };

  return { delDocLoading, delDocError, delDocResponse, getDelDoc };
};

export default useDelDoc;