'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useLoginByUsername = () => {

const loginuser = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/loginuser`

  const [loadingUsername, setLoadingUsername] = useState(false);
  const [errorUsername, setErrorUsername] = useState<string | null>(null);
  const [responseUsername, setResponseUsername] = useState<any>(null);

  const getUsername = async (data: any) => {
    setLoadingUsername(true);
    setErrorUsername(null);

    try {
      const res = await axios.post(
        loginuser,
        data,
      );

      setResponseUsername(res.data);
      return res
    } catch (err: any) {
        setErrorUsername(
        err.message || "An unknown error occurred in loginuser"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          loginuser,
          err.message + " , An unknown error occurred in loginuser",
        );
      }
    } finally {
        setLoadingUsername(false);
    }
  };

  return { loadingUsername, errorUsername, responseUsername, getUsername };
};

export default useLoginByUsername;
