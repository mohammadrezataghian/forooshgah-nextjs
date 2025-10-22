'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetImages = (userToken: any) => {

const GetKalaImageList = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/GetKalaImageList`

  const [listLoading,setlistLoading] = useState(false);
  const [listError,setListError] = useState<string | null>(null);
  const [ListResponse,setListResponse] = useState<any>(null);

  const getImages = async (data: any) => {
    setlistLoading(true);
    setListError(null);

    try {
      const res = await axios.post(
        GetKalaImageList,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setListResponse(res);
    } catch (err: any) {
        setListError(
        err.message || "An unknown error occurred in getKalaImageList"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          GetKalaImageList,
          err.message + " , An unknown error occurred in getKalaImageList",
          userToken
        );
      }
    } finally {
        setlistLoading(false);
    }
  };

  return { listLoading, listError, ListResponse, getImages };
};

export default useGetImages;
