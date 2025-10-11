'use client'

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MessageSnackbar from "@/common/Snackbar/MessageSnackbar";
import { Button, Divider, Rating } from '@mui/material';
import { FcComments } from "react-icons/fc";
import Cookies from 'js-cookie';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioDialog from './RadioDialog';
import useGetCreateComment from '@/app/api/createComment/hook';
import svg from '@/public/images/comment/add-comment-thank-you.svg'

type SubmitCommentDialogProps = {
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    nameKala:string;
    IdKala:number;
}

export default function SubmitCommentDialog({open,setOpen,nameKala,IdKala}:SubmitCommentDialogProps) {

  const [radioValue,setRadioValue] = React.useState('ارسال با نام شما')
  const [buttonState,setButtonState] = React.useState(false)
  const [radioDialogOpen,setRadioDialogOpen] = React.useState(false)
  const [textAreaValue,setTextAreaValue] = React.useState('')
  const [ratingValue, setRatingValue] = React.useState<any>(null);
  const [showFeedback,setShowFeedback] = React.useState(false);

  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
  const userToken = localStorage.getItem("userToken");

  const handleClose = () => {
    setOpen(false);
  };
  const delayedClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

// start snackbar
const [snackbarOpen, setSnackbarOpen] = React.useState(false);
const [snackbarMessage, setSnackbarMessage] = React.useState("");

function showSnackbar(message:string) {
  setSnackbarMessage(message);
  setSnackbarOpen(true);
}
// end snackbar

const handleChange=(e:any)=>{
  setTextAreaValue(e.target.value)
  
  if (e.target.value.length >= 5 && ratingValue) {
    setButtonState(true)
  }else{
    setButtonState(false)
  }
}

React.useEffect(()=>{
if (ratingValue && textAreaValue.length >=5) {
  setButtonState(true)
}else{
  setButtonState(false)
}
},[ratingValue])

const handleClick =()=>{
  setRadioDialogOpen(true)
}

const {submitCommentResponse, loadingSubmitComment, errorSubmitComment,getCreateComment} = useGetCreateComment(userToken)

const handleSubmit =()=>{

  let name = radioValue !== "ارسال با نام شما";

  const params = {
    "Comment": textAreaValue,
    "FldIdKala": IdKala,
    "FldIdUser": user?.Id,
    "FldRating": ratingValue,
    "FldIsUnKnownUser" : name
  }

  if (ratingValue && textAreaValue && textAreaValue.length >= 5 && user?.Id && IdKala) {
    getCreateComment(params)
    console.log(params);
  }
}
React.useEffect(()=>{
  setShowFeedback(false)
},[open])

React.useEffect(()=>{
if (submitCommentResponse && submitCommentResponse.resCode == 1) {
  setTextAreaValue('')
  setRatingValue(null)
  setShowFeedback(true)
}
},[submitCommentResponse])
// console.log(submitCommentResponse);

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        className='z-[10000]'
      >
        {showFeedback ? 
          <DialogContent>
            <div className='flex flex-col gap-14 items-center md:p-5 w-full'>
              <div><img src={svg} alt="thank-you" /></div>
              <div className='text-center font-bold text-2xl text-nowrap'>{`${user?.FirstName} عزیز! از مشارکتتان ممنونیم!`}</div>
              <div className='text-center text-lg'>ممکن است کمی زمان ببرد تا دیدگاه شما پس از بررسی نمایش داده شود، اما با نوشتن این دیدگاه، کمک بزرگی به دیگران برای انتخاب بهتر کرده اید!</div>
              <Divider className='w-full mb-[-27px]'/>
              <Button onClick={handleClose} variant='contained' className='w-full py-3 text-white'>بازگشت</Button>
            </div>
          </DialogContent>
         :
         <>
        <DialogTitle className='font-bold'>ثبت دیدگاه
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            left: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon className="customDialogClose"/>
        </IconButton>
        </DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText className='font-bold flex gap-5 items-center flex-nowrap overflow-hidden'>
              <FcComments className='text-5xl flex-shrink-0'/>
              <span className='line-clamp-2'>{nameKala}</span>
          </DialogContentText>
          <Divider className='my-5'/>
          {/* form */}
          <div className='w-full flex flex-col gap-2 '>
            {/* label */}
            <div className='flex text-lg'><span>متن دیدگاه:</span><span className='text-red-500'>*</span></div>
            {/* form + combo*/}
            <div className='w-full border border-gray-400 rounded-lg'>
              <textarea
              onChange={handleChange}
              className='w-full border-b border-gray-400 rounded-t-lg  placeholder:text-right placeholder:lg:text-lg placeholder:text-wrap p-3 min-h-32 resize-none' 
              placeholder='نظر خود را در مورد این کالا با کاربران دیگر به اشتراک بگذارید..' />
              {/* rating */}
              <div className='w-full flex p-3 pt-2 justify-between border-b border-gray-400 items-center'>
              <div><span>امتیازدهی : </span></div>
              <Rating
                name="size-large"
                value={ratingValue}
                size="large"
                onChange={(_, newValue) => setRatingValue(newValue)}
                sx={{
                  "& .MuiRating-decimal": {
                    transform: "scaleX(-1)", // flip each star back
                  },
                  transform: "scaleX(-1)", // flip container
                }}
              />
            </div>
            {/* combo */}
              <div className='w-full flex justify-between p-3 text-sm'>
                <span>{user?.FirstName} {user?.LastName}</span>
                <div 
                className='flex items-center text-sm gap-1 cursor-pointer' 
                onClick={handleClick}>
                  <span>{radioValue}</span><ExpandMoreIcon className='text-sm'/>
                </div>
              </div>
            </div>
            <Divider className='mt-32 mb-5'/>
            <Button disabled={!buttonState} className='w-full text-white py-3 text-lg' variant='contained' color='info' onClick={handleSubmit}>ثبت دیدگاه</Button>
            <div className='flex justify-center text-xs lg:text-sm text-nowrap pt-1'><span>ثبت دیدگاه به معنی موافقت باقوانین انتشار تعاونی بانک ملی است.</span></div>
          </div>
        </DialogContent>
        </>
        }
            <RadioDialog open={radioDialogOpen} setOpen={setRadioDialogOpen} value={radioValue} setValue={setRadioValue} firstName={user?.FirstName} lastName={user?.LastName}/>
            <MessageSnackbar snackbarOpen={snackbarOpen} autoHideDuration={1500} snackbarMessage={snackbarMessage} setSnackbarOpen={setSnackbarOpen}/>
      </Dialog>
    </React.Fragment>
  );
}