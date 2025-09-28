"use client";

import { useState, useCallback } from "react";
import axios from "axios";

export function useGetSiteAddress(setSiteAddress:any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback so the function reference is stable
  const getSiteAddress = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/api/siteAddress");
      setSiteAddress(res);
      return res;
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, getSiteAddress };
}
