'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";
import Cookies from 'js-cookie';

const useGetMenu = async () => {
    try {
      const res = await axios.get(
        "/api/menu", // call YOUR Next.js API route
      );
      Cookies.set("MenuData",JSON.stringify(res.data), { expires: 1 / 24 })
      return res.data
    } catch (err: any) {
      console.error('Error fetching data in menu', err);

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          "/api/menu",
          err.message + " , An unknown error occurred in getSahamPersonScore",
        );
      }
      throw err;
    }
  
};

export default useGetMenu;
