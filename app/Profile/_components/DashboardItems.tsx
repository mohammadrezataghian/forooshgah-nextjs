import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { AiOutlineTrademarkCircle } from "react-icons/ai";
import { type SidebarFooterProps} from '@toolpad/core/DashboardLayout';

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

  export { useDemoRouter ,demoTheme,SidebarFooter };