import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import Cookies from "js-cookie";
import { GoPlus } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAtom } from "jotai";
import { address } from '@/shared/Address';
import { addresses } from "@/types/types";

type userAddressModalProps={
    isOpen: boolean;
    onClose: ()=>void;
    addresses: addresses;
    onSelectAddress: (address:any)=>void;
    onSelecteMap: ()=>void;
    onSelectDelete: (address:any)=>void;
}

function UserAddressModal({
  isOpen,
  onClose,
  addresses,
  onSelectAddress,
  onSelecteMap,
  onSelectDelete,
}:userAddressModalProps) {
  const [userToken, setUserToken] = useState<string | null>(""); // در یافت توکن از نرم افزار
  const [eshterakNo, setEshterakNo] = useState({}); // در یافت توکن از نرم افزار
  const [showdefaultaddress, setshowdefaultaddress] = useAtom(address)
  useEffect(() => {
    const obj = Cookies.get("user");
    if (obj) {
      const userData = JSON.parse(obj);
      setUserToken(localStorage.getItem("userToken"));
      setEshterakNo(userData.EshterakNo);
      const token = localStorage.getItem("userToken");
      setUserToken(token);
    }
  }, [userToken, eshterakNo]);

  useEffect(()=>{
    const defaultAddress = addresses.find((item:any) => item.SetDefault === true);
    setshowdefaultaddress(defaultAddress)
  },[addresses])
  

  return (
    <Modal open={isOpen} onClose={onClose} className="z-[10000]">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          انتخاب آدرس
        </Typography>
        <Divider/>
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          onClick={() => onSelecteMap()}
          sx={{ mt: 1 }}
          className="mt-5 "
        >
         <GoPlus className="ml-1 text-black" />افزودن آدرس جدید 
        </Button>

        <Stack spacing={2} className="pt-3">
          {addresses && addresses.map((address:any) => (
            <React.Fragment key={address.Id}>
            {address.Address && 
            <Card key={address.Id} variant="outlined" sx={{ border: address.SetDefault ? "2px solid lightgreen" : "1px solid lightgray",borderRadius: "8px"}}>
              <CardContent >
                <Typography
                  sx={{ fontWeight: address.SetDefault ? 600 : 500 }}
                  variant="subtitle1"
                  className="pb-2"
                >
                  {" "}
                  {address.WhereaboutesPreAddress}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="bold"
                  className="pb-2"
                >
                  {address.Address}
                </Typography>
                <div className="flex gap-3 justify-end">
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => onSelectDelete(address)}
                  sx={{ mt: 1 }}
                  className="text-red-500 "
                >
                   <RiDeleteBinLine className="ml-1 text-xl"/> حذف
                </Button>
                {!address.SetDefault &&
                 <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  onClick={() => onSelectAddress(address)}
                  sx={{ mt: 1 }}
                  className={`text-blue-600 ${address.SetDefault && "hidden"} w-32`}
                >
                   آدرس پیشفرض
                </Button>}
                {address.SetDefault &&
                 <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  onClick={onClose}
                  sx={{ mt: 1 }}
                  className="text-white w-32"
                >
                   همین درسته
                </Button>}
                
                </div>
              </CardContent>
            </Card>}
            </React.Fragment>
          ))}
        </Stack>

        <Stack direction="row" spacing={10} justifyContent="center" className="pt-5">
          <Button
            onClick={onClose}
            sx={{ mt: 2, marginRight: 10 }}
            color="primary"
            variant="outlined"
          >
            بستن
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default UserAddressModal;
