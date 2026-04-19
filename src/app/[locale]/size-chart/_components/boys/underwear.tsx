import SizeChart from "../size-chart";

export const boysUnderwear = {
  sections: [
    {
      title: "Italian Size",
      mainTitle: `<div class="mb-6 text-sm font-bold"><h2 class="uppercase mb-3 text-lg">UNDERWEAR / PYJAMAS / SWIMSUITS KID BOY & JUNIOR BOY</h2></div>`,
      sizeType: "cm",
      sizes: ["74", "82", "90", "XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
      age: [
        "9-12 months",
        "12-18 months",
        "18-24 months",
        "3-4 years",
        "4-5 years",
        "6-7 years",
        "7-8 years",
        "8-9 years",
        "10-11 years",
        "11-12 years",
        "13-14 years",
      ],
      rows: [
        {
          label: "Height",
          values: [
            "74",
            "82",
            "90",
            "100",
            "110",
            "120",
            "130",
            "140",
            "150",
            "160",
            "170",
          ],
        },
        {
          label: "Chest",
          values: [
            "49",
            "52",
            "55",
            "58",
            "61",
            "64",
            "68",
            "72",
            "76,5",
            "80,5",
            "85",
          ],
        },
        {
          label: "Waist",
          values: [
            "46",
            "48",
            "50",
            "52",
            "55",
            "58",
            "61",
            "63,5",
            "66,5",
            "69",
            "72",
          ],
        },
        {
          label: "Hips",
          values: [
            "53*",
            "55,5*",
            "58*",
            "60,5*",
            "63,5",
            "67",
            "71,5",
            "76",
            "80",
            "84,5",
            "89",
          ],
        },
        {
          label: "Arms",
          values: [
            "35,5",
            "39",
            "42,5",
            "47",
            "51,5",
            "56",
            "61",
            "66",
            "71",
            "76",
            "81",
          ],
        },
        {
          label: "Inner leg",
          values: [
            "23*",
            "28*",
            "33*",
            "42*",
            "48",
            "54",
            "60",
            "65",
            "69,5",
            "74,5",
            "79",
          ],
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
  return <SizeChart {...boysUnderwear} />;
};

export default Underwear;
