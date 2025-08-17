"use client";

import { useState, useCallback } from "react";
import axios from "axios";

export default function useGetKala(setApiUsers:any) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback so the function reference is stable
  const getGetKala = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/searchInput");
      setApiUsers(res.data.Data.lst);
      return res.data;
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, getGetKala };
}
