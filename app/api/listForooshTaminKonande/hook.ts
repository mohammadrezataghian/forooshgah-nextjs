'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useSubmitSearch = (userToken: any) => {

const ListForooshTaminKonande = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ListForooshTaminKonande`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const submitSearch = async (params: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        ListForooshTaminKonande,
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
          ListForooshTaminKonande,
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
