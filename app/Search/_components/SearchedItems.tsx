'use client'

import useDeleteSearchLocalProducts from "@/hooks/useDeleteSearchLocalProducts";
import { productListUpdate } from "@/shared/product.list.atom";
import { IconButton } from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import SearchLoading from "../loading";
import { siteUrlAddress } from "@/shared/site.url.atom";
import useAddProduct from "@/common/AddRemoveProduct/AddToCart";
import useRemoveProduct from "@/common/AddRemoveProduct/RemoveFromCart";
import MessageSnackbar from "@/common/Snackbar/MessageSnackbar";
import Link from "next/link";
import { Product } from "@/types/types";

type SearchedItemsProps = {
    filteredUsers:Product[];
    searchItem:string;
}

const SearchedItems = ({ filteredUsers, searchItem }:SearchedItemsProps) => {

// handle openning snackbar
const [opensnackbar, setOpensnackbar] = useState(false);
// end handle openning snackbar

  // Format numbers with commas
  const autocomma = (number_input:number) => {
    return new Intl.NumberFormat("en-US").format(number_input);
  };

  useDeleteSearchLocalProducts();
  const [products, setProducts] = useAtom(productListUpdate);

  // add to cart
  const { addProduct } = useAddProduct(setProducts, setOpensnackbar);
  // end add to cart

  // remove from cart
  const { removeProduct } = useRemoveProduct(setProducts);
// end remove from cart

  // handle search loading and messages
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [siteAddress] = useAtom(siteUrlAddress);

  useEffect(() => {
    if (searchItem.length >= 2) {
      setLoading(true);
      setHasSearched(true);
    } else {
      setLoading(false);
    }
  }, [searchItem]);

  useEffect(() => {
    if (filteredUsers && filteredUsers.length > 0) {
      setLoading(false);
    } else if (hasSearched) {
      setLoading(false);
    }
  }, [filteredUsers, hasSearched]);
  // end handle search loading and messages

  return (
    <>
    <div className="w-full h-auto flex flex-col mt-2 justify-center items-center mb-24">
      {searchItem.length < 2 && filteredUsers && filteredUsers.length === 0 && !hasSearched && (
        <p className="mt-10">محصولی یافت نشد</p>
      )}
      {loading && <SearchLoading />}
      {!loading && hasSearched && filteredUsers && filteredUsers.length === 0 && (
        <p className="mt-10">محصولی یافت نشد</p>
      )}
      {!loading && filteredUsers && filteredUsers.length > 0 && (
        <div className="grid w-full h-full grid-cols-1 md:grid-cols-2 px-2 lg:grid-cols-3 2xl:px-64 lg:px-5 gap-5 mt-10">
          {filteredUsers.map((data:any) => {
            const imageSrc = data.FldNameImageKalaList
              ? `${siteAddress}/assets/public/kala/${data.IdKala}/${
                  data.FldNameImageKalaList.split(",")[0]
                }`
              : `${siteAddress}/assets/public/kala/product.jpg`;

            return (
              <div
                key={data.IdStoreStock}
                className="relative h-full w-full rounded-lg shadow-lg border border-gray-200 bg-white overflow-hidden group"
              >
                <Link
                  href={`/products/productsdetails/${data.IdStoreStock}/${encodeURIComponent(data.NameKala)}`}
                  className="flex justify-center overflow-hidden h-48"
                >
                  <img
                    src={imageSrc}
                    alt={data.NameKala}
                    className="w-48 h-48 object-cover transition-transform duration-300 group-hover:scale-110 pt-1"
                  />
                </Link>

                <div className="p-4">
                {data.Takhfif !== 0 && <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded z-10">
                  -{data.Takhfif}%
                </div>}
                  <Link href={`/products/productsdetails/${data.IdStoreStock}/${encodeURIComponent(data.NameKala)}`}>
                    <h3 className="md:text-lg text-sm font-semibold text-gray-800 hover:text-blue-500 transition text-start">
                      {data.NameKala}
                    </h3>
                    <h3 className="md:text-lg text-sm text-gray-500 hover:text-blue-500 transition text-start pt-1">
                      {data.NameForooshgah}
                    </h3>
                  </Link>
                  <div className="mt-2 flex gap-3 items-baseline space-x-2">
                    <span className="text-xl font-bold text-green-600">
                      {autocomma(data.PriceForooshAfterDiscount)}&nbsp;ریال
                    </span>
                    {data.PriceForoosh !== data.PriceForooshAfterDiscount && (
                      <span className="text-sm line-through text-gray-500">
                        {autocomma(data.PriceForoosh)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 justify-between p-1">
                  <IconButton
                    color="primary"
                    className="border-4 border-solid border-blue-400"
                    onClick={() => addProduct(data)}
                  >
                    <MdAdd />
                  </IconButton>
                  {
                    products?.find(
                      (item) => item?.IdStoreStock === data.IdStoreStock
                    )?.count
                  }
                  <IconButton
                    color="primary"
                    className="border-4 border-solid border-blue-400"
                    onClick={() => removeProduct(data)}
                  >
                    <MdRemove />
                  </IconButton>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
   
      <MessageSnackbar snackbarOpen={opensnackbar} autoHideDuration={3000} snackbarMessage={"محصولات انتخابی باید فقط از یک فروشگاه باشند"} setSnackbarOpen={setOpensnackbar}/>
    </>
  );
};

export default SearchedItems;
