// hooks/useGetScore.ts
import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetScore = (userToken: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const getScore = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/getscore", // call YOUR Next.js API route
        data,
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
        err.message || "An unknown error occurred in getSahamPersonScore"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          "/api/getscore",
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
