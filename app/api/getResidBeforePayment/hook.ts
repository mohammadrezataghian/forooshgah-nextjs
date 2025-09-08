'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetResidBeforePayment = (userToken: string | null) => {
  const [residLoading,setResidLoading] = useState(false);
  const [residError,setResidError] = useState<string | null>(null);
  const [residResponse,setResidResponse] = useState<any>(null);

  const getResidBeforePayment = async (data: any) => {

    if (!userToken) return

    setResidLoading(true);
    setResidError(null);

    try {
      const res = await axios.post(
        "/api/getResidBeforePayment", // call YOUR Next.js API route
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResidResponse(res);
    } catch (err: any) {
        setResidError(
        err.message || "An unknown error occurred in getResidBeforePayment"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          "/api/getResidBeforePayment",
          err.message + " , An unknown error occurred in getResidBeforePayment",
          userToken
        );
      }
    } finally {
        setResidLoading(false);
    }
  };

  return { residLoading, residError, residResponse, getResidBeforePayment };
};

export default useGetResidBeforePayment;
