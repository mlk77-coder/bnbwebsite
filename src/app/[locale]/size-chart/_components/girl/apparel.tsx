import SizeChart from "../size-chart";

export const girlApparel = {
  sections: [
    {
      title: "Italian Size",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">APPAREL KID GIRL 12/18 MONTHS - 5/6 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: [
        "82\n12-18 months",
        "90\n18-24 months",
        "98\n2-3 years",
        "104\n3-4 years",
        "110\n4-5 years",
        "116\n5-6 years",
      ],
      rows: [
        { label: "Height", values: ["82", "90", "98", "104", "110", "116"] },
        { label: "Chest", values: ["51,5", "54", "56,5", "59", "61", "63"] },
        { label: "Waist", values: ["48", "50", "52", "54", "55,5", "57"] },
        {
          label: "Hips",
          values: ["56*", "58,5*", "61*", "63,5*", "66*", "68*"],
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
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">APPAREL JUNIOR GIRL 6/7 YEARS - 13/14 YEARS</h2></div>`,
      sizeType: "cm",
      sizes: [
        "S\n6-7 years",
        "M\n7-8 years",
        "L\n8-9 years",
        "XL\n10-11 years",
        "2XL\n11-12 years",
        "3XL\n13-14 years",
      ],
      rows: [
        {
          label: "Height",
          values: ["122", "130", "140", "150", "160", "168"],
        },
        { label: "Chest", values: ["64", "68", "72", "76", "80", "84"] },
        { label: "Waist", values: ["58", "60", "62,5", "64,5", "67", "69"] },
        { label: "Hips", values: ["67", "72", "77,5", "82,5", "88", "93"] },
        {
          label: "Arm length",
          values: ["57", "61,5", "66", "70,5", "75", "79,5"],
        },
        {
          label: "Inner leg",
          values: ["55", "60", "66", "72,5", "76,5", "80,5"],
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
  return <SizeChart {...girlApparel} />;
}
