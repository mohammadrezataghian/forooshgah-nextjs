'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetCreateComment = (userToken: any) => {
  const [loadingSubmitComment, setLoadingSubmitComment] = useState(false);
  const [errorSubmitComment, setErrorSubmitComment] = useState<string | null>(null);
  const [submitCommentResponse, setSubmitCommentResponse] = useState<any>(null);

  const getCreateComment = async (params: any) => {
    setLoadingSubmitComment(true);
    setErrorSubmitComment(null);

    try {
      const res = await axios.post(
        "/api/createComment",
        params,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSubmitCommentResponse(res?.data || []);
    } catch (err: any) {
        setErrorSubmitComment(
        err.message || "An unknown error occurred in createComment"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          "/api/createComment",
          err.message + " , An unknown error occurred in createComment",
          userToken
        );
      }
    } finally {
        setLoadingSubmitComment(false);
    }
  };

  return { submitCommentResponse, loadingSubmitComment, errorSubmitComment,getCreateComment };
};

export default useGetCreateComment;
