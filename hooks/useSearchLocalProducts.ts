import { productInSearchUpdate } from "@/shared/search.product.list.atom";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function useSearchLocalProducts() {
  const [productList] = useAtom(productInSearchUpdate);

  useEffect(() => {
    if (productList) {
      localStorage.setItem("productsInSearch", JSON.stringify(productList));
    }
  }, [productList]);
  return productList;
}
