'use client'

import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import usePrintInstallment from '@/app/api/printInstallment/hook';
import SimpleBackdrop from '@/common/BackdropSpinnerLoading/Loading';
import Link from 'next/link';

type InstallmentTableProps = {
  installment:null | any;
  setOpenRowId:React.Dispatch<React.SetStateAction<any>>;
  openRowId:any;
  userToken:string | null;
}

const InstallmentTable = ({installment,setOpenRowId,openRowId,userToken}:InstallmentTableProps) => {

  // handle row click
  const handleRowClick = (id:any) => {
    setOpenRowId((prev:any) => (prev === id ? null : id));
  };
  // end handle row click

  // handle comma
  const autocomma = (number_input:number) =>
    new Intl.NumberFormat("en-US").format(number_input);
  //handle comma

// download pdf
const { printDocLoading, printDocError, printDocResponse, getPrint } = usePrintInstallment(userToken)
// end download pdf

const handleDownload = (data:any)=>{
  getPrint({"idGhestHeader":data})
}

useEffect(()=>{

if(printDocResponse && printDocResponse?.data.Data && printDocResponse?.data?.resCode == 1){
  const link = document.createElement("a");
  link.href = printDocResponse.data.Data;
  link.download = "document.pdf";
  link.click();
}

},[printDocResponse])

  return (
    <>
        <TableContainer
              component={Paper}
              className="rounded-lg shadow-md mb-24 h-[60vh] overflow-auto"
            >
              <Table>
                <TableHead className="bg-gray-100">
                  <TableRow>
                    <TableCell className="font-bold" align="center">
                      جزئیات
                    </TableCell>
                    <TableCell className="font-bold" align="center">
                      شماره فاکتور
                    </TableCell>
                    <TableCell className="font-bold text-nowrap" align="center">
                      نام و نام خانوادگی
                    </TableCell>
                    <TableCell className="font-bold" align="center">
                      مبلغ قسط
                    </TableCell>
                    <TableCell className="font-bold" align="center">
                      تاریخ
                    </TableCell>
                    <TableCell className="font-bold" align="center">
                      کل قسط
                    </TableCell>
                    <TableCell className="font-bold" align="center">
                      کل خرید
                    </TableCell>
                    <TableCell className="font-bold" align="center">
                      نمایش کالاها
                    </TableCell>
                    <TableCell className="font-bold text-nowrap" align="center">
                     فایل اقساط
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {installment &&
                    installment.map((row:any,index:any) => (
                      <React.Fragment key={index}>
                        <TableRow
                          className="cursor-pointer hover:bg-gray-50 transition-all"
                          onClick={() => handleRowClick(row.FactorId)}
                        >
                          <TableCell align="center">
                            <IconButton size="small">
                              {openRowId === row.FactorId ? (
                                <KeyboardArrowUp className='text-black'/>
                              ) : (
                                <KeyboardArrowDown className='text-black'/>
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">{row.FactorId}</TableCell>
                          <TableCell align="center">{row.Fullname}</TableCell>
                          <TableCell align="center">
                            {autocomma(row.GestPrice)} ریال
                          </TableCell>
                          <TableCell align="center">{row.InsertDate}</TableCell>
                          <TableCell align="center">
                            {autocomma(row.KoleGhest)} ریال
                          </TableCell>
                          <TableCell align="center">
                            {autocomma(row.KoleKharid)} ریال
                          </TableCell>
                          <TableCell align="center">
                            <Link className='flex gap-1 items-center justify-center p-4' href={`/profile/installmentDetails`}
                            //  state={{id:row.FactorId}} 
                             onClick={(event:any) => {
                              sessionStorage.setItem('idInstallmentDetails',JSON.stringify({id:row.FactorId}))
                               event.stopPropagation();
                            }}>
                              <VisibilityIcon className='text-gray-400'/>
                              <span>نمایش</span>
                            </Link>
                          </TableCell>
                          <TableCell align="center">
                            <Button variant='outlined' color='info' onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(row.IdGhestHeader);
                              }}
                            >
                            دانلود</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={8}
                          >
                            <Collapse
                              in={openRowId === row.FactorId}
                              timeout="auto"
                              unmountOnExit
                            >
                              <div className="p-10 bg-gray-50 text-sm text-gray-600 ">
                                <TableContainer component={Paper}>
                                  <Table>
                                    <TableHead className="bg-gray-300">
                                      <TableRow>
                                        <TableCell align="center">
                                          شماره
                                        </TableCell>
                                        <TableCell align="center">
                                          تاریخ
                                        </TableCell>
                                        <TableCell align="center">
                                          مبلغ
                                        </TableCell>
                                        <TableCell align="center">
                                          وضعیت
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>

                                    <TableBody>
                                      {row.ListDetail.map((item:any,index:any) => (
                                        <TableRow key={index}>
                                          <TableCell align="center">
                                            {item.Id}
                                          </TableCell>
                                          <TableCell align="center">
                                            {item.DateSarResid}
                                          </TableCell>
                                          <TableCell align="center">
                                            {autocomma(item.Mablagh)} ریال
                                          </TableCell>
                                          <TableCell align="center">
                                            {item.Vaziat}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </div>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {printDocLoading && <SimpleBackdrop open={true}/>}
    </>
  )
}

export default InstallmentTable