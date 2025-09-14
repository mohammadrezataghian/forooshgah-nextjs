'use client'

import React, { useState } from 'react'
import { PageContainer } from "@toolpad/core/PageContainer";
import Cookies from 'js-cookie';
import { Button, OutlinedInput } from '@mui/material';
import { useChangePassword } from '@/api/staff/changePassword/changePasswordStaff';
import * as z from 'zod';
import SimpleBackdrop from '@/common/BackdropSpinnerLoading/Loading';
import MessageSnackbar from "@/common/Snackbar/MessageSnackbar";

// zod schema for validation
const schema = z.object({
  password:z.string()
  .regex(/^[a-zA-Z0-9]{6,12}$/, "رمز عبور قابل قبول نیست.")
})
// end zod schema for validation

const ChangePassword = () => {

const user = Cookies.get("staffUser") ? JSON.parse(Cookies.get("staffUser") || '') : null;
const userToken = localStorage.getItem("staffUserToken") || '';
const [password, setPassword] = React.useState("");
const [passwordError, setPasswordError] = useState("");
const [open, setOpen] = React.useState(false);

// change password
const params = {
    newPassword :password,
    Id:user?.Id
    }
const { error, getChangePassword,loading,response } = useChangePassword(userToken)

  async function handleGetChangePassword() {
    // Validate using Zod schema
    try {
      schema.parse({ password: password });
      setPasswordError(""); // clear previous error if valid
      setOpen(true)
      const res = await getChangePassword(params);
      
      if (res?.data?.resCode === 1 && res?.data?.Data) {
        showSnackbar(res?.data?.resMessage)
        setOpen(false)
        setPassword('')
      } else {
        showSnackbar(res?.data?.resMessage);
        setOpen(false)
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Set the validation error message from Zod
        setPasswordError(err.issues[0].message);
      } else {
        showSnackbar("خطایی رخ داده است.");
      }
    }
  }
  // end change password

// start snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  function showSnackbar(message:string) {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  }
  // end snackbar

  return (
    <>
        <PageContainer>
            <div className=' w-full h-96 bg-white p-5 flex flex-col gap-3'>
                <div className='flex w-full'>
                    <span className='font-bold'>رمز عبور میبایست حداقل 6 و حداکثر 12 کاراکتر باشد. </span>
                </div>
                <div className='w-full flex gap-5 items-center'>
                <OutlinedInput
          placeholder="رمز جدید"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          className="h-10 w-full"
          inputProps={{ style: { textAlign: 'center' } }}
          autoFocus
        />    
        <Button
              onClick={handleGetChangePassword}
              className=" bg-green-500 text-white rounded-md h-10 px-8 text-lg"
              variant="contained"
            //   disabled={showOTP}
            >
              ثبت
            </Button>
                </div>
                {passwordError && (
        <p className="text-red-500">{passwordError}</p>
        )}
            </div>
        </PageContainer>
       
      <MessageSnackbar snackbarOpen={snackbarOpen} autoHideDuration={5000} snackbarMessage={snackbarMessage} setSnackbarOpen={setSnackbarOpen}/>
      <SimpleBackdrop open={open}/>
    </>
  )
}

export default ChangePassword