"use client";

import { useState, useCallback } from "react";
import axios from "axios";

export function useSiteAddress() {
  const [siteAddress, setSiteAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback so the function reference is stable
  const getSiteAddress = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/api/siteAddress");
      setSiteAddress(res.data);
      return res.data;
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { siteAddress, loading, error, getSiteAddress };
}
