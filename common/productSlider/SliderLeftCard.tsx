'use client'

import { IconButton } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import useAddProduct from "@/common/AddRemoveProduct/AddToCart";
import useRemoveProduct from "@/common/AddRemoveProduct/RemoveFromCart";
import MessageSnackbar from "@/common/Snackbar/MessageSnackbar";
import Link from "next/link";
import { Product, ProductType } from "@/types/types";
import Image from "next/image";

type SliderLeftCardProps={
  name:string;
  images:string;
  price:number;
  prevPrice:number;
  discount:number;
  id:string;
  setProducts:React.Dispatch<React.SetStateAction<ProductType[]>>;
  data:Product;
  children?: React.ReactNode; //children?: number | undefined;
  mojodi:number;
  idForImage:number;
  NameForooshgah:string;
}

const SliderLeftCard = ({
  name,
  images,
  price,
  prevPrice,
  discount,
  id,
  setProducts,
  data,
  children,
  mojodi,
  idForImage,
  NameForooshgah,
}:SliderLeftCardProps) => {

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
  const autocomma = (number_input:number) =>
    new Intl.NumberFormat("en-US").format(number_input);
  //handle comma
  const [siteAddress, setSiteAddress] = useAtom(siteUrlAddress);
  // console.log("Slider Left card", siteAddress);
  // handle immage
  let image = "";
  if (images != null) {
    image = images.split(",")[0];
    image = `${siteAddress}/assets/public/kala/${idForImage}/${image}`;
  } else {
    image = `${siteAddress}/assets/public/kala/product.jpg`;
  }
  // end handle image
console.log(siteAddress);

  return (
    <>
      <div
        id={id}
        className="relative h-full w-full rounded-lg shadow-lg border border-gray-200 bg-white overflow-hidden group "
      >
        {/* Discount Badge */}
        {discount !== 0 && <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded z-10">
          -{discount}%
        </div>}

        {/* Product Image */}
        <div className="w-full flex justify-center">
        <Link
          href={`/ProductDetails/${id}/${encodeURIComponent(name)}`}
          className="flex justify-center overflow-hidden h-[168px] w-[168px]"
        >
            <Image
            src={image}
            alt={name}
            width={168}
            height={168}
            unoptimized
            className=" transition-transform duration-300 group-hover:scale-110 rounded-none pt-1"
          /> 
        </Link>
        </div>

        {/* Product Info */}
        <div className="px-4 py-2">
          <Link href={`/ProductDetails/${id}/${encodeURIComponent(name)}`}>
            <h3 className="md:text-lg text-sm font-semibold text-gray-800 hover:text-blue-500 transition text-start min-h-[49px] line-clamp-2">
              {name}
            </h3>
          </Link>
          <div className="mt-1 flex items-baseline space-x-2 gap-4">
            <span className="text-xl font-bold text-green-600">
              {autocomma(price)}&nbsp;ریال
            </span>
            {price !== prevPrice && (
              <span className="text-sm line-through text-gray-500">
                {autocomma(prevPrice)}
              </span>
            )}
          </div>
          <div className="flex">
            <span className="text-sm  text-gray-500">{NameForooshgah}</span>
          </div>
        </div>

        {mojodi > 0 && (
          <div className="flex  justify-between px-2 ">
            <IconButton
              color="primary"
              className="bg-blue-300 ml-1"
              onClick={() => removeProduct(data)}
            >
              <RemoveIcon />
            </IconButton>
            <p className="text-center text-red-500">{children}</p>
            <IconButton
              color="primary"
              className="bg-blue-300 ml-1"
              onClick={() => addProduct(data)}
            >
              <AddIcon />
            </IconButton>
          </div>
        )}
        {mojodi === 0 && (
          <div className="flex justify-end">
            <span className="bg-red-600 text-white p-1 rounded-md text-sm ml-5">
              ناموجود
            </span>
          </div>
        )}
      </div>
      <MessageSnackbar snackbarOpen={opensnackbar} autoHideDuration={3000} snackbarMessage={"محصولات انتخابی باید فقط از یک فروشگاه باشند"} setSnackbarOpen={setOpensnackbar}/>
    </>
  );
};

export default SliderLeftCard;
