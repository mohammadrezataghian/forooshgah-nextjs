'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useChangePassword = (userToken: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const getChangePassword = async (params: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/changePasswordEmp",
        params,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(res)
      return res
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in changePasswordEmp"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          "/api/changePasswordEmp",
          err.message + " , An unknown error occurred in changePasswordEmp",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, getChangePassword,loading,response };
};

export default useChangePassword;
