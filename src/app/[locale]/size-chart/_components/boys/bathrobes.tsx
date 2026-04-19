import SizeChart from "../size-chart";

export const boysBathrobes = {
  sections: [
    {
      title: "Alpha sizes",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">BATHROBES KID BOY AND JUNIOR BOY</h2></div>`,
      sizeType: "cm",
      sizes: ["XS", "S", "M", "L"],
      rows: [
        { label: "Boy height", values: ["100", "120", "140", "160"] },
        { label: "Bottom and chest width", values: ["40", "44", "51", "56"] },
        { label: "Length (without hood)", values: ["62", "77", "97", "107"] },
        { label: "Sleeve length", values: ["51", "58", "68", "77"] },
        { label: "Belt length", values: ["110", "140", "160", "160"] },
      ],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
const Bathrobes = () => {
  return <SizeChart {...boysBathrobes} />;
};

export default Bathrobes;
