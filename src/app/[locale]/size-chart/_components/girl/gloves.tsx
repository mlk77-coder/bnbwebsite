import SizeChart from "../size-chart";

export const girlGloves = {
  sections: [
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">WOOL GLOVES KID 12/18 MONTHS - 5/6 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: ["82-90\n1-3 years", "104-116\n4-6 years"],
      rows: [
        { label: "Hand length", values: ["9-10", "11-13"] },
        { label: "Hand circumference", values: ["12-13", "14-15"] },
      ],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">WOOL GLOVES JUNIOR 6/7 YEARS - 13/14 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: ["S-L\n6-9 years", "XL-3XL\n10-14 years"],
      rows: [
        { label: "Hand length", values: ["13-15", "17"] },
        { label: "Hand circumference", values: ["15-16", "17"] },
      ],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">FABRIC GLOVES KID 12/18 MONTHS - 5/6 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: [
        "82\n12-18 months",
        "90-98\n18-36 months",
        "104-114\n3-5 years",
        "116\n5-6 years",
      ],
      rows: [
        { label: "Hand length", values: ["9", "10", "11", "13"] },
        { label: "Hand circumference", values: ["12", "13", "14", "15"] },
      ],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">FABRIC GLOVES JUNIOR 6/7 YEARS - 13/14 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: ["S\n6-7 years", "M-L\n7-9 years", "XL-3XL\n10-14 years"],
      rows: [
        { label: "Hand length", values: ["13", "15", "17"] },
        { label: "Hand circumference", values: ["15", "16", "17"] },
      ],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
export default function Gloves() {
  return <SizeChart {...girlGloves} />;
}
