'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetCheckLoginSupplier = () => {

const checkMobileTaminKonande = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/checkMobileTaminKonande`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkLoginSupplier, setCheckLoginSupplier] = useState<any>(null);

  const getCheckLoginSupplier = async (params: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        checkMobileTaminKonande,
        params,
      );

      setCheckLoginSupplier(res);
      return res
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in checkMobileTaminKonande"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          checkMobileTaminKonande,
          err.message + " , An unknown error occurred in checkMobileTaminKonande",
          ''
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, getCheckLoginSupplier,loading,checkLoginSupplier };
};

export default useGetCheckLoginSupplier;
