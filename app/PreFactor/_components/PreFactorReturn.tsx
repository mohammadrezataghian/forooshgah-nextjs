'use client'

import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip } from '@mui/material';
import Link from 'next/link';
import { Address, ApiResponse, Kala } from '@/types/types';
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#3377ff",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

type PrefactorReturnProps ={
    userInfo:ApiResponse | null;
    location:Address | undefined;
    userKala:Kala[];
    userInfoo:any;
    color:"success" | "secondary" | "error";
    status:string;
    user:string;
    selectedItem:number;
}

const PrefactorReturn = ({userInfo,location,userKala,userInfoo,color,status,user,selectedItem}:PrefactorReturnProps) => {
// console.log(status);
// console.log(color);
const router = useRouter()
// handle comma
const autocomma = (number_input:number) =>
    new Intl.NumberFormat("en-US").format(number_input);
//handle comma
// console.log(userInfoo.MablagheKharidErsalRaygan);
const hasColor = userKala?.some((row:any) => row?.NameColor);

  return (
    <>
        <div className="w-full h-auto bg-white mt mt-10 py-5 lg:px-40 px-2 pb-24">
        <div className="flex justify-center w-full mb-10 h-auto">
          <span className="font-bold text-2xl">پیش فاکتور</span>
        </div>
        <div className="w-full h-auto flex mb-1">
          <span>مشخصات سفارش دهنده:</span>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">شماره پرسنلی</StyledTableCell>
                <StyledTableCell align="center">
                  نام و نام خانوادگی
                </StyledTableCell>
                <StyledTableCell align="center">شماره موبایل</StyledTableCell>
                <StyledTableCell align="center">
                  شماره تلفن ثابت
                </StyledTableCell>
                <StyledTableCell align="center">آدرس</StyledTableCell>
                <StyledTableCell align="center">تاریخ عضویت</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="center">
                  {userInfo?.Person?.PersonNo}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {userInfo?.Person?.FirstName} {userInfo?.Person?.LastName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {userInfo?.Person?.Mobile}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {userInfo?.Person?.Tel}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {location && location.AddressCompact}
                  <br />
                  آدرس دقیق: <span className="text-blue-500">{location && location.WhereaboutesPreAddress && location.WhereaboutesPreAddress}</span>
                  <br />
                  کد پستی: <span className="text-blue-500">{location && location.WhereaboutesPostalCode && location.WhereaboutesPostalCode}</span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {userInfo?.Person?.Dateouzviyat}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* ............................................. */}
        {/* <hr className='blue-line mt-5'/> */}
        <div className="w-full h-auto flex mb-1 mt-5">
          <span>جزییات سفارش:</span>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">کد کالا</StyledTableCell>
                <StyledTableCell align="center">نام کالا</StyledTableCell>
                <StyledTableCell align="center">قیمت کالا</StyledTableCell>
                <StyledTableCell align="center">مالیات</StyledTableCell>
                <StyledTableCell align="center">تخفیف</StyledTableCell>
                <StyledTableCell align="center">کل قیمت</StyledTableCell>
                <StyledTableCell align="center">دسته بندی کالا</StyledTableCell>
                <StyledTableCell align="center">تعداد</StyledTableCell>
                {hasColor && (
                  <StyledTableCell align="center">رنگ</StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {userKala && userKala?.map((row:any) => (
                <StyledTableRow key={row.IdStoreStock}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row?.IdStoreStock}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.NameKala}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {autocomma(row?.UnitPrice)} ریال
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {autocomma(row?.Maliat)} ریال
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {autocomma(row?.TotalDiscount)} ریال
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {autocomma(row?.PriceForooshAfterDiscount)} ریال
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.NameGroup}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row?.Tedad}</StyledTableCell>
                  {row?.NameColor && 
                  <StyledTableCell align="center">{row?.NameColor}</StyledTableCell>
                }
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {userInfoo && (
          <div style={{ marginTop: "20px" }}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography component="span">جزئیات پرداخت : </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">وضعیت</StyledTableCell>
                        <StyledTableCell align="center">
                          جمع فاکتور
                        </StyledTableCell>
                        <StyledTableCell align="center">مالیات</StyledTableCell>
                        <StyledTableCell align="center">
                          هزینه بسته بندی
                        </StyledTableCell>
                        <StyledTableCell align="center">هزینه ارسال</StyledTableCell>
                        <StyledTableCell align="center">
                          مبلغ قابل پرداخت
                        </StyledTableCell>
                        <StyledTableCell align="center">عملیات</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow key={userInfoo.GhabelePardakht}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          <Chip label={status} color={color}/>

                          {/* <Button
                          color="default"
                          className="!bg-warning"
                          variant="solid"
                        >
                          پرداخت نشده
                        </Button> */}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {userInfoo.Mablaghekol ? autocomma(userInfoo.Mablaghekol) : '0'} ریال
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {userInfoo.Maliat ? autocomma(userInfoo.Maliat) : '0'} ریال
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {userInfoo.HazineBasteBandi ? autocomma(userInfoo.HazineBasteBandi) : '0'} ریال
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {userInfoo.HazineErsal ? autocomma(userInfoo.HazineErsal) : '0'} ریال
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {userInfoo.GhabelePardakht ? autocomma(userInfoo.GhabelePardakht) : '0'} ریال
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {location ? <Link
                            href={"/paymentMethods"}
                            onClick={()=>(sessionStorage.setItem('paymentMethodsState',JSON.stringify({ amount: userInfoo.GhabelePardakht  })))}
                            className="!bg-success text-white py-2 px-10 rounded-md bg-green-500"
                          >
                            پرداخت
                          </Link> : <div className='flex justify-self-center justify-center text-white py-2 rounded-md w-36 bg-gray-400'><span>پرداخت</span></div>}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className='text-red-500 w-full flex pt-1'>
                  {userInfoo.MablagheKharidErsalRaygan && 
                  <span>با خرید بیش از {autocomma(userInfoo.MablagheKharidErsalRaygan)} ریال هزینه ی ارسال رایگان میشود.</span>
                  }
                  </div>
              </AccordionDetails>
              <AccordionActions  
                sx={{
                    flexDirection: "row", // or "row"
                    justifyContent: "start", // flex-start | flex-end | center | space-between
                    gap: 3,
                }}>
                {location ? 
                <>
                <Link
                  href={"/paymentMethods"}
                  onClick={()=>(sessionStorage.setItem('paymentMethodsState',JSON.stringify({ amount: userInfoo.GhabelePardakht  })))}
                  className="!bg-success text-white py-2 rounded-md w-40 text-center bg-green-500"
                >
                  پرداخت
                </Link>
                <Link
                  href={"/installmentPayment"}
                  className="!bg-yellow-500 text-white py-2 rounded-md w-40 text-center px-1"
                  onClick={()=>{
                    sessionStorage.setItem('noeErsal',String(selectedItem));
                    sessionStorage.setItem('amount',JSON.stringify({ amount: userInfoo.GhabelePardakht  }))
                }}
                >
                  پرداخت قسطی
                </Link>
                </>
                : <div className='flex justify-center text-white py-2 rounded-md w-40 bg-gray-400'><span>پرداخت</span></div>}
                <button
                  onClick={()=>{router.back()}}
                  className="!bg-red-500 text-white py-2 rounded-md w-40 text-center px-1 cursor-pointer"
                >
                  بازگشت به سبد خرید
                </button>
              </AccordionActions>
            </Accordion>
          </div>
        )}
      </div>
    </>
  )
}

export default PrefactorReturn