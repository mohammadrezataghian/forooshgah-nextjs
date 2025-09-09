'use client'

import { Button, Card, Divider,Container } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ReceiptLoading from "./ReceiptLoading";
import ProductCard from "./ProductCard";
import useGetReceipts from "@/app/api/customerOrderList/hook";
import useDeleteFactor from "@/app/api/deleteOrderFactor/hook";
import Link from "next/link";
import { FactorReturn } from "@/types/types";
import Grid from "@mui/material/Grid";

const Receipt = () => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
  const eshterakNo = user?.EshterakNo;
  const userToken = localStorage.getItem("userToken");
  const [selectedProducts, setSelectedProducts] = useState<FactorReturn[]>([]);
  const [selectedFactor,setSelectedFactor] = useState(null)

  // get data
  const params = {
    EshterakNo: eshterakNo,
    typeFactore: 0,
  };
  const { receipts, loading, error,getReceipts } = useGetReceipts(userToken);
  useEffect(()=>{
    getReceipts(params)
  },[])
  // end get data

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

  // console.log(receipts);

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
            ) : (
              <div className="w-full grid gap-5 lg:grid-cols-2 grid-cols-1 place-items-center text-sm xl:text-base p-1">
                {receipts.length > 0 ? (
                  receipts.map((item:any) => {
                    let bordercolor = "border-gray-300";
                    if (item.DarkhastKharidGhesti) {
                      bordercolor = "border-yellow-500";
                    }
                    return (
                      <Card
                        key={item.Id}
                        variant="outlined"
                        className={`w-full py-5 px-1 grid grid-cols-2 gap-y-3 ${bordercolor}`}
                      >
                        <div className="flex flex-col justify-end">
                          <p className="text-nowrap">
                            جمع فاکتور :{" "}
                            {autocomma(item.Mablaghekol + item.Maliat)} ریال
                          </p>
                          <Divider />
                        </div>
                        <div className="flex flex-col justify-end">
                          <p className="text-nowrap text-center">
                            تاریخ : {item.FactorDate}
                          </p>
                          <Divider />
                        </div>
                        <div className="flex flex-col justify-end">
                          <p className="text-nowrap text-right">
                            مالیات : {autocomma(item.Maliat)} ریال
                          </p>
                          <Divider />
                        </div>
                        <div className="flex flex-col justify-end">
                          <p className="text-nowrap text-center">
                            هزینه ارسال : {autocomma(item.HazineErsal)} ریال
                          </p>
                          <Divider />
                        </div>
                        <div className="flex flex-col justify-end">
                          <p className="text-green-500  overflow-hidden whitespace-nowrap">
                            قابل پرداخت : {autocomma(item.GhabelePardakht)} ریال
                          </p>
                          <Divider />
                        </div>
                        {item.DarkhastKharidGhesti ? (
                          <>
                            <div className="w-full flex items-center flex-col">
                              {item.TaeedeDarkhastGhesti ? (
                                <p className="w-fit text-nowrap bg-yellow-500 px-1 text-white rounded-sm">
                                  خرید قسطی تایید شده
                                </p>
                              ) : (
                                <p className="w-fit text-nowrap bg-red-400 px-1 text-white rounded-sm">
                                  خرید قسطی تایید نشده
                                </p>
                              )}
                              <Divider className="w-full" />
                            </div>
                            {item.TaeedeDarkhastGhesti && (
                              <>
                                <div className="flex flex-col justify-end">
                                  <p className="text-nowrap text-right">
                                    تعداد اقساط : {item.TedadGhest}
                                  </p>
                                  <Divider />
                                </div>
                                <div className="flex flex-col justify-end">
                                  <p className="text-nowrap text-xs md:text-base text-center">
                                    تاریخ سررسید قسط اول:{" "}
                                    {item.SarResidAvalinGhest}
                                  </p>
                                  <Divider />
                                </div>
                                <div className="flex flex-col justify-end">
                                  <p className="text-nowrap text-right text-xs md:text-base">
                                    مبلغ هر قسط:{" "}
                                    {autocomma(item.MablagheHarGhest)} ریال
                                  </p>
                                  <Divider />
                                </div>
                                <div className="flex flex-col justify-end">
                                  <p className="text-nowrap text-xs md:text-base text-center">
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
                                        onClick={()=>(sessionStorage.setItem('state',JSON.stringify({factor : item})))}
                                        className="text-center py-1.5 text-blue-500 border border-blue-500 md:w-2/3 w-5/6 text-sm rounded-md bg-white hover:bg-blue-100 transition-all"
                                      >
                                        پرداخت
                                      </Link>
                                    </div>
                                    <div className="flex flex-col justify-end w-full items-center">
                                      <Button
                                        variant="outlined"
                                        color="error"
                                        className="text-red-500 py-1.5 md:w-2/3 text-sm"
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
                            <Grid container spacing={3}>
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
                            </Grid>
                            {selectedProducts.length > 0 &&
                              item.KalaList.some((product:any) =>
                                selectedProducts.includes(product.Id)
                              ) && (
                                <div className="w-full pt-5 flex justify-center">
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    className="text-red-500"
                                  >
                                    <Link
                                      href={`/returnProduct/${item.Id}`}
                                      // state={{
                                      //   ...item,
                                      //   KalaList: item.KalaList.filter((kala:any) =>
                                      //     selectedProducts.includes(kala.Id)
                                      //   ),
                                      // }}
                                      onClick={()=>(sessionStorage.setItem('receipt',JSON.stringify({...item,KalaList:item.KalaList.filter((kala:any) =>
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