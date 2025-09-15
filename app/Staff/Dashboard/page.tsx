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
import LogoutIcon from '@mui/icons-material/Logout';
import AlertDialog from '@/common/ProfileExitDialog/ProfileExitDialog';
import useGetMainConfig from '@/app/api/getMainConfig/hook';
import Profile from './_components/Profile/Profile';
import SalarySlip from './_components/SalarySlip/SalarySlip';
import ChangePassword from './_components/ChangePassword/ChangePassword';
import { useAtom } from "jotai";
import { IsStaffUserloggedIn } from '@/shared/isStaffLoggedIn';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// exit account

type ToolbarActionsSearchProps={
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

function ToolbarActionsSearch({ setOpen }:ToolbarActionsSearchProps) {

  return (
    <div className='w-full '>
      <button className='bg-gray-300 text-black rounded-md p-1' onClick={() => setOpen(true)}>
        <LogoutIcon className='text-black'/>
        <span>خروج</span>
      </button>
    </div>
  );
}
// end exit account

const StaffDashboard = (props:any) => {

  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [IsloggedIn,setIsLoggedIn] = useAtom(IsStaffUserloggedIn);
  const NextRouter = useRouter()

  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

// useEffect to set up interval checking for the user
    React.useEffect(() => {
      const intervalId = setInterval(() => {
        const fetchedUser = Cookies.get("staffUser");
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

// handle exit account
const handleExitAcc = ()=>{
    Cookies.remove("staffUser")
    setIsLoggedIn(false)
    localStorage.removeItem("staffUserToken")
    NextRouter.back()
    setOpen(false);
  }

  const exitDialogContent = "آیا مطمئن هستید؟"
//  end handle exit account

  return (
    <>
    <title>حساب کاربری کارمند</title>
    <meta name="description" content="حساب کاربری کارمند" />
    {loading ? <div className='w-full flex justify-center pt-32'><CircularProgress /></div> 
    : 
    <div>
      
    {user ? <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{title: 'حساب کاربری کارمند', logo: <Image className='ml-2' src={Logo} alt="تعاونی مصرف کارکنان بانک ملی" />}}
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
          <Profile/> 
      )}

       {router.pathname === '/salarySlip' && (
          <SalarySlip/> 
      )}

       {router.pathname === '/changePassword' && (
          <ChangePassword/> 
      )}

            </DashboardLayout>
          </AppProvider> : <div className='w-full p-10 flex justify-center text-red-500'> <span>برای دسترسی به حساب کاربری ابتدا وارد شوید!</span></div>}
          </div>}
          <AlertDialog open={open} setOpen={setOpen} handleExitAcc={handleExitAcc} exitDialogContent={exitDialogContent}/>
    </>
  )
}

export default StaffDashboard