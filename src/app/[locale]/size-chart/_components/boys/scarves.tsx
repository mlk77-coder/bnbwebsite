import SizeChart from "../size-chart";

export const boysScarves = {
  sections: [
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">SCARVES</h2></div>`,
      sizeType: "cm",
      sizes: ["50-82", "82-98", "104-116", "122-168"],
      rows: [
        { label: "Length", values: ["110", "130", "140", "150"] },
        { label: "Width", values: ["12", "15", "15", "20"] },
      ],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
const Scarves = () => {
  return <SizeChart {...boysScarves} />;
};

export default Scarves;
