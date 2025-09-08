'use client'

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EnhancedTableToolbar from "./StockTableToolbar";
import EnhancedTableHead from "./StockTableHead";
import Cookies from "js-cookie";
import { StocksRecordList } from "@/types/types";

type StockTableProps = {
  stocks:StocksRecordList | null;
  getStocks:(params: { EshterakNo: string | number | undefined }) => Promise<void>;
}

const StockTable = ({ stocks,getStocks }:StockTableProps) => {

  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
  const eshterakNo = user?.EshterakNo;
  const userToken = localStorage.getItem("userToken");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (stocks?.length || 0))
      : 0;

  const visibleRows = React.useMemo(
    () =>
      [...(stocks || [])].slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, stocks]
  );

  // handle comma
  const autocomma = (number_input:number) =>
    new Intl.NumberFormat("en-US").format(number_input);
  //handle comma
  
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar eshterakNo={eshterakNo} userToken={userToken} getStocks={getStocks}/>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead />
              <TableBody>
                {visibleRows.map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.FldRowId || index}>
                      <TableCell
                        component="th"
                        id={String(row.FldRowId) || String(index)}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.FldRowId}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={String(row.FldRowId) || String(index)}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.FldAction}
                      </TableCell>
                      <TableCell align="center">{row.FldDate}</TableCell>
                      <TableCell align="center">
                        {autocomma(row.FldMandeh)} ریال
                      </TableCell>
                      <TableCell align="center">
                        {autocomma(row.FldAfzayesh)} ریال
                      </TableCell>
                      <TableCell align="center">
                        {autocomma(row.FldKahesh)}
                      </TableCell>
                      <TableCell align="center">{row.FldTozih}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className="bg-gray-300"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={stocks?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="تعداد آیتم‌ها در صفحه :"
            sx={{
              "& .MuiToolbar-root": {
                pl: 0, // remove left padding
                ml: 0,
              },
              "& .MuiTablePagination-actions": {
                ml: 0, // remove left margin
              },
              "& .MuiSelect-select": {
                padding: 0,
              },
              "& .MuiSvgIcon-root": {
                color: "#000000", 
              },
            }}
          />
        </Paper>
      </Box>
    </>
  );
};

export default StockTable;