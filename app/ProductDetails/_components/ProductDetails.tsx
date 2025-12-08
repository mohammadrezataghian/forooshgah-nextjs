'use client'

import React, { useEffect, useState } from "react";
import DetailsPictures from "./DetailsPictures";
import useAddProduct from "@/common/AddRemoveProduct/AddToCart";
import DetailsTabs from "./DetailsTabs";
import useGetProductDetails from "@/app/api/getKalaDetails/hook";
import LoadingSkeleton from "../[id]/[name]/loading";
import MessageSnackbar from "@/common/Snackbar/MessageSnackbar";
import { usePathname } from "next/navigation";
import CustomizedDividers from "./ColorButtons";
import useRemoveProduct from "@/common/AddRemoveProduct/RemoveFromCart";
import { Divider } from "@mui/material";
import { FaPlus,FaRegTrashAlt,FaMinus } from "react-icons/fa";
import { Product } from "@/types/types";
import useGetComments from "@/app/api/getComments/hook";
import Comments from "./Comments/Comments";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ProductDetails = () => {

  const products = useSelector((state:RootState)=>state.productListUpdate.value)

  const [buttonText, setButtonText] = useState("افزودن به سبد خرید");
  const [isAdded, setIsAdded] = useState(false);
  const [itemCount, setItemCount] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedHexColor, setSelectedHexColor] = useState('');
  const [priceAfterSelection, setPriceAfterSelection] = useState(0);
  const [mojodiAfterSelection,setMojodiAfterSelection] = useState(0);
  const [selectedItem,setSelectedItem] = useState<Product | null>(null)
  const [codeKalaAfterSelection,setCodeKalaAfterSelection] = useState('')

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
  const { addProduct } = useAddProduct(setOpensnackbar);
  // end add to cart

   // remove from cart
   const { removeProduct } = useRemoveProduct();
   // end remove from cart

   useEffect(() => {
    const productInCart = products.find(
      (item) => item.IdStoreStock === data?.IdStoreStock && item.NameColor === data?.NameColor
    );
    const count = productInCart?.count ?? 0;

    setIsAdded(!!productInCart);
    setItemCount(count);
    setButtonText(
      count > 0 ? `به سبد خرید اضافه شد (${count})` : "افزودن به سبد خرید"
    );
  }, [products, data]);

  useEffect(() => {
    if (!selectedItem) return;
  
    const productInCart = products.find(
      (item) =>
        item.IdStoreStock === String(selectedItem.IdStoreStock) &&
        item.NameColor === selectedItem.ColorName
    );
  
    const count = productInCart?.count ?? 0;
  
    setIsAdded(!!productInCart);
    setItemCount(count);
    setButtonText(
      count > 0 ? `به سبد خرید اضافه شد (${count})` : "افزودن به سبد خرید"
    );
  }, [selectedItem, products]);

 // handle name color
 useEffect(()=>{
  if (data){
    setSelectedColor(data.NameColor)
    setSelectedHexColor(data.ColorHexCode)
    setPriceAfterSelection(data.PriceForooshAfterDiscount)
    setMojodiAfterSelection(data.Mojodi)
    setCodeKalaAfterSelection(data.BarCodeKala)
  }
},[data])
// end handle name color

// handle add selected item
const handleAddProduct = (data:any) => {
  if (selectedItem) {
    const editedData = {
      ...data,
      BarCodeKala: selectedItem.BarCodeKala,
      CodeKala: selectedItem.CodeKala,
      NameColor: selectedItem.ColorName,
      ColorHexCode: selectedItem.HexaColor,
      IdKala: selectedItem.IdKala,
      NameKala: selectedItem.NameKala,
      PriceForooshAfterDiscount: selectedItem.PriceForoosh,
      IdStoreStock: String(selectedItem.IdStoreStock),
    };
    addProduct(editedData);
  } else {
    addProduct(data);
  }
};

const handleRemoveProduct = (data:any) => {
  if (selectedItem) {
    const editedData = {
      ...data,
      BarCodeKala: selectedItem.BarCodeKala,
      CodeKala: selectedItem.CodeKala,
      NameColor: selectedItem.ColorName,
      ColorHexCode: selectedItem.HexaColor,
      IdKala: selectedItem.IdKala,
      NameKala: selectedItem.NameKala,
      PriceForooshAfterDiscount: selectedItem.PriceForoosh,
      IdStoreStock: String(selectedItem.IdStoreStock),
    };
    removeProduct(editedData);
  } else {
    removeProduct(data);
  }
};
// end handle add selected item

// comments
const param = {
  "FldIdKala": data?.IdKala,
};
const { comments, commentsLoading, commentsError,getDetailsComments } = useGetComments();
useEffect(()=>{
  if (data && data?.IdKala){
    getDetailsComments(param)
  }
},[data])

