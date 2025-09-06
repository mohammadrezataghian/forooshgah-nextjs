'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetCheckLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkLogin, setCheckLogin] = useState<any>(null);

  const getCheckLogin = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/CheckMobileForLogin", // call YOUR Next.js API route
        data,
      );

      setCheckLogin(res.data);
      return res
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getSahamPersonScore"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          "/api/CheckMobileForLogin",
          err.message + " , An unknown error occurred in getSahamPersonScore",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, checkLogin, getCheckLogin };
};

export default useGetCheckLogin;
