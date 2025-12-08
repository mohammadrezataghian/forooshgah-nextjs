'use client'

import React,{ useEffect, useMemo, useState } from "react";
import { PageContainer } from '@toolpad/core/PageContainer';
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import { Button, Divider } from "@mui/material";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useEditSupplierInfo from "@/app/api/updateTaminKonandeInfo/hook";
import EditIcon from '@mui/icons-material/Edit';
import dynamic from "next/dynamic";
const TransitionAlerts = dynamic(() => import("./DashboardAlert"), { ssr: false });

// zod schema
const schema = z.object({
  IdTaminkonande: z.string().optional(),
  NameSahebeHesab: z.string().nonempty("این آیتم نمیتواند خالی باشد."),
  ShomareHesab: z.string()
    .nonempty("این آیتم نمیتواند خالی باشد.")
    .regex(/^\d+$/, "شماره حساب باید بصورت عددی باشد."),
  ShomareKart: z.string()
    .length(16, "شماره کارت باید 16 رقمی و بصورت عددی باشد.")
    .nonempty("این آیتم نمیتواند خالی باشد.")
    .regex(/^\d{16}$/, "بصورت عددی بنویسید."),
  ShomareShaba: z.string()
    .length(26, "شبا باید 24 رقمی باشد.")
    .nonempty("این آیتم نمیتواند خالی باشد."),
});
// end zod echema

const Dashboard = () => {

  const user = useMemo(() => {
    const cookie = Cookies.get("supplierUser");
    return cookie ? JSON.parse(cookie) : null;
  }, []);
const userToken = localStorage.getItem("supplierUserToken");
const [isOn, setIsOn] = useState(false)

const handleToggle = () => {
  setIsOn((prev) => !prev);
};
// api for submit
const { editInfoLoading, editInfoError, editInfoResponse, EditInfo } = useEditSupplierInfo(userToken);
// end api for submit

// handle data of form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      IdTaminkonande: "",
      NameSahebeHesab: "",
      ShomareHesab: "",
      ShomareKart: "",
      ShomareShaba: "",
    },
  });

useEffect(() => {
  if (user) {
    reset({
      IdTaminkonande: user.Id || "",
      NameSahebeHesab: user.NameSahebeHesab || "",
      ShomareHesab: user.ShomareHesab || "",
      ShomareKart: user.ShomareKart || "",
      ShomareShaba: user.ShomareShaba || "",
    });
  }
}, [ reset]);

