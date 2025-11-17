'use client'

import useGetINP from "@/app/api/getGhestDoc/hook";
import useGetAddFactor from "@/app/api/addFactor/hook";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import useDelDoc from "@/app/api/deleteGhestRequest/hook";
import useAddDoc from "@/app/api/insertGhestRequest/hook";
import useEditDoc from "@/app/api/editGhestRequest/hook";
import Loading from "./loading";
import dynamic from "next/dynamic";
const Add = dynamic(() => import("./_components/AddInpDialog"), {ssr: false,});
const Edit = dynamic(() => import("./_components/EditInpDialog"), {ssr: false,});
const Del = dynamic(() => import("./_components/DeleteInpDialog"), {ssr: false,});
const AutoHideDialog = dynamic(() => import("@/common/AutoHideDialog/AutoHideDialog"), {ssr: false,});

const InstallmentPayment = () => {

  const [mounted,setMounted] = useState(false)
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
  const [userToken,setUserToken] = useState<any>(null)
  const [selectedId, setSelectedId] = useState(null);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [fileBase64List, setFileBase64List] = React.useState<string[]>([]);
  const [description, setDescription] = React.useState("");
  const [open, setOpen] = useState(false);
  // console.log(selectedId);
  
  useEffect(()=>{
    setMounted(true)
  },[])
  
  useEffect(()=>{
    const userTokenn = localStorage.getItem("userToken")
    if(userTokenn){
      setUserToken(userTokenn)
    }
  },[mounted])

  // make factor
  
  const { result, loading, error,getAddFactor } = useGetAddFactor();
  
  useEffect(()=>{
    if (userToken) {
      const data = localStorage.getItem("userFactor");
      const factorInfo = data ? JSON.parse(data) : null;
      getAddFactor(factorInfo,userToken);  
    }
  },[userToken])
  // console.log(result);
  
  // end make factor
  // console.log(result?.data?.Data.Id);
  
  // init data
  const params = {
    idFactor: result?.data?.Data.Id,
  };
  const { inp, loadingInp, errorInp,getINP } = useGetINP(params, userToken,result);
  // console.log(inp);
// end init data

// new

const { addDocLoading, addDocError, addDocResponse, getAddDoc } = useAddDoc(userToken);

const handleSubmit = () => {
  const currentDataparam = {
    idFactor: result?.data?.Data.Id,
    ListDoc: files.map((file, index) => ({
      id: 0,
      idFactor: result?.data?.Data.Id,
      base64Image: fileBase64List[index],
      Description: description,
      filename: file.name,
    })),
  };

  if (!currentDataparam.idFactor || currentDataparam.ListDoc.length === 0) {
    console.log("Incomplete data, cannot submit");
    return;
  }

  console.log(currentDataparam);
  getAddDoc(currentDataparam);
};
// console.log(addDocResponse);

useEffect(()=>{
  if (addDocResponse && addDocResponse?.data?.resCode === 1 && addDocResponse?.data?.Data > 0) {
    getINP()
    setFileName("");  
    setFiles([]);
    setFileBase64List([]);
    setDescription("")
    setOpen(true)
    console.log(addDocResponse);
    
  }
  },[addDocResponse])
// end new

// edit
 const selectForEdit = (inp && inp?.length > 0) ? inp.find((item:any)=>item.id === selectedId) : null;
 
 function fixBase64Image(obj:any) {
  const extension = obj.fileName.split('.').pop()?.toLowerCase();

  const mimeMap: Record<string, string>= {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
  };

  const mimeType = mimeMap[extension || ''] || 'application/octet-stream';

  // Only prefix if it's not already a full Data URL
  if (!obj.base64Image.startsWith('data:')) {
    obj.base64Image = `data:${mimeType};base64,${obj.base64Image}`;
  }

  return obj;
}

const fixed = selectForEdit && fixBase64Image(selectForEdit);

const { editDocLoading, editDocError, editDocResponse, getEditDoc } = useEditDoc(userToken)
 
const handleSubmitEdit = (data:any) =>{

 const params = {
  "idFactor":fixed?.idFactor,
  "ListDoc":[
             { 
              "id": fixed?.id,
              "idFactor": fixed?.idFactor,
              "base64Image" : data.image, 
              "Description" : data.description,  
              "filename" : data.fileName
             }
            ]
 }
 getEditDoc(params)
}

useEffect(()=>{
  if (editDocResponse && editDocResponse?.data?.resCode === 1 && addDocResponse?.data?.Data > 0) {
    getINP()
  }
  },[editDocResponse])
// end edit

// DELETE
const { delDocLoading, delDocError, delDocResponse, getDelDoc } = useDelDoc(userToken);
const param = {
  "id": selectedId ? selectedId : null
}
const handleDel = ()=>{
  getDelDoc(param)
}
// console.log(delDocResponse);
useEffect(()=>{
if (delDocResponse && delDocResponse?.data?.Data === true && delDocResponse?.data?.resCode) {
  getINP()
  setSelectedId(null)
}
},[delDocResponse])
// END DELETE

// dialog messages
const dialogTitle = ' انتظار تایید اسناد'
const dialogContent = 'پس از تایید خرید قسطی میتوانید با مراجعه به پروفایل خود از قسمت "سفارشات" اقساط خود را مشاهده و پرداخت نمایید.'
// end dialog messages

  return (
    <>
      {user ? (
        <>
          <div className="w-full flex p-5 justify-center bg-white">
            <h3 className="font-semibold">اسناد خرید قسطی</h3>
          </div>
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 xl:px-64 py-5 container items-center">
              <div className="lg:col-span-3 md:col-span-2 col-span-1 flex justify-center gap-10 bg-white p-3 rounded-lg shadow-md">
                <button className="flex items-center px-3 py-1 cursor-pointer" onClick={()=>(setOpenAdd(true))}>
                    <span>جدید</span> <FiFilePlus className="text-xl"/>
                </button>
                <button className={selectedId ? "flex items-center px-3 py-1 cursor-pointer" : "flex items-center px-3 py-1 text-gray-500"} disabled={!selectedId} onClick={()=>(setOpenEdit(true))}>
                    <span>ویرایش</span> <FaEdit className="text-xl"/>
                </button>
                <button className={selectedId ? "flex items-center px-3 py-1 cursor-pointer" : "flex items-center px-3 py-1 text-gray-500"} disabled={!selectedId} onClick={()=>(setOpenDel(true))}>
                    <span>حذف</span> <RiDeleteBinLine className="text-xl"/>
                </button>
              </div>
              {(loadingInp || addDocLoading) ? <Loading/> : 
              <>
              {(inp && inp?.length > 0) ?
                inp.map((item:any) => (
                    <div
                    key={item.id}
                    onClick={() =>
                        setSelectedId((prevSelectedId) =>
                          prevSelectedId === item.id ? null : item.id
                        )
                      }
                      className={`cursor-pointer bg-white rounded-2xl shadow-md border 
                        ${selectedId === item.id 
                          ? "border-blue-500 ring-2 ring-blue-300 bg-blue-50" 
                          : "border-gray-200 hover:border-blue-400 hover:shadow-md"} 
                        p-4 transition duration-300 flex flex-col items-start relative`}
                  >
                    {selectedId === item.id ? (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow">
                     انتخاب شده
                    </div>
                    ) : <div className="absolute top-2 left-2 px-2 py-0.5 text-xl">
                    <FaRegCircle className="text-blue-500"/>
                   </div>}
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      شماره فاکتور: {item.idFactor}
                    </h2>

                    <div className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">توضیحات:</span>{" "}
                      {item.Description}
                    </div>

                    <div className="text-sm text-gray-600 mb-1 gap-1 flex">
                      <span className="font-medium">نام فایل:</span>
                      <span>{item.fileName}</span>
                    </div>

                    {item.base64Image && (
                      <div className="mt-3 flex justify-center w-full">
                        <img
                          src={item.base64Image?.startsWith('data:') ? item.base64Image : `data:image/png;base64,${item.base64Image}`}
                          alt="تصویر فایل"
                          className="w-full h-48 object-contain rounded-md border-2 border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                )) : <div className="lg:col-span-3 md:col-span-2 col-span-1 flex justify-center"><span>برای این فاکتور سند جدید اضافه کنید</span></div>}
                </>
                }
            </div>
          </div>
          <Add open={openAdd} setOpen={setOpenAdd} fileName={fileName} setFileName={setFileName} files={files} setFiles={setFiles} fileBase64List={fileBase64List} setFileBase64List={setFileBase64List} description={description} setDescription={setDescription} handleSubmit={handleSubmit}/>
          <Edit open={openEdit} setOpen={setOpenEdit} fixed={fixed} handleSubmitEdit={handleSubmitEdit}/>
          <Del open={openDel} setOpen={setOpenDel} handleDel={handleDel}/>
          <AutoHideDialog open={open} onClose={() => setOpen(false)} duration={20000} dialogTitle={dialogTitle} dialogContent={dialogContent}/>
        </>
      ) : (
        <div className="flex justify-center mt-10 text-red-500">
          <span>برای مشاهده ی پرداخت قسطی ابتدا وارد شوید</span>
        </div>
      )}
    </>
  );
};

export default InstallmentPayment;