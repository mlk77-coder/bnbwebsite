import SizeChart from "../size-chart";

export const menApparel = {
  sections: [
    {
      title: "Italian sizes",
      mainTitle: "",
      sizeType: "cm",
      sizes: ["42", "44", "46", "48", "50", "52", "54", "56", "58"],
      rows: [
        {
          label: "Height",
          values: [
            "168",
            "171",
            "174",
            "177",
            "180",
            "183",
            "186",
            "189",
            "192",
          ],
        },
        {
          label: "Chest",
          values: ["84", "88", "92", "96", "100", "104", "108", "112", "116"],
        },
        {
          label: "Waist",
          values: [
            "74",
            "78",
            "82",
            "86",
            "90",
            "94,6",
            "99,2",
            "103,8",
            "108,4",
          ],
        },
        {
          label: "Hips",
          values: ["88", "92", "96", "100", "104", "108", "112", "116", "120"],
        },
        {
          label: "Arms",
          values: [
            "82",
            "83,5",
            "85",
            "86,5",
            "88",
            "89,5",
            "91",
            "92,5",
            "94",
          ],
        },
        {
          label: "Inner leg",
          values: [
            "77,8",
            "79,1",
            "80,4",
            "81,7",
            "83",
            "84,3",
            "85,6",
            "86,9",
            "88,2",
          ],
        },
      ],
    },
    {
      title: "Alpha sizes",
      mainTitle: "",
      sizeType: "cm",
      sizes: [
        "XS\n42",
        "S\n44/46",
        "M\n46/48",
        "L\n50",
        "XL\n52/54",
        "XXL\n54/56",
        "XXXL\n58",
      ],
      rows: [
        {
          label: "Height",
          values: ["168", "172", "176", "180", "184", "188", "192"],
        },
        {
          label: "Chest",
          values: ["82", "88", "94", "100", "106", "112", "118"],
        },
        {
          label: "Waist",
          values: ["74", "78", "86", "90", "99,2", "103,8", "108,4"],
        },
        {
          label: "Hips",
          values: ["86", "92", "98", "104", "110", "116", "122"],
        },
        { label: "Arms", values: ["82", "84", "86", "88", "90", "92", "94"] },
        {
          label: "Inner leg",
          values: ["77,9", "79,6", "81,3", "83", "84,7", "86,4", "88,1"],
        },
      ],
    },
    {
      title: "",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">ONE SIZE</h2><p>Fits all sizes from 42 to 58</p><p>Fits all sizes from XS to XXXL</p></div>`,
      sizeType: "",
      sizes: [],
      rows: [],
    },
    {
      title: "Comparison Chart",
      mainTitle: "",
      sizeType: "",
      sizes: ["42", "44", "46", "48", "50", "52", "54", "56", "58"],
      rows: [
        {
          label: "France",
          values: ["42", "44", "46", "48", "50", "52", "54", "56", "58"],
        },
        {
          label: "Germany",
          values: ["40", "42", "44", "46", "48", "50", "52", "54", "56"],
        },
        {
          label: "Spain",
          values: ["42", "44", "46", "48", "50", "52", "54", "56", "58"],
        },
        {
          label: "UK",
          values: ["32", "34", "36", "38", "40", "42", "44", "46", "48"],
        },
        {
          label: "Australia",
          values: ["6", "8", "10", "12", "14", "16", "18", "20", "22"],
        },
        {
          label: "USA",
          values: ["32", "34", "36", "38", "40", "42", "44", "46", "48"],
        },
      ],
    },
  ],
  disclaimer: ["Disclaimer: possible ±0.5cm discrepancy on size measurements"],
};
export default function Apparel() {
  return <SizeChart {...menApparel} />;
}
