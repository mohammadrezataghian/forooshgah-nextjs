'use client'

import { PageContainer } from '@toolpad/core/PageContainer'
import React, { useState } from 'react'
import ToggleButtons from './ToggleButton'
import ColorPicker from './ColorPicker'
import useSaveMainConfig from '@/api/getMainConfig/saveMainConfig'
import { useAtom } from "jotai";
import { mainConfig } from "@/shared/mainConfig";
import { Button } from '@mui/material'
import Cookies from "js-cookie";
import MessageSnackbar from "@/common/Snackbar/MessageSnackbar";

const FrontSettings = () => {
 
const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;  
const userToken = localStorage.getItem("userToken");
const [config,setConfig] =  useAtom(mainConfig)
const data = config?.filter(item=>item.TypeSetting === "Config") || {}
let colorDefault = data?.find(item => item.Key === "webAppColorDefault")
// let FontDefault = data?.find(item => item.Key === "webAppFontDefault")
let ColorBoxDefault = data?.find(item => item.Key === "webAppColorBoxDefault")
const [colorbg, setColorbg] = useState(ColorBoxDefault?.Value);
const [colortxt, setColortxt] = useState(colorDefault?.Value);
// const [alignment, setAlignment] = React.useState(FontDefault?.Value);

// handle openning snackbar
const [opensnackbar, setOpensnackbar] = useState(false);
const [message,setMessage] = useState("")
// end handle openning snackbar

const { saveConfig, loading, error,getSaveConfig } = useSaveMainConfig(setMessage,setOpensnackbar);

const handleSave = () => {
  colorDefault.Value = colortxt;
  // FontDefault.Value = alignment;
  ColorBoxDefault.Value = colorbg;
  const listConfig = [ colorDefault, ColorBoxDefault];
  // const listConfig = [FontDefault, colorDefault, ColorBoxDefault];
  const params = { ListConfig: listConfig };
  getSaveConfig(params,userToken)
};

// use globally : bg-main-bg text-main-text

  return (
    <>
    <PageContainer className='pb-20'>
      {user ? 
      <>
      {/* <h6 className='bg-white p-3 pb-0 text-2xl text-blue-500'> انتخاب سایز فونت :</h6>
        <ToggleButtons alignment={alignment} setAlignment={setAlignment} /> */}
      <h6 className='bg-white p-3 text-2xl text-blue-500'>انتخاب رنگ متن  :</h6>
      <ColorPicker color={colortxt} setColor={setColortxt}/>
      <h6 className='bg-white p-3 text-2xl text-blue-500'>انتخاب رنگ پس زمینه  :</h6>
      <ColorPicker color={colorbg} setColor={setColorbg}/>
      <div className="p-4 bg-white flex">
        {loading ? 
        <Button loading variant="outlined" loadingPosition="end" disabled sx={{
          justifyContent: 'flex-end',
          minWidth: 170,
          height:40
        }}>
        ذخیره تنظیمات
      </Button>: 
        <Button
        onClick={handleSave}
        className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        ذخیره تنظیمات
      </Button>}
      </div>
      </>
      : 
      <div className="flex justify-center mt-10 text-red-500">
          <span>برای مشاهده ی تنظیمات ابتدا وارد شوید</span>
        </div>
      }
    </PageContainer>

    <MessageSnackbar snackbarOpen={opensnackbar} autoHideDuration={3000} snackbarMessage={message} setSnackbarOpen={setOpensnackbar}/>
    </>
  )
}

export default FrontSettings