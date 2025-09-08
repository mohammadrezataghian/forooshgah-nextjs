'use client'

import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WalletIcon from '@mui/icons-material/Wallet';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MoneyIcon from '@mui/icons-material/Money';
import SettingsIcon from '@mui/icons-material/Settings';
import LockResetIcon from '@mui/icons-material/LockReset';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { type Navigation } from '@toolpad/core/AppProvider';

function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchedUser = Cookies.get("user");
      if (fetchedUser) {
        setUser(JSON.parse(fetchedUser));
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return user;
}

function useNavigationItems() {
  const user = useUser();

  const NAVIGATION:Navigation = [
    {
      kind: 'header',
      title: 'آیتم های منو',
    },
    {
      segment: 'dashboard',
      title: 'اطلاعات شخصی',
      icon: <DashboardIcon className='text-main-text bg-main-bg' />,
    },
    {
      segment: 'orders',
      title: 'سفارشات',
      icon: <ShoppingCartIcon className='text-main-text bg-main-bg' />,
    },
    {
      segment: 'wallet',
      title: 'کیف پول',
      icon: <WalletIcon className='text-main-text bg-main-bg' />,
    },
    {
      segment: 'stock',
      title: 'سهام',
      icon: <ShowChartIcon className='text-main-text bg-main-bg' />,
    },
    {
      segment: 'installment',
      title: 'اقساط',
      icon: <MoneyIcon className='text-main-text bg-main-bg' />,
    },
    {
      segment: 'customerClub',
      title: 'باشگاه مشتریان',
      icon: <Diversity3Icon className='text-main-text bg-main-bg' />,
    },
    {
      segment: 'changePassword',
      title: 'تغییر رمز عبور',
      icon: <LockResetIcon className='text-main-text bg-main-bg' />,
    },
    ...(user?.isAdmin ? [{
      segment: 'settings',
      title: 'تنظیمات ظاهری',
      icon: <SettingsIcon className='text-main-text bg-main-bg' />,
    }] : [])
  ];

  return NAVIGATION;
}
export { useNavigationItems };