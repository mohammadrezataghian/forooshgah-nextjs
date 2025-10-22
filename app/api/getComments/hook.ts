'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetComments = () => {

const GetComments = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/GetComments`

  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [comments, setComments] = useState<any>(null);

  const getDetailsComments = async (param:any) => {
    setCommentsLoading(true);
    setCommentsError(null);

    try {
      const res = await axios.post(
        GetComments,
        param);

        setComments(res.data?.Data || []);
    } catch (err: any) {
        setCommentsError(
        err.message || "An unknown error occurred in getComments"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          param,
          GetComments,
          err.message + " , An unknown error occurred in getComments",''
        );
      }
    } finally {
        setCommentsLoading(false);
    }
  };

  return { comments, commentsLoading, commentsError,getDetailsComments };
};

export default useGetComments;
