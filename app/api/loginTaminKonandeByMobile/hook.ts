'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetSubmitLoginSupplier = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [submitLoginSupplier, setSubmitLoginSupplier] = useState<any>(null);

  const getSubmitLoginSupplier = async (param: any) => {
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await axios.post(
        "/api/loginTaminKonandeByMobile",
        param
      );

      setSubmitLoginSupplier(res);
      return res
    } catch (err: any) {
        setLoginError(
        err.message || "An unknown error occurred in LoginTaminKonandeByMobile"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          param,
          "/api/loginTaminKonandeByMobile",
          err.message + " , An unknown error occurred in LoginTaminKonandeByMobile",
          ''
        );
      }
    } finally {
        setLoginLoading(false);
    }
  };

  return { loginError, getSubmitLoginSupplier,loginLoading,submitLoginSupplier };
};

export default useGetSubmitLoginSupplier;