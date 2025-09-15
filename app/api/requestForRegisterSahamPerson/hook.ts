'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetSubmitStockRequest = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState<string | null>(null);
  const [submitResponse, setSubmitResponse] = useState<any>(null);

  const getSubmitStockRequest = async (params: any) => {
    setLoadingSubmit(true);
    setErrorSubmit(null);

    try {
      const res = await axios.post(
        "/api/requestForRegisterSahamPerson",
        params,
      );

      setSubmitResponse(res);
      return res
    } catch (err: any) {
        setErrorSubmit(
        err.message || "An unknown error occurred in RequestForRegisterSahamPerson"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          "/api/requestForRegisterSahamPerson",
          err.message + " , An unknown error occurred in RequestForRegisterSahamPerson",
          ''
        );
      }
    } finally {
        setLoadingSubmit(false);
    }
  };

  return { errorSubmit, getSubmitStockRequest,loadingSubmit,submitResponse };
};

export default useGetSubmitStockRequest;
