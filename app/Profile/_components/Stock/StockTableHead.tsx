import { TableCell, TableRow } from "@mui/material";
import TableHead from "@mui/material/TableHead";

export default function EnhancedTableHead() {

    const headCells = [
      {
        id: "action",
        numeric: false,
        label: "ردیف",
      },
      {
        id: "action",
        numeric: false,
        label: "عملیات",
      },
      {
        id: "date",
        numeric: true,
        label: "تاریخ",
      },
      {
        id: "remained",
        numeric: true,
        label: "مانده",
      },
      {
        id: "increase",
        numeric: true,
        label: "افزایش",
      },
      {
        id: "decrease",
        numeric: true,
        label: "کاهش",
      },
      {
        id: "description",
        numeric: true,
        label: "توضیحات",
      },
    ];
    return (
      <TableHead className="bg-gray-300">
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id} align="center" padding="normal">
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }