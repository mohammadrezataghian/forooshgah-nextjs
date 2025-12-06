'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";
import { setClubScore } from "@/store/slices/customerClubScoreSlice";
import { useDispatch } from "react-redux";

const useGetScore = (userToken: any) => {

const getSahamPersonScore = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSahamPersonScore`

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const getScore = async (data: any) => {
    if (!userToken) return
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        getSahamPersonScore,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(res.data);
      dispatch(setClubScore(res?.data?.Data?.Score))
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getSahamPersonScore"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          getSahamPersonScore,
          err.message + " , An unknown error occurred in getSahamPersonScore",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, getScore };
};

export default useGetScore;
