'use client'

import React, { useEffect, useRef, useState } from 'react'
import Logo from "@/public/logo/logo1.png";
import * as z from 'zod';
import useGetCheckLoginSupplier from '@/app/api/checkMobileTaminKonande/hook';
import useGetSubmitLoginSupplier from '@/app/api/loginTaminKonandeByMobile/hook';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
const MessageSnackbar = dynamic(() => import("@/common/Snackbar/MessageSnackbar"), { ssr: false });
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import EastIcon from '@mui/icons-material/East';
import Link from 'next/link';
import { useNormalizeDigits } from "@/hooks/useNormalizeDigits";
import { useDispatch } from "react-redux";
import { setIsSupplierLoggedIn } from "@/store/slices/isSupplierLoggedInSlice";

// zod schema for validation
const schema = z.object({
  inputValue:z.string()
  .nonempty("این آیتم نمیتواند خالی باشد.")
  .length(11, "شماره موبایل باید 11 رقمی باشد.")
  .regex(/^\d{11}$/, "شماره موبایل باید بصورت عددی باشد."),
})
// end zod schema for validation

const SuppliersLogin = () => {
    
const dispatch = useDispatch()

const { normalizeDigits } = useNormalizeDigits();
const [mobileNumber,setMobileNumber] = useState("")
const [mobileError, setMobileError] = useState("");
const [showOTP, setShowOtp] = useState(false);
const [timer, setTimer] = useState(120);
const [canResend, setCanResend] = useState(false);
const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
const [verificationCode, setVerficationCode] = useState("");

// timer
useEffect(() => {
    if (showOTP && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setCanResend(true);
    }
    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
  }, [showOTP, timer]);

  const formatTime = (timer:any) => {
    const minutes = Math.floor(timer / 60);
    const secs = timer % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };
// timer

    // start snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
  
    function showSnackbar(message:string) {
      // CHANGED
      setSnackbarMessage(message);
      setSnackbarOpen(true);
    }
    // end snackbar

    // send mobile number
const { error, getCheckLoginSupplier,loading,checkLoginSupplier } = useGetCheckLoginSupplier()

async function handleGetVerificationCode() {

    try {
        const normalizedMobile = normalizeDigits(mobileNumber);
        schema.parse({ inputValue: normalizedMobile });
        setMobileError(""); // clear previous error if valid
    
        const res = await getCheckLoginSupplier({ Mobile: normalizedMobile });
    
        if (res && res.data.resCode === 1) {
            setShowOtp(true);
            setTimer(120);
            setCanResend(false);
        } else {
            showSnackbar(res && res.data.resMessage);
        }
        } catch (err) {
        if (err instanceof z.ZodError) {
            // Set the validation error message from Zod
            setMobileError(err.issues[0].message);
        } else {
            showSnackbar("خطایی رخ داده است.");
        }
        }
}    
// end send mobile number

// submit login
const param = {
    Mobile: normalizeDigits(mobileNumber),
    VerificationCode: normalizeDigits(verificationCode),
  }

 const { loginError, getSubmitLoginSupplier,loginLoading,submitLoginSupplier } = useGetSubmitLoginSupplier()

const router = useRouter()

  async function handleSubmitVerification() {
      if (Cookies.get("supplierUser")) {
        return showSnackbar("قبلا وارد شده اید");
      }
      const res = await getSubmitLoginSupplier(param)
        if (res && res.data.resCode === 1) {
          Cookies.set("supplierUser", JSON.stringify(res.data.Data), { expires: 12 / 24 });
          dispatch(setIsSupplierLoggedIn(true))
          localStorage.setItem("supplierUserToken", res.data.token);
          showSnackbar("با موفقیت وارد شدید!");
          setMobileNumber("");
          setShowOtp(false);
        } else {
          showSnackbar(res && res.data.resMessage)
        }
    }
useEffect(()=>{
      if (submitLoginSupplier && submitLoginSupplier?.data?.resCode && submitLoginSupplier?.data?.resCode === 1){
        setTimeout(() => {
          router.replace("/suppliers/dashboard");
        },1500);
      }
},[submitLoginSupplier])
// end submit login

  return (
    <>
        <title>ورود</title>
        <meta name="description" content="ورود" />
        <div className='w-full h-screen flex justify-center items-center bg-white'>
            <div className='w-full lg:w-[400px] lg:h-[520px] p-5 lg:border lg:border-gray-300 flex flex-col gap-5 lg:rounded-xl relative'>
                <div className='w-full h-auto flex justify-center'>   
                    <Image src={Logo} alt=""  className='w-24'/>
                </div>
                <div className='flex w-full'>
                    <h1 className='text-lg'>ورود تامین کنندگان</h1>
                </div>
                <div className='flex w-full flex-col gap-1 text-gray-600 text-sm'>
                    <span>سلام</span>
                    <span>لطفا شماره موبایل خود را وارد کنید</span>
                </div>
                <div className='w-full flex flex-col gap-1'>
                    <input type="text" className='w-full lg:border lg:focus:border-[#FDCB01] lg:border-[#ff858d] rounded-md h-12 text-center border-b-2 border-b-[#FDCB01] lg:bg-white bg-gray-200' placeholder='شماره موبایل' autoFocus onChange={(event) => setMobileNumber(normalizeDigits(event.target.value))} onBlur={() => {
                    try {
                    schema.parse({ inputValue: mobileNumber });
                    setMobileError("");
                    } catch (err) {
                    if (err instanceof z.ZodError) {
                        setMobileError(err.issues[0].message);
                    }
                    }
                 }}/>
                    <p className='text-red-500 text-sm'>{mobileError}</p>
                </div>
                {!showOTP &&
                <div>
                    <button
                    onClick={handleGetVerificationCode}
                    className="w-full text-center bg-yellow-500 text-white rounded-md h-12 cursor-pointer"
                    disabled={showOTP}
                    >
                    تایید شماره موبایل
                    </button>
                </div>
                }
                <div className='w-full '>
                    {showOTP && (
                        <div
                        className=" mb-0 pb-0 gap-2 flex flex-col items-center text-center"
                        style={{
                            direction: "ltr",
                        }}
                        >
                        <div className='w-full flex text-sm'>
                            <span >کد تایید ارسال شده را وارد کنید</span>
                        </div>
                        <input
                            placeholder="کد تایید"
                            onChange={(event) => setVerficationCode(event.target.value)}
                            className="h-12 rounded-md text-center w-full lg:border lg:focus:border-[#ff858d]   lg:border-[#FDCB01] border-b-2 border-b-[#ff858d] lg:bg-white bg-gray-200"
                            autoFocus
                        />
                        {timer > 0 && (
                            <div className="w-full flex justify-center">
                            <span className="text-gray-500">{formatTime(timer)}</span>
                            </div>
                        )}
                        {canResend ? (
                            <button
                            onClick={handleGetVerificationCode}
                            className="w-full bg-yellow-500 text-white h-12 text-center rounded-md"
                            >
                            ارسال مجدد کد
                            </button>
                        ) : (
                            <button
                            onClick={() => {
                                handleSubmitVerification(); // Show Snackbar as part of the verification logic
                                setTimeout(() => {
                                // handleClose(); // Close the dialog after a slight delay
                                }, 1500); // Delay in milliseconds
                            }}
                            className="w-full bg-yellow-500 text-white h-11 text-center rounded-md cursor-pointer"
                            disabled={timer === 0}
                            >
                            ثبت
                            </button>
                        )}
                        </div>
                    )}
                </div>
                <Link href='/' className='absolute top-16 right-5'> <EastIcon/></Link>
            </div>
        </div>
      
              <MessageSnackbar snackbarOpen={snackbarOpen} autoHideDuration={1500} snackbarMessage={snackbarMessage} setSnackbarOpen={setSnackbarOpen}/>
    </>
  )
}

export default SuppliersLogin