import SizeChart from "../size-chart";

export const womenGloves = {
  sections: [
    {
      title: "International",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">Fabric Gloves Women</h2>`,
      sizeType: "INCH",
      sizes: ["XS", "S", "M", "L", "XL"],
      rows: [
        {
          label: "Knuckle height",
          values: ["6,7", "7,1", "7,5", "7,9", "8,3"],
        },
      ],
    },
    {
      title: "International",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">Fabric gloves Unisex</h2>`,
      sizeType: "INCH",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      rows: [
        {
          label: "Knuckle height",
          values: ["7,3", "7,7", "8,1", "8,5", "8,9", "9,3"],
        },
      ],
    },
    {
      title: "International",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">Wool gloves Women</h2>`,
      sizeType: "INCH",
      sizes: ["-", "S", "-", "L", "-"],
      rows: [
        {
          label: "Knuckle height",
          values: ["-", "6,7-7,1", "-", "7,5-8,3", "-"],
        },
      ],
    },
    {
      title: "International",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">Wool gloves Unisex</h2>`,
      sizeType: "INCH",
      sizes: ["-", "S", "-", "L", "-"],
      rows: [
        {
          label: "Knuckle height",
          values: ["-", "7,3-8,1", "-", "8,5-9,3", "-"],
        },
      ],
    },
  ],
  disclaimer: [
    "Possible ±0.5inch discrepancy on size measurements",
    "Our items have the Italian size on the label. If the size you chose online is a local conversion,",
    "it may not be the same number you see written on the label.",
  ],
};
export default function Gloves() {
  return <SizeChart {...womenGloves} />;
}
