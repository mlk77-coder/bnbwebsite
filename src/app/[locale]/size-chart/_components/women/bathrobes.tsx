import SizeChart from "../size-chart";

export const womenBathrobes = {
  sections: [
    {
      title: "Alpha Sizes",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">BENETTON HOME & UNDERCOLORS BATHROBES</h2>`,
      sizeType: "CM",
      sizes: ["S", "M", "L"],
      rows: [
        {
          label: "Bottom and chest width",
          values: ["59", "62", "65"],
        },
        {
          label: "Length (without hood)",
          values: ["108", "114", "120"],
        },
        {
          label: "Sleeve length",
          values: ["55", "60", "63"],
        },
        {
          label: "Belt length",
          values: ["177", "182", "187"],
        },
      ],
    },
  ],
  disclaimer: ["Disclaimer: possible ±0.5cm discrepancy on size measurements"],
};
const Bathrobes = () => {
  return <SizeChart {...womenBathrobes} />;
};

export default Bathrobes;
