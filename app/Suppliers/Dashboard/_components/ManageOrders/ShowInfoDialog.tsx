'use client'

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide, { SlideProps } from '@mui/material/Slide';
import Cookies from 'js-cookie';
import useGetReceipts from '@/app/api/getFactorInfo/hook';
import ReceiptLoading from '@/app/profile/_components/Orders/ReceiptLoading';
import { Card, Divider } from "@mui/material";
import { Container, Typography, Grid } from '@mui/material';
import ProductCard from '@/app/profile/_components/Orders/ProductCard';
import HorizontalLinearStepper from './Stepper';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Transition = React.forwardRef<unknown, SlideProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type FullScreenDialogProps = {
  open:boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>;
  selectedRow:any;
  handleSearch:()=>void;
}

export default function FullScreenDialog({open,setOpen,selectedRow,handleSearch}:FullScreenDialogProps) {
  
  const siteAddress = useSelector((state:RootState)=>state.siteUrlAddress.value)
  
  const user = React.useMemo(() => {
      const cookie = Cookies.get("supplierUser");
      return cookie ? JSON.parse(cookie) : null;
    }, []);  // user
  const userToken = localStorage.getItem("supplierUserToken"); // token
  // get data
    const params = {
      idFactor: selectedRow?.Id,
    };
    const { loading, error, receipts, getReceipts } = useGetReceipts(userToken)
    // end get data
    React.useEffect(()=>{
      if (selectedRow?.Id) {
        getReceipts(params)
      }
    },[selectedRow?.Id])

  const handleClose = () => {
    setOpen(false);
  };

const receipt = receipts ? receipts?.data?.Data : [];

// handle comma
const autocomma = (number_input:number) =>
  new Intl.NumberFormat("en-US").format(number_input);
//handle comma

const stepsStat = ['تایید نشده', 'تایید شده'];
const stepsDelivery = ['ارسال نشده', 'ارسال کردن'];
const idSupplier = selectedRow && selectedRow?.idTaminKonande
const factorId = receipt && receipt?.Id
const statUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/TaeedeTaminKonande`
const deliveryUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ErsaleTaminKonande`
const initStepperStat = selectedRow && selectedRow?.TaeedeTaminKonande
const initStepperDelivery = selectedRow && selectedRow?.ErsalByTaminKonande

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative',backgroundColor:'#FFD700' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {user ? (
        <div className="w-full">
          <div className="bg-white p-1 w-full h-auto pb-24 pt-10">
            {(loading || receipt === null) ? <div>
              <ReceiptLoading/>
            </div> : 
            <div className="w-full grid gap-5 lg:grid-cols-1 grid-cols-1 place-items-center text-sm xl:text-base">
            {receipt ? (
              <>
                <div className='w-[366px]'>
                  <HorizontalLinearStepper steps={stepsStat} idSupplier={idSupplier} factorId={factorId} url={statUrl} init={initStepperStat} handleSearch={handleSearch}/>
                </div>
                <div className='w-[366px]'>
                  <HorizontalLinearStepper steps={stepsDelivery} idSupplier={idSupplier} factorId={factorId} url={deliveryUrl} init={initStepperDelivery} handleSearch={handleSearch}/>
                </div>
                <Card
                  key={receipt.Id}
                  variant="outlined"
                  className="w-auto py-5 px-2 grid grid-cols-2 gap-y-2"
                >
                  <div>
                    <p className="text-nowrap">تاریخ : {receipt.FactorDate}</p>
                    <Divider/>
                  </div>
                  <div>
                  <p className="text-green-500  overflow-hidden whitespace-nowrap">جمع فاکتور : {autocomma(receipt.GhabelePardakht)} ریال</p>
                  <Divider/>
                  </div>
                  <div>
                  <p className="text-nowrap">مالیات : {autocomma(receipt.Maliat)} ریال</p>
                  <Divider/>
                  </div>
                  <div>
                  <p className="text-nowrap">هزینه ارسال : {autocomma(receipt.HazineErsal)} ریال</p>
                  <Divider/>
                  </div>
                  <div className="col-span-2">

                  <Container className="px-0">
                    <Typography variant="h4" component="h1" className="mb-8 text-lg">
                      اقلام سبد خرید:
                    </Typography>
                    
                    <Grid container spacing={3}>
                       {receipt && receipt.KalaList && receipt.KalaList.map((kala:any) => ( 
                        <Grid key={kala.Id}>
                          <ProductCard
                            product= {kala}
                            item={receipt}
                            siteAddress={siteAddress}
                          />
                        </Grid>
                    ))}
                    </Grid>
                  </Container>
                  </div>
                </Card>
                </>
            ) : (
              <div className="text-red-500">
                <span>فاکتوری وجود ندارد</span> 
              </div>
            )}
              </div>}
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10 text-red-500">
          <span>برای مشاهده ی فاکتورها ابتدا وارد شوید</span>
        </div>
      )}
      </Dialog>
    </React.Fragment>
  );
}