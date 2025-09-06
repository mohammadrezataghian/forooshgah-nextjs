'use client'

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function Del({ open, setOpen, handleDel }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>حذف سند</DialogTitle>
        <DialogContent>
          <DialogContentText>
            آیا از حذف این سند اطمینان دارید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions className="gap-5">
          <Button
            variant="outlined"
            onClick={() => {
              handleDel();
              handleClose();
            }}
            sx={{
              borderColor: "#c49402", // Outline color
              "&:hover": {
                borderColor: "#544001", // Outline on hover
                backgroundColor: "rgb(247, 243, 228)", // Optional subtle hover bg
              },
            }}
            className="text-[#c49402]"
          >
            حذف
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderColor: "red", // Outline color
              "&:hover": {
                borderColor: "darkred", // Outline on hover
                backgroundColor: "rgba(255,0,0,0.04)", // Optional subtle hover bg
              },
            }}
            className="text-red-600"
          >
            انصراف
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}