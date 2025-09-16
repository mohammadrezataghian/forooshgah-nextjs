'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";
import Cookies from 'js-cookie';

const useGetMenu = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

 const getMenu = async ()=>{  
    try {
      const res = await axios.get(
        "/api/menu",
      );
      setResponse(res)
      Cookies.set("MenuData",JSON.stringify(res.data), { expires: 1 / 24 })
      return res.data
    } catch (err: any) {
      console.error('Error fetching data in menu', err);
      setError(err.message)
      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          "/api/menu",
          err.message + " , An unknown error occurred in GetGroupKalaTreeUsed",
        );
      }
      throw err;
    }finally{
      setLoading(false);
    }
  }
  return { loading, error, response,getMenu }
};

export default useGetMenu;