import SizeChart from "../size-chart";

export const newbornApparel = {
  sections: [
    {
      title: "Italian Size",
      mainTitle: `<h2 class="text-lg uppercase font-bold mb-4 pb-4 border-b border-border">APPAREL NEWBORN 0-18 MONTHS</h2>`,
      sizeType: "cm",
      sizes: [
        "50\n0-1 months",
        "56\n1-3 months",
        "62\n3-6 months",
        "68\n6-9 months",
        "74\n9-12 months",
        "82\n12-18 months",
      ],
      rows: [
        { label: "Height", values: ["50", "56", "62", "68", "74", "82"] },
        { label: "Chest", values: ["37", "40", "43", "46", "49", "51,5"] },
        { label: "Waist", values: ["38", "40", "42", "44", "46", "48"] },
        {
          label: "Hips",
          values: ["40*", "44,5*", "47*", "50*", "53*", "56*"],
        },
        {
          label: "Arm length",
          values: ["25,5", "28", "30,5", "33", "35,5", "39"],
        },
        {
          label: "Inner leg",
          values: ["9,5*", "12,5*", "16*", "19,5*", "23*", "27,5*"],
        },
      ],
    },
  ],
  disclaimer: [
    "* With diaper",
    "Possible ±0.5cm discrepancy on size measurements",
  ],
};
export default function Apparel() {
  return <SizeChart {...newbornApparel} />;
}
