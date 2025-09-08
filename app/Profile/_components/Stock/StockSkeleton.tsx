import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";

const StockSkeleton = () => {

  const rows = 5;
  const columns = 6;

  return (
    <>
        <TableContainer
                component={Paper}
                className="shadow-md rounded-xl"
              >
                <Table>
                  <TableHead className="bg-gray-200">
                    <TableRow>
                      {Array.from({ length: columns }).map((_, colIdx) => (
                        <TableCell key={colIdx} align="center">
                          <Skeleton variant="text" width={80} height={20} />
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.from({ length: rows }).map((_, rowIdx) => (
                      <TableRow key={rowIdx}>
                        {Array.from({ length: columns }).map((_, colIdx) => (
                          <TableCell key={colIdx} align="center">
                            <Skeleton variant="text" width="100%" height={24} />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
    </>
  )
}

export default StockSkeleton