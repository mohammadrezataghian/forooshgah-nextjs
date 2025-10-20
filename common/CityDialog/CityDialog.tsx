'use client'

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "mapir-react-component/dist/index.css";
import { Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiCircleCheck, CiCircleAlert } from "react-icons/ci";
import Cookies from "js-cookie";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { addressService } from "@/services/addressService";
import { sahamUserType, whereaboutes } from "@/types/types";
import dynamic from 'next/dynamic';
const DynamicComponentWithNoSSR = dynamic(
  () => {
    return import('@/app/_components/Head/Appmaps');
  },
  { ssr: false }
);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "600px",
    height: "800px",
  },
}));

const addressSchema = z.object({
  preciseAddress: z.string().min(1, "پر کردن این فیلد الزامی است"),
  postalCode: z.string().length(10, "کد پستی باید 10 رقمی باشد"),
});

type CityDialogProps ={
    open:boolean;
    handleClose:()=>void;
    loadAddresses: () => Promise<void>;
}

const CityDialog = ({ open, handleClose, loadAddresses }:CityDialogProps) => {

  const [showFirstAddress, setShowFirstAddress] = React.useState<whereaboutes | undefined>()
  const [isMapClicked,setIsMapClicked] = useState(false)
  const [locationArray, setLocationArray] = React.useState<any[]>([]);

  React.useEffect(()=>{
    if (localStorage.getItem("whereaboutes")) {
      const location = localStorage.getItem("whereaboutes") || ''
      const parsedLocation = JSON.parse(location)
      setShowFirstAddress(parsedLocation)
    }
  },[])
  // const [location, setLocation] = React.useState(() => {
  //   return JSON.parse(localStorage.getItem("location") ?? '') || {};
  // });
  const [userObj, setUserObj] = React.useState<sahamUserType | null>(null)
  const [formData, setFormData] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false); // Snackbar state
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
  });

  const [userToken, setUserToken] = React.useState('');

  React.useEffect(() => {
    
      const token = localStorage.getItem("userToken") ?? '';
      setUserToken(token);
    
  }, []);

  // get user object
  let interval: NodeJS.Timeout | null = null; // Declare interval outside
  React.useEffect(() => {
    const checkUserCookie = () => {
      const userCookie = Cookies.get("user");

      if (userCookie) {
        setUserObj(JSON.parse(userCookie));
        if (interval) clearInterval(interval); // Stop interval after finding user
      }
    };

    checkUserCookie(); // Run initially

    interval = setInterval(checkUserCookie, 1000); // Assign interval

    return () => {
      if (interval) clearInterval(interval); // Cleanup on unmount
    };
  }, []);
  // end get user object

  let EshterakNo = userObj?.EshterakNo || "";
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem("locationArray");
      if (stored) {
        setLocationArray(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to parse locationArray:", err);
      setLocationArray([]);
    }
  }, []);

  const onSubmit = (data:any) => {
    setFormData(data);
    if (localStorage.getItem("whereaboutes") !== null) {
      let locationForSave =
        JSON.parse(localStorage.getItem("whereaboutes") ?? '') || {};
      // console.log('fullLocation before merge:', fullLocation);
      const fullLocationForSave = {
        ...locationForSave,
        whereaboutes: data,
        EshterakNo: EshterakNo,
      };

      addressService.addAddress(fullLocationForSave, userToken);
      loadAddresses();
      setTimeout(() => {
        handleClose();
      }, 500);
    }

    // Retrieve the full location object from localStorage

    let fullLocation = JSON.parse(localStorage.getItem("whereaboutes") ?? '') || {};
    // console.log('fullLocation before merge:', fullLocation);
    const updatedLocation = {
      ...fullLocation,
      whereaboutes: data,
      EshterakNo: EshterakNo,
    };
    
    if (localStorage.getItem("whereaboutes") === null) {
      setSnackbarOpen(true); // Show snackbar
    } else {
      localStorage.setItem("location", JSON.stringify(updatedLocation));
    }

    // setLocation(updatedLocation);
    setLocationArray((prev) => {
      const newArray = [...prev, updatedLocation];
      localStorage.setItem("locationArray", JSON.stringify(newArray)); // ✅ update storage here
      return newArray;
    });
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // input style
  const getInputStyle = (fieldName: "preciseAddress" | "postalCode") => {
    const baseStyle =
      "w-full px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none";
    const hasError = !!errors[fieldName];
    const isTouched = Object.keys(errors).length > 0;

    if (!isTouched) return `${baseStyle} border-2 border-blue-200`;
    if (hasError) return `${baseStyle} border-2 border-red-300`;
    return `${baseStyle} border-2 border-green-300`;
  };
  // end input style

 // update local storage to show mapaddress
const updateAddress = () => {
  setShowFirstAddress(JSON.parse(localStorage.getItem("whereaboutes") ?? '') || "");
};

// Listen for changes in localStorage
useEffect(() => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "whereaboutes") {
      updateAddress();
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);

// Update state when `whereaboutes` is updated in localStorage (even in the same tab)
useEffect(() => {
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, [key, value]);
    if (key === "whereaboutes") {
      updateAddress();
    }
  };

  return () => {
    localStorage.setItem = originalSetItem;
  };
}, []);

