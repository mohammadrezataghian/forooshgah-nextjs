'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetStockRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeSabteNam, setCodeSabteNam] = useState<any>(null);

  const getStockRequest = async (params: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/getCodeSabteName",
        params,
      );

      setCodeSabteNam(res);
      return res
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getCodeSabteName"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          "/api/getCodeSabteName",
          err.message + " , An unknown error occurred in getCodeSabteName",
          ''
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, getStockRequest,loading,codeSabteNam };
};

export default useGetStockRequest;