// end comments

  return (
    <>
      {loading || !data ? <LoadingSkeleton/> : (
        <>
        <div id="top" className="w-full h-auto bg-white flex xl:flex-row flex-wrap flex-col-reverse 2xl:px-64 pt-3 xl:pt-0">
          {/* product details */}
          <div className=" w-full xl:w-1/2 h-auto p-10">
            <h1 className="text-xl bg-gray-200 p-5 font-bold mb-10 rounded-sm">
              {data.NameKala}
            </h1>
            <p className="mb-3 font-bold text-xl">
              قیمت : <span key={priceAfterSelection} className="text-[#3f4064] animate-price-change p-2 rounded-lg">{autocomma(priceAfterSelection)}</span>{" "}
              ریال
            </p>
            <p className="mb-2 font-bold">موجودی : <span key={mojodiAfterSelection} className="text-[#3f4064] animate-price-change p-1 rounded-lg">{mojodiAfterSelection} {data.NameUnit}</span> </p>
            <p className="mb-2 font-bold">
              کد کالا : <span key={codeKalaAfterSelection} className="text-[#3f4064] animate-price-change p-1 rounded-lg">{codeKalaAfterSelection}</span>
            </p>
            <p className="mb-2 font-bold">
              برند : <span className="text-[#3f4064]">{data.NameMark}</span>
            </p>
            <p className="mb-3 font-bold">
              نوع : <span className="text-[#3f4064]">{data.NameGroup}</span>
            </p>
            {data.FldDescription && 
            <p className="mb-3 font-bold">
              مشخصات فنی : <span className="line-clamp-3 text-[#3f4064]">{data.FldDescription}</span>
            </p>
            }
            <p className="mb-3 font-bold">
              نام فروشگاه : <span className="text-[#3f4064]">{data.NameForooshgah}</span>
            </p>
            {selectedColor && 
            <div className="mb-3 font-bold flex gap-1">
                <span>رنگ :</span> 
                <span className="text-[#3f4064]">{selectedColor}</span> 
                <span className="w-3 h-3 rounded-full self-center" style={{backgroundColor:selectedHexColor}}></span>
            </div>
            }
            {data && data?.SimilarProducts && data?.SimilarProducts?.length > 0 && (
              <div className="w-full">
                <div>
                  <CustomizedDividers SimilarProducts={data?.SimilarProducts} selectedColor={selectedColor} setSelectedColor={setSelectedColor} setSelectedHexColor={setSelectedHexColor} setPriceAfterSelection={setPriceAfterSelection} setSelectedItem={setSelectedItem} setMojodiAfterSelection={setMojodiAfterSelection} setCodeKalaAfterSelection={setCodeKalaAfterSelection}/>
                </div>
              </div>
            )
            }
            {data.Mojodi > 0 ? (
              <div>
                {isAdded ?
                <div className="flex justify-end"> 
                  <div className="w-fit flex gap-5 shadow p-2 items-center bg-gray-200 rounded-md">
                    <button className="cursor-pointer" onClick={() => {handleAddProduct(data)}}>
                      <FaPlus className="text-2xl text-green-500"/>
                    </button>
                    <span className="text-2xl">{itemCount}</span>
                    <button className="cursor-pointer" onClick={() => {handleRemoveProduct(data)}}>{itemCount < 2 ? <FaRegTrashAlt className="text-red-500 text-2xl"/> : <FaMinus className="text-2xl text-red-500"/>}</button>
                  </div>
                </div>
                : 
                <div className="flex justify-end w-full">
                <button
                  type="button"
                  className=' text-white p-3 rounded-md bg-blue-500 cursor-pointer'
                  onClick={() => {
                    handleAddProduct(data);
                  }}
                >
                  {buttonText}
                </button>
                </div>
                }
              </div>
            ) : (
              <div className="flex justify-end w-full">
                <span className="bg-red-500 rounded-md py-2 px-4 text-white">
                  ناموجود
                </span>
              </div>
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
        {data &&
        <>
        <div className="2xl:px-64">
          <Divider />
        </div>
        {/* comments  */}
        <div className="w-full h-auto pb-24 bg-white px-3 md:px-10 2xl:px-64 pt-5">
          <Comments comments = {comments} nameKala={data?.NameKala} IdKala={data?.IdKala}/>
        </div>
        </>
        }
        {/* end comments */}
        </>
      )}
      <MessageSnackbar snackbarOpen={opensnackbar} autoHideDuration={3000} snackbarMessage={"محصولات انتخابی باید فقط از یک فروشگاه باشند"} setSnackbarOpen={setOpensnackbar}/>
    </>
  );
};

export default ProductDetails;