React.useEffect(() => {
  if (open) {
    setShowFirstAddress(undefined); // Reset state to empty string when dialog opens
  }
}, [open]);
// end update local storage to show mapaddress
  
  
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className="z-[100000]"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        انتخاب آدرس
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
          <CloseIcon className="customDialogClose" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <DynamicComponentWithNoSSR setIsMapClicked={setIsMapClicked}/>
        {/* {alert.open && ( // Show the alert if open
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, open: false })}
          >
            {alert.message}
          </Alert>
        )} */}
      </DialogContent>
      <div className="px-5 py-2 text-gray-700 flex flex-col gap-1">
        <div>آدرس :</div>
        <div className="!text-xs line-clamp-2">{showFirstAddress && showFirstAddress.address_compact}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-2 space-y-2">
        <div className="space-y-2">
          <label className="block !text-sm lg:!text-base font-medium text-gray-600">
            آدرس دقیق*
          </label>
          <div className="relative">
            <input
              {...register("preciseAddress")}
              type="text"
              className={`${getInputStyle("preciseAddress")} text-center placeholder:text-gray-300`}
              placeholder=" آدرس, پلاک, واحد,طبقه, زنگ"
            />
            {errors.preciseAddress ? (
              <CiCircleAlert className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
            ) : (
              Object.keys(errors).length > 0 &&
              !errors.preciseAddress && (
                <CiCircleCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
              )
            )}
          </div>
          {errors.preciseAddress && (
            <p className="text-sm text-red-500">
              {errors.preciseAddress.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block !text-sm lg:!text-base font-medium text-gray-600">
            کد پستی
          </label>
          <div className="relative">
            <input
              {...register("postalCode")}
              type="text"
              className={`${getInputStyle("postalCode")} text-center placeholder:text-gray-300`}
              placeholder=" کد پستی "
            />
            {errors.postalCode ? (
              <CiCircleAlert className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
            ) : (
              Object.keys(errors).length > 0 &&
              !errors.postalCode && (
                <CiCircleCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
              )
            )}
          </div>
          {errors.postalCode && (
            <p className="text-sm text-red-500">{errors.postalCode.message}</p>
          )}
        </div>

        <Divider />
        <DialogActions className="flex justify-start mt-4">
          <Button
            // onClick={()=>onSend()}
            type="submit"
            disabled={!isValid || !isMapClicked}
            fullWidth
            sx={{
              bgcolor: (isValid && isMapClicked) ? "primary.main" : "grey.200",
              color: (isValid || isMapClicked) ? "white" : "grey.600",
              "&:hover": {
                bgcolor: (isValid || isMapClicked) ? "primary.dark" : "grey.300",
              },
            }}
            
          >
            همین جا درسته
          </Button>
        </DialogActions>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          severity="error"
          sx={{ width: "100%" }}
          className="flex items-center gap-1"
        >
          نقشه را مشخص کنید
        </MuiAlert>
      </Snackbar>
    </BootstrapDialog>
  );
};

export default CityDialog;