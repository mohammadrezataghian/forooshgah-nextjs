'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useApplyDiscountCode = (userToken: any) => {

const ApplyDiscountCode = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ApplyDiscountCode`

  const [applyDiscountCodeLoading,setApplyDiscountCodeLoading] = useState(false);
  const [applyDiscountCodeError,setApplyDiscountCodeError] = useState<string | null>(null);
  const [applyDiscountCodeResponse,setApplyDiscountCodeResponse] = useState<any>(null);

  const getApplyDiscountCode = async (data: any) => {
    setApplyDiscountCodeLoading(true);
    setApplyDiscountCodeError(null);

    try {
      const res = await axios.post(
        ApplyDiscountCode,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setApplyDiscountCodeResponse(res);
    } catch (err: any) {
        setApplyDiscountCodeError(
        err.message || "An unknown error occurred in applyDiscountCode"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          ApplyDiscountCode,
          err.message + " , An unknown error occurred in applyDiscountCode",
          userToken
        );
      }
    } finally {
        setApplyDiscountCodeLoading(false);
    }
  };

  return { applyDiscountCodeLoading, applyDiscountCodeError, applyDiscountCodeResponse, getApplyDiscountCode };
};

export default useApplyDiscountCode;
