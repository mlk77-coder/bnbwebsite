import SizeChart from "../size-chart";

export const womenHats = {
  sections: [
    {
      title: "International",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">Fabric Hats</h2>`,
      sizeType: "cm",
      sizes: ["S", "M", "L"],
      rows: [
        {
          label: "Head circumference",
          values: ["56", "58", "60"],
        },
      ],
    },
    {
      title: "International",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">Wool Hats</h2>`,
      sizeType: "cm",
      sizes: ["S", "-", "L"],
      rows: [
        {
          label: "Head circumference",
          values: ["56", "-", "58-60"],
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
const Hats = () => {
  return <SizeChart {...womenHats} />;
};

export default Hats;
