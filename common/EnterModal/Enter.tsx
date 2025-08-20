import { useEffect, useRef } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import {Button,Typography} from "@mui/material"
import { useState } from "react";
import Cookies from "js-cookie";
import  useGetCheckLogin  from "@/app/api/checkMobileForLogin/hook";
import  useGetSubmitLogin  from "@/app/api/loginUserByMobile/hook";
import { useAtom } from "jotai";
import { IsUserloggedIn } from "@/shared/isLoggedIn";
import * as z from 'zod';
import MessageSnackbar from "@/common/Snackbar/MessageSnackbar";

// zod schema for validation
const schema = z.object({
  inputValue:z.string()
      .length(11, "شماره موبایل باید 11 رقمی باشد.")
      .regex(/^\d{11}$/, "شماره موبایل باید بصورت عددی باشد.")
      .nonempty("این آیتم نمیتواند خالی باشد."),
})
// end zod schema for validation

type EnterProps = {
    handleClose: ()=>void;
    setOpenUserPassDialog:React.Dispatch<React.SetStateAction<boolean>>;
}

const Enter = ({ handleClose,setOpenUserPassDialog }:EnterProps) => {

  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTP, setShowOtp] = useState(false);
  const [verificationCode, setVerficationCode] = useState("");
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [IsloggedIn, setIsloggedIn] = useAtom(IsUserloggedIn);
  const [mobileError, setMobileError] = useState("");

  useEffect(() => {
    if (showOTP && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
        if (timerRef.current) {
            clearInterval(timerRef.current);
          }
      setCanResend(true);
    }
    return () => clearInterval(timerRef.current ?? undefined);
  }, [showOTP, timer]);

  const formatTime = (timer:number) => {
    const minutes = Math.floor(timer / 60);
    const secs = timer % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  // start snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  function showSnackbar(message:string) {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  }
  // end snackbar

  // first step of verification
const params = {
  Mobile: mobileNumber,
}
const { error, getCheckLogin,loading,checkLogin } = useGetCheckLogin()

  async function handleGetVerificationCode() {
    // Validate using Zod schema
    try {
      schema.parse({ inputValue: mobileNumber });
      setMobileError(""); // clear previous error if valid
  
      const res = await getCheckLogin({ Mobile: mobileNumber });
  
      if (res?.data.resCode === 1) {
        setShowOtp(true);
        setTimer(120);
        setCanResend(false);
      } else {
        showSnackbar(res?.data.resMessage);
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
  // end first step of verification

  // second step of login

const param = {
  Mobile: mobileNumber,
  VerificationCode: verificationCode,
}

const { loginError, getSubmitLogin,loginLoading,submitLogin } = useGetSubmitLogin()

 async function handleSubmitVerification() {
    if (Cookies.get("user")) {
      return showSnackbar("قبلا وارد شده اید");
    }
    const res = await getSubmitLogin(param)
      if (res?.data.resCode === 1) {
        Cookies.set("user", JSON.stringify(res.data.Data), { expires: 12 / 24 });
        setIsloggedIn(true)
        localStorage.setItem("userToken", res.data.token);
        showSnackbar("با موفقیت وارد شدید!");
        setMobileNumber("");
        setShowOtp(false);
      } else {
        showSnackbar(res?.data.resMessage)
      }
  }
  // end second step op login

  return (
    <>
      <div className="flex gap-2 flex-col z-[100000]">
        <p className="my-5 font-bold text-lg">
          برای ادامه ی خرید شماره تلفن همراه خود را وارد کنید تا کد تایید
          برایتان ارسال گردد.
        </p>
        <p className="text-red-500 text-sm">
          (ورود صرفا برای اعضای شرکت تعاونی مصرف کارکنان بانک ملی امکان پذیر
          میباشد)
        </p>
        <OutlinedInput
          placeholder="شماره موبایل"
          onChange={(event) => setMobileNumber(event.target.value)}
          value={mobileNumber}
          className="h-10"
          inputProps={{ style: { textAlign: 'center' } }}
          autoFocus
        />
        {mobileError && (
        <p className="text-red-500 text-sm mt-0 mb-1">{mobileError}</p>
        )}
        <div className="w-full flex mb-5">
          <span className="underline text-lg underline-offset-4 cursor-pointer p-1" onClick={()=>{
            setOpenUserPassDialog(true);
            handleClose();
            }}>
            ورود با نام کاربری
          </span>
        </div>
        <div className="flex gap-5">
          {!showOTP &&
            <Button
              onClick={handleGetVerificationCode}
              className="w-full bg-green-500 text-white rounded-md py-3"
              variant="contained"
              disabled={showOTP}
            >
              تایید شماره موبایل
            </Button>}
        </div>

        <div>
          {showOTP && (
            <div
              className="mt-1 mb-0 pb-0 gap-2 flex flex-col items-center"
              style={{
                direction: "ltr",
              }}
            >
              <Typography className="text-lg font-bold">کد تایید ارسال شده را وارد کنید</Typography>
              <OutlinedInput
                placeholder="کد تایید"
                onChange={(event) => setVerficationCode(event.target.value)}
                className=" mb-5 h-10 w-full"
                inputProps={{ style: { textAlign: 'center' } }}
                autoFocus
              />
              {timer > 0 && (
                <div className="w-full flex justify-center">
                  <span className="text-gray-500">{formatTime(timer)}</span>
                </div>
              )}
              {canResend ? (
                <Button
                  onClick={handleGetVerificationCode}
                  className="w-1/2 bg-blue-500 text-white py-3"
                >
                  ارسال مجدد کد
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleSubmitVerification(); // Show Snackbar as part of the verification logic
                    setTimeout(() => {
                      handleClose(); // Close the dialog after a slight delay
                    }, 1500); // Delay in milliseconds
                  }}
                  className="w-1/2 bg-green-500 text-white py-3"
                  variant="contained"
                  disabled={timer === 0}
                >
                  ثبت
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <MessageSnackbar snackbarOpen={snackbarOpen} autoHideDuration={1500} snackbarMessage={snackbarMessage} setSnackbarOpen={setSnackbarOpen}/>
    </>
  );
};

export default Enter;