'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useLoginByUsername = () => {

const LoginEmployee = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/LoginEmployee`

  const [loadingUsername, setLoadingUsername] = useState(false);
  const [errorUsername, setErrorUsername] = useState<string | null>(null);
  const [responseUsername, setResponseUsername] = useState<any>(null);

  const getUsername = async (params: any) => {
    setLoadingUsername(true);
    setErrorUsername(null);

    try {
      const res = await axios.post(
        LoginEmployee,
        params
      );

      setResponseUsername(res)
      return res
    } catch (err: any) {
      setErrorUsername(
        err.message || "An unknown error occurred in LoginEmployee"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          LoginEmployee,
          err.message + " , An unknown error occurred in LoginEmployee",
          ''
        );
      }
    } finally {
      setLoadingUsername(false);
    }
  };

  return { errorUsername, getUsername,loadingUsername,responseUsername };
};

export default useLoginByUsername;
