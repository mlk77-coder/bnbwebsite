import SizeChart from "../size-chart";

export const newbornUnderwear = {
  sections: [
    {
      title: "Italian Size",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">UNDERWEAR AND PYJAMAS NEWBORN</h2></div>`,
      sizeType: "cm",
      sizes: [
        "50\n0-1 months",
        "56\n1-3 months",
        "62\n3-6 months",
        "68\n6-9 months",
        "74\n9-12 months",
        "82\n12-18 months",
        "90\n18-24 months",
      ],
      rows: [
        {
          label: "Height",
          values: ["50", "56", "62", "68", "74", "82", "90"],
        },
        {
          label: "Chest",
          values: ["37", "40", "43", "46", "49", "51,5", "54"],
        },
        {
          label: "Waist",
          values: ["38", "40", "42", "44", "46", "48", "50"],
        },
        {
          label: "Hips",
          values: ["40*", "44,5*", "47*", "50*", "53*", "56*", "59*"],
        },
        {
          label: "Arms",
          values: ["25,5", "28", "30,5", "33", "35,5", "39", "42,5"],
        },
        {
          label: "Inner leg",
          values: ["9,5*", "12,5*", "16*", "19,5*", "23*", "27,5*", "33*"],
        },
      ],
    },
  ],
  disclaimer: [
    "* With diaper",
    "Possible ±0.5cm discrepancy on size measurements",
  ],
};
const Underwear = () => {
  return <SizeChart {...newbornUnderwear} />;
};

export default Underwear;
