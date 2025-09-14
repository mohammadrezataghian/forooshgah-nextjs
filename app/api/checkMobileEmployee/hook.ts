'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetCheckLoginStaff = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkLoginStaff, setCheckLoginStaff] = useState<any>(null);

  const getCheckLoginStaff = async (params: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/checkMobileEmployee",
        params);

        setCheckLoginStaff(res)
        return res
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in checkMobileEmployee"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
          "/api/checkMobileEmployee",
          err.message + " , An unknown error occurred in checkMobileEmployee",
          ''
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, getCheckLoginStaff,loading,checkLoginStaff };
};

export default useGetCheckLoginStaff;
