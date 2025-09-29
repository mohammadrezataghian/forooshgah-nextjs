'use client'

import React, { useEffect, useRef, useState } from "react";
import stockRequestImg from "@/public/images/stockRequest/stockRequestImg.png";
import * as z from "zod";
import { Button, OutlinedInput } from "@mui/material";
import useGetStockRequest from "@/app/api/getCodeSabteName/hook";
import useGetSubmitStockRequest from "@/app/api/requestForRegisterSahamPerson/hook";
import AutoHideDialog from "@/common/AutoHideDialog/AutoHideDialog";
import { schema, cellphoneSchema } from "./schemas"
import { handleFileChange } from "./_components/ImageInput"
import Image from "next/image";
import { useRouter } from "next/navigation";

type FieldErrors = Record<string, string>;

const StockRequest = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [subscriptionNo, setSubscriptionNo] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");
  const [mobileError, setMobileError] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [timer, setTimer] = useState<number>(180);
  const [image, setImage] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [allowRegistrationCode, setAllowRegistrationCode] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [duration, setDuration] = useState(0);
  const router = useRouter()
  const [errors, setErrors] = useState<FieldErrors>({});
  const [shouldFocusError, setShouldFocusError] = useState(false);

  // handle timer
  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
      setAllowRegistrationCode(false);
    }
    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
  }, [timer]);

  const formatTime = (timer:any) => {
    const minutes = Math.floor(timer / 60);
    const secs = timer % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };
  // end handle timer

  // handle getting the code
  const { error, getStockRequest, loading, codeSabteNam } =
    useGetStockRequest();

  const handleRegistrationCode = async () => {
    try {
      cellphoneSchema.parse(cellphone);
      setMobileError(""); // clear previous error if valid
      setRegistrationCode("");

      const res = await getStockRequest({ Mobile: cellphone });

      if (res && res.data.resCode === 1) {
        setTimer(180);
        setAllowRegistrationCode(true);
      } else {
        setDialogTitle("خطا");
        setDialogContent(res && res.data.resMessage);
        setDuration(6000);
        setOpen(true);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setMobileError(err.issues[0].message);
      } else {
        setDialogTitle("خطا");
        setDialogContent("خطایی رخ داده است.");
        setDuration(6000);
        setOpen(true);
      }
    }
  };
  // end handle getting the code

  // submit
  const { errorSubmit, getSubmitStockRequest, loadingSubmit, submitResponse } =
    useGetSubmitStockRequest();

  const handleSubmit = async () => {
    const formData = {
      firstName,
      lastName,
      identityNumber,
      nationalCode,
      fatherName,
      subscriptionNo,
      telephone,
      address,
      cellphone,
      registrationCode,
      fileName,
    };

    const result = schema.safeParse(formData);

    if (!result.success) {
        const fieldErrors: FieldErrors = {};
        result.error.issues.forEach((err) => {
          const fieldName = String(err.path[0]);
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
        setShouldFocusError(true);
        return;
      }

    setErrors({}); // clear previous errors
    setShouldFocusError(false);

    const param = {
      Address: address,
      Description: description,
      Father: fatherName,
      FirstName: firstName,
      IdIdentity: identityNumber,
      Lastname: lastName,
      NationalCode: nationalCode,
      PersonNo: subscriptionNo,
      Tel: telephone,
      FileName: fileName,
      base64Image: image,
      Mobile: cellphone,
      CodeSabteNam: registrationCode,
    };

    const res = await getSubmitStockRequest(param);

    if (res && res?.data?.resCode === 1) {
      setDialogTitle("ثبت اطلاعات");
      setDialogContent(
        res?.data?.resMessage || "ثبت اطلاعات موفقیت آمیز بود"
      );
      setDuration(3000);
      setOpen(true);
      setTimeout(() => router.back, 2000);
    } else {
      setDialogTitle("خطا در ثبت اطلاعات");
      setDialogContent(res?.data?.resMessage || "خطایی رخ داد");
      setDuration(3000);
      setOpen(true);
    }
  };
  // end submit

  // autofocus
  const inputRefs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    identityNumber: useRef<HTMLInputElement>(null),
    nationalCode: useRef<HTMLInputElement>(null),
    fatherName: useRef<HTMLInputElement>(null),
    subscriptionNo: useRef<HTMLInputElement>(null),
    telephone: useRef<HTMLInputElement>(null),
    address: useRef<HTMLInputElement>(null),
    cellphone: useRef<HTMLInputElement>(null),
    registrationCode: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    if (!shouldFocusError) return;
  
    const focusableField = (Object.keys(errors) as (keyof typeof inputRefs)[])
      .find((key) => inputRefs[key]?.current);
  
    if (focusableField) {
      inputRefs[focusableField]?.current?.focus();
    }
  }, [errors, shouldFocusError]);
  ;

  // end autofocus

  return (
    <>
      <title>سهامدار جدید</title>
      <meta name="description" content="سهامدار جدید" />
      <div className="w-full h-auto flex justify-center bg-white p-10">
        <div className="w-full container">
          <div className="w-full p-5 lg:border lg:border-gray-300 flex flex-col gap-5 lg:rounded-xl">
            <div className="w-full h-auto flex justify-center">
              <Image src={stockRequestImg} alt="" className="w-24" />
            </div>
            <div className="flex justify-center w-full mb-5">
              <h1 className="text-lg">عضویت سهامدار جدید</h1>
            </div>
            <div
              id="form"
              className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-5 items-start"
            >
              <div className="w-full flex flex-col justify-center gap-3">
                <span>نام :</span>
                <OutlinedInput
                  placeholder="نام"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors((prev) => ({ ...prev, firstName: "" }));
                  }}
                  value={firstName}
                  inputRef={inputRefs.firstName}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <span>نام خانوادگی :</span>
                <OutlinedInput
                  placeholder="نام خانوادگی"
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrors((prev) => ({ ...prev, lastName: "" }));
                  }}
                  value={lastName}
                  inputRef={inputRefs.lastName}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <span>شماره شناسنامه :</span>
                <OutlinedInput
                  placeholder="شماره شناسنامه"
                  onChange={(e) => {
                    setIdentityNumber(e.target.value);
                    setErrors((prev) => ({ ...prev, identityNumber: "" }));
                  }}
                  value={identityNumber}
                  inputRef={inputRefs.identityNumber}
                />
                {errors.identityNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.identityNumber}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <span>کد ملی :</span>
                <OutlinedInput
                  placeholder="کد ملی ده رقمی"
                  onChange={(e) => {
                    setNationalCode(e.target.value);
                    setErrors((prev) => ({ ...prev, nationalCode: "" }));
                  }}
                  value={nationalCode}
                  inputRef={inputRefs.nationalCode}
                />
                {errors.nationalCode && (
                  <p className="text-red-500 text-sm">{errors.nationalCode}</p>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <span>نام پدر :</span>
                <OutlinedInput
                  placeholder=" نام پدر"
                  onChange={(e) => {
                    setFatherName(e.target.value);
                    setErrors((prev) => ({ ...prev, fatherName: "" }));
                  }}
                  value={fatherName}
                  inputRef={inputRefs.fatherName}
                />
                {errors.fatherName && (
                  <p className="text-red-500 text-sm">{errors.fatherName}</p>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <span>شماره پرسنلی :</span>
                <OutlinedInput
                  placeholder="شماره پرسنلی"
                  onChange={(e) => {
                    setSubscriptionNo(e.target.value);
                    setErrors((prev) => ({ ...prev, subscriptionNo: "" }));
                  }}
                  value={subscriptionNo}
                  inputRef={inputRefs.subscriptionNo}
                />
                {errors.subscriptionNo && (
                  <p className="text-red-500 text-sm">
                    {errors.subscriptionNo}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <span>تلفن ثابت :</span>
                <OutlinedInput
                  placeholder="مثال : 02122345678"
                  onChange={(e) => {
                    setTelephone(e.target.value);
                    setErrors((prev) => ({ ...prev, telephone: "" }));
                  }}
                  value={telephone}
                  inputRef={inputRefs.telephone}
                />
                {errors.telephone && (
                  <p className="text-red-500 text-sm">{errors.telephone}</p>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <span>آدرس :</span>
                <OutlinedInput
                  placeholder="آدرس"
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setErrors((prev) => ({ ...prev, address: "" }));
                  }}
                  value={address}
                  inputRef={inputRefs.address}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <span>توضیحات : (اختیاری)</span>
                <OutlinedInput
                  placeholder="توضیحات (اختیاری)"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <span>شماره موبایل یازده رقمی:</span>
                <OutlinedInput
                  placeholder="شماره موبایل جهت اخذ کد ثبت نام"
                  onChange={(e) => {
                    setCellphone(e.target.value);
                    setErrors((prev) => ({ ...prev, cellphone: "" }));
                  }}
                  value={cellphone}
                  disabled={allowRegistrationCode}
                  inputRef={inputRefs.cellphone}
                />
                {mobileError && (
                  <p className="text-red-500 text-sm mt-0 mb-1">
                    {mobileError}
                  </p>
                )}
                {errors.cellphone && (
                  <p className="text-red-500 text-sm">{errors.cellphone}</p>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <span>کد ثبت نام :</span>
                <div className="flex justify-between gap-5 w-full">
                  <OutlinedInput
                    placeholder="کد ثبت نام"
                    className="flex-grow"
                    onChange={(e) => {
                      setRegistrationCode(e.target.value);
                      setErrors((prev) => ({ ...prev, registrationCode: "" }));
                    }}
                    value={registrationCode}
                    disabled={!allowRegistrationCode}
                    inputRef={inputRefs.registrationCode}
                  />
                  <Button
                    variant="contained"
                    className="text-white"
                    onClick={handleRegistrationCode}
                    loading={loading}
                    disabled={allowRegistrationCode}
                  >
                    {loading
                      ? ""
                      : !allowRegistrationCode
                        ? "دریافت کد"
                        : `${formatTime(timer)} ارسال مجدد کد`}
                  </Button>
                </div>
                {errors.registrationCode && (
                  <p className="text-red-500 text-sm">
                    {errors.registrationCode}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-3">
                <span>نام فایل :</span>
                <OutlinedInput
                  placeholder="نام فایل"
                  disabled
                  value={fileName}
                />
                {errors.fileName && (
                  <p className="text-red-500 text-sm">{errors.fileName}</p>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-3 md:col-span-2">
                <span>بارگذاری نامه :</span>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">برای آپلود کلیک کنید</span></p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept=".png,.jpg,.jpeg"
                      multiple
                      onChange={(e) => handleFileChange(e,setErrors,setFileName,setImage)}
                    />
                  </label>
                </div>
              </div>
              <div className="md:col-span-2 flex justify-center">
                <Button
                  variant="contained"
                  color="success"
                  className="text-white px-10 py-3"
                  onClick={handleSubmit}
                >
                  ثبت اطلاعات
                </Button>
              </div>
            </div>
          </div>
        </div>
        <AutoHideDialog open={open} onClose={() => setOpen(false)} duration={duration} dialogTitle={dialogTitle} dialogContent={dialogContent}
        />
      </div>
    </>
  );
};

export default StockRequest;
