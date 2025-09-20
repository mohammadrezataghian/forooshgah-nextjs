import { useState, useEffect } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

export default function useGetInitData(userToken:any,url:string) {

  const [response, setResponse] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userToken) return;

    const getInitData = async () => {
        setLoading(true);
        setError(null);
    
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${userToken}`, 
              "Content-Type": "application/json",
            },
          });
    
          setResponse(response.data.Data);
        } catch (err:any) {
          setError(err.message || "An unknown error occurred in GroupKalaList");
          if (process.env.NODE_ENV === "production") {
            await addLog('',url,err.message + " , An unknown error occurred in GroupKalaList",userToken)
          }
        } finally {
          setLoading(false);
        }
      };
      getInitData();
  }, [url,userToken]);
  

  return { response, loading, error };
}