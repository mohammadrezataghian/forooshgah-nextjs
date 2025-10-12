"use client";

import React, { forwardRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Slide, SlideProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

const Transition = forwardRef<unknown, SlideProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

type AlertDialogSlideProps = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  submitResponse: any | null;
};

export default function AlertDialogSlide({
  openDialog,
  setOpenDialog,
  submitResponse,
}: AlertDialogSlideProps) {
  const router = useRouter();
  const handleClose = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    if (openDialog) {
      const timer = setTimeout(() => {
        handleClose();
        router.back(); // navigate to previous page
      }, 2000); // Show the dialog for 2 seconds

      return () => clearTimeout(timer);
    }
  }, [openDialog]);

  return (
    <>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="pt-3">
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </div>

        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="px-10 pb-10"
          >
            {submitResponse ? (
              submitResponse.data?.resCode === 1 ? (
                <span className="text-green-500">
                  درخواست مرجوعی با موفقیت ثبت شد.
                </span>
              ) : (
                <span className="text-red-500">
                  {submitResponse.data?.resMessage ?? "خطا در ارسال درخواست"}
                </span>
              )
            ) : (
              <span className="text-red-500">خطا در ارسال درخواست</span>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
