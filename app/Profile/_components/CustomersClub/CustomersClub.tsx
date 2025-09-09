'use client'

import useGetOffers from "@/api/customersClub/customerClubOffers";
import useGetScore from "@/api/customersClub/customersClub";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useAtom } from 'jotai';
import { ClubScore } from '@/shared/customerClubScore';
import LabTabs from "./ClubTabs";

const CustomersClub = () => {

  const [score,setScore]= useAtom(ClubScore)
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
  const eshterakNo = user?.EshterakNo;
  const userToken = localStorage.getItem("userToken");

  const { loading, error, response, getScore } = useGetScore(userToken);

  useEffect(() => {
      if (!score && user) {
        getScore({EshterakNo : eshterakNo});
      }
  }, [user]);
    
    useEffect(()=>{
      if (response) {
        setScore(response?.data?.Data?.Score) 
      }
      if(!response && user){
        getScore({EshterakNo : eshterakNo});
      }
    },[response])

  const { items, loadingItems, errorItems } = useGetOffers(userToken);

  return (
    <>
      {user && eshterakNo && userToken ? (
        <div className="w-full flex justify-center items-center h-screen">
          <div className="w-full flex justify-center container h-full mt-0">
            <LabTabs items={items} loadingItems={loadingItems} response={response} />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-screen">
          <div
            style={{
              backgroundImage:
                "linear-gradient(82deg, rgba(255, 255, 255, 1) 0%, rgba(253, 29, 29, 1) 67%, rgba(245, 188, 2, 1) 100%)",
            }}
            className="w-auto p-52 flex justify-center items-center h-96 rounded-lg"
          >
            <span className="bg-white rounded-lg p-5 text-nowrap">دسترسی به این قسمت تنها با ورود امکان پذیر میباشد</span>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomersClub;