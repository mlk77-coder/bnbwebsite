import React from "react";
import SizeChart from "../size-chart";

export const menBelts = {
  sections: [
    {
      title: "International",
      mainTitle: "",
      sizeType: "INCHES",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rows: [
        { label: "Waist", values: ["-", "32,7", "34,7", "36,6", "38,6"] },
        { label: "Hips", values: ["34,7", "36,6", "38,6", "40,6", "42,5"] },
      ],
    },
    {
      title: "UNISEX",
      mainTitle: "",
      sizeType: "INCHES",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      rows: [
        {
          label: "Waist",
          values: ["28,74", "30,7", "32,7", "34,7", "36,6", "38,6"],
        },
        {
          label: "Hips",
          values: ["32,7", "34,7", "36,6", "38,6", "40,6", "42,5"],
        },
      ],
    },
  ],
  disclaimer: [
    "Disclaimer: possible ±0.5inches discrepancy on size measurements",
  ],
};
const Belts = () => {
  return <SizeChart {...menBelts} />;
};

export default Belts;
