import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

type AutoHideDialogProps = {
    open: boolean;
    dialogContent:string ;
    dialogTitle: string;
    onClose: ()=>void;
    duration: number;
}

const AutoHideDialog = ({ open,dialogContent,dialogTitle, onClose, duration }:AutoHideDialogProps) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose(); // Automatically close the dialog
      }, duration);

      return () => clearTimeout(timer); // Cleanup on unmount or re-render
    }
  }, [open, duration, onClose]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>بستن</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AutoHideDialog;
