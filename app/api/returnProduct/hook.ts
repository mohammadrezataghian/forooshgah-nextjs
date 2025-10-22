'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetScore = (userToken: string | null) => {

const GetEllateMarjue = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/GetEllateMarjue`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);


  useEffect(() => {

    if (!userToken) return

  const getReturnReason = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        GetEllateMarjue,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(res.data.Data);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in GetEllateMarjue"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          GetEllateMarjue,
          err.message + " , An unknown error occurred in GetEllateMarjue",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };
  getReturnReason();
  }, []);

  return { response, loading, error };
};

export default useGetScore;
