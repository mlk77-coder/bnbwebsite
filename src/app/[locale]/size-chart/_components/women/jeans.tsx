import SizeChart from "../size-chart";

export const womenJeans = {
  sections: [
    {
      title: "Italian Sizes",
      mainTitle: "",
      sizeType: "cm",
      sizes: [25, 26, 27, 28, 29, 30],
      rows: [
        { label: "Waist", values: ["62", "65", "67,5", "70", "72,5", "75"] },
        { label: "Hips", values: ["88", "91", "93,5", "96", "98,6", "101"] },
        {
          label: "Inner leg",
          values: ["78", "78,5", "79,5", "80", "80", "80"],
        },
      ],
    },
    {
      title: "Italian Sizes",
      mainTitle: "",
      sizeType: "cm",
      sizes: [31, 32, 33, 34, 35, 36],
      rows: [
        { label: "Waist", values: ["78", "80,5", "83", "85,5", "88", "91"] },
        {
          label: "Hips",
          values: ["104", "106,5", "109", "111,5", "114", "117"],
        },
        {
          label: "Inner leg",
          values: ["80,5", "80,5", "80,5", "81", "81", "81"],
        },
      ],
    },
    {
      title: "Comparison Chart",
      mainTitle: "",
      sizeType: "",
      sizes: [25, 26, 27, 28, 29, 30],
      rows: [
        { label: "Numeric size (ITA)", values: [38, 40, 40, 42, 42, 44] },
        { label: "Alpha size", values: ["XS", "S", "S", "S", "M", "M"] },
      ],
    },
    {
      title: "Comparison Chart",
      mainTitle: "",
      sizeType: "",
      sizes: [31, 32, 33, 34, 35, 36],
      rows: [
        { label: "Numeric size (ITA)", values: [44, 46, 46, 48, 48, 50] },
        { label: "Alpha size", values: ["M", "L", "L", "L", "XL", "XL"] },
      ],
    },
  ],
  disclaimer: [
    "Possible ±0.5cm discrepancy on size measurements",
    "Our items have the Italian size on the label. If the size you chose online is a local conversion,",
    "it may not be the same number you see written on the label.",
  ],
};
export default function Jeans() {
  return <SizeChart {...womenJeans} />;
}
