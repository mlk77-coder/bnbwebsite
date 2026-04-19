import SizeChart from "../size-chart";

export const menGloves = {
  sections: [
    {
      title: "International",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">Fabric Gloves Men</h2>`,
      sizeType: "cm",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rows: [
        { label: "Knuckle height", values: ["21", "22", "23", "24", "25"] },
      ],
    },
    {
      title: "International",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">Fabric Gloves Unisex</h2>`,
      sizeType: "cm",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      rows: [
        {
          label: "Knuckle height",
          values: ["18,5", "19,5", "20,5", "21,5", "22,5", "23,5"],
        },
      ],
    },
    {
      title: "International",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">Wool Gloves Men</h2>`,
      sizeType: "cm",
      sizes: ["-", "S", "-", "L", "-"],
      rows: [
        { label: "Knuckle height", values: ["-", "21-22", "-", "23-25", "-"] },
      ],
    },
    {
      title: "International",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">Wool Gloves Unisex</h2>`,
      sizeType: "cm",
      sizes: ["-", "S", "-", "L", "-"],
      rows: [
        {
          label: "Knuckle height",
          values: ["-", "18,5-20,5", "-", "21,5-23,5", "-"],
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
export default function Gloves() {
  return <SizeChart {...menGloves} />;
}
