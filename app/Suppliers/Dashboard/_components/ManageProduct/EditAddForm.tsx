'use client'

import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button, Divider, Switch } from "@mui/material";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddProduct from "@/app/api/addKalaTaminKonande/hook";

// end search farsi handle
const normalizePersian = (str = "") =>
  str
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/‌/g, " ") // Remove ZWNJ
    .trim()
    .toLowerCase();
//

// zod schema
const schema = z.object({
  IdGroupKala: z.string().nonempty("این آیتم نمیتواند خالی باشد."),
  Unit: z.union([z.string(), z.number()])
  .transform((val) => String(val))
  .refine(val => val.trim() !== '', { message: "این آیتم نمیتواند خالی باشد." }),
  Type: z.union([z.string(), z.number()])
  .transform((val) => String(val))
  .refine(val => val.trim() !== '', { message: "این آیتم نمیتواند خالی باشد." }),
  NameKala: z.string()
  .nonempty("این آیتم نمیتواند خالی باشد."),
  NameLatin: z.string(),
  DeActive: z.boolean(),
});
// end zod echema

type EditAddFormProps={
  groupResponse:any;
  setSelectedGroupId:React.Dispatch<React.SetStateAction<any>>;
  unitResponse:any;
  setSelectedUnitId:React.Dispatch<React.SetStateAction<any>>;
  typeResponse:any;
  setSelectedTypeId:React.Dispatch<React.SetStateAction<any>>;
  setChecked:React.Dispatch<React.SetStateAction<boolean>>;
  handleClose:()=>void;
  userToken:string | null;
  Code:any;
  user:any | null;
  onRefresh:()=>void;
}

const EditAddForm = ({
  groupResponse,
  setSelectedGroupId,
  unitResponse,
  setSelectedUnitId,
  typeResponse,
  setSelectedTypeId,
  setChecked,
  handleClose,
  userToken,
  Code,
  user,
  onRefresh
}:EditAddFormProps) => {
  // search farsi handle
  const filterOptions = (options:any, { inputValue }:{inputValue:any}) => {
    const normalizedInput = normalizePersian(inputValue);
    return options.filter((option:any) =>
      normalizePersian(option.Name).includes(normalizedInput)
    );
  };
  // end search farsi handle

  // handle data of form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      IdGroupKala: "",
      Unit: "",
      Type: "",
      NameKala: "",
      NameLatin: "",
      DeActive: true,
    },
  });


 // api for submit
 const { addProductLoading, addProductError, addProductResponse, AddProduct } = useAddProduct(userToken);
 // end api for submit

 const onSubmit = (data:any) => {
  const finalData = {
    ...data,
    Code,
    "IdTaminKonande":user?.Id
  };
  console.log("Form submitted:", finalData);
  AddProduct(finalData);
};
  // end handle data of form
useEffect(()=>{
if (addProductResponse && addProductResponse?.data?.resCode && addProductResponse?.data?.resCode === 1) {
  handleClose()
  onRefresh()
}
},[addProductResponse])

  return (
    <>
      <form
        className="w-[280px] xs:w-96 sm:w-[480px] md:w-[530px] h-auto "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-3 ">
            <span>گروه کالا:</span>
            <Controller
              name="IdGroupKala"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  className="md:w-72 sm:w-64 xs:w-44 w-[280px]"
                  {...field}
                  onChange={(event, newValue) => {
                    field.onChange(newValue?.Id || ""); // save only the ID
                    setSelectedGroupId(newValue ? newValue.Id : null); // update external state if needed
                  }}
                  value={
                    groupResponse?.find((item:any) => item.Id === field.value) ||
                    null
                  }
                  options={groupResponse || []}
                  getOptionLabel={(option) => option.Name || ""}
                  isOptionEqualToValue={(option, value) => option.Id === value}
                  filterOptions={filterOptions}
                  renderOption={(props, option, { index }) => (
                    <li {...props} key={option.Id}>
                      {index + 1}. {option.Name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="انتخاب کنید"
                      variant="outlined"
                      error={!!errors.IdGroupKala}
                      helperText={errors.IdGroupKala?.message}
                    />
                  )}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <span>واحد کالا:</span>
            <Controller
            name="Unit"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                onChange={(event, newValue) => {
                  field.onChange(newValue?.Id || '');
                  setSelectedUnitId(newValue?.Id || null);
                }}
                value={unitResponse?.find((item:any) => item.Id === field.value) || null}
                options={unitResponse || []}
                getOptionLabel={(option) => option.Name || ''}
                isOptionEqualToValue={(option, value) => option.Id === value?.Id}
                filterOptions={filterOptions}
                className="md:w-72 sm:w-64 xs:w-44 w-[280px]"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="انتخاب کنید"
                    variant="outlined"
                    error={!!errors.Unit}
                    helperText={errors.Unit?.message}
                  />
                )}
              />
            )}
          />
          </div>
          <div className="flex flex-col gap-3">
            <span>نوع کالا:</span>
            <Controller
            name="Type"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                onChange={(event, newValue) => {
                  field.onChange(newValue?.Id || '');
                  setSelectedTypeId(newValue?.Id || null);
                }}
                value={typeResponse?.find((item:any) => item.Id === field.value) || null}
                options={typeResponse || []}
                getOptionLabel={(option) => option.Name || ''}
                isOptionEqualToValue={(option, value) => option.Id === value?.Id}
                filterOptions={filterOptions}
                className="md:w-72 sm:w-64 xs:w-44 w-[280px]"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="انتخاب کنید"
                    variant="outlined"
                    error={!!errors.Type}
                    helperText={errors.Type?.message}
                  />
                )}
              />
            )}
          />
          </div>
          <div className="flex flex-col gap-3">
            <span>کد کالا:</span>
              <TextField
                placeholder="کد کالا"
                variant="outlined"
                className="md:w-72 sm:w-64 xs:w-44 w-[280px]"
                disabled
                value={Code}
              />
          </div>
          <div className="flex flex-col gap-3 w-full md:pl-[5px] xs:pl-[10px]">
            <span>نام کالا:</span>
            <Controller
            name="NameKala"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="نام کالا"
                variant="outlined"
                error={!!errors.NameKala}
                helperText={errors.NameKala?.message}
                className="w-full"
              />
            )}
          />
          </div>
          <div className="flex flex-col gap-3 w-full md:pl-[5px] xs:pl-[10px]">
            <span>نام لاتین کالا:</span>
            <Controller
            name="NameLatin"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="نام لاتین کالا"
                variant="outlined"
                error={!!errors.NameLatin}
                helperText={errors.NameLatin?.message}
                className="w-full"
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
          <div className="flex flex-col gap-3 w-full">
            <span> فعال:</span>
            <Controller
            name="DeActive"
            control={control}
            render={({ field }) => (
            <Switch
            checked={field.value}
            onChange={(e) => {
            field.onChange(e.target.checked);
            setChecked(e.target.checked);
            }}
            />
             )}
            />  
          </div>
          <Divider className="w-full" />
          <Button
            autoFocus
            variant="contained"
            className="text-white bg-yellow-500"
            type="submit"
          >
            ذخیره
          </Button>
          <Button
            autoFocus
            onClick={handleClose}
            variant="outlined"
            color="error"
            className="text-red-500"
          >
            انصراف
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditAddForm;