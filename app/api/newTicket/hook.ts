'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useNewTicket = () => {

const NewTicket = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/NewTicket`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const getNewTicket = async (params: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        NewTicket,
        params);

        setResponse(res)
        return res
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in NewTicket"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
            NewTicket,
            err.message + " , An unknown error occurred in NewTicket",
            ''
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, getNewTicket,loading,response };
};

export default useNewTicket;
