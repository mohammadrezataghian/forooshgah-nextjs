'use client'

import Cookies from "js-cookie";
import { useState } from "react";
import { Button, Divider } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import dynamic from "next/dynamic";
const AlertDialogSlide = dynamic(() => import("./MessageDialog"), { ssr: false });
import useGetReturnReason from "@/app/api/returnProduct/hook";
import useGetCalcFactor from "@/app/api/calcFactorMarjue/hook";
import useSubmitReturnProduct from "@/app/api/submitReturnProduct/hook";
import Link from "next/link";

// zod schema
const schema = z.object({
  IdEllatMarjoe: z.string().nonempty("این آیتم نمیتواند خالی باشد."),
  SharheMarju: z.string().nonempty("این آیتم نمیتواند خالی باشد."),
  ShomareShaba: z.string()
    .length(24, "شبا باید 24 رقمی و بصورت عددی باشد.")
    .regex(/^\d{24}$/, "شبا باید بصورت عددی باشد.")
    .nonempty("این آیتم نمیتواند خالی باشد."),
    ShomareCartReturn: z.string()
    .length(16, "شماره کارت باید 16 رقمی و بصورت عددی باشد.")
    .nonempty("این آیتم نمیتواند خالی باشد.")
    .regex(/^\d{16}$/, "بصورت عددی بنویسید."),
    SahebeHesab: z.string().nonempty("این آیتم نمیتواند خالی بماند."),
});
// end zod echema

const ReturnProduct = () => {

  // const location = useLocation();
  const location = sessionStorage.getItem('ReturnProductState') || '';
  const state = location && JSON.parse(location)
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
  const userToken = localStorage.getItem("userToken");
  const [openDialog, setOpenDialog] = useState(false);

  // get data for select input

  const { response, loading, error } = useGetReturnReason(userToken);
  const { sumResponse, sumLoading, sumError } = useGetCalcFactor(state,userToken);
  
  // end get data for select input

  // api for submit
  const { submitLoading, submitError, submitResponse, submitReturnProduct } = useSubmitReturnProduct(state, userToken,setOpenDialog);
  // end api for submit

// handle data of form 
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      IdEllatMarjoe: '',
      SharheMarju: '',
      ShomareShaba: '',
      ShomareCartReturn: '',
      SahebeHesab: '',
    },
  });
// end handle data of form

// get data from form
  const onSubmit = async (data:any) => {
    // Handle form submission
    console.log(data);
    submitReturnProduct(data);
    // end handle form submission
  };
// end get data from form

// handle comma
const autocomma = (number_input:number) =>
  new Intl.NumberFormat("en-US").format(number_input);
//handle comma

  return (
    <>
    {user ?  <form   className="lg:px-56 px-5 lg:py-24 py-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-auto p-10 ring-2 ring-gray-400 rounded-lg lg:grid lg:grid-cols-2 flex flex-col items-center gap-10 lg:items-start">
          <div className="flex justify-center w-full h-auto col-span-2 text-white flex-col items-center gap-3 text-lg ">
          <span className="p-3 w-full bg-green-500 text-center">مبلغ مرجوعی : {sumResponse && autocomma(sumResponse.GhabelePardakht)} ریال</span>
          <Divider className="w-full"/>
          </div>
          <div className="flex flex-col items-start gap-3 ">
            <p>علت مرجوع کردن کالا:*</p>  
            <Controller
            name="IdEllatMarjoe"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="select-reason"
                displayEmpty
                className='w-80 h-10'
              >
                <MenuItem value="" disabled>
                  <em>انتخاب کنید</em>
                </MenuItem>
                {response && response.map((item:any) => (
                  <MenuItem key={item.Id} value={String(item.Id)}>{item.Name}</MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.IdEllatMarjoe && <p className="text-red-500">{errors.IdEllatMarjoe.message}</p>}
        </div>

          <div className="flex flex-col items-start gap-3">
            <p>شرح مرجوعی:*</p>
            <Controller
            name="SharheMarju"
            control={control}
            render={({ field }) => (
              <OutlinedInput 
                {...field}
                placeholder="بطور کامل توضیح دهید" 
                className='w-80 h-10' 
              />
            )}
          />
          {errors.SharheMarju && <p className="text-red-500">{errors.SharheMarju.message}</p>}
        </div>

          <div className="flex flex-col items-start gap-3">
            <p>شماره شبا کارت پرداخت کننده:*</p>
            <Controller
            name="ShomareShaba"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                id="shaba"
                endAdornment={<InputAdornment position="end">IR</InputAdornment>}
                className='w-80 h-10'
              />
            )}
          />
          {errors.ShomareShaba && <p className="text-red-500">{errors.ShomareShaba.message}</p>}
        </div>

          <div className="flex flex-col items-start gap-3">
            <p>شماره کارت پرداخت کننده:*</p>
            <Controller
            name="ShomareCartReturn"
            control={control}
            render={({ field }) => (
              <OutlinedInput 
                {...field}
                placeholder="شماره کارت" 
                className='w-80 h-10' 
              />
            )}
          />
          {errors.ShomareCartReturn && <p className="text-red-500">{errors.ShomareCartReturn.message}</p>}
        </div>

          <div className="flex flex-col items-start gap-3">
            <p>نام و نام خانوادگی صاحب کارت:*</p>
            <Controller
            name="SahebeHesab"
            control={control}
            render={({ field }) => (
              <OutlinedInput 
                {...field}
                placeholder="نام و نام خانوادگی" 
                className='w-80 h-10' 
              />
            )}
          />
          {errors.SahebeHesab && <p className="text-red-500">{errors.SahebeHesab.message}</p>}
        </div>

          <div></div>

          <div className="col-span-2 flex">
            <Button variant="contained" color="error" type="submit" className="text-white">
              ثبت مرجوعی
            </Button>
          </div>
        </div>
      </form> : 
      <div className=" w-full flex flex-col items-center gap-3 p-10">
        <p className="text-red-500">لطفا ابتدا وارد حساب کاربری خود شوید.</p>
        <Link href="/" className="bg-white p-3 rounded-lg ring-1 ring-blue-300">
        صفحه ی اصلی
        </Link>  
      </div>}
       <AlertDialogSlide openDialog={openDialog} setOpenDialog={setOpenDialog} submitResponse={submitResponse}/>
    </>
  );
};

export default ReturnProduct;