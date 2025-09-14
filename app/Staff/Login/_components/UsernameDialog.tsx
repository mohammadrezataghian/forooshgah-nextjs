'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { OutlinedInput } from '@mui/material';
import * as z from 'zod';
import Cookies from 'js-cookie';
import { useAtom } from "jotai";
import { IsStaffUserloggedIn } from '@/shared/isStaffLoggedIn';
import  useLoginByUsername  from '@/app/api/loginEmployee/hook';
import MessageSnackbar from "@/common/Snackbar/MessageSnackbar";
import { useRouter } from 'next/navigation';

// zod schema for validation
const schema = z.object({
  username:z.string()
      .regex(/^\d+$/, "نام کاربری باید بصورت عددی باشد.")
      .nonempty("این آیتم نمیتواند خالی باشد."),
  password:z.string()
      .nonempty("این آیتم نمیتواند خالی باشد."),
})
// end zod schema for validation

type UserPassDialogProps = {
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserPassDialog({open,setOpen}:UserPassDialogProps) {

const user = Cookies.get("staffUser") ? JSON.parse(Cookies.get("staffUser") || '') : null;
const [username, setUsername] = React.useState("");
const [password, setPassword] = React.useState("");
const [usernameError, setUsernameError] = React.useState("");
const [passwordError, setPasswordError] = React.useState("");
const [IsloggedIn, setIsloggedIn] = useAtom(IsStaffUserloggedIn);
const router = useRouter()

  const handleClose = () => {
    setOpen(false);
  };
  const delayedClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

// api
const params = {
    "UserName":username,
    "Password":password
}

 const { errorUsername, getUsername,loadingUsername,responseUsername } = useLoginByUsername()

 async function handleLogin() {
  if (Cookies.get("staffUser")) {
        return showSnackbar("قبلا وارد شده اید");
      }
     // Validate using Zod schema
     try {
       schema.parse({ username: username,password:password });
       setPasswordError(""); 
       setUsernameError(""); 
       
       const res = await getUsername(params);
      //  console.log(res);
       
       if (res?.data?.resCode === 1 && res?.data?.Data) {
         showSnackbar('با موفقیت وارد شدید')
         Cookies.set("staffUser", JSON.stringify(res?.data?.Data), { expires: 12 / 24 });
         setIsloggedIn(true)
         localStorage.setItem("staffUserToken", res?.data?.token);
         setUsername('')
         setPassword('')
         delayedClose()
       } else {
         showSnackbar(res?.data?.resMessage);
       }
     } catch (err) {
       if (err instanceof z.ZodError) {
        setPasswordError(""); 
        setUsernameError("");
         // Set the validation error message from Zod
         err.issues.forEach(error => {
          if (error.path[0] === 'username') {
            setUsernameError(error.message);
          } else if (error.path[0] === 'password') {
            setPasswordError(error.message);
          }
        });
       } else {
         showSnackbar("خطایی رخ داده است.");
       }
     }
   }
   // end change password
// end api 

// start snackbar
const [snackbarOpen, setSnackbarOpen] = React.useState(false);
const [snackbarMessage, setSnackbarMessage] = React.useState("");

function showSnackbar(message:string) {
  // CHANGED
  setSnackbarMessage(message);
  setSnackbarOpen(true);
}
// end snackbar

React.useEffect(()=>{
      if (responseUsername && responseUsername?.data?.resCode && responseUsername?.data?.resCode === 1){
        setTimeout(() => {
          router.push("/Staff/Dashboard");
        },1500);
      }
},[responseUsername])

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        className='z-[10000]'
      >
        <DialogTitle>ورود به حساب کاربری
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            left: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon className="customDialogClose"/>
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='font-bold text-black'>
            برای ادامه ی خرید نام کاربری و رمز عبور خود را وارد کنید.
          </DialogContentText>
          <div className='w-full h-auto flex flex-col gap-3 mt-5'>
          <p className="text-red-500 text-sm">
          (ورود صرفا برای اعضای شرکت تعاونی مصرف کارکنان بانک ملی امکان پذیر
          میباشد و نام کاربری شماره کد ملی شما می باشد.)
        </p>
          <OutlinedInput
          placeholder="نام کاربری"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          className="h-10 w-full"
          inputProps={{ style: { textAlign: 'center' } }}
          autoFocus
        />
        {usernameError && (
        <p className="text-red-500">{usernameError}</p>
        )}
          <OutlinedInput
          placeholder="رمز عبور"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          className="h-10 w-full"
          inputProps={{ style: { textAlign: 'center' } }}
        />
        {passwordError && (
        <p className="text-red-500">{passwordError}</p>
        )}
        <Button
              onClick={handleLogin}
              className="w-full bg-green-500 text-white rounded-md py-3 mt-3 text-lg"
              variant="contained"
            //   disabled={showOTP}
            >
              ورود
            </Button>
          </div>
        </DialogContent>
      
            <MessageSnackbar snackbarOpen={snackbarOpen} autoHideDuration={1500} snackbarMessage={snackbarMessage} setSnackbarOpen={setSnackbarOpen}/>
      </Dialog>
    </React.Fragment>
  );
}