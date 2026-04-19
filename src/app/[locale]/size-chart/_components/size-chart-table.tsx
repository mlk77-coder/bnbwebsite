import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SizeSection } from "@/types/size-chart";
import { FC } from "react";

type PropsType = {
  section: SizeSection;
};
const SizeChartTable: FC<PropsType> = ({ section }) => {
  return (
    <div className="mb-8" key={section.title}>
      <div className="overflow-x-auto">
        <Table className="min-w-full text-sm">
          <TableHeader className="border-b border-border">
            <TableRow>
              <TableCell className="font-medium text-start text-orange w-[300px]">
                {section.title}
              </TableCell>
              {section.sizes.map((size, idx) => (
                <TableCell
                  key={idx}
                  className="font-medium whitespace-pre-line text-center"
                >
                  {size}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {section.sizeType.length > 0 ? (
              <TableRow>
                {section.sizes
                  .slice(0, section.sizes.length - 1)
                  .map((_, i) => (
                    <TableCell key={i}></TableCell>
                  ))}
                <TableCell colSpan={2} className="text-sm px-0 text-end">
                  Size measurements{" "}
                  <span className="font-bold">in {section.sizeType}</span>
                </TableCell>
              </TableRow>
            ) : null}
            {section.rows.map((row, idx) => (
              <TableRow
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-100" : "bg-background"}
              >
                <TableCell className="font-medium text-start w-[300px]">
                  {row.label}
                </TableCell>
                {row.values.map((value, valueIdx) => (
                  <TableCell key={valueIdx} className="text-center">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SizeChartTable;
