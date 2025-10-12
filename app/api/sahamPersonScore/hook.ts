'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetScore = (userToken: any,setScore:any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const getScore = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/sahamPersonScore", // call YOUR Next.js API route
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(res.data);
      setScore(res?.data?.Data?.Score)
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getSahamPersonScore"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          "/api/sahamPersonScore",
          err.message + " , An unknown error occurred in getSahamPersonScore",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, getScore };
};

export default useGetScore;
