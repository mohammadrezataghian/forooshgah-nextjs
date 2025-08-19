import React from 'react'
import {Snackbar} from "@mui/material"

type MessageSnackbarProps ={
    snackbarOpen:boolean;
    setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    autoHideDuration:number;
    snackbarMessage:string;
}

const MessageSnackbar = ({snackbarOpen,setSnackbarOpen,autoHideDuration,snackbarMessage}:MessageSnackbarProps) => {

    const handleSnackbarClose = (event:any, reason:any) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false); // CHANGED
      };

  return (
    <>
    <Snackbar
            sx={{
              "& .MuiSnackbarContent-root": {
                backgroundColor: "#2b2b2b",
                color: "white",
              },
            }}
            className="z-[100000]"
            open={snackbarOpen} // CHANGED
            autoHideDuration={autoHideDuration} // CHANGED
            onClose={handleSnackbarClose} // CHANGED
            message={snackbarMessage} // CHANGED
          />
    </>
  )
}

export default MessageSnackbar