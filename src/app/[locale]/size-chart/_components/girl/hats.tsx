import SizeChart from "../size-chart";

export const girlHats = {
  sections: [
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">WOOL HATS KID GIRL 12/18 MONTHS - 5/6 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: ["82-98\n1-3 years", "104-116\n5-6 years"],
      rows: [{ label: "Head circumference", values: ["48-50", "51-52"] }],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">WOOL HATS JUNIOR GIRL 6/7 YEARS - 13/14 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: ["S-L\n6-9 years", "XL-3XL\n10-14 years"],
      rows: [{ label: "Head circumference", values: ["52-54", "56"] }],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">FABRIC HATS KID GIRL 12/18 MONTHS - 5/6 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: [
        "82-90\n12-24 months",
        "98\n2-3 years",
        "104\n3-4 years",
        "110-116\n4-6 years",
      ],
      rows: [{ label: "Head circumference", values: ["48", "50", "51", "52"] }],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">FABRIC HATS JUNIOR GIRL 6/7 YEARS - 13/14 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: ["S\n6-7 years", "M-L\n7-9 years", "XL-3XL\n10-14 years"],
      rows: [{ label: "Head circumference", values: ["52", "54", "56"] }],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
const Hats = () => {
  return <SizeChart {...girlHats} />;
};

export default Hats;
