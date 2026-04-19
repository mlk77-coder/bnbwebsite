import SizeChart from "../size-chart";

export const girlFootwear = {
  sections: [
    {
      title: "Euro",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">GIRLS FOOTWEAR 1-5 YEARS OLD</h2></div>`,
      sizeType: "",
      sizes: ["20", "21", "22", "23", "24", "25"],
      rows: [
        {
          label: "United Kingdom",
          values: ["4C", "5C", "5,5C", "6C", "7,5C", "8C"],
        },
        { label: "USA", values: ["5", "5,5", "6", "7", "8", "8,5"] },
      ],
    },
    {
      title: "Euro",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">GIRLS FOOTWEAR 1-5 YEARS OLD</h2></div>`,
      sizeType: "",
      sizes: ["26", "27", "28", "29", "30"],
      rows: [
        {
          label: "United Kingdom",
          values: ["9C", "10C", "11C", "11,5C", "12C"],
        },
        { label: "USA", values: ["9,5", "10,5", "11,5", "12", "12,5"] },
      ],
    },
    {
      title: "Euro",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">GIRLS FOOTWEAR 6-14 YEARS OLD</h2></div>`,
      sizeType: "",
      sizes: ["31", "32", "33", "34", "35"],
      rows: [
        {
          label: "United Kingdom",
          values: ["12,5C", "13,5C", "2Y", "2,5Y", "3Y"],
        },
        { label: "USA", values: ["13,5", "1,5", "2,5", "3", "4"] },
      ],
    },
    {
      title: "Euro",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">GIRLS FOOTWEAR 6-14 YEARS OLD</h2></div>`,
      sizeType: "",
      sizes: ["36", "37", "38", "39", "40"],
      rows: [
        {
          label: "United Kingdom",
          values: ["4Y", "5Y", "5,5Y", "6Y", "6,5Y"],
        },
        { label: "USA", values: ["4,5", "5,5", "6", "6,5", "7"] },
      ],
    },
  ],
  disclaimer: ["Disclaimer: possible ±1cm discrepancy on size measurements"],
};
export default function Footwear() {
  return <SizeChart {...girlFootwear} />;
}
