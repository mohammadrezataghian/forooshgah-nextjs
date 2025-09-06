'use client'

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { OutlinedInput } from "@mui/material";

export default function Add({ open, setOpen,fileName,setFileName,files,setFiles,fileBase64List,setFileBase64List,description,setDescription,handleSubmit}) {
  
  const handleClose = () => {
    setOpen(false);
  };

  const fileToBase64 = (file:any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);  // base64 string
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e:any) => {
    const selectedFiles = Array.from(e.target.files);
    const allowedExtensions = ["png", "jpg", "jpeg"];
  
    const validNewFiles = selectedFiles.filter((file) => {
      const ext = file.name.split(".").pop().toLowerCase();
      return allowedExtensions.includes(ext);
    });
  
    if (validNewFiles.length !== selectedFiles.length) {
      alert("برخی فایل‌ها فرمت نامعتبر دارند. فقط PNG، JPG و JPEG مجازند.");
      e.target.value = "";
      return;
    }
  
    // Prevent duplicate files by name
    const uniqueNewFiles = validNewFiles.filter(
      (newFile) => !files.some((existingFile:any) => existingFile.name === newFile.name)
    );
  
    const newBase64List = await Promise.all(uniqueNewFiles.map(fileToBase64));
  
    // Append new files and base64
    const updatedFiles = [...files, ...uniqueNewFiles];
    const updatedBase64List = [...fileBase64List, ...newBase64List];
  
    setFiles(updatedFiles);
    setFileBase64List(updatedBase64List);
    setFileName(updatedFiles.map((f) => f.name).join(", "));
  
    // Clear input so the same file can be reselected later if needed
    e.target.value = "";
  };
  

  const handleRemoveFile = (index:any) => {
    const updatedFiles = [...files];
    const updatedBase64 = [...fileBase64List];

    updatedFiles.splice(index, 1);
    updatedBase64.splice(index, 1);

    setFiles(updatedFiles);
    setFileBase64List(updatedBase64);
    setFileName(updatedFiles.map((f) => f.name).join(", "));
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>ایجاد سند جدید</DialogTitle>
        <DialogContent>
          <DialogContentText className="flex flex-col gap-3" component={'div'}>
            <div className="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">برای آپلود کلیک کنید</span>
                  </p>
                  <p className="text-xs text-gray-500">
                   PNG, JPG, JPEG
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".png,.jpg,.jpeg" multiple/>
              </label>
            </div>
            {files.length > 0 && (
              <div className="space-y-2 mt-4">
                {files.map((file:any, index:any) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 border px-3 py-2 rounded"
                  >
                    <span className="text-sm">{file.name}</span>
                    <button
                      type="button"
                      className="text-red-500 text-xs"
                      onClick={() => handleRemoveFile(index)}
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div>
              <OutlinedInput
                className="w-full h-10"
                placeholder="نام فایل"
                value={fileName}              
                disabled
              />
            </div>
            <div>
              <OutlinedInput
                className="w-full h-10"
                placeholder="پیشنهاد تعداد اقساط و توضیحات"  
                value={description}
                onChange={(e) => setDescription(e.target.value)}   
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="gap-5">
          <Button onClick={()=>{
            handleSubmit()
            handleClose()
          }}>ذخیره</Button>
          <Button onClick={handleClose}>انصراف</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
