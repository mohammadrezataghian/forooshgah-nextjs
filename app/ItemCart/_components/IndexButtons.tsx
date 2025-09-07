'use client'

import React from 'react'
import { Button } from "@mui/material";


const IndexButtons = ({products,factoeAfrerCalc,isLoggedIn,setOpenModal,showdefaultaddress,handlecityDialogOpen,handleNavigation,handleClickOpen}) => {



  return (
    <>
    <div className="flex flex-col gap-1 mb-28">
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
                className=" bg-blue-400 py-2 w-1/2 sm:w-1/4 mx-auto text-white text-center rounded-sm"
              >
                انتخاب آدرس و ادامه خرید
              </button>
            )}
            {isLoggedIn && showdefaultaddress && (
              <Button
                variant="contained"
                className="py-2 w-1/2 sm:w-1/4 mx-auto bg-green-500 text-white "
                onClick={() => {
                  handleNavigation();
                }}
              >
                ادامه خرید
              </Button>
            )}
          </>
        )}
        {products && products?.length > 0 && factoeAfrerCalc && (
          <Button
            variant="contained"
            className="py-2 w-1/2 sm:w-1/4 mx-auto bg-red-500 text-white mt-5"
            onClick={handleClickOpen}
          >
            حذف سبد خرید
          </Button>
        )}
      </div>
    </>
  )
}

export default IndexButtons