'use client'

import useGetResidBeforePayment from "@/api/GetResidBeforePayment/getResidBeforePayment";
import { Button, Input, InputAdornment } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AutoHideDialog from "@/common/AutoHideDialog/AutoHideDialog";

export default function EnhancedTableToolbar({eshterakNo,userToken,getStocks}) {

    const [balance, setBalance] = useState(0);
    const [formattedValue, setFormattedValue] = useState("0");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
      
      useEffect(() => {
            // Format the balance whenever it changes
            setFormattedValue(autocomma(balance));
        }, [balance]);
      
        // handle comma
        const autocomma = (number) => {
            if (typeof number === 'number') {
                return new Intl.NumberFormat("en-US").format(number);
            } else {
                return "0"; // Or handle the non-number case as appropriate
            }
        };
      
        const handleInputChange = (e) => {
            const rawValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
            const parsedValue = rawValue ? parseInt(rawValue, 10) : 0; // Parse to integer, default to 0
            setBalance(parsedValue);
        };
      
  // resid
  
  // const params = {
  //   EshterakNo: eshterakNo,
  // }
const param = {
    "Amount": balance,
    "EshterakNo": eshterakNo,
    "NoeTarakonesh": 1
   }
   
   const { residLoading, residError, residResponse, getResidBeforePayment } = useGetResidBeforePayment(userToken)
    const handleGetResid = ()=>{
        if (balance < 20000) {
          setOpen(true)
          return
        }
      getResidBeforePayment(param)
    //   getStocks(params)
    }
    useEffect(()=>{
      if (residResponse && residResponse?.data?.Data?.ID) {
        navigate('/PaymentMethods', {state: { param: residResponse?.data?.Data }})
       }
     },[residResponse])
    
   // end resid

// dialog messages
const dialogTitle = 'مبلغ انتخابی کافی نیست'
const dialogContent = `مبلغ انتخاب شده کمتر از ${autocomma(20000)} ریال است.`
// end dialog messages

      return (
        <Toolbar
          sx={[
            {
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            },
            {
              bgcolor: "",
            },
          ]}
        >
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
            className="text-gray-700"
          >
            اطلاعات سهام
          </Typography>
          <div className="w-auto h-auto flex gap-3">
            <Input
                      className="text-lg lg:w-48 md:w-32 sm:w-32 xs:w-32 w-28"
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
                    />
            <Button className="lg:px-2 md:px-1 p-0 lg:w-32 md:w-20 sm:w-24 xs:w-24 text-xs lg:text-base text-white " variant="contained" color="secondary" onClick={handleGetResid}>افزایش سهام</Button>
          </div>
          <AutoHideDialog open={open} onClose={() => setOpen(false)} duration={3000} dialogTitle={dialogTitle} dialogContent={dialogContent}/>
        </Toolbar>
      );
    }