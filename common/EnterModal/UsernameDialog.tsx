import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { InputAdornment, OutlinedInput } from '@mui/material';
import * as z from 'zod';
import  useLoginByUsername  from '@/app/api/loginUser/hook';
import Cookies from 'js-cookie';
import { useAtom } from "jotai";
import { IsUserloggedIn } from "@/shared/isLoggedIn";
import MessageSnackbar from "@/common/Snackbar/MessageSnackbar";
import { Visibility, VisibilityOff } from '@mui/icons-material';

// zod schema for validation
const schema = z.object({
  username:z.string()
      .regex(/^\d+$/, "نام کاربری باید بصورت عددی باشد.")
      .nonempty("این آیتم نمیتواند خالی باشد."),
  password:z.string()
      .nonempty("این آیتم نمیتواند خالی باشد."),
})
// end zod schema for validation

type userPassDialogProps={
    open :boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}


export default function UserPassDialog({open,setOpen}:userPassDialogProps) {

// const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
const [username, setUsername] = React.useState("");
const [password, setPassword] = React.useState("");
const [usernameError, setUsernameError] = React.useState("");
const [passwordError, setPasswordError] = React.useState("");
const [IsloggedIn, setIsloggedIn] = useAtom(IsUserloggedIn);
const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

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
  if (Cookies.get("user")) {
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
         Cookies.remove('user')
         Cookies.set("user", JSON.stringify(res?.data?.Data), { expires: 12 / 24 });
         setIsloggedIn(true)
         localStorage.removeItem("userToken")
         localStorage.setItem("userToken", res?.data?.token);
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
         err.issues.forEach((error:any) => {
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
  setSnackbarMessage(message);
  setSnackbarOpen(true);
}
// end snackbar

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
          <div className='w-full h-auto flex flex-col mt-5'>
          <p className="text-red-500 text-sm">
          (ورود صرفا برای اعضای شرکت تعاونی مصرف کارکنان بانک ملی امکان پذیر
          میباشد و نام کاربری شماره اشتراک شما می باشد.)
        </p>
        <form
        className='w-full h-auto flex flex-col gap-3 mt-5'
        onSubmit={(e) => {
         e.preventDefault(); // prevent full page reload
         handleLogin();
        }}
        >
          <OutlinedInput
          placeholder="نام کاربری"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          className="h-10 w-full"
          inputProps={{ style: { textAlign: 'center' } }}
          autoFocus
          sx={{
            '& input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 1000px white inset',
              WebkitTextFillColor: '#000',
            },
          }}
        />
        {usernameError && (
        <p className="text-red-500">{usernameError}</p>
        )}
          <OutlinedInput
          placeholder="رمز عبور"
          type={showPassword ? "text" : "password"}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          className="h-10 w-full"
          inputProps={{ style: { textAlign: 'center' } }}
          sx={{
            '& input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 1000px white inset',
              WebkitTextFillColor: '#000',
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {passwordError && (
        <p className="text-red-500">{passwordError}</p>
        )}
        <Button
              onClick={handleLogin}
              className="w-full bg-green-500 text-white rounded-md py-3 mt-3 text-lg"
              variant="contained"
              type="submit"
            //   disabled={showOTP}
            >
              ورود
            </Button>
            </form>
          </div>
        </DialogContent>
      
            <MessageSnackbar snackbarOpen={snackbarOpen} autoHideDuration={1500} snackbarMessage={snackbarMessage} setSnackbarOpen={setSnackbarOpen}/>
      </Dialog>
    </React.Fragment>
  );
}