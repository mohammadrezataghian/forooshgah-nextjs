'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { OutlinedInput } from '@mui/material';

export default function Edit({open,setOpen,fixed,handleSubmitEdit}) {

const [fileName,setFileName] = React.useState('')
const [description,setDescription] = React.useState('')
const [image,setImage] = React.useState('')

React.useEffect(() => {
  if (fixed) {
    setFileName(fixed.fileName || "");
    setDescription(fixed.Description || "");
    setImage(fixed.base64Image || "");
  }
}, [fixed]);

  const handleClose = () => {
    setOpen(false);
  };

const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const mimeMap = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
    };
    const mimeType = mimeMap[extension || ''] || 'application/octet-stream';

    const base64 = reader.result?.toString().split(',')[1]; // remove old prefix if any
    const formattedBase64 = `data:${mimeType};base64,${base64}`;

    setImage(formattedBase64);
    setFileName(file.name);
  };
  reader.readAsDataURL(file);
};

const data = {
  fileName : fileName ? fileName : '',
  description : description ? description : '',
  image : image ? image : '',
}

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>ویرایش سند</DialogTitle>
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
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".png,.jpg,.jpeg"/>
              </label>
          </div>
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
            handleSubmitEdit(data)
            handleClose()
          }}>ذخیره</Button>
          <Button onClick={handleClose}>انصراف</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
