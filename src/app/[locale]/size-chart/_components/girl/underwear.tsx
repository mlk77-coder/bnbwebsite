import SizeChart from "../size-chart";

export const girlUnderwear = {
  sections: [
    {
      title: "Sizes",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">SOCKS</h2><p>KID GIRL (1-5 YEARS)</p></div>`,
      sizeType: "",
      sizes: ["1-2\n1-2 years", "3-4\n3-4 years"],
      rows: [
        { label: "Shoes number EU", values: ["20-24", "25-29"] },
        { label: "Shoes number UK", values: ["4C-7,5C", "8C-11,5C"] },
        { label: "Shoes number US", values: ["5-8", "8,5-12"] },
      ],
    },
    {
      title: "Sizes",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">SOCKS</h2><p>JUNIOR GIRL (6-14 YEARS)</p></div>`,
      sizeType: "",
      sizes: ["5-8\n5-8 years", "8-9\n8-9 years", "11-12\n11-12 years"],
      rows: [
        { label: "Shoes number EU", values: ["30-34", "35-38", "39-41"] },
        { label: "Shoes number UK", values: ["12C-2,5Y", "3Y-4Y", "5Y-6,5Y"] },
        { label: "Shoes number US", values: ["12,5-3", "4-4,5", "5,5-7"] },
      ],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
const Underwear = () => {
  return <SizeChart {...girlUnderwear} />;
};

export default Underwear;
