'use client'

import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import PaymentTypeCard from "./_components/PaymentTypeCard";
import {
  Box,
  useMediaQuery,
  Typography,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import { siteUrlAddress } from "@/shared/site.url.atom";
import { payfullOrPart } from "@/shared/payment";
import { useAtom } from "jotai";
import useGetAddFactor from "@/app/api/addFactor/hook";
import useGetResults from "@/app/api/activeGetWayOnlinePayment/hook";
import { useRouter } from "next/navigation";
import {useGetSiteAddress} from "@/app/api/siteAddress/hook";
import useGetBonCards from "@/app/api/getBonCards/hook";
import Bon from "./_components/Bon";
import useApplyBonCard from "@/app/api/applyBonCard/hook";
import useApplyDiscountCode from "@/app/api/applyDiscountCode/hook";
import SimpleBackdrop from "@/common/BackdropSpinnerLoading/Loading";

type selectedItemType = {
  Code:string;
  Id:number;
  Name:string;
  imgaddress:string;
}

const PaymentMethods = () => {

  const [userObj,setUserObj] = useState<any>(null)
  const [userTok,setUserTok] = useState<any>(null)
  const [userFactor,setUserFactor] = useState('')
  const [userFactorForBon,setUserFactorForBon] = useState<any>(null)
  const [userFactorFlag,setUserFactorFlag] = useState(false)
  const [paymentLink, setPaymentLink] = useState(""); // ذخیره لینک پرداخت
  const [userToken, setUserToken] = useState(""); // در یافت توکن از نرم افزار
  const [paymentType, setPaymentType] = useState<selectedItemType[]>([]); // در یافت توکن از نرم افزار
  const [eshterakNo, setEshterakNo] = useState(0); // در یافت توکن از نرم افزار
  const [callBackLink, setCallBackLink] = useState("");
  const [selectedItem, setSelectedItem] = useState<selectedItemType | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [factorSaved, setFatorSaved] = useState(false);
  const [WebFactorId, setIdFactor] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)"); // بررسی حالت موبایل
  const [siteAddress,setSiteAddress] = useAtom(siteUrlAddress);
  const [isPart,setIsPart] = useAtom(payfullOrPart);
  const [timer, setTimer] = useState(null); // ذخیره تایمر
  const [sadaWindowopen, setSadadWindowOpen] = useState(false);
  const [noPayWindowopen, setNopayWindowOpen] = useState(false);
  const [isGeneratedFactor,setIsGeneratedFactor] = useState<boolean | null>(null)
  const [noeTarakonesh,setNoeTarakonesh] = useState<number | null>(null)
  const [isButtonClicked,setIsButtonClicked] = useState(false)
  
  const VerifySadadToken = process.env.API_URL_VERIFYSADADTOKEN as string;
  const VerifyNoPay = process.env.API_URL_VERIFYNOPAY as string;
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [amount,setAmount] = useState<null | number>(null)
  const { results, loadingResults, errorResults,getReturnReason } = useGetResults();
  const { result, loading, error,getAddFactor } = useGetAddFactor();
  const [state, setState] = useState<any>(null);
  const router = useRouter();
  // inside Bon component
  const [showBonSection, setShowBonSection] = useState(true)
  const [selectedId, setSelectedId] = useState<null | number>(null)
  // discount value
  const [value, setValue] = useState("");
  const [isDiscountClicked,setDiscountClicked] = useState(false)

  // GET SITE ADDRESS

  const { loading:loadingsiteaddress, error:errorsiteaddress,getSiteAddress } = useGetSiteAddress(setSiteAddress)
  
    const fetchSiteAddress = async () => {
      const data = await getSiteAddress()
      setSiteAddressResponce(data?.data)
    };
    const setSiteAddressResponce = async (data:any) => {
      if (data && data.Data) {
        setSiteAddress(data.Data);
        console.log(data.Data);
        
      }
    };
    useEffect(() => {
      if (siteAddress) return;
      (async () => {
        await fetchSiteAddress();
      })();
    }, [siteAddress]);
  // END GET SITE ADDRESS

useEffect(() => {
  // Only runs in the browser
  const rawState = sessionStorage.getItem('paymentMethodsState');
  const savedState = rawState ? JSON.parse(rawState) : null;
  setState(savedState);
}, []);

//get userfactor from local storage
useEffect(()=>{
  if (!userFactor && !userFactorFlag) {
    const storedFactor = localStorage.getItem("userFactor");
    if (storedFactor) {
      setUserFactor(storedFactor);
      setUserFactorFlag(true)
    }
  }
},[])

  useEffect(()=>{
    if (localStorage.getItem('goToPay') == String(WebFactorId)) {
      setIsButtonClicked(true)
    }   
  },[WebFactorId,isButtonClicked])

useEffect(()=>{
  if (state) {
    if(state?.param){
      setIsGeneratedFactor(false)
      setNoeTarakonesh(state?.param?.NoeTarakonesh)
    }else{
      setIsGeneratedFactor(true)
      setNoeTarakonesh(0)
    }
  }
},[state])

  useEffect(()=>{
    if (state) {
      if (state?.amount) {
        setAmount(state?.amount)
        setIsPart(false)
      }else if (state?.factor){
        setAmount(state?.factor?.GhabelePardakht)
        setIsPart(true)
      }else if(state?.param){
        setAmount(state?.param?.Amount)
        setIsPart(true)
      }
    }
  },[state])

  useEffect(()=>{
    if (state?.factor?.Id) {
      afterSaveFactor(state?.factor)
      setIsPart(true)
    }else if(state?.param?.ID){
      afterSaveFactor(state)
      setIsPart(true)
    }else{
      if (userFactorFlag){
      const token = localStorage.getItem("userToken") || '';
      async function saveFactor(tokenInput:string) {
        const factorInfo = JSON.parse(userFactor);
        const res = await getAddFactor(factorInfo,tokenInput);
         afterSaveFactor(res?.data)
         setUserFactorForBon(res?.data?.Data)
      }
      saveFactor(token)
      setIsPart(false)
    }
    }
  },[state,userFactor])

  // remove userfactor from local storage after sending it to the api
  useEffect(()=>{
    if (result && result?.data?.resCode === 1){
      localStorage.removeItem("userFactor")
      setUserFactorFlag(false)
    }
  },[result])
  
  
//START BON CARD
useEffect(()=>{
  const token = localStorage.getItem("userToken");
  if (token) {
    setUserTok(token)
  }
},[])
  const { bons, loadingBons, errorBons } = useGetBonCards(userTok,isPart)

  //apply it
const { applyBonCardLoading, applyBonCardError, applyBonCardResponse, getApplyBonCard } = useApplyBonCard(userTok)

  useEffect(()=>{
    
if(!userFactorForBon) return

      const param = {
        factor: { idFactor: userFactorForBon.Id },
        bon: { Id: selectedId },
      };
  
      if (selectedId) {
        getApplyBonCard(param);
      }
    
  },[selectedId])

// END BON CARD

// start discount code
const { applyDiscountCodeLoading, applyDiscountCodeError, applyDiscountCodeResponse, getApplyDiscountCode } = useApplyDiscountCode(userTok) 

    // 50 characters limit

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value;
  if (input.length <= 50) {   //  Enforce max 50 characters
    setValue(input);
  }
};

