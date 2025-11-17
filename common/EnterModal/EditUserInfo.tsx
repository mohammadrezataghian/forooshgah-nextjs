'use client'

import { Button } from '@mui/material';
import React from 'react'
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useNewTicket from '@/app/api/newTicket/hook';

// zod schema
const schema = z.object({
  FullName:z.string() 
    .nonempty("این آیتم نمیتواند خالی باشد.")
    .max(100, "نام و نام خانوادگی نمیتواند بیشتر از 100 حرف باشد"),
  PersonNo: z.string()
    .nonempty("این آیتم نمیتواند خالی باشد.")
    .regex(/^\d+$/, "شماره پرسنلی باید بصورت عددی باشد.")
    .max(10, "شماره پرسنلی نباید بیشتر از 10 رقم باشد."),
  NationalCode: z.string()
    .nonempty("این آیتم نمیتواند خالی باشد.")
    .regex(/^\d+$/, "کد ملی باید بصورت عددی باشد.")
    .length(10, "کد ملی باید 10 رقمی باشد."),
  MobileNumber: z.string()
    .nonempty("این آیتم نمیتواند خالی باشد.")
    .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است. فرمت صحیح 09xxxxxxxxx می‌باشد.")
    .length(11, "شماره موبایل باید 11 رقمی باشد."),
  ImageFile: z
    .custom<File[]>()
    .refine(files => files && files.length === 1, { message: "لطفا یک تصویر را بارگذاری کنید." })
    .refine(files => {
      if (!files || files.length === 0) return false;
      const allowed = ["image/png", "image/jpeg", "image/jpg"];
      return allowed.includes(files[0].type);
    }, { message: "فرمت فایل معتبر نیست. فقط PNG و JPG یا JPEG مجاز است." })
    .refine(files => {
      if (!files || files.length === 0) return false;
      return files[0].size <= 1024 * 1024; // 1MB
    }, { message: "حجم عکس نباید بیشتر از 1 مگابایت باشد." }),
});
// end zod echema

const EditUserInfo = () => {

const [files, setFiles] = React.useState<File[]>([]);
const [fileBase64List, setFileBase64List] = React.useState<string[]>([]);

//resolver
const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
});


// convert to base64   
const fileToBase64 = (file:File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);  // base64 string
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

// Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // single file only
    if (!file) return;
  
    const allowedExtensions = ["png", "jpg", "jpeg"];
    const ext = file.name.split(".").pop()?.toLowerCase();
  
    // Convert to base64
    const base64 = await fileToBase64(file);
  
    // Store single file
    setFiles([file]);
    setFileBase64List([base64]);
    setValue("ImageFile", [file], { shouldValidate: true });
  
    e.target.value = ""; // allow reselecting same file
  };
  

  // REMOVE FILE
  const handleRemoveFile = () => {
    setFiles([]);
    setFileBase64List([]);
    setValue("ImageFile", [], { shouldValidate: true });
  };

    
// HANDLE SUBMIT
  const { error, getNewTicket,loading,response } = useNewTicket()
  const onSubmit = (data: any) => {
    const params = {
        Name:data.FullName, 
        EshterakNo:data.PersonNo, 
        Phone:data.MobileNumber, 
        NationalCode:data.NationalCode, 
        Image:fileBase64List[0],
    }
    getNewTicket(params)
  };
      
  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
                <span className="text-lg">اطلاعات را تکمیل کنید</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="cursor-pointer">نام و نام خانوادگی:</label>
                    <input type="text" id="fullName" className="border-2 border-blue-400 rounded-lg h-10 pr-1" {...register("FullName")}/>
                    {errors.FullName && (
                        <span className="text-red-500 text-sm">{errors.FullName.message as string}</span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="personNo" className="cursor-pointer">شماره پرسنلی:</label>
                    <input type="text" id="personNo" className="border-2 border-blue-400 rounded-lg h-10 pr-1" {...register("PersonNo")}/>
                    {errors.PersonNo && (
                        <span className="text-red-500 text-sm">{errors.PersonNo.message as string}</span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="nationalCode" className="cursor-pointer">کد ملی:</label>
                    <input type="text" id="nationalCode" className="border-2 border-blue-400 rounded-lg h-10 pr-1" {...register("NationalCode")}/>
                    {errors.NationalCode && (
                        <span className="text-red-500 text-sm">{errors.NationalCode.message as string}</span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="mobileNumber" className="cursor-pointer">شماره موبایل:</label>
                    <input type="text" id="mobileNumber" className="border-2 border-blue-400 rounded-lg h-10 pr-1" {...register("MobileNumber")}/>
                    {errors.MobileNumber && (
                      <span className="text-red-500 text-sm">{errors.MobileNumber.message as string}</span>
                    )}
                </div>
            </div>
            <div className="!text-justify">
                <span className="w-full ">کارت ملی را به صورت خوانا در کنار صورت خود قرار دهید به صورتی که اطلاعات کاملا واضح باشد و در قسمت زیر بارگذاری کنید.</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 items-center">
                <span>بارگذاری تصویر:</span>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center mx-0.5 w-full sm:w-auto sm:grow h-32 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
                    <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"/></svg>
                        <p className="mb-2 text-sm"><span className="font-semibold">برای آپلود کلیک کنید</span></p>
                        <p className="text-xs">PNG, JPEG, JPG ( کمتر از 1 MB )</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".png,.jpg,.jpeg" multiple={false}/>
                </label>
            </div>
            {errors.ImageFile && (
                <span className="text-red-500 text-sm">{errors.ImageFile.message as string}</span>
            )}
            {(files.length > 0 && !errors.ImageFile) && 
                <div className="flex justify-between items-center bg-gray-50 border border-gray-300 px-3 py-2 rounded">
                    <span className="text-sm">{files[0].name}</span>
                    <button type="button" className="text-red-500 text-xs cursor-pointer" onClick={() => handleRemoveFile()}>
                      حذف
                    </button>
                </div>
            }
            <Button variant="contained" size="large" type="submit">ارسال اطلاعات</Button>
        </form>
    </>
  )
}

export default EditUserInfo