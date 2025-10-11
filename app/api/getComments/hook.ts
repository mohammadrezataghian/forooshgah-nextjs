'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetComments = () => {
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [comments, setComments] = useState<any>(null);

  const getDetailsComments = async (param:any) => {
    setCommentsLoading(true);
    setCommentsError(null);

    try {
      const res = await axios.post(
        "/api/getComments",
        param);

        setComments(res.data?.Data || []);
    } catch (err: any) {
        setCommentsError(
        err.message || "An unknown error occurred in getComments"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          param,
          "/api/getComments",
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
