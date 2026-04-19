import SizeChart from "../size-chart";

export const menFootwear = {
  sections: [
    {
      title: "EU Men size",
      mainTitle: "",
      sizeType: "",
      sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
      rows: [
        {
          label: "Italy",
          values: ["39", "40", "41", "42", "43", "44", "45", "46"],
        },
        {
          label: "UK",
          values: [
            "5,5 - 6",
            "6,5",
            "7 - 7,5",
            "8",
            "8,5 - 9",
            "9,5",
            "10 - 10,5",
            "11",
          ],
        },
        {
          label: "Australia",
          values: [
            "5,5 - 6",
            "6,5",
            "7 - 7,5",
            "8",
            "8,5 - 9",
            "9,5",
            "10 - 10,5",
            "11",
          ],
        },
        {
          label: "USA",
          values: [
            "6,5 - 7",
            "7,5",
            "8 - 8,5",
            "9",
            "9,5 - 10",
            "10,5",
            "11",
            "11,5 - 12",
          ],
        },
      ],
    },
    {
      title: "Unisex Footwear",
      mainTitle: "",
      sizeType: "",
      sizes: ["35", "36", "37", "38", "39", "40"],
      rows: [
        { label: "Italy", values: ["35", "36", "37", "38", "39", "40"] },
        {
          label: "UK",
          values: ["3", "3,5 - 4", "4,5", "5", "5,5 - 6", "6,5"],
        },
        {
          label: "Australia",
          values: ["3", "3,5 - 4", "4,5", "5", "5,5 - 6", "6,5"],
        },
        { label: "USA", values: ["4,5", "5", "5,5", "6", "6,5 - 7", "7,5"] },
      ],
    },
    {
      title: "EU size",
      mainTitle: "",
      sizeType: "",
      sizes: ["41", "42", "43", "44", "45", "46"],
      rows: [
        { label: "Italy", values: ["41", "42", "43", "44", "45", "46"] },
        {
          label: "UK",
          values: ["7 - 7,5", "8", "8,5 - 9", "9,5", "10 - 10,5", "11"],
        },
        {
          label: "Australia",
          values: ["7 - 7,5", "8", "8,5 - 9", "9,5", "10 - 10,5", "11"],
        },
        {
          label: "USA",
          values: ["8 - 8,5", "9", "9,5 - 10", "10,5", "11", "11,5 - 12"],
        },
      ],
    },
  ],
  disclaimer: [
    "Possible ±0.5cm discrepancy on size measurements",
    "Our items have the Italian size on the label. If the size you chose online is a local conversion,",
    "it may not be the same number you see written on the label.",
  ],
};
export default function Footwear() {
  return <SizeChart {...menFootwear} />;
}
