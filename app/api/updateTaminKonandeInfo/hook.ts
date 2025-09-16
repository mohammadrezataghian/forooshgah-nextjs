'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useEditSupplierInfo = (userToken: any) => {
  const [editInfoLoading,setEditInfoLoading] = useState(false);
  const [editInfoError,setEditInfoError] = useState<string | null>(null);
  const [editInfoResponse,setEditInfoResponse] = useState<any>(null);

  const EditInfo = async (data: any) => {
    setEditInfoLoading(true);
    setEditInfoError(null);

    try {
      const res = await axios.post(
        "/api/updateTaminKonandeInfo",
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditInfoResponse(res);
    } catch (err: any) {
        setEditInfoError(
        err.message || "An unknown error occurred in UpdateTaminKonandeInfo"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          "/api/updateTaminKonandeInfo",
          err.message + " , An unknown error occurred in UpdateTaminKonandeInfo",
          userToken
        );
      }
    } finally {
        setEditInfoLoading(false);
    }
  };

  return { editInfoLoading, editInfoError, editInfoResponse, EditInfo };
};

export default useEditSupplierInfo;