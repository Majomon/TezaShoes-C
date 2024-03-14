import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@nextui-org/react";

export default function TablesGuide({ categoryDetailId }) {

  return (
    <Table removeWrapper>
      <TableHeader aria-label="Example static collection table">
        <TableColumn className=" text-md font-semibold uppercase">
          Talles
        </TableColumn>
        <TableColumn className=" text-md font-semibold uppercase">
          Medidas
        </TableColumn>
      </TableHeader>
      <TableBody>
        {categoryDetailId?.tableSizes?.map((item, index) => {
          const { size, measure } = item;
          return (
            <TableRow key={index}>
              <TableCell className=" font-normal text-base text-colorBlack-400">
                {size}
              </TableCell>
              <TableCell className=" font-normal text-base text-colorBlack-400">
                {measure}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
