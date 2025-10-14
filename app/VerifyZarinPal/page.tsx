'use client'

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { productListUpdate } from "@/shared/product.list.atom";
import { payfullOrPart } from "@/shared/payment";
import { useRouter } from "next/navigation";

function parseTextToObject(text: string, pairSeparator = "&", keyValueSeparator = "=") {
    const result: Record<string, string> = {};
    const pairs = text.split(pairSeparator);
    pairs.forEach((pair) => {
      const [key, value] = pair.split(keyValueSeparator);
      if (key) result[key.trim()] = value ? value.trim() : "";
    });
    return result;
  }

export default function VerifyZarinPal() {

  const router = useRouter()
  const [factorInfo, setFactorInfo] = useState(null);
  const [isSucess, secSuccesPardakht] = useState(false);
  const [message, setMessage] = useState("در حال بررسی پرداخت...");
  const [products, setProducts] = useAtom(productListUpdate);
  const [isPart,setIsPart] = useAtom(payfullOrPart);

  const VerifyZarinPal = process.env.API_URL_VERIFYZARINPAL as string;

  const [param, setParam] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const queryString = hash.includes("?")
        ? hash.substring(hash.indexOf("?") + 1)
        : "";
      const parsed = parseTextToObject(queryString);
      setParam(parsed);
    }
  }, []);

  function deleteShoppingCard() {
    if (!isPart) {
      localStorage.removeItem("products");
      setProducts([]);  
    }
  }
  
  useEffect(() => {
    const cu = VerifyZarinPal;
    if (param) {
      fetch(cu, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(param),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Data Sended Verify", data.Data);
          secSuccesPardakht(true);
          setMessage("پرداخت با موفقیت انجام شد.");
          setIsSuccessAndNavigate(data);
          if (factorInfo) {
            deleteShoppingCard();
            router.push('/factorInfo')
            localStorage.setItem('FactorInfoState',JSON.stringify({ state: { factorInfo } }))
          }
        })
        .catch(() => setMessage("خطا در بررسی پرداخت!"));
    }
  }, [param]);

  const setIsSuccessAndNavigate = async (data:any) => {
    console.log("11111=>", data);
    if (data.resCode == 1) {
      secSuccesPardakht(true);
      setFactorInfo(data.Data);
    }
  };

  return (
    <div>
      <h1>تایید پرداخت</h1>
      <p>{message}</p>
    </div>
  );
}
