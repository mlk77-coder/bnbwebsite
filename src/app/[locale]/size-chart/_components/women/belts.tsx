import React from "react";
import SizeChart from "../size-chart";

export const womenBelts = {
  sections: [
    {
      title: "International",
      mainTitle: "",
      sizeType: "INCHES",
      sizes: ["XS", "S", "M", "L", "XL"],
      rows: [
        {
          label: "Waist",
          values: ["26,8", "28,7", "30,7", "32,7", "34,7"],
        },
        {
          label: "Hips",
          values: ["32,68", "34,7", "36,6", "38,6", "40,6"],
        },
      ],
    },
    {
      title: "International",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">UNISEX</h2>`,
      sizeType: "INCHES",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      rows: [
        {
          label: "Waist",
          values: ["28,7", "30,7", "32,7", "34,7", "36,6", "38,6"],
        },
        {
          label: "Hips",
          values: ["32,7", "34,7", "36,6", "38,6", "40,6", "42,6"],
        },
      ],
    },
  ],
  disclaimer: [
    "Possible ±0.2inch discrepancy on size measurements",
    "Our items have the Italian size on the label. If the size you chose online is a local conversion,",
    "it may not be the same number you see written on the label.",
  ],
};
const Belts = () => {
  return <SizeChart {...womenBelts} />;
};

export default Belts;
