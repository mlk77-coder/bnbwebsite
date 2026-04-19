import SizeChart from "../size-chart";

export const menJeans = {
  sections: [
    {
      title: "Italian sizes",
      mainTitle: "",
      sizeType: "cm",
      sizes: ["28", "29", "30", "31", "32", "33"],
      rows: [
        { label: "Waist", values: ["71", "73,5", "76", "79", "81,5", "84"] },
        { label: "Hips", values: ["87", "89,5", "92", "95", "97,5", "100"] },
        {
          label: "Inner leg",
          values: ["82,5", "82,5", "82,5", "83", "83", "83,5"],
        },
      ],
    },
    {
      title: "Italian sizes",
      mainTitle: "",
      sizeType: "cm",
      sizes: ["34", "35", "36", "38", "40"],
      rows: [
        { label: "Waist", values: ["86,5", "89", "92", "97", "102"] },
        { label: "Hips", values: ["102,5", "105", "113", "113", "118"] },
        { label: "Inner leg", values: ["83,5", "84", "85", "85", "85,5"] },
      ],
    },
    {
      title: "Comparison Chart",
      mainTitle: "",
      sizeType: "",
      sizes: ["28", "29", "30", "31", "32", "33"],
      rows: [
        {
          label: "Numeric size (ITA)",
          values: ["42", "42", "44", "46", "46", "48"],
        },
        { label: "Alpha size", values: ["XS", "XS", "S", "S", "M", "M"] },
      ],
    },
    {
      title: "Comparison Chart",
      mainTitle: "",
      sizeType: "",
      sizes: ["34", "35", "36", "38", "40"],
      rows: [
        {
          label: "Numeric size (ITA)",
          values: ["50", "52", "54", "56", "58"],
        },
        { label: "Alpha size", values: ["L", "L", "XL", "2XL", "3XL"] },
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
  return <SizeChart {...menJeans} />;
}
