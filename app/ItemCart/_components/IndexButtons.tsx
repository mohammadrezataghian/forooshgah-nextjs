'use client'

import React from 'react'
import { Button } from "@mui/material";
import { Address, FactorAfterCalc, ProductType } from '@/types/types';

type IndexButtonsProps = {
  products:ProductType;
  factoeAfrerCalc:FactorAfterCalc;
  isLoggedIn:boolean;
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>;
  showdefaultaddress:Address | undefined;
  handlecityDialogOpen:()=>void;
  handleNavigation:()=>void;
  handleClickOpen:()=>void;
}

const IndexButtons = ({products,factoeAfrerCalc,isLoggedIn,setOpenModal,showdefaultaddress,handlecityDialogOpen,handleNavigation,handleClickOpen}:IndexButtonsProps) => {
  return (
    <>
    <div className="flex flex-col mb-28 items-center gap-5">
        {products && products?.length > 0 && factoeAfrerCalc && (
          <>
            {!isLoggedIn && (
              <Button
                variant="contained"
                className="py-2 w-1/2 sm:w-1/4 mx-auto bg-green-500 text-white "
                onClick={() => setOpenModal(true)}
              >
                ورود برای ثبت خرید
              </Button>
            )}
            {isLoggedIn && !showdefaultaddress && (
              <button
                onClick={handlecityDialogOpen}
                className=" bg-blue-400 py-2 w-1/2 sm:w-1/4 mx-auto text-white text-center rounded-sm cursor-pointer"
              >
                انتخاب آدرس و ادامه خرید
              </button>
            )}
            {isLoggedIn && showdefaultaddress && (
              <>
              <Button
                variant="contained"
                className="py-2 w-1/2 sm:w-1/4 mx-auto !bg-green-500 text-white "
                onClick={() => {
                  handleNavigation();
                  sessionStorage.setItem('noeErsal',String(0))
                }}
              >
                ادامه خرید
              </Button>
              <Button
                variant="contained"
                className="py-2 w-1/2 sm:w-1/4 mx-auto text-white "
                onClick={handlecityDialogOpen}
              >
                تغییر آدرس
              </Button>
              </>
            )}
          </>
        )}
        {products && products?.length > 0 && factoeAfrerCalc && (
          <Button
            variant="contained"
            className="py-2 w-1/2 sm:w-1/4 mx-auto text-white mt-5"
            onClick={handleClickOpen}
            color='error'
          >
            حذف سبد خرید
          </Button>
        )}
      </div>
    </>
  )
}

export default IndexButtons