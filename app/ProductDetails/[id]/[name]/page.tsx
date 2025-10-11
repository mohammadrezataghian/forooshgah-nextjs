'use client'

import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { productListUpdate } from "@/shared/product.list.atom";
import DetailsPictures from "../../_components/DetailsPictures";
import useAddProduct from "@/common/AddRemoveProduct/AddToCart";
import DetailsTabs from "../../_components/DetailsTabs";
import useGetProductDetails from "@/app/api/getKalaDetails/hook";
import LoadingSkeleton from "./loading";
import MessageSnackbar from "@/common/Snackbar/MessageSnackbar";
import { usePathname } from "next/navigation";
import CustomizedDividers from "../../_components/ColorButtons";

const ProductDetails = () => {
  const [products, setProducts] = useAtom(productListUpdate);
  const [buttonText, setButtonText] = useState("افزودن به سبد خرید");
  const [isAdded, setIsAdded] = useState(false);
  const [itemCount, setItemCount] = useState<number | undefined>(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedHexColor, setSelectedHexColor] = useState('');
  const [priceAfterSelection, setPriceAfterSelection] = useState(0);
  const [mojodiAfterSelection,setMojodiAfterSelection] = useState(0);
  const [selectedItem,setSelectedItem] = useState(null)

  // handle openning snackbar
  const [opensnackbar, setOpensnackbar] = useState(false);
  // end handle openning snackbar

  // scroll to top
useEffect(()=>{
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  topFunction()
},[])
// end scroll to top

  //find id
  const location = usePathname()
  const length = location.split("/").length;
  const id = location.split("/")[length - 2];
  // end find id

  // handle comma
  const autocomma = (number_input:number) => {
    return new Intl.NumberFormat("en-US").format(number_input);
  };
  //handle comma

  // handle getting data
    const params = {
      IdStoreStock: id,
    };
    const { data, loading, error } = useGetProductDetails(params,id);
  // end handle getting data

  // add to cart
  const { addProduct } = useAddProduct(setProducts, setOpensnackbar);
  // end add to cart

  useEffect(() => {
    const productInCart = products.find(
      (item) => item.IdStoreStock === data?.IdStoreStock
    );
    const count = productInCart ? productInCart.count : 0;

    setIsAdded(!!productInCart);
    setItemCount(count);
    setButtonText(
      count && count > 0 ? `به سبد خرید اضافه شد (${count})` : "افزودن به سبد خرید"
    );
  }, [products, data]);

  // handle remove product
  function removeProduct(productId:any) {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.IdStoreStock !== productId)
    );
  }
  // handle remove product

 // handle name color
 useEffect(()=>{
  if (data){
    setSelectedColor(data.NameColor)
    setSelectedHexColor(data.ColorHexCode)
  }
},[data])
// end handle name color

  return (
    <>
    {data &&
    <>
        <title>{data.NameKala}</title>
        <meta name="description" content="نام محصول" />
    </>
    }
      {loading || !data ? <LoadingSkeleton/> : (
        <>
        <div id="top" className="w-full h-auto bg-white flex xl:flex-row flex-wrap flex-col-reverse 2xl:px-64 pt-3 xl:pt-0">
          {/* product details */}
          <div className=" w-full xl:w-1/2 h-auto p-10">
            {/* {`id : ${id}`} */}
            <h1 className="text-xl bg-blueGray-200 p-5 font-bold mb-10 rounded-sm">
              {data.NameKala}
            </h1>
            <p className="mb-3 font-bold">
              قیمت : <span className="text-[#3f4064]">{autocomma(data.PriceForooshAfterDiscount)}</span>{" "}
              ریال
            </p>
            <p className="mb-2 font-bold">موجودی : <span className="text-[#3f4064]">{data.Mojodi} {data.NameUnit}</span> </p>
            <p className="mb-2 font-bold">
              کد کالا : <span className="text-[#3f4064]">{data.BarCodeKala}</span>
            </p>
            <p className="mb-2 font-bold">
              برند : <span className="text-[#3f4064]">{data.NameMark}</span>
            </p>
            <p className="mb-3 font-bold">
              نوع : <span className="text-[#3f4064]">{data.NameGroup}</span>
            </p>
            <p className="mb-3 font-bold">
              مشخصات فنی : <span className="line-clamp-3 text-[#3f4064]"></span>
            </p>
            <p className="mb-3 font-bold">
              نام فروشگاه : <span className="text-[#3f4064]">{data.NameForooshgah}</span>
            </p>
            <div className="mb-3 font-bold flex gap-1"><span>رنگ :</span> <span className="text-[#3f4064]">{selectedColor}</span> <span className="w-3 h-3 rounded-full self-center" style={{backgroundColor:selectedHexColor}}></span></div>
            {data && data?.SimilarProducts && data?.SimilarProducts?.length > 0 && (
              <div className="w-full">
                <div>
                  <CustomizedDividers SimilarProducts={data?.SimilarProducts} selectedColor={selectedColor} setSelectedColor={setSelectedColor} setSelectedHexColor={setSelectedHexColor} setPriceAfterSelection={setPriceAfterSelection} setSelectedItem={setSelectedItem} setMojodiAfterSelection={setMojodiAfterSelection}/>
                </div>
              </div>
            )
            }
            {data.Mojodi > 0 ? (
              <p>
                <button
                  type="button"
                  className={`text-white p-3 rounded-md ${
                    isAdded ? "bg-green-500" : "bg-blue-500"
                  }`}
                  onClick={() => {
                    addProduct(data);
                  }}
                >
                  {buttonText}
                </button>
              </p>
            ) : (
              <p>
                <span className="bg-red-500 rounded-md py-2 px-4 text-white">
                  ناموجود
                </span>
              </p>
            )}
          </div>
          {/* product details */}
          {/* product image */}
          <div className="w-full xl:w-1/2 h-auto  flex xl:p-10 pb-2 justify-center">
            <div className=" xs:w-[350px] xs:h-auto borderproductdetails overflow-hidden rastchin">
              <DetailsPictures
                imagee={data.FldNameImageKalaList}
                name={data.NameKala}
                IdKala={data.IdKala}
              />
            </div>
          </div>
          {/* product image */}
        </div>
        {/* tabs */}
        <div className="w-full h-auto mb-24 bg-white 2xl:px-64">
          <DetailsTabs data={data}/>
        </div>
        {/* end tabs */}
        </>
      )}
      <MessageSnackbar snackbarOpen={opensnackbar} autoHideDuration={3000} snackbarMessage={"محصولات انتخابی باید فقط از یک فروشگاه باشند"} setSnackbarOpen={setOpensnackbar}/>
    </>
  );
};

export default ProductDetails;
