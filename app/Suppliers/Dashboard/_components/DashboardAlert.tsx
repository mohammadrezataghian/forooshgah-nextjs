import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';

type TransitionAlertsProps ={
  editInfoResponse:any;
}

export default function TransitionAlerts({editInfoResponse}:TransitionAlertsProps) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(()=>{
    setOpen(true)
    if (editInfoResponse && editInfoResponse?.data?.resCode === 1) {
      Cookies.set("supplierUser", JSON.stringify(editInfoResponse?.data?.Data), { expires: 12 / 24 });
    }
  },[editInfoResponse])

  return (
    <Box sx={{ width: '100%' }} >
      <Collapse in={open}>
      {editInfoResponse && editInfoResponse.data.resCode === 1 ? 

        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2,gap:'10px',mx:'10px' }}
        >
          اطلاعات با موفقیت ویرایش شد.
        </Alert>
        :
        <Alert
        severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2,gap:'10px',mx:'10px' }}
        >
          ویرایش اطلاعات ناموفق بود.
        </Alert>
    }
      </Collapse>
    </Box>
  );
}
