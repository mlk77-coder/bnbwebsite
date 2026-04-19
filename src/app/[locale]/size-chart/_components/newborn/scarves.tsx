import SizeChart from "../size-chart";

export const newbornScarves = {
  sections: [
    {
      title: "International",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">SCARVES</h2></div>`,
      sizeType: "cm",
      sizes: ["50-82\n0-18 mesi"],
      rows: [
        { label: "Length", values: ["110"] },
        { label: "Width", values: ["12"] },
      ],
    },
  ],
  disclaimer: ["Disclaimer: possible ±0.5cm discrepancy on size measurements"],
};
const Scarves = () => {
  return <SizeChart {...newbornScarves} />;
};

export default Scarves;
