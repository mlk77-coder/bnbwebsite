import SizeChart from "../size-chart";

export const newbornHats = {
  sections: [
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">WOOL HATS</h2><p>0-18 Months</p></div>`,
      sizeType: "cm",
      sizes: ["50-56\n0-3 months", "62-68\n3-9 months", "74-82\n9-18 months"],
      rows: [{ label: "Head circumference", values: ["40", "42-44", "46-48"] }],
    },
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">FABRIC HATS</h2><p>0-18 Months</p></div>`,
      sizeType: "cm",
      sizes: [
        "56\n1-3 months",
        "62\n3-6 months",
        "68\n6-9 months",
        "74\n9-12 months",
        "82\n12-18 months",
      ],
      rows: [
        { label: "Head circumference", values: ["40", "42", "44", "46", "48"] },
      ],
    },
  ],
  disclaimer: ["Disclaimer: possible ±0.5cm discrepancy on size measurements"],
};
const Hats = () => {
  return <SizeChart {...newbornHats} />;
};

export default Hats;
