'use client'

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TruncatedText from "./TextTruncate";
import { Button } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FullScreenDialog from "./ShowInfoDialog";

const DataTable = ({ Response,handleSearch }) => {
  const data = Response ? Response?.data?.Data : [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // handle comma
  const autocomma = (number_input) =>
    new Intl.NumberFormat("en-US").format(number_input);
  //handle comma

  return (
    <>
      {Response?.data?.resCode === 1 ?
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="text-nowrap">شماره اشتراک</TableCell>
                <TableCell align="center" className="text-nowrap">نام و نام خانوادگی</TableCell>
                <TableCell align="center">تاریخ</TableCell>
                <TableCell align="center">کل مبلغ</TableCell>
                <TableCell align="center">شماره موبایل</TableCell>
                <TableCell align="center">آدرس</TableCell>
                <TableCell align="center">وضعیت</TableCell>
                <TableCell align="center">ارسال</TableCell>
                <TableCell align="center">تحویل</TableCell>
                <TableCell align="center">نمایش</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item) => (
                  <TableRow key={item.Id} hover role="checkbox" tabIndex={-1}>
                    <TableCell align="center">{item.EshterakNO}</TableCell>
                    <TableCell align="center" className="text-nowrap">
                      {item.FullNameKharidar}
                    </TableCell>
                    <TableCell align="center">{item.FactorDate}</TableCell>
                    <TableCell align="center" className="text-nowrap">
                      {autocomma(item.Mablaghekol)} ریال
                    </TableCell>
                    <TableCell align="center">{item.MobileKharidar}</TableCell>
                    <TableCell align="center" className="text-nowrap">
                        <TruncatedText text={item.AddressPerson} limit={30} />
                    </TableCell>
                    <TableCell align="center" className="text-nowrap">{item.TaeedeTaminKonande ? 'تایید شده' : 'تایید نشده'}</TableCell>
                    <TableCell align="center" className="text-nowrap">{item.ErsalByTaminKonande ? 'ارسال شده' : 'ارسال نشده'}</TableCell>
                    <TableCell align="center" className="text-nowrap">{item.TahvilShode ? 'تحویل شده' : 'تحویل نشده'}</TableCell>
                    <TableCell align="center">
                        <Button className="text-white" onClick={() => {
                        setSelectedRow(item);
                        setOpen(true);
                        }}>
                         <VisibilityIcon/>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data && data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد سطر :"
          labelDisplayedRows={({ from, to, count }) =>
            `${from} تا ${to} از ${count !== -1 ? count : `بیشتر از ${to}`} محصول`
          }
          sx={{ "& .MuiToolbar-root" : {
            pl:0,
          },
          "& .MuiSvgIcon-root": {
          color: "#000000", 
          },
          "& .MuiTablePagination-actions" :{
            ml:'0'
          }
        }}
        />
      </Paper>
      : 
      <div className="w-full p-5 flex justify-center">
        <span className="text-red-500">{Response?.data?.resMessage}</span>
      </div>
      }
      <FullScreenDialog open={open} setOpen={setOpen} selectedRow={selectedRow} handleSearch={handleSearch}/>
    </>
  );
};

export default DataTable;
