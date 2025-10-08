'use client'

import Cookies from "js-cookie";
import { Card, Divider } from "@mui/material";
import ReceiptLoading from "./ReceiptLoading";
import { Container, Typography, Grid } from '@mui/material';
import ProductCard from "./ProductCard";
import useGetReceipts from "@/app/api/customerOrderList/hook";
import { useEffect } from "react";

const Returned = () => {

const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
const eshterakNo = user?.EshterakNo;
const userToken = localStorage.getItem("userToken");

// get data
    const params = {
      EshterakNo: eshterakNo,
      typeFactore  :1
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

  return (
    <>
    {user ? (
        <div className="w-full">
          <div className="bg-white p-1 w-full h-auto pb-24 pt-10">
            {(loading || receipts === null) ? <div>
              <ReceiptLoading/>
            </div> : 
            <div className="w-full grid gap-5 lg:grid-cols-2 grid-cols-1 place-items-center text-sm xl:text-base">
            {receipts.length > 0 ? (
              receipts.map((item:any) => (
                <Card
                  key={item.Id}
                  variant="outlined"
                  className="w-[336px] lg:w-[322px] xl:w-[366px] py-5 px-2  grid grid-cols-2 gap-y-2"
                >
                  <div>
                    <p className="mb-auto !text-xs md:!text-sm">تاریخ : {item.FactorDate}</p>
                    <Divider/>
                  </div>
                  <div>
                  <p className="text-green-500  mb-auto !text-xs md:!text-sm">جمع فاکتور : {autocomma(item.GhabelePardakht)} ریال</p>
                  <Divider/>
                  </div>
                  <div>
                  <p className="mb-auto !text-xs md:!text-sm">مالیات : {autocomma(item.Maliat)} ریال</p>
                  <Divider/>
                  </div>
                  <div>
                  <p className="mb-auto !text-xs md:!text-sm">هزینه ارسال : {autocomma(item.HazineErsal)} ریال</p>
                  <Divider/>
                  </div>
                  <div className="col-span-2">

                  <Container className="!px-0">
                    <Typography variant="h4" component="h1" className="!mb-8 !text-lg">
                      اقلام سبد خرید:
                    </Typography>
                    
                    <div className="grid grid-cols-2 gap-2">
                       {item.KalaList.map((kala:any) => ( 
                        <div  key={kala.Id}>
                          <ProductCard
                            product= {kala}
                            item={item}
                          />
                        </div>
                    ))}
                    </div>
                  </Container>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-red-500">
                <span>فاکتوری وجود ندارد</span> 
              </div>
            )}
              </div>}
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10 text-red-500">
          <span>برای مشاهده ی فاکتورها ابتدا وارد شوید</span>
        </div>
      )}
    </>
  )
}

export default Returned