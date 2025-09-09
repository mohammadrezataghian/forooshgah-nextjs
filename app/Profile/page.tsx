'use client'

import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import Logo from "@/public/logo/logo1.png";
import { useDemoRouter, demoTheme, SidebarFooter } from './_components/DashboardItems';
import Dashboard from './_components/Dashboard';
import Orders from './_components/Orders/Orders';
import Wallet from './_components/Wallet';
import Stock from './_components/Stock/Stock';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Installment from './_components/Installment/Installment';
import FrontSettings from './_components/FrontSettings/FrontSettings';
import useGetMainConfig from "@/app/api/getMainConfig/hook";
import { useNavigationItems } from './_components/Navigation';
import ChangePassword from './_components/ChangePassword/ChangePassword';
import CustomersClub from './_components/CustomersClub/CustomersClub';
import Image from 'next/image';
import { sahamUserType } from '@/types/types';

const Profile = (props:any) => {

    const [user, setUser] = React.useState<sahamUserType | null>(null);
    const [loading, setLoading] = React.useState(true);
    const navItems = useNavigationItems();
  
    const { window } = props;

    const router = useDemoRouter('/dashboard');
  
    // Remove this const when copying and pasting into your project.
    const demoWindow = window ? window() : undefined;
  
    // useEffect to set up interval checking for the user
    React.useEffect(() => {
      const intervalId = setInterval(() => {
        const fetchedUser = Cookies.get("user");
        if (fetchedUser) {
          setUser(JSON.parse(fetchedUser));
          setLoading(false)
          clearInterval(intervalId); // stop polling once user is found
        }
      }, 1000);
    
      return () => clearInterval(intervalId); // clean up on unmount
    }, []);
    // end get user

    // config
    const { loadingConfig, errorConfig,getConfig,config} = useGetMainConfig()
    React.useEffect(()=>{
      getConfig()
    },[])
    // end config

    // navigate to club
    React.useEffect(() => {
      const goTo = sessionStorage.getItem("goTo");
    
      if (router.pathname === '/dashboard' && goTo === 'customerClub') {
        router.navigate('/customerClub');
        sessionStorage.removeItem('goTo');
      }
    }, [router.pathname]);
    // end navigate to club

  return (
    <>
    <title>حساب کاربری</title>
    <meta name="description" content="حساب کاربری" />
    {loading ? <div className='w-full flex justify-center pt-32'><CircularProgress /></div> : <div>
    {user ? <AppProvider
      navigation={navItems}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{title: 'حساب کاربری', logo: <Image className='ml-2' src={Logo} alt="تعاونی مصرف کارکنان بانک ملی" />}}
      // session={session}
      // authentication={authentication}
    >
      <DashboardLayout
      slots={{
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
      }}
      >
       {router.pathname === '/' && (
        <PageContainer>
          <Grid container spacing={1} className='font-bold text-lg'>
             {`${user?.FirstName} ${user?.LastName} به حساب کاربری خود خوش آمدید `}
          </Grid>
        </PageContainer>
      )} 

       {router.pathname === '/dashboard' && (
        <Dashboard/>
      )}

      {router.pathname === '/orders' && (
        <Orders/>
      )}

      {router.pathname === '/wallet' && (
        <Wallet/>
      )}

      {router.pathname === '/stock' && (
        <Stock/>
      )}
      {router.pathname === '/installment' && (
        <Installment/>
      )}
      {router.pathname === '/settings' && (
        <FrontSettings/>
      )}
      {router.pathname === '/changePassword' && (
        <ChangePassword/>
      )}
      {router.pathname === '/customerClub' && (
        <CustomersClub/>
      )}
            </DashboardLayout>
          </AppProvider> : <div className='w-full p-10 flex justify-center text-red-500'> <span>برای دسترسی به حساب کاربری ابتدا وارد شوید!</span></div>}
          </div>}
    </>
  )
}

export default Profile