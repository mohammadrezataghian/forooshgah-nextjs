import { productListUpdate } from "@/shared/product.list.atom";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function useInterceptLocalProducts() {
  const [productList] = useAtom(productListUpdate);

  useEffect(() => {
    if (productList) {
      localStorage.setItem("products", JSON.stringify(productList));
    }
  }, [productList]);
  return productList.length;
}
