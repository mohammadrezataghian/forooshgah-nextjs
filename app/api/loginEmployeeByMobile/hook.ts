'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetSubmitLoginStaff = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [submitLoginStaff, setSubmitLoginStaff] = useState<any>(null);

  const getSubmitLoginStaff = async (param: any) => {
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await axios.post(
        "/api/loginEmployeeByMobile",
        param
      );

      setSubmitLoginStaff(res);
      return res
    } catch (err: any) {
        setLoginError(
        err.message || "An unknown error occurred in LoginEmployeeByMobile"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          param,
          "/api/loginEmployeeByMobile",
          err.message + " , An unknown error occurred in LoginEmployeeByMobile",
          ''
        );
      }
    } finally {
        setLoginLoading(false);
    }
  };

  return { loginError, getSubmitLoginStaff,loginLoading,submitLoginStaff };
};

export default useGetSubmitLoginStaff;