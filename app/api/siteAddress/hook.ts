"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSiteUrlAddress } from "@/store/slices/siteUrlSlice";

export function useGetSiteAddress() {

const siteUrlAddress = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/siteUrlAddress`

const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback so the function reference is stable
  const getSiteAddress = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(siteUrlAddress);
      dispatch(setSiteUrlAddress(res?.data?.Data))
      return res;
    } catch (err: any) {
      setError(err.message || "An unknown error occurred in siteUrlAddress");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, getSiteAddress };
}
