'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetSubmitLogin = () => {

const LoginUserByMobile = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/LoginUserByMobile`

  const [loginLoading, setLoginLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [submitLogin, setSubmitLogin] = useState<any>(null);

  const getSubmitLogin = async (data: any) => {
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await axios.post(
        LoginUserByMobile,
        data,
      );

      setSubmitLogin(res.data);
      return res
    } catch (err: any) {
        setLoginError(
        err.message || "An unknown error occurred in getSahamPersonScore"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          LoginUserByMobile,
          err.message + " , An unknown error occurred in getSahamPersonScore",
        );
      }
    } finally {
        setLoginLoading(false);
    }
  };

  return { loginLoading, loginError, submitLogin, getSubmitLogin };
};

export default useGetSubmitLogin;
