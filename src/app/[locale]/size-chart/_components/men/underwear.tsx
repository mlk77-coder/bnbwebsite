import SizeChart from "../size-chart";

export const menUnderwear = {
  sections: [
    {
      title: "Alpha sizes",
      mainTitle: "",
      sizeType: "cm",
      sizes: [
        "XS\n41",
        "S\n44/46",
        "M\n46/48",
        "L\n50",
        "XL\n52/54",
        "XXL\n54/56",
        "XXXL\n58",
      ],
      rows: [
        {
          label: "Height",
          values: ["168", "172", "176", "180", "184", "188", "192"],
        },
        {
          label: "Chest",
          values: ["82", "88", "94", "100", "106", "112", "118"],
        },
        {
          label: "Waist",
          values: ["74", "78", "86", "90", "99,2", "103,8", "108,4"],
        },
        {
          label: "Hips",
          values: ["86", "92", "98", "104", "110", "116", "122"],
        },
        { label: "Arms", values: ["82", "84", "86", "88", "90", "92", "94"] },
        {
          label: "Inner leg",
          values: ["77,9", "79,6", "81,3", "83", "84,7", "86,4", "88,1"],
        },
      ],
    },
  ],
  disclaimer: ["Possible ±0.5cm discrepancy on size measurements"],
};
const Underwear = () => {
  return <SizeChart {...menUnderwear} />;
};

export default Underwear;