const onSubmit = (data:any) => {

  const normalizedShaba = data.ShomareShaba.startsWith("IR")
  ? data.ShomareShaba
  : `IR${data.ShomareShaba}`;

  const finalData = {
    ...data,
    ShomareShaba: normalizedShaba,
    "Id":user?.Id
  }
  console.log("Form submitted:", finalData);
  EditInfo(finalData);
  handleToggle()
};

  return (
    <>  
      <PageContainer>
        {user ?
         <>
          <form className="w-full h-auto bg-white border border-gray-300 rounded-md" onSubmit={handleSubmit(onSubmit)}>
            <div className="p-5 w-full grid grid-cols-2 grid-rows-4 gap-5 justify-start">
              <div className="w-full flex gap-1">
                <span className="font-semibold">موبایل:</span>
                <span className="text-gray-600">{user.Mobile}</span>
              </div>
              <div className="w-full flex gap-1">
                <span className="font-semibold">تلفن ثابت:</span>
                <span className="text-gray-600">{user.Tell}</span>
              </div>
              <div className="w-full flex gap-1">
                <span className="font-semibold">کد پستی :</span>
                <span className="text-gray-600">{user.CodePosti}</span>
              </div>
              <div className="w-full flex gap-1 ">
                <span className="font-semibold">کد ملی:</span>
                <span className="text-gray-600">{user.CodeMelli}</span>
              </div>
              <div className="w-full flex gap-1 xs:col-span-1 col-span-2">
                <span className="font-semibold">نام و نام خانوادگی:</span>
                <span className="text-gray-600">{user.NameHaghighi} {user.FamilyHaghighi}</span>
              </div>
              <div className="w-full flex gap-1 xs:col-span-1 col-span-2">
                <span className="font-semibold">ایمیل:</span>
                <span className="text-gray-600">{user.Email}</span>
              </div>
              <div className="w-full flex gap-1 col-span-2">
                <span className="font-semibold">آدرس:</span>
                <span className="text-gray-600">{user.Address}</span>
              </div>
            </div>
            <Divider className="w-full"/>
            <div className="p-5 grid lg:grid-cols-2 grid-cols-1 gap-5 pb-10">
               <div className="flex flex-col gap-3">
                  <span>نام صاحب حساب:</span>
                    <Controller
                    name="NameSahebeHesab"
                    control={control}
                    render={({ field }) => (
                      <TextField
                      {...field}
                      placeholder="نام صاحب حساب"
                      variant="outlined"
                      error={!!errors.NameSahebeHesab}
                      helperText={errors.NameSahebeHesab?.message}
                      className="w-full"
                      disabled={!isOn}
                      />
                      )}
                    />
                </div>
               <div className="flex flex-col gap-3">
                  <span>شماره حساب:</span>
                    <Controller
                    name="ShomareHesab"
                    control={control}
                    render={({ field }) => (
                      <TextField
                      {...field}
                      placeholder="شماره حساب"
                      variant="outlined"
                      error={!!errors.ShomareHesab}
                      helperText={errors.ShomareHesab?.message}
                      className="w-full"
                      disabled={!isOn}
                      InputProps={{
                        sx: {
                          "& input": {
                            textAlign: "left", 
                          },
                        },
                      }}
                      />
                      )}
                    />
                </div>
               <div className="flex flex-col gap-3">
                  <span>شماره کارت:</span>
                    <Controller
                    name="ShomareKart"
                    control={control}
                    render={({ field }) => (
                      <TextField
                      {...field}
                      placeholder="شماره کارت"
                      variant="outlined"
                      error={!!errors.ShomareKart}
                      helperText={errors.ShomareKart?.message}
                      className="w-full"
                      disabled={!isOn}
                      InputProps={{
                        sx: {
                          "& input": {
                            textAlign: "left", 
                          },
                        },
                      }}
                      />
                      )}
                    />
                </div>
               <div className="flex flex-col gap-3">
                  <span>شماره شبا:</span>
                    <Controller
                    name="ShomareShaba"
                    control={control}
                    render={({ field }) => (
                      <TextField
                      {...field}
                      placeholder="شماره شبا"
                      variant="outlined"
                      error={!!errors.ShomareShaba}
                      helperText={errors.ShomareShaba?.message}
                      className="w-full"
                      disabled={!isOn}
                      InputProps={{
                        // startAdornment: (
                        //   <InputAdornment position="start">
                        //     IR
                        //   </InputAdornment>
                        // ),
                        sx: {
                          direction: "ltr", 
                          "& input": {
                            textAlign: "left",
                          },
                        },
                      }}
                      />
                      )}
                    />
                </div>
                <div className="flex">
                  {
                    isOn ? <Button
                    autoFocus
                    variant="contained"
                    className="text-white bg-yellow-500"
                    type="submit"
                    >
                     ذخیره
                    </Button> : <Button
                    autoFocus
                    variant="contained"
                    className="text-white flex gap-1"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent form submission
                      handleToggle();     // Toggle edit mode
                    }}
                    type="button"
                    // disabled
                    >
                     <span>ویرایش</span> <EditIcon className="text-white text-base"/>
                    </Button>
                  }
                </div>
            </div>
            {editInfoResponse && 
            <TransitionAlerts editInfoResponse={editInfoResponse}/>
            }
          
          </form>
         </>
         : <div className="flex justify-center mt-10 text-red-500">
            <span> ابتدا وارد شوید</span>
          </div>}
        
      </PageContainer>
    </>
  );
};

export default Dashboard;