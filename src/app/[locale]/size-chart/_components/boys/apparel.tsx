import SizeChart from "../size-chart";

export const boysApparel = {
  sections: [
    {
      title: "Italian Size",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">APPAREL KID BOY 12/18 MONTHS - 5/6 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: ["82", "90", "98", "104", "110", "116"],
      rows: [
        { label: "Height", values: ["82", "90", "98", "104", "110", "116"] },
        { label: "Chest", values: ["51,5", "54", "56,5", "59", "61", "63"] },
        { label: "Waist", values: ["48", "50", "52", "54", "55,5", "57"] },
        {
          label: "Hips",
          values: ["56", "59,5*", "58,5*", "61*", "63,5*", "66*"],
        },
        {
          label: "Arm length",
          values: ["39", "42,5", "46", "48,5", "51,5", "54,5"],
        },
        {
          label: "Inner leg",
          values: ["27,5*", "32*", "40,5*", "44,5*", "48*", "51,5*"],
        },
      ],
    },
    {
      title: "Italian Size",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">APPAREL JUNIOR BOY 6/7 YEARS - 13/14 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
      rows: [
        { label: "Height", values: ["122", "130", "140", "150", "160", "168"] },
        { label: "Chest", values: ["64", "68", "72", "76,5", "81", "86"] },
        { label: "Waist", values: ["58", "61", "63,5", "66,5", "69", "72"] },
        { label: "Hips", values: ["67", "71,5", "76", "80", "84,5", "89"] },
        {
          label: "Arm length",
          values: ["57", "61,5", "66", "70,5", "75", "79,5"],
        },
        {
          label: "Inner leg",
          values: ["55", "59,5", "64,5", "69,5", "74,5", "79"],
        },
      ],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
export default function Apparel() {
  return <SizeChart {...boysApparel} />;
}
