import { Product } from "@/types/types";
import {
    Card,
    Divider,
    CardContent,
    Typography,
  } from "@mui/material";
import Link from "next/link";
  
type ImgMediaCardProps = {
    product:Product; 
    siteAddress:string | null;
}


  const ImgMediaCard = ({ product, siteAddress }:ImgMediaCardProps) => {
  
    //handle image
    let image = "";
    if (product.FldNameImageKalaList != null) {
      image = product.FldNameImageKalaList.split(",")[0];
      image = siteAddress
        ? `${siteAddress}/assets/public/kala/${product.IdKala}/${image}`
        : `https://imbmi.ir/assets/public/kala/${product.IdKala}/${image}`;
    } else {
      image = image = siteAddress
        ? `${siteAddress}/assets/public/kala/product.jpg`
        : `https://imbmi.ir/assets/public/kala/product.jpg`;
    }
    // handle image
    // handle comma
    const autocomma = (number_input:number) =>
      new Intl.NumberFormat("en-US").format(number_input);
    //handle comma
    
    return (
      <>
        <Link
          className="block"
          href={`/ProductDetails/${product.IdStoreStock}/${encodeURIComponent(product.NameKala)}`}
        >
          <Card sx={{ minHeight: 353,position:"relative"}}>
            <div className="w-full min-h-[180px] max-h-[162px] h-auto flex justify-center">
              <img
                className="min-h-[180px] h-auto max-h-[162px] object-contain"
                src={image}
                alt={product.NameKala}
              />
            </div>
            <Divider />
            <CardContent className="relative">
              <Typography gutterBottom variant="body2" component="div" 
              sx={{
                marginBottom: 0,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {product.NameKala}
              </Typography>
              <div className="flex items-baseline space-x-2 gap-4">
                <span className="text-xl font-bold text-blue-600">
                  {autocomma(product.PriceForooshAfterDiscount)}&nbsp;ریال
                </span>
                {product.PriceForoosh !== product.PriceForooshAfterDiscount && <span className="text-sm line-through text-gray-500">
                  {autocomma(product.PriceForoosh)}
                </span>}
              </div>
              <div>
                  <span className="text-sm  text-gray-500">
                    {product.NameForooshgah}
                  </span>
              </div>
              {product.Takhfif !== 0 && <div className="absolute bottom-0 right-2 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded z-10">
                -{product.Takhfif}%
              </div>}
            </CardContent>
              {product.Mojodi === 0 && (
                <div className="absolute bottom-4 right-4">
                  <span className="bg-red-500 text-white p-1 rounded-md text-xs">
                    ناموجود
                  </span>
                </div>
              )}
          </Card>
        </Link>
      </>
    );
  };
  
  export default ImgMediaCard;
  