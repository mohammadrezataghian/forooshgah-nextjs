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
import Cookies from 'js-cookie';
import { PiCoins } from "react-icons/pi";
import { useAtom } from 'jotai';
import { ClubScore } from '@/shared/customerClubScore';
import Link from 'next/link';

const Transition = React.forwardRef<unknown, SlideProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type FullScreenDialogProps={
    handleClickOpenAccount: ()=> void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleCloseAccount: ()=> void;
    handleClickOpen: ()=> void;
}

export default function FullScreenDialog({handleClickOpenAccount,open,setOpen,handleCloseAccount,handleClickOpen}:FullScreenDialogProps) {

  const [score,setScore]= useAtom(ClubScore)
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseAccount}
        slots={{ transition: Transition }}
        className='z-[10000]'
      >
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
          <Link onClick={handleCloseAccount} href={`/profile/${user?.Id}`} className='text-inherit flex'><span>پروفایل</span><AccountCircleIcon className='text-gray-600 mr-1'/></Link>
          </ListItemButton>
          <ListItemButton>
          <Link onClick={() => {
            sessionStorage.setItem("goTo", "customerClub");
            }}
            href={`/profile/${user?.Id}`}  className='text-inherit flex items-center'>امتیاز باشگاه: {score && score}<PiCoins className='text-gray-600 mr-1 text-xl'/></Link>
          </ListItemButton>
          <Divider />
          <ListItemButton>
          <div onClick={()=>{
            handleCloseAccount()
            handleClickOpen()
            }} className='flex'>خروج از حساب کاربری<BiExit className="text-xl scale-x-[-1] mr-1 text-gray-600"/></div>
          </ListItemButton>
        </List>
      </Dialog>
    </React.Fragment>
  );
}