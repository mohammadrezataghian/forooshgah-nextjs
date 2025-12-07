import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Slide, SlideProps } from "@mui/material";
import { BiExit } from 'react-icons/bi';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PiCoins } from "react-icons/pi";
import Link from 'next/link';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Transition = React.forwardRef<unknown, SlideProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type FullScreenDialogProps={
    open: boolean;
    handleCloseAccount: ()=> void;
    handleClickOpen: ()=> void;
}

export default function FullScreenDialog({open,handleCloseAccount,handleClickOpen}:FullScreenDialogProps) {

  const score = useSelector((state: RootState) => state.clubScore.value);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseAccount}
        slots={{ transition: Transition }}
        className='z-[100000]'
      >
        <div className='z-[100000]'>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseAccount}
              aria-label="close"
            >
              <CloseIcon className='text-white'/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              حساب کاربری
            </Typography>
          </Toolbar>
        </AppBar>
        
        <List>
          <ListItemButton>
          <Link onClick={handleCloseAccount} href={`/profile`} className='text-inherit flex'><span>پروفایل</span><AccountCircleIcon className='text-gray-600 mr-1'/></Link>
          </ListItemButton>
          <ListItemButton>
          <Link onClick={() => {
            sessionStorage.setItem("goTo", "customerClub");
            }}
            href={`/profile`}  className='text-inherit flex items-center'>امتیاز باشگاه: {score && score}<PiCoins className='text-gray-600 mr-1 text-xl'/></Link>
          </ListItemButton>
          <Divider />
          <ListItemButton>
          <div onClick={()=>{
            handleCloseAccount()
            handleClickOpen()
            }} className='flex'>خروج از حساب کاربری<BiExit className="text-xl scale-x-[-1] mr-1 text-gray-600"/></div>
          </ListItemButton>
        </List>
        </div>
      </Dialog>
    </React.Fragment>
  );
}