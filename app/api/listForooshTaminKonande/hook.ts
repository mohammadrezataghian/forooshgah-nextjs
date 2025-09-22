'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useSubmitSearch = (userToken: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const submitSearch = async (params: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/listForooshTaminKonande",
        params,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(res.data);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in listForooshTaminKonande"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          "/api/listForooshTaminKonande",
          err.message + " , An unknown error occurred in listForooshTaminKonande",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, submitSearch };
};

export default useSubmitSearch;
