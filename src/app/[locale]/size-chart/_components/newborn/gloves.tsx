import SizeChart from "../size-chart";

export const newbornGloves = {
  sections: [
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">WOOL GLOVES</h2><p>Baby 0-18 Months</p></div>`,
      sizeType: "cm",
      sizes: ["50-56\n0-3 months", "62-68\n3-9 months", "74-82\n9-18 months"],
      rows: [
        { label: "Hand length", values: ["7", "7-8", "9-10"] },
        { label: "Hand circumference", values: ["10", "10-11", "12-13"] },
      ],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">FABRIC GLOVES</h2><p>Baby 0-18 Months</p></div>`,
      sizeType: "cm",
      sizes: ["56-62\n1-6 months", "68-74\n6-12 months", "82\n12-18 months"],
      rows: [
        { label: "Hand length", values: ["7", "8", "9"] },
        { label: "Hand circumference", values: ["10", "11", "12"] },
      ],
    },
  ],
  disclaimer: ["Disclaimer: possible ±0.5cm discrepancy on size measurements"],
};
export default function Gloves() {
  return <SizeChart {...newbornGloves} />;
}
