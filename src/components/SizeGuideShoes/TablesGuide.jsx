import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@nextui-org/react";

const listSizeGuide = [
  {
    size: 35,
    descrip: "21cm",
  },
  {
    size: 36,
    descrip: "22cm",
  },
  {
    size: 37,
    descrip: "23cm",
  },
  {
    size: 38,
    descrip: "24cm",
  },
  {
    size: 39,
    descrip: "25cm",
  },
];

export default function TablesGuide() {
  return (
    <Table removeWrapper>
      <TableHeader aria-label="Example static collection table">
        <TableColumn className=" text-md font-semibold uppercase">Talles</TableColumn>
        <TableColumn className=" text-md font-semibold uppercase">Medidas</TableColumn>
      </TableHeader>
      <TableBody>
        {listSizeGuide.map((item, index) => {
          const { size, descrip } = item;
          return (
            <TableRow key={index}>
              <TableCell className=" font-normal text-base text-colorBlack-400">{size}</TableCell>
              <TableCell className=" font-normal text-base text-colorBlack-400">{descrip}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
