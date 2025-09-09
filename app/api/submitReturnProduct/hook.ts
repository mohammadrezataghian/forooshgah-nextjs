'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useSubmitReturnProduct = (state:any, userToken:any,setOpenDialog:React.Dispatch<React.SetStateAction<boolean>>) => {
  const [submitLoading,setSubmitLoading] = useState(false);
  const [submitError,setSubmitError] = useState<string | null>(null);
  const [submitResponse,setSubmitResponse] = useState<any>(null);

  const submitReturnProduct = async (data: any) => {
    setSubmitLoading(true);
    setSubmitError(null);

    try {
      const res = await axios.post(
        "/api/submitReturnProduct",
        {
            ...state,
            IdEllatMarjoe  :data.IdEllatMarjoe,
            SharheMarju: data.SharheMarju,
            ShomareShaba: data.ShomareShaba,
            ShomareCartReturn: data.ShomareCartReturn,
            SahebeHesab: data.SahebeHesab,
          },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSubmitResponse(res);
      setOpenDialog(true)
    } catch (err: any) {
        setSubmitError(
        err.message || "An unknown error occurred in submitReturnProduct"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          state + data,
          "/api/submitReturnProduct",
          err.message + " , An unknown error occurred in submitReturnProduct",
          userToken
        );
      }
    } finally {
        setSubmitLoading(false);
    }
  };

  return { submitLoading, submitError, submitResponse, submitReturnProduct };
};

export default useSubmitReturnProduct;
