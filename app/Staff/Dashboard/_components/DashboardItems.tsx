import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { createTheme, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { AiOutlineTrademarkCircle } from "react-icons/ai";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LockResetIcon from '@mui/icons-material/LockReset';
import { type Navigation } from '@toolpad/core/AppProvider';
import { type SidebarFooterProps} from '@toolpad/core/DashboardLayout';

const NAVIGATION:Navigation = [
    {
      kind: 'header',
      title: 'آیتم های منو',
    },
    {
      segment: 'dashboard',
      title: 'اطلاعات شخصی',
      icon: <DashboardIcon className='text-main-text bg-main-bg'/>,
    }, 
    {
      segment: 'salarySlip',
      title: 'فیش حقوقی',
      icon: <ReceiptLongIcon className='text-main-text bg-main-bg'/>,
    },  
    {
      segment: 'changePassword',
      title: 'تغییر رمز عبور',
      icon: <LockResetIcon className='text-main-text bg-main-bg'/>,
    },  
    // {
    //   kind: 'divider',
    // },
    // {
    //   kind: 'header',
    //   title: 'آمار',
    // },
    // {
    //   segment: 'reports',
    //   title: 'گزارشات',
    //   icon: <BarChartIcon />,
    //   children: [
    //     {
    //       segment: 'sales',
    //       title: 'فروش',
    //       icon: <DescriptionIcon />,
    //     },
    //     {
    //       segment: 'traffic',
    //       title: 'عبور و مرور',
    //       icon: <DescriptionIcon />,
    //     },
    //   ],
    // },
  ];

  function useDemoRouter(initialPath:any) {
    const [pathname, setPathname] = React.useState(initialPath);
  
    const router = React.useMemo(() => {
      return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path:any) => setPathname(String(path)),
      };
    }, [pathname]);
  
    return router;
  }

  const demoTheme = createTheme({
    // colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: 'class',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 580,
        md: 768,
        lg: 1024,
        xl: 1280,
        xxl:1536,
      },
    },
  });

  function SidebarFooter({ mini }:SidebarFooterProps) {
    return (
      <Typography
        variant="caption"
        sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        <div className='flex items-center gap-1'>
           <AiOutlineTrademarkCircle className='text-lg'/> <span className='text-main-text'>2025 راشن سیستم آریا</span>
        </div>
      </Typography>
    );
  }

  export { NAVIGATION, useDemoRouter ,demoTheme,SidebarFooter};