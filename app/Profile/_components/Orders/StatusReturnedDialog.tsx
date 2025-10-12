import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Skeleton } from "@mui/material";

const Transition = React.forwardRef<unknown, SlideProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type FullScreenDialogProps={
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    response:any;
    loadingStatus:boolean;
}

export default function FullScreenDialog({
  open,
  setOpen,
  response,
  loadingStatus,
}:FullScreenDialogProps) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#0377fc" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton edge="start" onClick={handleClose} aria-label="close">
              <CloseIcon className="text-white bg-red-500 rounded-full " />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="w-full">
          <div className="bg-white px-3 w-full h-auto pb-24 pt-10 flex gap-5 flex-col md:px-64">
            {loadingStatus ? (
              <>
                <div className="border border-blue-400 w-full h-auto flex flex-col gap-3 ps-2 py-5 rounded-lg">
                  <div className="w-full flex gap-3">
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="text" width={120} height={20} />
                  </div>
                  <div className="w-full flex gap-3">
                    <Skeleton variant="text" width={80} height={20} />
                    <Skeleton variant="text" width={140} height={20} />
                  </div>
                </div>
                <div className="border border-blue-400 w-full h-auto flex flex-col gap-3 ps-2 py-5 rounded-lg">
                  <div className="w-full flex gap-3">
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="text" width={120} height={20} />
                  </div>
                  <div className="w-full flex gap-3">
                    <Skeleton variant="text" width={80} height={20} />
                    <Skeleton variant="text" width={140} height={20} />
                  </div>
                </div>
                <div className="border border-blue-400 w-full h-auto flex flex-col gap-3 ps-2 py-5 rounded-lg">
                  <div className="w-full flex gap-3">
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="text" width={120} height={20} />
                  </div>
                  <div className="w-full flex gap-3">
                    <Skeleton variant="text" width={80} height={20} />
                    <Skeleton variant="text" width={140} height={20} />
                  </div>
                </div>
              </>
            ) : 
              (response &&
              response?.data.resCode == 1) ? (
              response?.data?.Data?.map((item:any, index:any) => (
                <div
                  key={index}
                  className="border border-blue-400 w-full h-auto flex flex-col gap-3 pe-2 py-5 rounded-lg"
                >
                  <div className="w-full flex gap-1">
                    <span>آخرین وضعیت:</span>
                    <span>{item.FldStatusName}</span>
                  </div>
                  <div className="w-full flex gap-1">
                    <span>تاریخ:</span>
                    <span>{item.FldDate}</span>
                  </div>
                </div>
              ))
            ) : 
                <div className="w-full flex justify-center"><span>تاریخچه ای وجود ندارد</span></div>
              }
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}