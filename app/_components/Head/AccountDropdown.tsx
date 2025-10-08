'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { BiExit } from 'react-icons/bi';
import { PiCoins } from "react-icons/pi";
import useGetScore from "@/app/api/sahamPersonScore/hook";
import { useAtom } from 'jotai';
import { ClubScore } from '@/shared/customerClubScore';
import Link from 'next/link';
import {sahamUserType} from '@/types/types'

type props ={
  handleClickOpen: () => void;
  user: sahamUserType;
  userToken: string;
  eshterakNo: {EshterakNo: number};
}


export default function MenuListComposition({handleClickOpen,user,userToken,eshterakNo}:props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement | null>(null);
  const [userId,setUserId] = React.useState(0)
  const [score,setScore]= useAtom(ClubScore)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event:any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: any) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  React.useEffect(() => {
    if (user) {
      setUserId(user.Id);
    }
  }, [user]);
  
  // score
  const { loading, error, response, getScore } = useGetScore(userToken);

  // React.useEffect(() => {
  //   if (!score && user) {
  //     getScore(eshterakNo);
  //   }
  // }, [user]);
  
  React.useEffect(()=>{
    if (response) {
      setScore(response?.data?.Data?.Score) 
    }
  },[response])
//end of score

  return (
    <Stack direction="row" spacing={2} className='z-10 lg:block hidden w-full'>
      <div className='w-full'>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className='flex gap-2 w-full'
        >
          <AccountCircleIcon className='text-gray-600'/><span className='text-gray-600'><ArrowDropDownIcon/>{user && user.FirstName} {user && user.LastName}</span>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                    <MenuItem onClick={handleClose}><Link href={`/Profile`} className='flex justify-between text-inherit w-full flex-nowrap'><AccountCircleIcon className="text-xl mr-1 text-gray-600"/><span>پروفایل</span></Link></MenuItem>
                    {/* <MenuItem onClick={handleClose} className='flex justify-end'><Link to={'/receipts'} className='text-inherit'>سفارشات من<ReceiptLongIcon className='text-gray-600 mr-1'/></Link></MenuItem> */}
                    <MenuItem className='flex justify-between flex-nowrap gap-1'>
                      <span className='flex w-full'><PiCoins  className="text-xl scale-x-[-1] text-gray-600"/></span>
                    <Link 
                      onClick={() => {
                        sessionStorage.setItem("goTo", "customerClub");
                      }}
                      href={`/profile/${user?.Id}`}>امتیاز باشگاه: {score ? score : 0}
                    </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClickOpen} className='flex justify-between flex-nowrap gap-1'><BiExit className="text-xl scale-x-[-1] text-gray-600"/><span>خروج از حساب کاربری</span></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}