'use client'

import * as React from "react";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { address } from '@/shared/Address';
import dynamic from "next/dynamic";
const PrefactorReturn = dynamic(() => import("./_components/PreFactorReturn"), {ssr: false,});
import { productListUpdate } from "@/shared/product.list.atom";
import useGetKalaList from "@/app/api/kalaList/hook";
import useGetNoeErsalList from "@/app/api/noeErsalList/hook";
import DeliveryType from "./_components/DeliveryType";
import PrefactorSkeleton from "./loading";
import { ApiResponse, Kala } from "@/types/types";

const PreFactor = () => {
 
const [selectedItem, setSelectedItem] = React.useState(0); // برای ذخیره آیتم انتخاب شده
const [mounted, setMounted] = React.useState(false);
const [rawUser, setRawUser] = React.useState<string | null>(null);

React.useEffect(()=>{

  setMounted(true);
  setRawUser(Cookies.get("user") ?? null);

if (sessionStorage.getItem('noeErsal')) {
  setSelectedItem(Number(sessionStorage.getItem('noeErsal')))
}
},[])
// location
  const [location, setLocation] = useAtom(address)
// end location

React.useEffect(()=>{
  if (location){
    localStorage.setItem('preFactorAddress',JSON.stringify(location))
  }else{
   const storageLocation = localStorage.getItem('preFactorAddress')
   if (storageLocation) {
    setLocation(JSON.parse(storageLocation))
   }
  }
},[location])

// get noe ersal list
  const { ersalList, loadingErsalList, errorErsalList } = useGetNoeErsalList()
// get noe ersal list


React.useEffect(()=>{
  if (location){
    localStorage.setItem('preFactorAddress',JSON.stringify(location))
  }else{
   const storageLocation = localStorage.getItem('preFactorAddress')
   if (storageLocation) {
    setLocation(JSON.parse(storageLocation))
   }
  }
},[location])

  //data
  const [userInfoo, setuserinfoo] = React.useState<any>([]);
  const [userKala, setUserKala] = React.useState<Kala[]>([]);
  const [userInfo, setUserInfo] = React.useState<ApiResponse | null>(null);
  const [status,setStatus] = React.useState("");
  const [color,setColor] = React.useState<"success" | "secondary" | "error">("success");
  const [products, setProducts] = useAtom(productListUpdate);
  
  let user: ApiResponse | null = null ;
  let userData = null;

  if (rawUser) {
    try {
      userData = JSON.parse(rawUser);
    } catch (e) {
      console.error("Invalid cookie JSON", e);
    }
  }

  // safe default to prevent errors
  if ( rawUser && selectedItem > 0) {
    const finalProducts: Kala[] = products.map(({ count, ...rest }) => ({
      Tedad: count,
      ...rest,
    }));
    user = {
        KalaList: finalProducts,
        IdNoeErsal: Number(selectedItem),
        Person: userData,
      };
    // user.Address = location;
  }

// get data from api
  const { kalaList, loading, error } = useGetKalaList(user,selectedItem);
// end get data from api

// set data
  React.useEffect(() => {
    if (kalaList && kalaList.resCode == 1) {
      const details = kalaList?.Data?.details || [];
      localStorage.setItem("userFactor", JSON.stringify(details));     
      setuserinfoo(details);
      // setUserKala(user.KalaList);
      setUserKala(kalaList?.Data?.details?.KalaList);
      setUserInfo(user);
    }
  }, [kalaList]);
// end set data
  
// color status
  React.useEffect(() => {
    if (userInfoo) {
      if (userInfoo?.Conferm === "true") {
        setColor("success");
        setStatus("پرداخت شده");
      } else if (userInfoo?.Conferm === "false") {
        setColor("secondary");
        setStatus("پرداخت نشده");
      } else {
        setColor("error");
        setStatus("پرداخت نشده");
      }
    }
  }, [userInfoo]);
  // end color status


  if (!mounted) {
    return <div className="p-10 flex justify-center"><span>در حال بارگذاری...</span></div>;
  }
  return (
    <>
    <div className="bg-white min-h-screen">
      {rawUser ?   
      <>
      <div className="w-full py-10 lg:px-40 px-2">
        <DeliveryType ersalList={ersalList} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
      </div>
      {selectedItem > 0 && (
        loading ? (
          <PrefactorSkeleton />
        ) : (
          userKala && userKala.length > 0 && (
            <PrefactorReturn
              userInfo={userInfo}
              location={location}
              userKala={userKala}
              userInfoo={userInfoo}
              color={color}
              status={status}
              user={rawUser}
              selectedItem={selectedItem}
            />
          )
        )
      )}
        </>
        : <div className='p-10 flex justify-center'><span>برای مشاهده ی پیش فاکتور ابتدا وارد شوید</span></div> }
    </div>
    </>
  );
};

export default PreFactor;