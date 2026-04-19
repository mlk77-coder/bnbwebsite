import React from "react";
import SizeChart from "../size-chart";

export const girlScarves = {
  sections: [
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">SCARVES</h2></div>`,
      sizeType: "cm",
      sizes: [
        "50-82\n0-18 mesi",
        "82-98\n1-3 anni",
        "104-116\n4-6 anni",
        "122-168\n6-14 anni",
      ],
      rows: [
        { label: "Length", values: ["110", "130", "140", "150"] },
        { label: "Width", values: ["12", "15", "15", "20"] },
      ],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
const Belts = () => {
  return <SizeChart {...girlScarves} />;
};

export default Belts;
