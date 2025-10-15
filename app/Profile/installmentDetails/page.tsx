'use client'

import useGetInstallmentDetails from "@/app/api/installmentDetails/hook";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import ReceiptLoading from "../_components/Orders/ReceiptLoading";
import ProductCard from "../_components/Orders/ProductCard";
import { Card, Container, Divider, Grid, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import {useGetSiteAddress} from "@/app/api/siteAddress/hook";
import SimpleBackdrop from '@/common/BackdropSpinnerLoading/Loading';

const InstallmentDetails = () => {

  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
  const userToken = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
  const [siteAddress, setSiteAddress] = useAtom<string | null>(siteUrlAddress);

  // const location = useLocation();
  // const locationState = location.state;
  // const factorId = locationState?.id;
  const [factorId, setFactorId] = React.useState<string | null>(null);

React.useEffect(() => {
  const session = sessionStorage.getItem("idInstallmentDetails");
  if (session) {
    try {
      const parsed = JSON.parse(session);
      setFactorId(parsed?.id || null);
    } catch {
      setFactorId(null);
    }
  }
}, []);

  // get data
  const params = {
    idFactor: factorId,
  };
  const { installmentDetail, loading, error } = useGetInstallmentDetails(
    params,
    userToken
  );
  // end get data

  // handle comma
  const autocomma = (number_input:number) =>
    new Intl.NumberFormat("en-US").format(number_input);
  //handle comma

  // site address

  const { loading:loadingg, error:errorr,getSiteAddress } = useGetSiteAddress(setSiteAddress)
  
    useEffect(() => {
      const fetchSiteAddress = async () => {
        const data = await getSiteAddress()
        setSiteAddressResponce(data?.data)
      };
    
      const setSiteAddressResponce = async (data:any) => {
        if (data && data.Data) {
          setSiteAddress(data.Data);
        }
      };
    
      if (!siteAddress) {
        fetchSiteAddress();
      }
    
    }, [siteAddress, setSiteAddress]);
    
    if (!factorId) return <div className="px-3 lg:px-64"><SimpleBackdrop open={true}/></div>;
    
  return (
    <>
      {user ? (
        <div className="w-full">
          <div className="bg-white p-1 w-full h-auto pb-24 pt-5 lg:pt-10">
            {loading ? (
              <div className="px-3 lg:px-64">
                <ReceiptLoading />
              </div>
            ) : (
              <>
                <div className="flex w-full justify-center pb-5">
                  <span className="font-bold text-lg">اقلام درون فاکتور</span>
                </div>
                <Divider className="my-5" />
                <div className="w-full grid gap-5 lg:grid-cols-2 grid-cols-1 place-items-center text-sm xl:text-base pt-5">
                  {installmentDetail && installmentDetail.resCode === 1 ? (
                    <Card
                      key={installmentDetail.Data.Id}
                      variant="outlined"
                      className="w-[336px] lg:w-[322px] xl:w-[366px] py-5 px-2  grid grid-cols-2 gap-y-2"
                    >
                      <div className="flex flex-col justify-end">
                        <p className="mb-auto !text-xs md:!text-sm">
                          تاریخ : {installmentDetail.Data.FactorDate}
                        </p>
                        <Divider />
                      </div>
                      <div className="flex flex-col justify-end">
                        <p className="text-green-500 mb-auto text-center !text-xs md:!text-sm ">
                          جمع فاکتور :{" "}
                          {autocomma(installmentDetail.Data.GhabelePardakht)}{" "}
                          ریال
                        </p>
                        <Divider />
                      </div>
                      <div className="flex flex-col justify-end">
                        <p className="mb-auto !text-xs md:!text-sm">
                          مالیات : {autocomma(installmentDetail.Data.Maliat)}{" "}
                          ریال
                        </p>
                        <Divider />
                      </div>
                      <div className="flex flex-col justify-end">
                        <p className="mb-auto text-center !text-xs md:!text-sm">
                          هزینه ارسال :{" "}
                          {autocomma(installmentDetail.Data.HazineErsal)} ریال
                        </p>
                        <Divider />
                      </div>
                      <div className="col-span-2">
                        <Container className="!px-0">
                          <Typography
                            variant="h4"
                            component="h1"
                            className="!mb-8 !text-lg"
                          >
                            اقلام سبد خرید:
                          </Typography>

                          <Grid container spacing={3}>
                            {installmentDetail.Data.KalaList.map((kala:any) => (
                              <div key={kala.Id}>
                                <ProductCard
                                  product={kala}
                                  item={installmentDetail.Data}
                                />
                              </div>
                            ))}
                          </Grid>
                        </Container>
                      </div>
                    </Card>
                  ) : (
                    <div className="text-red-500">
                      <span>فاکتوری وجود ندارد</span>
                    </div>
                  )}
                </div>
              </>
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

export default InstallmentDetails;