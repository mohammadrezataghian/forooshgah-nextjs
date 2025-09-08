"use client"

import React, { useEffect } from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { PiWalletFill } from "react-icons/pi";
import Tooltip from "@mui/material/Tooltip";
import Cookies from "js-cookie";
import useGetWalletMoney from "@/app/api/wallet/hook";
import useGetResidBeforePayment from "@/app/api/getResidBeforePayment/hook";
import AutoHideDialog from "@/common/AutoHideDialog/AutoHideDialog";
import { useRouter } from "next/navigation";

const Wallet = () => {
  
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
  const eshterakNo = user?.EshterakNo;
  const userToken = localStorage.getItem("userToken");
  const router = useRouter()
  const [open, setOpen] = useState(false);
  
  // init data
  const params = {
    "EshterakNo": eshterakNo
  }
  const { loading, error, response, getWallet } = useGetWalletMoney(userToken)

  useEffect(()=>{
    if (eshterakNo) {
      getWallet(params);
    }
  },[eshterakNo])
  
  const [initBalance, setInitBalance] = useState(0);
  const [formattedBalance, setFormattedBalance] = useState("0");
  const [balance, setBalance] = useState(0);
  const [formattedValue, setFormattedValue] = useState("0");
// end init data

useEffect(() => {
  if (response?.data?.Data) {
    setInitBalance(response.data.Data);
  }else{
    setInitBalance(0)
  }
}, [response]);

  useEffect(() => {
      // Format the balance whenever it changes
      setFormattedBalance(autocomma(initBalance));
  }, [initBalance]);

  // handle comma
  const autocomma = (number:any) => {
    if (typeof number === 'number') {
        return new Intl.NumberFormat("en-US").format(number);
    } else {
        return "0"; // Or handle the non-number case as appropriate
    }
};

  // Placeholder logic
  const handleAdd = () => {
      setBalance((prevBalance) => prevBalance + 100000);
  };

  const handleWithdraw = () => {
      setBalance((prevBalance) => Math.max(0, prevBalance - 100000));
  };
  const handleInputChange = (e:any) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const parsedValue = rawValue ? parseInt(rawValue, 10) : 0; // Parse to integer, default to 0
    setBalance(parsedValue);
    setFormattedValue(autocomma(parsedValue));
};

useEffect(() => {
  setFormattedValue(autocomma(balance));
}, [balance]);

// resid
const param = {
 "Amount": balance,
 "EshterakNo": eshterakNo,
 "NoeTarakonesh": 2
}

const { residLoading, residError, residResponse, getResidBeforePayment } = useGetResidBeforePayment(userToken)
 const handleGetResid = ()=>{
  if (balance < 20000) {
    setOpen(true)
    return
  };
   getResidBeforePayment(param)
 }
 useEffect(()=>{
  if (residResponse && residResponse?.data?.Data?.ID) {
    // router.push('/PaymentMethods', {state: { param: residResponse?.data?.Data }})
    router.push('/PaymentMethods')
    sessionStorage.setItem('state',JSON.stringify({state: { param: residResponse?.data?.Data }}))
   }
 },[residResponse])
 
// end resid

// dialog messages
const dialogTitle = 'مبلغ انتخابی کافی نیست'
const dialogContent = `مبلغ انتخاب شده کمتر از ${autocomma(20000)} ریال است.`
// end dialog messages

  return (
    <>
      <PageContainer>
        {user ? (
          <div className="flex justify-center items-center h-auto py-20">
            <Card className="w-full max-w-[360px] shadow-xl rounded-2xl ">
              <CardContent className="flex flex-col gap-6 items-center p-6 py-14">
                <Typography
                  variant="h6"
                  className="text-center text-gray-600 flex justify-center items-center gap-1"
                >
                  <PiWalletFill className="text-2xl" />
                  <span>کیف پول شما</span>
                </Typography>

                <Typography variant="h4" className="text-green-600 font-bold">
                  <span>{formattedBalance} ریال</span>
                </Typography>
                <Divider className="w-full"/>
                <div>
                  <span className="font-bold text-green-900 text-lg">شارژ کیف پول</span>
                </div>
                <div className="flex justify-between gap-3 w-full">
                  <Tooltip title="افزایش">
                    <Button
                      onClick={handleAdd}
                      variant="outlined"
                      color="primary"
                      fullWidth
                      className="rounded-full !w-20 h-20"
                    >
                      <AddIcon className="text-4xl text-blue-400" />
                    </Button>
                  </Tooltip>
                  <div className="flex items-center w-32"><Input
                      className="text-lg "
                      value={formattedValue}
                      onChange={handleInputChange}
                      endAdornment={
                        <InputAdornment position="end" sx={{
                          // Target the typography element within InputAdornment
                          '& .MuiTypography-root': {
                            fontSize: '1.5rem', 
                          },
                        }} className="pr-2">
                          ریال
                        </InputAdornment>
                      }
                    /></div>
                  <Tooltip title="کاهش">
                    <Button
                      onClick={handleWithdraw}
                      variant="outlined"
                      color="error"
                      fullWidth
                      className="rounded-full w-20 h-20"
                    >
                      <RemoveIcon className="text-4xl text-red-400" />
                    </Button>
                  </Tooltip>
                </div>
                <div className="w-full h-auto flex justify-center">
                  <Button
                    variant="contained"
                    className="w-full text-white py-2"
                    color="success"
                    onClick={handleGetResid}
                    disabled={balance === 0}
                  >
                    پرداخت
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex justify-center mt-10 text-red-500">
            <span>برای مشاهده ی کیف پول ابتدا وارد شوید</span>
          </div>
        )}
        <AutoHideDialog open={open} onClose={() => setOpen(false)} duration={3000} dialogTitle={dialogTitle} dialogContent={dialogContent}/>
      </PageContainer>
    </>
  );
};

export default Wallet;