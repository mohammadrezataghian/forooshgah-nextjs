'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetOffers = (userToken: any) => {
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorItems, setErrorItems] = useState<string | null>(null);
  const [items, setItems] = useState<any>(null);


  useEffect(() => {
  const getItems = async () => {
    setLoadingItems(true);
    setErrorItems(null);

    try {
      const res = await axios.get(
        "/api/customerClubOffers",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setItems(res?.data || []);
    } catch (err: any) {
        setErrorItems(
        err.message || "An unknown error occurred in GetCustomerClubOffers"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          "/api/customerClubOffers",
          err.message + " , An unknown error occurred in GetCustomerClubOffers",
          userToken
        );
      }
    } finally {
        setLoadingItems(false);
    }
  };
  getItems()
  }, []);

  return { items, loadingItems, errorItems };
};

export default useGetOffers;
