'use client'

import React, { useEffect, useState } from "react";
import { 
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Avatar
} from '@mui/material';
import {
  CheckCircle,
  ArrowBack,
  Download,
} from '@mui/icons-material';
import Link from "next/link";

export default function FactorInfo() {
  const [factorInfo, setFactorInfo] = useState<any>({});

   useEffect(() => {
    try {
      const rawLocation = localStorage.getItem("FactorInfoState");
      if (rawLocation) {
        const parsed = JSON.parse(rawLocation);
        if (parsed?.state?.factorInfo) {
          setFactorInfo(parsed.state.factorInfo);
        }
      }
    } catch (e) {
      console.error("Failed to parse FactorInfoState:", e);
    }
  }, []);

  // اگر state وجود نداشت
  if (!factorInfo) {
    return (
      <Container>
        <Typography variant="h6" align="center" color="error">
          پرداخت انجام نشد
        </Typography>
      </Container>
    );
  }
  
 const convertToPdf=()=>{
    window.print()
 }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center'
          }}
        >
          {/* Success Icon */}
          <Avatar
            sx={{
              bgcolor: '#e8f5e9',
              width: 80,
              height: 80,
              margin: '0 auto',
              mb: 2
            }}
          >
            <CheckCircle
              color="success"
              sx={{
                width: 40,
                height: 40,
                animation: 'bounce 1s ease-in-out'
              }}
            />
          </Avatar>

          {/* Main Content */}
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" align="center">
            خرید موفقیت آمیز بود!
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom align="center">
            با تشکر از خرید شما, خرید شما تایید شد.
          </Typography>

          {/* Order Details */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              my: 3,
              bgcolor: 'grey.50'
            }}
          >
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">تاریخ</Typography>
                <Typography fontWeight="medium">{factorInfo.DateFirstGhabz}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">سریال فاکتور</Typography>
                <Typography fontWeight="medium" color="success.main">{factorInfo.Id}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">مبلغ</Typography>
                <Typography fontWeight="medium">{factorInfo.GhabelePardakht}</Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Action Buttons */}
          <Stack spacing={2}>
            <Button 
              variant="contained"
              color="success"
              fullWidth
              size="large"
              onClick={convertToPdf}
              className="print:hidden"
            >
              دانلود فاکتور<Download />
            </Button>
          </Stack>

          {/* Return Link */}
          <Box mt={3}>
            <Link
              className="flex justify-center gap-1 items-center print:hidden decoration-0 hover:text-blue-400"
              href="/"
              color="text.secondary"
            >
              بازگشت به صفحه ی اصلی
              <ArrowBack sx={{ fontSize: 20 }} />
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}