const handleApplyDiscount = async(e: React.FormEvent)=>{
  e.preventDefault();
  const param = {
    factor : { idFactor : userFactorForBon.Id},
	  code : value
  }
  if (userFactorForBon && value !== '') {
    getApplyDiscountCode(param)
    setDiscountClicked(true)
  }
}

useEffect(()=>{
  if (applyDiscountCodeResponse && applyDiscountCodeResponse.resCode !== 1) {
    setDiscountClicked(false)
  }
},[applyDiscountCodeResponse])

// end discount code

  const afterSaveFactor = async (data:any) => {
    
    if (data.resCode == 1 && data.Data) {
      setFatorSaved(true);
      saveFactoreId(data.Data.Id);
    }else if(data.param){
      saveFactoreId(data.param.ID);
    }else{
      setFatorSaved(true);
      saveFactoreId(data.Id);
    }
  };

  const saveFactoreId = (factoreIdReturn:any) => {
    setIdFactor(factoreIdReturn);
  };

  useEffect(() => {
    if (siteAddress) {
  const fetchdata = async () => {
    const obj = Cookies.get("user");
    const token = localStorage.getItem("userToken");
    if (obj && token) {
      setUserToken(localStorage.getItem("userToken") || '');
      const userData = JSON.parse(obj);
      setEshterakNo(userData.EshterakNo);
      setIsLogin(true);
      // if (WebFactorId === 0) {
      //   saveFactor(token);
      // }
      const res = await getReturnReason(token)
      setPaymentTypeResponce(res?.data)
    }
  }
  fetchdata()
}
  }, [callBackLink, selectedItem,siteAddress]);

  const setPaymentTypeResponce = async (data:any) => {
    if (data?.Data) {
      let baseAddress = `${siteAddress}/assets/images/bankPayment`;
      const dataWithImage = data.Data.map((el:any) => {
        return {
          ...el,
          imgaddress: `${baseAddress}/${el.Id}.png`,
        };
      });
      setPaymentType(dataWithImage);
    }
  };

  const handlePayment = async () => {
    if (!selectedItem) {
      alert("لطفاً یک روش پرداخت انتخاب کنید.");
      return;
    }
    const obj = Cookies.get("user");
    if (obj) {
      setUserObj(JSON.parse(obj))
    }

    let paymentLinkAddressUrl = "";
    let callbackLindAddress = "";
    const ids = selectedItem.Id;
    switch (ids) {
      case 1:
        paymentLinkAddressUrl = "/api/payByZarinPal";
        callbackLindAddress = `${siteAddress}/VerifyZarinPal`;
        setCallBackLink(callbackLindAddress);
        break;
      case 2:
        paymentLinkAddressUrl = "/api/GetSamanKishToken";
        callbackLindAddress = `${siteAddress}/pub/VerifySamanKishToken`;
        setCallBackLink(callbackLindAddress);
        break;
      case 3:
        paymentLinkAddressUrl = "/api/GetBehPardakhtRefId";
        callbackLindAddress = `${siteAddress}/pub/VerifyBehPardakht`;
        setCallBackLink(callbackLindAddress);
        break;
      case 4:
        paymentLinkAddressUrl = "/api/GetSadadToken";
        callbackLindAddress = VerifySadadToken;
        setCallBackLink(callbackLindAddress);
        break;
      case 5:
        paymentLinkAddressUrl = "/api/getTokenNoPay";
        callbackLindAddress = VerifyNoPay;
        setCallBackLink(callbackLindAddress);
        break;
      default:
        paymentLinkAddressUrl = "";
        callbackLindAddress = "";
        setCallBackLink(callbackLindAddress);
        break;
    }
    const paymentData = {
      eshterakNo,
      amount,
      callBackLink,
      WebFactorId,
    };
    const paymentDataNoPay = {
      CellNumber:userObj.Mobile,
      Amount:amount,
      WebFactorId:WebFactorId,
    }

    const p = selectedItem?.Id == 5 ? paymentDataNoPay : { ...paymentData, Description: "افزایش موجودی" ,NoeTarakonesh :noeTarakonesh};
    
    try {
      const response = await fetch(`${apiUrl}${paymentLinkAddressUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(p),
      });
      const data = await response.json();
      console.log(data);
      
      if (data.resCode == 1 && data.Data) {
        window.open(data.Data, "_blank");
        const ids = selectedItem.Id;
        if (ids == 4) {
          setSadadWindowOpen(true);
        }
        if (ids == 5) {
          setNopayWindowOpen(true);
        }
        localStorage.removeItem("goToPay")
        localStorage.setItem("goToPay",String(WebFactorId))
        setIsButtonClicked(true)
      }
    } catch (error) {
      console.error("Error:", error);
      alert("مشکلی در برقراری ارتباط با سرور به وجود آمده است.");
    }
  };

  const handleItemSelect = (item:any) => {
    setSelectedItem(item);
  };

const handleNavigationBack =()=>{
  router.back();
}

  return (
    <>
    {(userFactor == '' && !isPart) ? 
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-16 bg-blue-500 text-white flex flex-col items-center justify-center gap-8 rounded-md">
        <p className="text-center text-xl">فاکتور وجود ندارد!</p>
        <button onClick={handleNavigationBack} className="text-white border border-white p-3 rounded-md cursor-pointer">بازگشت به صفحه ی قبل</button>
      </div>
    </div> : ((userFactor && result && result?.data?.resCode === 1) || isPart) ?  
    <>
    {state ? 
    <>
    {(!isPart && showBonSection && !loadingBons && bons && bons.list ) ? 
      <Bon bonList={bons.list} showBonSection={showBonSection} setShowBonSection={setShowBonSection} selectedId={selectedId} setSelectedId={setSelectedId}/>
     : !loadingBons &&  
    <div className="bg-white h-[100vh]">
      <Box
        className="flex justify-center items-center bg-[#1976d2] text-white text-center font-bold"
        sx={{
          padding: 2,
          boxShadow: 3,
          marginBottom: 2,
          fontSize: isMobile ? "18px" : "24px", // اندازه متن برای موبایل و دسکتاپ
        }}
      >
        قابل پرداخت: {amount &&  amount.toLocaleString()} ریال
      </Box>
        {!isPart && 
          <div className="flex flex-col gap-3 items-center w-full ">
            <div>آیا کد تخفیف دارید؟</div>
            <form onSubmit={handleApplyDiscount} className="flex gap-3">
              <input name="Discount" type="text" onChange={handleChange} placeholder="کد تخفیف" value={value} className="border border-gray-300 rounded-lg focus:outline-none placeholder:text-center placeholder:text-sm focus:border-blue-400 ps-2 text-left"/>
              <Button type="submit" variant="contained" size="small" disabled={isDiscountClicked}>اعمال کد تخفیف</Button>
            </form>
          </div>
        }
      {isLogin && (
        <Box className="mt-10">
          <Box
            className="flex justify-center items-center p-[2px] text-black mb-2 text-center font-bold"
            sx={{
              fontSize: isMobile ? "18px" : "24px", // اندازه متن برای موبایل و دسکتاپ
            }}
          >
            <Typography variant="h6" gutterBottom>
              انتخاب روش پرداخت:
            </Typography>
          </Box>

          <Grid container spacing={1} justifyContent={"center"} alignItems={"center"} gap={3}>
            {paymentType && paymentType.map((item) => (
              <div key={item.Id} className="flex justify-center">
                <PaymentTypeCard 
                  item={item} 
                  onSelectItem={()=>
                  handleItemSelect(item)
                  }
                  selectedItem={selectedItem}
                />
              </div>
            ))}
          </Grid>
          <Divider className="mt-10" />
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="flex-col gap-5 mt-10"
          >
            <Typography variant="body1" color="text.primary">
              روش پرداخت: {selectedItem && selectedItem.Name}
            </Typography>
            <Button
              onClick={handlePayment}
              variant="contained"
              color="primary"
              size="medium"
              className=" text-white"
              disabled={isButtonClicked}
              loading={loadingResults}
            >
              {" "}
              پرداخت{" "}
            </Button>
          </div>
        </Box>
      )}

      {!isLogin && (
        <Box
          className="flex justify-center items-center bg-[#1976d2] text-white text-center font-bold"
          sx={{
            padding: 2,
            borderRadius: "8px",
            boxShadow: 3,
            marginBottom: 2,
            fontSize: isMobile ? "18px" : "24px", // اندازه متن برای موبایل و دسکتاپ
          }}
        >
          لطفا جهت پرداخت ابتدا وارد سایت شوید
        </Box>
      )}

      {paymentLink && (
        <p>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">
            لینک پرداخت
          </a>
        </p>
      )}
      {(applyBonCardLoading || applyDiscountCodeLoading) && <SimpleBackdrop open={true}/>}
    </div>}</> : <div className="w-full flex justify-center p-10"><span>اطلاعاتی برای نمایش وجود ندارد!</span></div> }
    </>
    : <div className="p-3">در حال انتقال به صفحه ی موردنظر هستید...</div>
    }
    </>
  );
};

export default PaymentMethods;