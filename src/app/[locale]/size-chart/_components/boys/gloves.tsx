import SizeChart from "../size-chart";

export const boysGloves = {
  sections: [
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">WOOL GLOVES</h2><p>KID 12/18 MONTHS - 5/6 YEARS</p></div>`,
      sizeType: "cm",
      sizes: ["82-90", "104-116"],
      rows: [
        { label: "Hand length", values: ["9-10", "11-13"] },
        { label: "Hand circumference", values: ["12-13", "14-15"] },
      ],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">WOOL GLOVES</h2><p>JUNIOR 6/7 YEARS - 13/14 YEARS</p></div>`,
      sizeType: "cm",
      sizes: ["S-L", "XL-3XL"],
      rows: [
        { label: "Hand length", values: ["13-15", "17"] },
        { label: "Hand circumference", values: ["15-16", "17"] },
      ],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">FABRIC GLOVES</h2><p>KID 12/18 MONTHS - 5/6 YEARS</p></div>`,
      sizeType: "cm",
      sizes: ["82", "90-98", "104-114", "116"],
      rows: [
        { label: "Hand length", values: ["9", "10", "11", "13"] },
        { label: "Hand circumference", values: ["12", "13", "14", "15"] },
      ],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">FABRIC GLOVES</h2><p>JUNIOR 6/7 YEARS - 13/14 YEARS</p></div>`,
      sizeType: "cm",
      sizes: ["S", "M-L", "XL-3XL"],
      rows: [
        { label: "Hand length", values: ["13", "15", "17"] },
        { label: "Hand circumference", values: ["15", "16", "17"] },
      ],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
export default function Gloves() {
  return <SizeChart {...boysGloves} />;
}
