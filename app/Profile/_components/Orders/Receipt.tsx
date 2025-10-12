'use client'

import { Button, Card, Divider,Container, LinearProgress } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ReceiptLoading from "./ReceiptLoading";
import ProductCard from "./ProductCard";
import useDeleteFactor from "@/app/api/deleteOrderFactor/hook";
import Link from "next/link";
import { FactorReturn } from "@/types/types";
import usePrintFactor from "@/app/api/printFactor/hook";
import SimpleBackdrop from '@/common/BackdropSpinnerLoading/Loading';

type ReceiptProps={
  tahvil:boolean;
  getReceipts:any;
  receipts:any;
  params:any;
  loading:boolean;
  response?:any;
}

const Receipt = ({tahvil,getReceipts,receipts,params,loading,response}:ReceiptProps) => {

  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
  const userToken = localStorage.getItem("userToken");
  const [selectedProducts, setSelectedProducts] = useState<FactorReturn[]>([]);
  const [selectedFactor,setSelectedFactor] = useState(null)
  const [tahvilShode,setTahvilShode] = useState([]);
  const [tahvilNashode,setTahvilNashode] = useState([]);
  const [disableButton,setDisableButton] = useState(false)
  

  // handle comma
  const autocomma = (number_input:number) =>
    new Intl.NumberFormat("en-US").format(number_input);
  //handle comma

  // select product
  const toggleProduct = (productId:any) => {
    setSelectedProducts((prev:any) => {
      // Check if productId is already in the array
      if (prev.includes(productId)) {
        // Remove productId
        return prev.filter((id:any) => id !== productId);
      } else {
        // Add productId
        return [...prev, productId];
      }
    });
  };
  // end select product

  //delete factor
    const { deleteFactorLoading, deleteFactorError, deleteFactorResponse, getDeleteFactor } = useDeleteFactor(userToken)
    const param = {
      "idFactor": selectedFactor
    }
    useEffect(()=>{
      if (selectedFactor) {
        getDeleteFactor(param)
      }
    },[selectedFactor])

    useEffect(()=>{
      if (deleteFactorResponse?.data?.Data === true && deleteFactorResponse?.data?.resCode === 1) {
        setSelectedFactor(null)
        getReceipts(params)
      }
    },[deleteFactorResponse])
  //end delete factor

  useEffect(()=>{
    if (receipts){
      setTahvilShode(receipts?.filter( (item:any) => item.TahvilShode == true))
      setTahvilNashode(receipts?.filter( (item:any) => item.TahvilShode == false))
    }
  },[receipts])

  //  download factor

const { printDocLoading, printDocError, printDocResponse, getPrint } = usePrintFactor(userToken)

const handleDownloadFactor = (id:number) =>{
  const param ={
    IdFactor : id
  }
  if (id){
    getPrint(param)
    setDisableButton(true)
  }
}

useEffect(()=>{
if(printDocResponse && printDocResponse?.data.Data && printDocResponse?.data?.resCode == 1){
  const link = document.createElement("a");
  link.href = printDocResponse.data.Data;
  link.download = "document.pdf";
  link.click();
}
},[printDocResponse])

//  download factor

  return (
    <>
      {user ? (
        <div className="w-full">
          {/* <h1 className="bg-white p-5 text-center mt-5 font-bold text-lg">
            لیست فاکتورها
          </h1> */}
          <div className="bg-white p-1 w-full h-auto pb-24 pt-10">
            {loading || receipts === null ? (
              <div>
                <ReceiptLoading />
              </div>
            ) : ( tahvil ?
              <div className="w-full grid gap-5 lg:grid-cols-2 grid-cols-1 place-items-center text-sm xl:text-base p-1">
                {tahvilShode && tahvilShode.length > 0 ? (
                  tahvilShode.map((item:any) => {
                    let bordercolor = "#d1d5db";
                    if (item.DarkhastKharidGhesti) {
                      bordercolor = "#eab308";
                    }
                    return (
                      <Card
                        key={item.Id}
                        variant="outlined"
                        style={{ borderColor:bordercolor }}
                        className={`w-full py-5 px-1 grid grid-cols-2 gap-y-3 border `}
                      >
                        <div className="flex flex-col justify-end">
                          <p className="mb-auto !text-xs md:!text-sm">
                            جمع فاکتور :{" "}
                            {autocomma(item.Mablaghekol + item.Maliat)} ریال
                          </p>
                          <Divider />
                        </div>
                        <div className="flex flex-col justify-end">
                          <p className="mb-auto text-center !text-xs md:!text-sm">
                            تاریخ : {item.FactorDate}
                          </p>
                          <Divider />
                        </div>
                        <div className="flex flex-col justify-end">
                          <p className="mb-auto text-right !text-xs md:!text-sm">
                            مالیات : {autocomma(item.Maliat)} ریال
                          </p>
                          <Divider />
                        </div>
                        <div className="flex flex-col justify-end">
                          <p className="mb-auto text-center !text-xs md:!text-sm">
                            هزینه ارسال : {autocomma(item.HazineErsal)} ریال
                          </p>
                          <Divider />
                        </div>
                        <div className="flex flex-col justify-end">
                          <p className="text-green-500  mb-auto !text-xs md:!text-sm">
                            قابل پرداخت : {autocomma(item.GhabelePardakht)} ریال
                          </p>
                          <Divider />
                        </div>
                        {item.DarkhastKharidGhesti ? (
                          <>
                            <div className="w-full flex items-center flex-col">
                              {item.TaeedeDarkhastGhesti ? (
                                <p className="w-fit mb-auto bg-yellow-500 px-1 text-white rounded-sm !text-xs md:!text-sm">
                                  خرید قسطی تایید شده
                                </p>
                              ) : (
                                <p className="w-fit mb-auto bg-red-400 px-1 text-white rounded-sm  !text-xs md:!text-sm">
                                  خرید قسطی تایید نشده
                                </p>
                              )}
                              <Divider className="w-full" />
                            </div>
                            {item.TaeedeDarkhastGhesti && (
                              <>
                                <div className="flex flex-col justify-end">
                                  <p className="mb-auto text-right !text-xs md:!text-sm">
                                    تعداد اقساط : {item.TedadGhest}
                                  </p>
                                  <Divider />
                                </div>
                                <div className="flex flex-col justify-end">
                                  <p className="!text-xs md:!text-sm text-center mb-auto">
                                    تاریخ سررسید قسط اول:{" "}
                                    {item.SarResidAvalinGhest}
                                  </p>
                                  <Divider />
                                </div>
                                <div className="flex flex-col justify-end ">
                                  <p className="text-right !text-xs md:!text-sm mb-auto">
                                    مبلغ هر قسط:{" "}
                                    {autocomma(item.MablagheHarGhest)} ریال
                                  </p>
                                  <Divider />
                                </div>
                                <div className="flex flex-col justify-end">
                                  <p className="!text-xs md:!text-sm text-center mb-auto">
                                    تاریخ تایید خرید قسطی:{" "}
                                    {item.TarikheTaeedeKharidGhesti}
                                  </p>
                                  <Divider />
                                </div>
                                {!item.Sadershode && (
                                  <>
                                    <div className="flex flex-col justify-end w-full items-center">
                                      <Link
                                        href={"/PaymentMethods"}
                                        // state={{factor : item}}
                                        onClick={()=>(sessionStorage.setItem('paymentMethodsState',JSON.stringify({factor : item})))}
                                        className="text-center py-1.5 text-blue-500 border border-blue-500 md:w-2/3 w-5/6 !text-xs md:!text-sm rounded-md bg-white hover:bg-blue-100 transition-all"
                                      >
                                        پرداخت
                                      </Link>
                                    </div>
                                    <div className="flex flex-col justify-end w-full items-center">
                                      <Button
                                        variant="outlined"
                                        color="error"
                                        className="text-red-500 !py-1.5 md:w-2/3 !text-xs md:!text-sm text-nowrap text-center !px-2 !rounded-md"
                                        onClick={()=>(setSelectedFactor(item.Id))}
                                      >
                                        حذف درخواست قسطی
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <div className=" w-full h-full flex flex-col justify-end">
                            <Divider />
                          </div>
                        )}
                        <div className="col-span-2">
                          <div className="text-lg flex items-end mb-8">
                            <span className="pt-2">اقلام سبد خرید:</span>
                          </div>
                          <Container className="px-0">
                            <div className="grid grid-cols-2 gap-2">
                              {item.KalaList.map((kala:any) => (
                                <div key={kala.Id}>
                                  <ProductCard
                                    product={kala}
                                    item={item}
                                    isSelected={selectedProducts.includes(
                                      kala.Id
                                    )}
                                    onSelect={() => toggleProduct(kala.Id)}
                                  />
                                  </div>
                              ))}
                            </div>
                            {selectedProducts && selectedProducts.length > 0 &&
                              item.KalaList.some((product:any) =>
                                selectedProducts.includes(product.Id)
                              ) && (
                                <div className="w-full pt-5 flex justify-center">
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    className="text-red-500 cursor-pointer"
                                  >
                                    <Link
                                      href={`/ReturnProduct`}
                                      // state={{
                                      //   ...item,
                                      //   KalaList: item.KalaList.filter((kala:any) =>
                                      //     selectedProducts.includes(kala.Id)
                                      //   ),
                                      // }}
                                      onClick={()=>(sessionStorage.setItem('ReturnProductState',JSON.stringify({...item,KalaList:item.KalaList.filter((kala:any) =>
                                             selectedProducts.includes(kala.Id))})))}
                                      className="text-inherit"
                                    >
                                      مرجوع کردن
                                    </Link>
                                  </Button>
                                </div>
                              )}
                          </Container>
                        </div>
                        <div className="pt-3 w-full flex justify-center col-span-2">
                              <Button variant="contained" color="success" className="text-white" onClick={()=>(handleDownloadFactor(item.Id))} disabled={disableButton}>
                                دانلود فاکتور
                              </Button>
                        </div>
                        {printDocLoading && <SimpleBackdrop open={true}/>}
                      </Card>
                    );
                  })
                ) : (
                  <div className="text-red-500">
                    <span>فاکتوری وجود ندارد</span>
                  </div>
                )}
              </div>
              :
              <div className="w-full grid gap-5 lg:grid-cols-2 grid-cols-1 place-items-center text-sm xl:text-base p-1">
              {tahvilNashode && tahvilNashode.length > 0 ? (
                tahvilNashode.map((item:any) => {
                  let bordercolor = "#d1d5db";
                    if (item.DarkhastKharidGhesti) {
                      bordercolor = "#eab308";
                  }
                  return (
                    <Card
                      key={item.Id}
                      variant="outlined"
                      style={{ borderColor:bordercolor }}
                      className={`w-full py-5 px-1 grid grid-cols-2 gap-y-3 border`}
                    >
                      <div className="flex flex-col justify-end">
                        <p className="mb-auto !text-xs md:!text-sm">
                          جمع فاکتور :{" "}
                          {autocomma(item.Mablaghekol + item.Maliat)} ریال
                        </p>
                        <Divider />
                      </div>
                      <div className="flex flex-col justify-end">
                        <p className="mb-auto text-center !text-xs md:!text-sm">
                          تاریخ : {item.FactorDate}
                        </p>
                        <Divider />
                      </div>
                      <div className="flex flex-col justify-end">
                        <p className="mb-auto text-right !text-xs md:!text-sm">
                          مالیات : {autocomma(item.Maliat)} ریال
                        </p>
                        <Divider />
                      </div>
                      <div className="flex flex-col justify-end">
                        <p className="mb-auto text-center !text-xs md:!text-sm">
                          هزینه ارسال : {autocomma(item.HazineErsal)} ریال
                        </p>
                        <Divider />
                      </div>
                      <div className="flex flex-col justify-end">
                        <p className="text-green-500  mb-auto !text-xs md:!text-sm">
                          قابل پرداخت : {autocomma(item.GhabelePardakht)} ریال
                        </p>
                        <Divider />
                      </div>
                      {item.DarkhastKharidGhesti ? (
                        <>
                          <div className="w-full flex items-center flex-col">
                            {item.TaeedeDarkhastGhesti ? (
                              <p className="w-fit mb-auto bg-yellow-500 px-1 text-white rounded-sm !text-xs md:!text-sm">
                                خرید قسطی تایید شده
                              </p>
                            ) : (
                              <p className="w-fit mb-auto bg-red-400 px-1 text-white rounded-sm  !text-xs md:!text-sm">
                                خرید قسطی تایید نشده
                              </p>
                            )}
                            <Divider className="w-full" />
                          </div>
                          {item.TaeedeDarkhastGhesti && (
                            <>
                              <div className="flex flex-col justify-end">
                                <p className="mb-auto text-right !text-xs md:!text-sm">
                                  تعداد اقساط : {item.TedadGhest}
                                </p>
                                <Divider />
                              </div>
                              <div className="flex flex-col justify-end">
                                <p className="mb-auto !text-xs md:!text-sm text-center">
                                  تاریخ سررسید قسط اول:{" "}
                                  {item.SarResidAvalinGhest}
                                </p>
                                <Divider />
                              </div>
                              <div className="flex flex-col justify-end">
                                <p className="text-right !text-xs md:!text-sm mb-auto">
                                  مبلغ هر قسط:{" "}
                                  {autocomma(item.MablagheHarGhest)} ریال
                                </p>
                                <Divider />
                              </div>
                              <div className="flex flex-col justify-end">
                                <p className="!text-xs md:!text-sm text-center mb-auto">
                                  تاریخ تایید خرید قسطی:{" "}
                                  {item.TarikheTaeedeKharidGhesti}
                                </p>
                                <Divider />
                              </div>
                              {!item.Sadershode && (
                                <>
                                  <div className="flex flex-col justify-end w-full items-center">
                                    <Link
                                      href={"/PaymentMethods"}
                                      // state={{factor : item}}
                                        onClick={()=>(sessionStorage.setItem('paymentMethodsState',JSON.stringify({factor : item})))}
                                      className="text-center py-1.5 text-blue-500 border border-blue-500 md:w-2/3 w-5/6 !text-xs md:!text-sm rounded-md bg-white hover:bg-blue-100 transition-all"
                                    >
                                      پرداخت
                                    </Link>
                                  </div>
                                  <div className="flex flex-col justify-end w-full items-center">
                                      <Button
                                        variant="outlined"
                                        color="error"
                                        className="text-red-500 !py-1.5 md:w-2/3 !text-xs md:!text-sm text-nowrap text-center !px-2 !rounded-md"
                                        onClick={()=>(setSelectedFactor(item.Id))}
                                      >
                                        حذف درخواست قسطی
                                      </Button>
                                    </div>
                                </>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <div className=" w-full h-full flex flex-col justify-end">
                          <Divider />
                        </div>
                      )}
                      {response && response?.data?.Data && response?.data?.Data.length > 0 && item.LastOrderStatus && item.LastOrderStatus != '' && 
                      <div className="flex flex-col justify-end col-span-2">
                        <div className="flex justify-between">
                          <div className="font-semibold text-green-400">وضعیت: <span className="text-black">{item.LastOrderStatus}</span></div>
                          <div className="w-auto self-center">
                          {(() => {
                            const found = response?.data?.Data.find((ite:any) => ite.Name === item.LastOrderStatus)
                            const totalSteps = response.data.Data.length;
                            const filledSteps = found.FldSort;
                            const progressValue = (filledSteps / totalSteps) * 100;

                            return (
                              <LinearProgress
                                variant="determinate"
                                value={progressValue}
                                sx={{ height: 8, borderRadius: 4,width:200 }}
                                color="secondary"
                              />
                            );
                          })()}
                          </div>
                        </div>
                        <Divider />
                      </div>
                      }
                      <div className="col-span-2">
                        <div className="text-lg flex items-end mb-8">
                          <span className="pt-2">اقلام سبد خرید:</span>
                        </div>
                        <Container className="px-0">
                          <div className="grid grid-cols-2 gap-2">
                              {item.KalaList.map((kala:any) => (
                                <div key={kala.Id}>
                                  <ProductCard
                                    product={kala}
                                    item={item}
                                    isSelected={selectedProducts.includes(
                                      kala.Id
                                    )}
                                    onSelect={() => toggleProduct(kala.Id)}
                                  />
                                  </div>
                              ))}
                          </div>
                          {selectedProducts && selectedProducts.length > 0 &&
                              item.KalaList.some((product:any) =>
                                selectedProducts.includes(product.Id)
                              ) && (
                                <div className="w-full pt-5 flex justify-center">
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    className="text-red-500 cursor-pointer"
                                  >
                                    <Link
                                      href={`/ReturnProduct`}
                                      // state={{
                                      //   ...item,
                                      //   KalaList: item.KalaList.filter((kala:any) =>
                                      //     selectedProducts.includes(kala.Id)
                                      //   ),
                                      // }}
                                      onClick={()=>(sessionStorage.setItem('ReturnProductState',JSON.stringify({...item,KalaList:item.KalaList.filter((kala:any) =>
                                             selectedProducts.includes(kala.Id))})))}
                                      className="text-inherit"
                                    >
                                      مرجوع کردن
                                    </Link>
                                  </Button>
                                </div>
                              )}
                        </Container>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="text-red-500">
                  <span>فاکتوری وجود ندارد</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="flex justify-center mt-10 text-red-500">
        <span>برای مشاهده ی فاکتورها ابتدا وارد شوید</span>
      </div>
    )}
  </>
);
};

export default Receipt;