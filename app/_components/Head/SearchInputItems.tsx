'use client'

import { productListUpdate } from "@/shared/product.list.atom";
import { Button } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import SearchLoading from "./SearchLoading";
import useAddProduct from "@/common/AddRemoveProduct/AddToCart";
import useRemoveProduct from "@/common/AddRemoveProduct/RemoveFromCart";
import MessageSnackbar from "@/common/Snackbar/MessageSnackbar";
import Link from "next/link";
import {ProductType} from '@/types/types'

type props = {
  filteredUsers: ProductType;
  searchItem: string;
  setIsBoxVisible:React.Dispatch<React.SetStateAction<boolean>> ;
}

const SearchInputItems = ({ filteredUsers, searchItem, setIsBoxVisible }:props) => {
  const [products, setProducts] = useAtom(productListUpdate);

  // handle openning snackbar
  const [opensnackbar, setOpensnackbar] = useState(false);
  // end handle openning snackbar

  // add to cart
  const { addProduct } = useAddProduct(setProducts, setOpensnackbar);
  // end add to cart

  // remove from cart
  const { removeProduct } = useRemoveProduct(setProducts);
// end remove from cart

  // handle comma
  const autocomma = (number_input:number) => {
    return new Intl.NumberFormat("en-US").format(number_input);
  };
  //handle comma

  // handle search loading and messages
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (searchItem.length >= 2) {
      setLoading(true);
      setHasSearched(true);
    } else {
      setLoading(false);
    }
  }, [searchItem]);

  useEffect(() => {
    if (filteredUsers.length > 0) {
      setLoading(false);
    } else if (hasSearched) {
      setLoading(false);
    }
  }, [filteredUsers, hasSearched]);
  // end handle search loading and messages

  return (
    <>
      <div className="w-full h-full">
        {searchItem.length < 2 &&
          filteredUsers.length === 0 &&
          !hasSearched && <p className="mt-10 mr-5 text-right">محصولی یافت نشد</p>}
        {loading && <SearchLoading />}
        {!loading && hasSearched && filteredUsers.length === 0 && (
          <div className="mt-10 mr-5 text-right">محصولی یافت نشد</div>
        )}
        {!loading && filteredUsers.length > 0 && (
          <div className="flex flex-wrap w-full h-auto px-2 gap-5">
            {filteredUsers && filteredUsers.map((data:any) => {
              const imageSrc = data.FldNameImageKalaList
                ? `https://imbmi.ir/assets/public/kala/${data.IdKala}/${
                    data.FldNameImageKalaList.split(",")[0]
                  }`
                : `https://imbmi.ir/assets/public/kala/product.jpg`;
              return (
                <div
                  key={data.IdStoreStock}
                  className="relative flex flex-col-reverse pt-8 lg:flex-row lg:justify-between lg:px-14 items-center border-2 border-solid border-blue-700 w-full rounded-lg"
                >
                  {data.Mojodi > 0 ?  
                  <div className="flex mb-1 justify-between w-5/6 lg:justify-normal lg:items-center gap-3">
                    <Button
                    variant="outlined"
                    color="success"
                      className="text-3xl w-0.5 h-10"
                      onClick={() => addProduct(data)}
                    >
                      +
                    </Button>
                    <p className="mx-2">
                      {products?.find(
                        (item:any) => item?.IdStoreStock === data.IdStoreStock
                      )?.count || 0}
                    </p>
                    <Button
                    variant="outlined"
                    color="success"
                      className="text-3xl w-0.5 h-10"
                      onClick={() => removeProduct(data)}
                    >
                      -
                    </Button>
                  </div>
                  :
                  <p>
                <span className="bg-red-500 rounded-md py-2 px-4 text-white">
                  ناموجود
                </span>
              </p> 
                  }
                  <div className="flex">
                    {/* Discount Badge */}
                    {data.Takhfif !== 0 && <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded">
                      -{data.Takhfif}%
                    </div>}
                    
                    {/* Product Image */}
                    <Link
                      href={`/ProductDetails/${data.IdStoreStock}/${encodeURIComponent(data.NameKala)}`}
                      onClick={() => setIsBoxVisible(false)}
                      className="flex justify-center overflow-hidden h-max p-1"
                    >
                      <img src={imageSrc} alt={data.NameKala} className="w-20 h-20 object-fill rounded-lg" />
                    </Link>

                    {/* Product Info */}
                    <div className="p-4">
                      <Link
                        href={`/ProductDetails/${data.IdStoreStock}/${encodeURIComponent(data.NameKala)}`}
                        onClick={() => setIsBoxVisible(false)}
                      >
                        <h3 className="md:text-lg text-sm font-semibold text-gray-800 hover:text-blue-500 transition text-right">
                          {data.NameKala}
                        </h3>
                        <h3 className="md:text-lg text-sm text-gray-500 hover:text-blue-500 transition pt-1 text-right">
                          {data.NameForooshgah}
                        </h3>
                      </Link>
                      <div className="mt-2 flex justify-end gap-3 items-baseline space-x-2">
                        {data.PriceForoosh !==
                          data.PriceForooshAfterDiscount && (
                          <span className="text-sm line-through text-gray-500">
                            {autocomma(data.PriceForoosh)}
                          </span>
                        )}
                        <div className="text-xl font-bold text-green-600 flex gap-1">
                        <span>ریال</span><span>{autocomma(data.PriceForooshAfterDiscount)}</span>
                        </div>
                      </div>
                    </div>
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

export default SearchInputItems;
