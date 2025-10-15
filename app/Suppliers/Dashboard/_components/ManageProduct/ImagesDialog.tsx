'use client'

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide, { SlideProps } from "@mui/material/Slide";
import Cookies from "js-cookie";
import useGetImages from "@/app/api/getKalaImageList/hook";
import { Divider } from "@mui/material";
import { FiFilePlus } from "react-icons/fi";
import { FaRegCircle } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import INPLoading from "@/app/installmentPayment/loading";
import useAddDoc from "@/app/api/insertKalaImage/hook";
import useDelDoc from "@/app/api/deleteKalaImage/hook";
import dynamic from "next/dynamic";
const ConfirmationDialog = dynamic(() => import("@/common/ConfirmationDialog/ConfirmationDialog"), { ssr: false });
const Add = dynamic(() => import("./AddImageDialog"), { ssr: false });

const Transition = React.forwardRef<unknown, SlideProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ImagesDialogProps = {
  open:boolean; 
  setOpen:React.Dispatch<React.SetStateAction<boolean>>; 
  selectedRow:any;
}

export default function ImagesDialog({ open, setOpen, selectedRow }:ImagesDialogProps) {
  
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [fileName, setFileName] = React.useState("");
  const [files, setFiles] = React.useState<any[]>([]);
  const [fileBase64List, setFileBase64List] = React.useState([]);
  const [description, setDescription] = React.useState("");

  const user = React.useMemo(() => {
    const cookie = Cookies.get("supplierUser");
    return cookie ? JSON.parse(cookie) : null;
  }, []); // user
  const userToken = localStorage.getItem("supplierUserToken"); // token

  // get data
  const params = {
    idKala: selectedRow?.Id,
  };
  const { listLoading, listError, ListResponse, getImages } =
    useGetImages(userToken);

  React.useEffect(() => {
    if (open && selectedRow && selectedRow?.Id) {
      getImages(params);
    }
  }, [selectedRow, open]);

  const data = ListResponse?.data?.Data || [];
  // end get data

  // add doc
  const { addDocLoading, addDocError, addDocResponse, getAddDoc } =
    useAddDoc(userToken);

  const handleSubmit = () => {
    const currentDataparam = {
      idKala: selectedRow?.Id,
      listImage: files.map((file, index) => ({
        id: selectedRow?.Id,
        idKala: selectedRow?.Id,
        base64Image: fileBase64List[index],
        Description: description,
        fileName: file.name,
      })),
    };

    if (!currentDataparam.idKala || currentDataparam.listImage.length === 0) {
      console.log("Incomplete data, cannot submit");
      return;
    }
    getAddDoc(currentDataparam);
  };

  React.useEffect(() => {
    if (
      addDocResponse &&
      addDocResponse?.data?.resCode === 1 &&
      addDocResponse?.data?.Data > 0
    ) {
      getImages(params);
      setFileName("");
      setFiles([]);
      setFileBase64List([]);
      setDescription("");
    }
  }, [addDocResponse]);
  // end add doc

  // delete doc
  const { delDocLoading, delDocError, delDocResponse, getDelDoc } =
    useDelDoc(userToken);
  const param = {
    id: selectedId ? selectedId : null,
  };
  const handleDel = () => {
    getDelDoc(param);
  };

  React.useEffect(() => {
    if (
      delDocResponse &&
      delDocResponse?.data?.Data === true &&
      delDocResponse?.data?.resCode == 1
    ) {
      getImages(params);
      setSelectedId(null);
    }
  }, [delDocResponse]);
  // end delete doc

  // handle close dialog
  const handleClose = () => {
    setOpen(false);
  };
  // end handle close dialog

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
        <AppBar sx={{ position: "relative", backgroundColor: "#FFD700" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {user ? (
          <div className="w-full">
            <div className="bg-white p-1 w-full h-auto pb-24 pt-5">
              <div className="w-full mb-5 flex justify-center bg-white">
                <h3 className="font-semibold text-lg">مدیریت تصاویر کالا</h3>
              </div>
              <Divider />
              <div className="w-full flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 xl:px-64 py-5 container items-center">
                  <div className="lg:col-span-3 md:col-span-2 col-span-1 flex justify-center gap-10 bg-white p-3 rounded-lg shadow-md">
                    <button
                      className="flex items-center px-3 py-1 cursor-pointer"
                      onClick={() => setOpenAdd(true)}
                    >
                      <span>جدید</span> <FiFilePlus className="text-xl" />
                    </button>
                    <button
                      className={
                        selectedId
                          ? "flex items-center px-3 py-1 cursor-pointer"
                          : "flex items-center px-3 py-1 text-gray-500"
                      }
                      disabled={!selectedId}
                      onClick={() => setOpenDel(true)}
                    >
                      <span>حذف</span> <RiDeleteBinLine className="text-xl" />
                    </button>
                  </div>
                  {listLoading ? (
                    <INPLoading />
                  ) : (
                    <>
                      {data && data?.length > 0 ? (
                        data.map((item:any) => (
                          <div
                            key={item.id}
                            onClick={() =>
                              setSelectedId((prevSelectedId) =>
                                prevSelectedId === item.id ? null : item.id
                              )
                            }
                            className={`cursor-pointer bg-white rounded-2xl shadow-md border 
                        ${
                          selectedId === item.id
                            ? "border-blue-500 ring-2 ring-blue-300 bg-blue-50"
                            : "border-gray-200 hover:border-blue-400 hover:shadow-md"
                        } 
                        p-4 transition duration-300 flex flex-col items-start relative`}
                          >
                            {selectedId === item.id ? (
                              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow">
                                انتخاب شده
                              </div>
                            ) : (
                              <div className="absolute top-2 left-2 px-2 py-0.5 text-xl">
                                <FaRegCircle className="text-blue-500" />
                              </div>
                            )}
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                              کد محصول : {item.idKala}
                            </h2>

                            <div className="text-sm text-gray-600 mb-1 flex gap-1">
                              <span className="font-medium">توضیحات:</span>
                              <span>{item.Description}</span>
                            </div>

                            <div className="text-sm text-gray-600 mb-1 gap-1 flex">
                              <span className="font-medium">نام فایل:</span>
                              <span>{item.fileName}</span>
                            </div>

                            {item.base64Image && (
                              <div className="mt-3 flex justify-center w-full">
                                <img
                                  src={
                                    item.base64Image?.startsWith("data:")
                                      ? item.base64Image
                                      : `data:image/png;base64,${item.base64Image}`
                                  }
                                  alt="تصویر فایل"
                                  className="w-full h-48 object-contain rounded-md border border-gray-200"
                                />
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="lg:col-span-3 md:col-span-2 col-span-1 flex justify-center">
                          <span>برای این محصول تصویر جدید اضافه کنید</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-10 text-red-500">
            <span>برای مدیریت تصاویر ابتدا وارد شوید</span>
          </div>
        )}
        <Add
          open={openAdd}
          setOpen={setOpenAdd}
          fileName={fileName}
          setFileName={setFileName}
          files={files}
          setFiles={setFiles}
          fileBase64List={fileBase64List}
          setFileBase64List={setFileBase64List}
          description={description}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
        />
        <ConfirmationDialog open={openDel} setOpen={setOpenDel} handleDelete={handleDel} dialogTitle={'حذف عکس'} dialogContent={'آیا از حذف این عکس اطمینان دارید؟'}/>
      </Dialog>
    </React.Fragment>
  );
}