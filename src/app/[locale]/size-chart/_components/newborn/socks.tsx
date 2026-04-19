import SizeChart from "../size-chart";

export const newbornSocks = {
  sections: [
    {
      title: "Size",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">SOCKS BABY</h2></div>`,
      sizeType: "",
      sizes: ["0-6\n0-6 months", "6-12\n6-12 months"],
      rows: [
        { label: "Shoes number EU", values: ["16-17", "18-19"] },
        { label: "Shoes number UK", values: ["1,5C-2C", "3C-4C"] },
        { label: "Shoes number US", values: ["2,5-3", "4-4,5"] },
      ],
    },
  ],
  disclaimer: [],
};
const Socks = () => {
  return <SizeChart {...newbornSocks} />;
};

export default Socks;
