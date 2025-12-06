'use client'

import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import Logo from "@/public/logo/logo1.png";
import { NAVIGATION, useDemoRouter, demoTheme, SidebarFooter } from './_components/DashboardItems';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';  
import Dashboard from './_components/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import dynamic from 'next/dynamic';
const ManageProduct = dynamic(() => import('./_components/ManageProduct/ManageProduct'), { ssr: false });
const ManageOrders = dynamic(() => import('./_components/ManageOrders/ManageOrders'), { ssr: false });
const AlertDialog = dynamic(() => import('@/common/ProfileExitDialog/ProfileExitDialog'), { ssr: false });
import useGetMainConfig from '@/app/api/getMainConfig/hook';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDispatch } from "react-redux";
import { clearIsSupplierLoggedIn } from "@/store/slices/isSupplierLoggedInSlice";

type ToolbarActionsSearchProps={
  setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

// exit account
function ToolbarActionsSearch({ setOpen }:ToolbarActionsSearchProps) {

  return (
    <div className='w-full '>
      <button className='bg-gray-300 text-black rounded-md p-1 cursor-pointer' onClick={() => setOpen(true)}>
        <LogoutIcon className='text-black'/>
        <span>خروج</span>
      </button>
    </div>
  );
}
// end exit account

const SuppliersDashboard = (props:any) => {

  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const NextRouter = useRouter()

  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

// useEffect to set up interval checking for the user
    React.useEffect(() => {
      const intervalId = setInterval(() => {
        const fetchedUser = Cookies.get("supplierUser");
        if (fetchedUser) {
          setUser(JSON.parse(fetchedUser));
          setLoading(false)
          clearInterval(intervalId); // stop polling once user is found
        }
      }, 1000);
    
      return () => clearInterval(intervalId); // clean up on unmount
    }, []);
    // React.useEffect(() => {
    //   const fetchedUser = Cookies.get("supplierUser");
    //   if (fetchedUser) {
    //     setUser(JSON.parse(fetchedUser));
    //   }
    //   setLoading(false);
    // }, []);
    
    // end get user

// config
    const { loadingConfig, errorConfig,getConfig,config} = useGetMainConfig()
    React.useEffect(()=>{
      getConfig()
    },[])
// end config

// exit account settings
  const handleExitAcc = ()=>{
     Cookies.remove("supplierUser")
     dispatch(clearIsSupplierLoggedIn())
     localStorage.removeItem("supplierUserToken")
     NextRouter.push("/")
     setOpen(false);
   }

   const exitDialogContent = "آیا مطمئن هستید؟"
// end exit account settings

  return (
    <>
    <title>حساب کاربری تامین کننده</title>
    <meta name="description" content="حساب کاربری تامین کننده" />
    {loading ? <div className='w-full flex justify-center pt-32'><CircularProgress /></div> 
    : 
    <div>
      
    {user ? <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{title: 'حساب کاربری تامین کننده', logo: <div onClick={()=>NextRouter.push('/')}><Image className='ml-2 w-8 h-10' src={Logo} alt="تعاونی مصرف کارکنان بانک ملی" /></div>}}
      // session={session}
      // authentication={authentication}
    >
      <DashboardLayout
      slots={{
        toolbarActions: () => <ToolbarActionsSearch setOpen={setOpen} />,
        sidebarFooter: SidebarFooter,
      }}
      sx={{
        '& .MuiDrawer-root': {
          left: 'auto !important',
          right: 0,
          backgroundColor:'var(--main-bg)',
        },
        '& .MuiDrawer-paper': {
          left: 'auto !important',
          right: 0,
          backgroundColor:'var(--main-bg)',
          color:'var(--main-text)',
        },
        '& .MuiAppBar-root': {
          left: 0,
          right: 'auto',
          backgroundColor:'var(--main-bg)'
        },
        '& .MuiToolbar-root': {
          justifyContent: 'flex-end',
        },
        '& .MuiListSubheader-root': {
          backgroundColor:'var(--main-bg)',
          color:'var(--main-text)',
        },
        '& .MuiTypography-root': {
        color: 'var(--main-text)',
        },
        '& .MuiSvgIcon-root': {
        color: 'var(--main-text)',
        },
        '& .MuiTypography-h4': {
        color: 'var(--main-text)',
        },
        '& .MuiLink-root': {
        color: 'var(--main-text)',
        },
        '& .MuiListItemButton-root.Mui-selected': {
            backgroundColor: 'var(--main-text)',
            color: 'var(--main-bg)',
        },
        '& .MuiListItemButton-root.Mui-selected .MuiTypography-root': {
          color: 'var(--main-bg)', 
        },
        '& .MuiButtonBase-root .MuiListItemButton-root ': {
          justifyContent:"end" 
        },
        '& .MuiStack-root': {
          ml:0 
        },
        '& nav.MuiBox-root[aria-label="Desktop"]': {
        borderLeft: '1px solid lightgray',
        },
      }}
      >
       {router.pathname === '/' && (
        <PageContainer>
          <Grid container spacing={1} className='font-bold text-lg'>
             {`به حساب کاربری خود خوش آمدید `}
          </Grid>
        </PageContainer>
      )} 

       {router.pathname === '/dashboard' && (
          <Dashboard/> 
      )}

      {router.pathname === '/manageProduct' && (
                <ManageProduct/>
      )}
      {router.pathname === '/manageOrders' && (
                <ManageOrders/>
      )}
            </DashboardLayout>
          </AppProvider> : <div className='w-full p-10 flex justify-center text-red-500'> <span>برای دسترسی به حساب کاربری ابتدا وارد شوید!</span></div>}
          </div>}
          <AlertDialog open={open} setOpen={setOpen} handleExitAcc={handleExitAcc} exitDialogContent={exitDialogContent}/>
    </>
  )
}

export default SuppliersDashboard