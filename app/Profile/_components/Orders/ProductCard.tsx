'use client'

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Checkbox, CardActionArea } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import { Link } from 'react-router';

function ProductCard({
    product,
    isSelected,
    onSelect,
    item
  }) {

const [siteAddress, setSiteAddress] = useAtom(siteUrlAddress);

// handle comma
    const autocomma = (number_input) =>
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
          <Link to={`/products/productsdetails/${product.IdStoreStock}/${encodeURIComponent(product.NameKala)}`}>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={product.NameKala}
            className="h-[100px] object-contain"
          />
          </Link>
          <CardContent className="space-y-2">
            <h3 className="font-medium line-clamp-2 text-right min-h-[42px]">
                {product.NameKala}
            </h3>   
            <Typography variant="subtitle1" className="text-blue-600 font-medium">
                {autocomma(product.PriceMasrafKonande)} ریال
            </Typography>
           
           {product.AccessToMarju && !item.MarjuShode && 
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