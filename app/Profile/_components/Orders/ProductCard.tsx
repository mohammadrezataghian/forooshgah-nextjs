'use client'

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Checkbox, CardActionArea } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import Link from 'next/link';
import { FactorReturn, ProductReturn } from '@/types/types';
import Image from 'next/image';

type ProductCard = {
    product:ProductReturn;
    isSelected?:boolean;
    onSelect?: (productId:number) => void;
    item:FactorReturn;
}

function ProductCard({
    product,
    isSelected,
    onSelect,
    item
  }:ProductCard) {

const [siteAddress, setSiteAddress] = useAtom(siteUrlAddress);

// handle comma
    const autocomma = (number_input:any) =>
    new Intl.NumberFormat("en-US").format(number_input);
//handle comma

// handle immage
const images = product.FldNameImageKalaList;
let image = "";
if (images != null) {
  image = images.split(",")[0];
  image = `${siteAddress}/assets/public/kala/${product.IdKala}/${image}`;
} else {
  image = `${siteAddress}/assets/public/kala/product.jpg`;
}
// console.log(product);


// end handle image
    return (
        <>
            <Card 
            key={product.Id}
            className={`min-h-[241px] relative transition-all duration-300 ${
            isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-[1.02]' : 'hover:shadow-xl'
        }`}
      >
        <CardActionArea>
        {product.AccessToMarju && !item.MarjuShode &&
          <div className="absolute right-2 top-2 z-10">
            <Checkbox
              checked={isSelected}
              icon={<div className="w-6 h-6 rounded-full border-2 border-white bg-transparent" />}
              checkedIcon={
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <CheckIcon className="text-white"/>
                </div>
              }
            />
          </div>
         }
          <Link href={`/productDetails/${product.IdStoreStock}/${encodeURIComponent(product.NameKala)}`}>
          <div className='w-full h-auto flex justify-center'>
            <Image src={image} alt={product.NameKala} height={200} width={100} unoptimized />
          </div>
          </Link>
          <CardContent className="space-y-2">
            <h3 className="font-medium line-clamp-2 text-right min-h-[42px] !text-xs md:!text-sm text-wrap">
                {product.NameKala} 
            </h3>   
            <Typography variant="subtitle1" className="!text-blue-600 font-medium !text-xs md:!text-sm">
                {autocomma(product.PriceMasrafKonande)} ریال
            </Typography>
           
           {product.AccessToMarju && !item.MarjuShode && onSelect &&
           <div onClick={() => onSelect(product.Id)} className={`w-full rounded-lg py-2 text-center text-sm font-medium transition-colors ${
              isSelected
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-900'
            }`}>
              {isSelected ? 'لغو انتخاب' : 'انتخاب'}
            </div>}
            
          </CardContent>
        </CardActionArea>
      </Card>
      </>
    );
  }

  export default ProductCard;