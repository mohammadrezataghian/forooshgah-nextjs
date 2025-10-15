'use client'

import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import useAddProduct from "@/common/AddRemoveProduct/AddToCart";
import useRemoveProduct from "@/common/AddRemoveProduct/RemoveFromCart";
import Link from "next/link";
import { Product } from "@/types/types";
import Image from "next/image";

type CardItemProps={
  name: string;
  price:number;
  prevPrice:number;
  discount:number;
  id:string;
  count:number | undefined;
  data:Product;
  products:Product[];
  setProducts:React.Dispatch<React.SetStateAction<Product[]>>;
  images:string;
  idForImage:number;
  NameForooshgah:string;
  kalalist:Product[];
}

const CardItem = ({
  name,
  price,
  prevPrice,
  discount,
  id,
  count,
  data,
  products,
  setProducts,
  images,
  idForImage,
  NameForooshgah,
  kalalist
}:CardItemProps) => {

  const [siteAddress] = useAtom(siteUrlAddress);

   // add to cart
   const { addProduct } = useAddProduct(setProducts);
   // end add to cart
 
   // remove from cart
   const { removeProduct } = useRemoveProduct(setProducts);
 // end remove from cart

  // handle comma
  const autocomma = (number_input:number) =>
    new Intl.NumberFormat("en-US").format(number_input);
  //handle comma

  // handle immage
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
  let img = "";
  if (images) {
    img = images.split(",")[0];
    img = `${siteAddress}/assets/public/kala/${idForImage}/${img}`;
  } else {
    img = `${siteAddress}/assets/public/kala/product.jpg`;
  }
  setImageSrc(img);
}, [images, idForImage, siteAddress]);
  // end handle image

  return (
    <>
      <div className="flex flex-col relative flex-shrink-0 h-[385px] w-[239px] rounded-lg shadow-lg border border-gray-200 bg-white overflow-hidden group ">
        {/* Discount Badge */}
        {discount !== 0 && <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded z-10">
          -{discount}%
        </div>}

        {/* Product Image */}
        {imageSrc && 
        <Link
          href={`/productDetails/${id}/${encodeURIComponent(name)}`}
          className="flex justify-center overflow-hidden h-48"
        >
          <Image
            src={imageSrc}
            alt={name}
            width={192}
            height={192}
            unoptimized
            className="w-48 h-48  object-contain transition-transform duration-300 group-hover:scale-110 pt-1"
          />
        </Link>}

        {/* Product Info */}
        <div className="p-4 ">
          <Link href={`/productDetails/${id}/${encodeURIComponent(name)}`}>
            <h3 className="md:text-lg text-md text-[#23254e] hover:text-blue-500 transition text-start max-h-[49px] min-h-[49px] line-clamp-2 overflow-visible">
              {name}
            </h3>
          </Link>
          <div className="mt-2 flex items-baseline gap-2 space-x-2">
            <span className="text-xl font-bold text-green-600">
              {autocomma(price)}&nbsp;ریال
            </span>
            {price !== prevPrice && <span className="text-sm line-through text-gray-500">
              {autocomma(prevPrice)}
            </span>}
          </div>
          <div>
            <span className="text-sm  text-gray-500">{NameForooshgah}</span>
          </div>
        </div>
        <div className="flex justify-between mt-auto mb-3 px-4 items-center">
          <IconButton
            color="primary"
            className="border-4 border-solid border-blue-400"
            onClick={() => addProduct(data)}
            disabled={
              kalalist?.find((item:any) => item.IdKala === data.IdKala)?.Mojodi === products?.find((item:any) => item.IdKala === data.IdKala)?.count
            }
          >
            <MdAdd />
          </IconButton>
          {products && products?.find((item:any) => item?.IdKala === data.IdKala)?.count}
          <IconButton
            color="primary"
            className="border-4 border-solid border-blue-400"
            onClick={() => removeProduct(data)}
          >
            <MdRemove />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default CardItem;
