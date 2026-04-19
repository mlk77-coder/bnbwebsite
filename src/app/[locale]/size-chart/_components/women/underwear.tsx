import SizeChart from "../size-chart";

export const womenUnderwear = {
  sections: [
    {
      title: "Alpha sizes",
      mainTitle: "",
      sizeType: "cm",
      sizes: [
        "XXS\n36/38",
        "XS\n38/40",
        "S\n42",
        "M\n44/46",
        "L\n46/48",
        "XL\n48/50",
        "XXL\n50/52",
      ],
      rows: [
        {
          label: "Height",
          values: ["162", "166", "170", "170,5", "171", "171,5", "172"],
        },
        {
          label: "Breast",
          values: ["76", "82", "88", "94", "100", "106", "112"],
        },
        {
          label: "Waist",
          values: ["58-60", "64-65", "70", "75-76", "80-82", "85-88", "90-94"],
        },
        {
          label: "Hips",
          values: ["83", "89", "95", "101", "107", "113", "119"],
        },
        {
          label: "Arms",
          values: ["75", "77", "79", "80,2", "81,4", "82,6", "83,8"],
        },
        {
          label: "Inner leg",
          values: ["76", "78", "80", "80,4", "80,8", "81,2", "81,6"],
        },
      ],
    },
    {
      title: "Alpha sizes",
      mainTitle: "",
      sizeType: "cm",
      sizes: ["XS-S\n38/42", "M-L\n44/48"],
      rows: [
        { label: "Height", values: ["166 - 170", "170,5 - 171"] },
        { label: "Breast", values: ["82 - 88", "94 - 100"] },
        { label: "Waist", values: ["64 - 70", "75 - 82"] },
        { label: "Hips", values: ["89 - 95", "101 - 107"] },
        { label: "Arms", values: ["77 - 79", "80,2 - 81,4"] },
        { label: "Inner leg", values: ["78 - 80", "80,4 - 80,8"] },
      ],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
const Underwear = () => {
  return <SizeChart {...womenUnderwear} />;
};

export default Underwear;
