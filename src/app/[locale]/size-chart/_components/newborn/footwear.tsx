import SizeChart from "../size-chart";

export const newbornFootwear = {
  sections: [
    {
      title: "Euro",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">NEWBORN FOOTWEAR 3-9 MONTHS OLD</h2>`,
      sizeType: "",
      sizes: ["16", "17", "18", "19"],
      rows: [
        { label: "United Kingdom", values: ["1,5C", "2C", "3C", "4C"] },
        { label: "USA", values: ["2,5", "3", "4", "4,5"] },
      ],
    },
    {
      title: "Euro",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">FIRST STEPS FOOTWEAR 6-12 MONTHS OLD</h2>`,
      sizeType: "",
      sizes: ["18", "19", "20", "21"],
      rows: [
        { label: "United Kingdom", values: ["3C", "3,5C", "4C", "5C"] },
        { label: "USA", values: ["4", "4,5", "5", "5,5"] },
      ],
    },
  ],
  disclaimer: ["Disclaimer: possible ±1cm discrepancy on size measurements"],
};
export default function Footwear() {
  return <SizeChart {...newbornFootwear} />;
}
