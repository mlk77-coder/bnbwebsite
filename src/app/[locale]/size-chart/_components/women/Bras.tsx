import Image from "next/image";
import SizeChart from "../size-chart";

export const womenBras = {
  sections: [
    {
      title: "Italian Size",
      mainTitle: "",
      sizeType: "",
      sizes: ["1°", "2°", "3°", "4°", "5°"],
      rows: [
        { label: "UK", values: ["32", "34", "36", "38", "40"] },
        { label: "USA", values: ["32", "34", "36", "38", "40"] },
        { label: "Spain", values: ["85", "90", "95", "100", "105"] },
        { label: "France", values: ["85", "90", "95", "100", "105"] },
        { label: "EU", values: ["70", "75", "80", "85", "90"] },
        { label: "Alpha sizes", values: ["XS", "S", "M", "L", "XL"] },
      ],
    },
    {
      title: "CUP B",
      mainTitle: "",
      sizeType: "cm",
      sizes: ["", "", "", "", ""],
      rows: [
        {
          label: "Breast",
          values: ["81 - 85", "86 - 90", "91 - 95", "96 - 100", "101 - 105"],
        },
        {
          label: "Under breast",
          values: ["68 - 72", "73 - 77", "78 - 82", "83 - 87", "88 - 92"],
        },
      ],
    },
    {
      title: "CUP C",
      mainTitle: "",
      sizeType: "cm",
      sizes: ["", "", "", "", ""],
      rows: [
        {
          label: "Breast",
          values: ["-", "91 - 95", "96 - 100", "101 - 105", "106 - 110"],
        },
        {
          label: "Under breast",
          values: ["-", "73 - 77", "78 - 82", "83 - 87", "88 - 92"],
        },
      ],
    },
    {
      title: "Alpha Size",
      mainTitle: "",
      sizeType: "",
      sizes: ["XS - S\n38 / 42", "M - L\n44 / 48"],
      rows: [
        { label: "Breast", values: ["81 - 90", "91 - 100"] },
        { label: "Under breast", values: ["68 - 77", "78 - 87"] },
      ],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
const Bras = () => {
  return (
    <div className="flex justify-center items-start gap-4 flex-col sm:flex-row">
      <Image
        src="/sizeguide-bras-bikini-top.webp"
        width={500}
        height={500}
        alt="sizeguide-bras-bikini-top"
      />
      <SizeChart {...womenBras} />
    </div>
  );
};

export default Bras;
