import React from "react";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

const PrefactorSkeleton = () => {
  return (
    <div className="w-full h-auto bg-white mt-10 py-5 lg:px-40 px-2 pb-24">
      {/* Title */}
      <div className="flex justify-center w-full mb-10 h-auto">
        <Skeleton variant="text" width={150} height={40} />
      </div>

      {/* User Info */}
      <div className="w-full h-auto flex mb-1">
        <Skeleton variant="text" width={200} height={30} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {Array.from({ length: 6 }).map((_, i) => (
                <TableCell key={i} align="center">
                  <Skeleton variant="text" width={100} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Array.from({ length: 6 }).map((_, i) => (
                <TableCell key={i} align="center">
                  <Skeleton variant="text" width={120} />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details */}
      <div className="w-full h-auto flex mb-1 mt-5">
        <Skeleton variant="text" width={150} height={30} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableCell key={i} align="center">
                  <Skeleton variant="text" width={100} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableCell key={i} align="center">
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payment Details Accordion */}
      <div style={{ marginTop: "20px" }}>
        <Accordion defaultExpanded>
          <AccordionSummary>
            <Skeleton variant="text" width={150} height={30} />
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <TableCell key={i} align="center">
                        <Skeleton variant="text" width={80} />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <TableCell key={i} align="center">
                        <Skeleton variant="text" width={100} />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default PrefactorSkeleton;
