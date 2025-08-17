"use client";

import { useState, useCallback } from "react";
import axios from "axios";

export default function useForooshgahList() {
  const [ForooshgahList, setForooshgahList] = useState<Array<any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback so the function reference is stable
  const getForooshgahList = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/api/forooshgahList");
      setForooshgahList(res.data.Data.lst);
      return res.data;
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { ForooshgahList, loading, error, getForooshgahList };
}
