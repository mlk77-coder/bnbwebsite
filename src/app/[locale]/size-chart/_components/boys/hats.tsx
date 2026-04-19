import SizeChart from "../size-chart";

export const boysHats = {
  sections: [
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">WOOL HATS</h2><p>KID BOY 12/18 MONTHS - 5/6 YEARS</p></div>`,
      sizeType: "cm",
      sizes: ["82-98", "104-116"],
      rows: [{ label: "Head circumference", values: ["48-50", "51-52"] }],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">WOOL HATS</h2><p>JUNIOR BOY 6/7 YEARS - 13/14 YEARS</p></div>`,
      sizeType: "cm",
      sizes: ["S-L", "XL-3XL"],
      rows: [{ label: "Head circumference", values: ["52-54", "56"] }],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">FABRIC HATS</h2><p>KID BOY 12/18 MONTHS - 5/6 YEARS</p></div>`,
      sizeType: "cm",
      sizes: ["82-90", "98", "104", "110-116"],
      rows: [{ label: "Head circumference", values: ["48", "50", "51", "52"] }],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">FABRIC HATS</h2><p>JUNIOR BOY 6/7 YEARS - 13/14 YEARS</p></div>`,
      sizeType: "cm",
      sizes: ["S", "M-L", "XL-3XL"],
      rows: [{ label: "Head circumference", values: ["52", "54", "56"] }],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
const Hats = () => {
  return <SizeChart {...boysHats} />;
};

export default Hats;
