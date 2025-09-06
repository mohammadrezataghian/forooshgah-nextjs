// hooks/useGetScore.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetItems = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any>(null);

  useEffect(() => {
  const getItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        "/api/faq", // call YOUR Next.js API route
      );

      setItems(res?.data?.Data || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getcommonquestion"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          null,
          "/api/getscore",
          err.message + " , An unknown error occurred in getcommonquestion",
        );
      }
    } finally {
      setLoading(false);
    }
  };
  getItems()
}, []);

  return { items, loading, error };
};

export default useGetItems;
