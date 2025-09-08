'use client'

import useGetInstallmentDetails from "@/api/installment/installmentDetails";
import Cookies from "js-cookie";
import React from "react";
import { useLocation } from "react-router";
import ReceiptLoading from "../orders/ReceiptLoading";
import ProductCard from "../orders/ProductCard";
import { Card, Container, Divider, Grid, Typography } from "@mui/material";

const InstallmentDetails = () => {

  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const userToken = localStorage.getItem("userToken");
  const location = useLocation();
  const locationState = location.state;
  const factorId = locationState?.id;

  // get data
  const params = {
    idFactor: factorId,
  };
  const { installmentDetail, loading, error } = useGetInstallmentDetails(
    params,
    userToken
  );
  // end get data
  console.log(installmentDetail);

  // handle comma
  const autocomma = (number_input) =>
    new Intl.NumberFormat("en-US").format(number_input);
  //handle comma

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
                <div className="flex w-full justify-center">
                  <span className="font-bold text-lg">اقلام درون فاکتور</span>
                </div>
                <Divider className="my-5" />
                <div className="w-full grid gap-5 lg:grid-cols-2 grid-cols-1 place-items-center text-sm xl:text-base">
                  {installmentDetail && installmentDetail.resCode === 1 ? (
                    <Card
                      key={installmentDetail.Data.Id}
                      variant="outlined"
                      className="w-[336px] lg:w-[322px] xl:w-[366px] py-5 px-2  grid grid-cols-2 gap-y-2"
                    >
                      <div>
                        <p className="text-nowrap">
                          تاریخ : {installmentDetail.Data.FactorDate}
                        </p>
                        <Divider />
                      </div>
                      <div>
                        <p className="text-green-500  overflow-hidden whitespace-nowrap">
                          جمع فاکتور :{" "}
                          {autocomma(installmentDetail.Data.GhabelePardakht)}{" "}
                          ریال
                        </p>
                        <Divider />
                      </div>
                      <div>
                        <p className="text-nowrap">
                          مالیات : {autocomma(installmentDetail.Data.Maliat)}{" "}
                          ریال
                        </p>
                        <Divider />
                      </div>
                      <div>
                        <p className="text-nowrap">
                          هزینه ارسال :{" "}
                          {autocomma(installmentDetail.Data.HazineErsal)} ریال
                        </p>
                        <Divider />
                      </div>
                      <div className="col-span-2">
                        <Container className="px-0">
                          <Typography
                            variant="h4"
                            component="h1"
                            className="mb-8 text-lg"
                          >
                            اقلام سبد خرید:
                          </Typography>

                          <Grid container spacing={3}>
                            {installmentDetail.Data.KalaList.map((kala) => (
                              <Grid item xs={6} sm={6} md={6} key={kala.Id}>
                                <ProductCard
                                  product={kala}
                                  item={installmentDetail.Data}
                                />
                              </Grid>
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