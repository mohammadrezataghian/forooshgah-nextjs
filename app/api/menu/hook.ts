// hooks/useGetScore.ts
import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetMenu = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const getMenu= async()=>{
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        "/api/menu", // call YOUR Next.js API route
      );

      setResponse(res.data);
      return res.data
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getSahamPersonScore"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          "/api/menu",
          err.message + " , An unknown error occurred in getSahamPersonScore",
        );
      }
    } finally {
      setLoading(false);
    }
  }
  return { loading, error, response,getMenu };
};

export default useGetMenu;
