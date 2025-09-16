'use client'

import { PageContainer } from "@toolpad/core/PageContainer";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Cookies from "js-cookie";
import useGetListKala from "@/app/api/listKalaTaminKonande/hook";
import CustomizedDialogs from "./DialogManageProduct";
import EditProduct from "./EditProductDialog";
import DeleteProductDialog from "./DeleteProductDialog";
import ManageProductSkeleton from "./LoadingManageProduct";
import { Button } from "@mui/material";
import ImagesDialog from "./ImagesDialog";

const ManageProduct = () => {
  
  const [selected, setSelected] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [openImages, setOpenImages] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const user = Cookies.get("supplierUser")
    ? JSON.parse(Cookies.get("supplierUser") || '')
    : null;
  const userToken = localStorage.getItem("supplierUserToken");

  // get data
  const params = {
    pageIndex: page,
    pageSize: rowsPerPage,
    idTaminKonande: user?.Id,
    nameKala: "",
  };
  const { list, loading, error } = useGetListKala(
    params,
    userToken,
    page,
    rowsPerPage,
    refreshKey
  );

  // end get data

  const handleClick = (event:any, id:any) => {
    const isSelected = selected === id;
    setSelected(isSelected ? null : id);
  };

  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ?  Math.max(0, page * rowsPerPage - rows.length) : 0;

  const visibleRows = list && list?.Data?.lst;

  // dialog

  const handleClickOpen = () => {
    setOpen(true);
  };

  // end dialog

  // edit dialog

  const handleClickOpenEdit = () => {
    setEditOpen(true);
  };

  // end edit dialog

  // delete dialog

  const handleClickOpenDelete = () => {
    setDeleteOpen(true);
  };

  // end delete dialog

  return (
    <>
      <PageContainer>
        {user ? (
          <>
            {loading ? (
              <ManageProductSkeleton />
            ) : (
              <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <Toolbar
                    sx={[
                      {
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                      },
                      selected !== null && {
                        bgcolor: (theme) =>
                          alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                          ),
                      },
                    ]}
                  >
                    {selected !== null ? (
                      <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="subtitle1"
                        component="div"
                        className="text-black"
                      >
                        یک مورد انتخاب شده
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ flex: "1 1 100%" }}
                        className="text-black"
                        variant="subtitle1"
                        component="div"
                      >
                        ثبت محصول جدید
                      </Typography>
                    )}
                    {selected !== null ? (
                      <>
                        <Tooltip title="ویرایش">
                          <IconButton onClick={() => handleClickOpenEdit()}>
                            <BorderColorIcon className="text-black" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="حذف">
                          <IconButton onClick={() => handleClickOpenDelete()}>
                            <DeleteIcon className="text-black" />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <Tooltip title="جدید">
                        <IconButton onClick={() => handleClickOpen()}>
                          <LibraryAddIcon className="text-black" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Toolbar>
                  <TableContainer>
                    <Table
                      sx={{
                        minWidth: 750,
                        "& .MuiSvgIcon-root": {
                          color: "#000000",
                        },
                        "& .MuiButtonBase-root": {
                          color: "#000000",
                        },
                      }}
                      aria-labelledby="tableTitle"
                      size="medium"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">ردیف</TableCell>
                          <TableCell align="center">انتخاب</TableCell>
                          <TableCell align="center">کد کالا</TableCell>
                          <TableCell align="center">گروه کالا</TableCell>
                          <TableCell align="center">نام کالا</TableCell>
                          <TableCell align="center">واحد</TableCell>
                          <TableCell align="center">تصاویر</TableCell>
                          <TableCell align="center"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {visibleRows &&
                          visibleRows.map((row:any, index:any) => {
                            const isItemSelected = selected === row.Id;
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.Id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.Id}
                                selected={isItemSelected}
                                sx={{ cursor: "pointer" }}
                              >
                                <TableCell align="center">
                                  {index + 1}
                                </TableCell>
                                <TableCell padding="checkbox" align="center">
                                  <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                  align="center"
                                >
                                  {row.Code}
                                </TableCell>
                                <TableCell align="center">
                                  {row.NameGroup}
                                </TableCell>
                                <TableCell align="center">
                                  {row.NameKala}
                                </TableCell>
                                <TableCell align="center">
                                  {row.NameUnit}
                                </TableCell>
                                <TableCell align="center">
                                  <Button variant="outlined" className="text-nowrap" onClick={(e) => {
                                    setSelectedRow(row);
                                    setOpenImages(true);}}>مدیریت تصاویر</Button>
                                </TableCell>
                                <TableCell align="center">
                                  {row.IdKalaStore > 0 ? <span className="text-green-500">تایید شده</span> : <span className="text-yellow-600">در انتظار تایید</span>}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 
                  }}                                       if i want to set empty rows
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[20, 50, 100]}
                    component="div"
                    count={list?.Data?.totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="تعداد سطر :"
                    labelDisplayedRows={({ from, to, count }) =>
                      `${from} تا ${to} از ${count !== -1 ? count : `بیشتر از ${to}`} محصول`
                    }
                    sx={{
                      "& .MuiToolbar-root": {
                        pl: 0,
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#000000",
                      },
                    }}
                  />
                </Paper>
              </Box>
            )}
          </>
        ) : (
          <div className="flex justify-center mt-10 text-red-500">
            <span> ابتدا وارد شوید</span>
          </div>
        )}
      </PageContainer>
      <CustomizedDialogs
        open={open}
        setOpen={setOpen}
        onRefresh={() => setRefreshKey((prev) => prev + 1)}
      />
      <EditProduct
        open={editOpen}
        setOpen={setEditOpen}
        selected={selected}
        onRefresh={() => setRefreshKey((prev) => prev + 1)}
        setSelected={setSelected}
      />
      <DeleteProductDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        selected={selected}
        onRefresh={() => setRefreshKey((prev) => prev + 1)}
        setSelected={setSelected}
      />
      <ImagesDialog open={openImages} setOpen={setOpenImages} selectedRow={selectedRow}/>
    </>
  );
};

export default ManageProduct;
