import SizeChart from "../size-chart";

export const womenApparel = {
  sections: [
    {
      title: "Italian Sizes",
      mainTitle: "",
      sizeType: "cm",
      sizes: [36, 38, 40, 42, 44, 46, 48, 50],
      rows: [
        {
          label: "Height",
          values: [162, 165, 167.5, 170, 170.5, 171, 171.5, 172],
        },
        { label: "Bust", values: [76, 80, 84, 88, 92, 97, 102, 107] },
        { label: "Waist", values: [58, 62, 66, 70, 74, 79, 84, 89] },
        { label: "Hips", values: [83, 87, 91, 95, 99, 104, 109, 114] },
        {
          label: "Arm length",
          values: [75.1, 76.4, 77.1, 79, 79.9, 80.7, 81.6, 82.4],
        },
        {
          label: "Inner leg",
          values: [77, 78, 79, 80, 80.3, 80.9, 81.2, 81.4],
        },
      ],
    },
    {
      title: "Alpha Sizes",
      mainTitle: "",
      sizeType: "cm",
      sizes: [
        "XXS\n36/38",
        "XS\n38/40",
        "S\n42",
        "M\n44/46",
        "L\n46/48",
        "XL\n48/50",
        "XXL\n50/52",
      ],
      rows: [
        { label: "Height", values: [162, 166, 170, 170.5, 171, 171.5, 172] },
        { label: "Bust", values: [76, 82, 88, 94, 100, 106, 112] },
        {
          label: "Waist",
          values: ["58-60", "64-65", 70, "75-76", "80-82", "85-88", "90-94"],
        },
        { label: "Hips", values: [83, 89, 95, 101, 107, 113, 119] },
        {
          label: "Arm length",
          values: [77, 79, 80.2, 81.4, 82.6, 83.8, 84.6],
        },
        { label: "Inner leg", values: [76, 78, 80, 80.4, 80.8, 81.2, 81.6] },
      ],
    },
    {
      title: "Comparison Chart",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">ONE SIZE</h2><p>Fits all sizes from 36 to 50</p><p>Fits all sizes from XXS to XL</p></div>`,
      sizeType: "",
      sizes: [36, 38, 40, 42, 44, 46, 48, 50],
      rows: [
        { label: "France", values: [32, 34, 36, 38, 40, 42, 44, 46] },
        { label: "Germany", values: [30, 32, 34, 36, 38, 40, 42, 44] },
        { label: "Spain", values: [34, 36, 38, 40, 42, 44, 46, 48] },
        { label: "UK", values: [4, 6, 8, 10, 12, 14, 16, 18] },
        { label: "Australia", values: [6, 8, 10, 12, 14, 16, 18, 20] },
        { label: "USA", values: [2, 4, 6, 8, 10, 12, 14, 16] },
      ],
    },
  ],
  disclaimer: [
    "Possible ±0.5cm discrepancy on size measurements",
    "Our items have the Italian size on the label. If the size you chose online is a local conversion,",
    "it may not be the same number you see written on the label.",
  ],
};
export default function Apparel() {
  return <SizeChart {...womenApparel} />;
}
