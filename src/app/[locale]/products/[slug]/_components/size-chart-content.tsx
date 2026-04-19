"use client";

import Men from "@/app/[locale]/size-chart/_components/men/men";
import MenApparel from "@/app/[locale]/size-chart/_components/men/apparel";
import MenBathrobes from "@/app/[locale]/size-chart/_components/men/bathrobes";
import MenBelts from "@/app/[locale]/size-chart/_components/men/belts";
import MenFootwear from "@/app/[locale]/size-chart/_components/men/footwear";
import MenGloves from "@/app/[locale]/size-chart/_components/men/gloves";
import MenHats from "@/app/[locale]/size-chart/_components/men/hats";
import MenJeans from "@/app/[locale]/size-chart/_components/men/jeans";
import MenUnderwear from "@/app/[locale]/size-chart/_components/men/underwear";

import Women from "@/app/[locale]/size-chart/_components/women/women";
import WomenApparel from "@/app/[locale]/size-chart/_components/women/apparel";
import WomenBathrobes from "@/app/[locale]/size-chart/_components/women/bathrobes";
import WomenBelts from "@/app/[locale]/size-chart/_components/women/belts";
import WomenBras from "@/app/[locale]/size-chart/_components/women/Bras";
import WomenFootwear from "@/app/[locale]/size-chart/_components/women/footwear";
import WomenGloves from "@/app/[locale]/size-chart/_components/women/gloves";
import WomenHats from "@/app/[locale]/size-chart/_components/women/hats";
import WomenJeans from "@/app/[locale]/size-chart/_components/women/jeans";
import WomenUnderwear from "@/app/[locale]/size-chart/_components/women/underwear";

import Newborn from "@/app/[locale]/size-chart/_components/newborn/newborn";
import NewbornApparel from "@/app/[locale]/size-chart/_components/newborn/apparel";
import NewbornFootwear from "@/app/[locale]/size-chart/_components/newborn/footwear";
import NewbornGloves from "@/app/[locale]/size-chart/_components/newborn/gloves";
import NewbornHats from "@/app/[locale]/size-chart/_components/newborn/hats";
import NewbornScarves from "@/app/[locale]/size-chart/_components/newborn/scarves";
import NewbornSocks from "@/app/[locale]/size-chart/_components/newborn/socks";
import NewbornUnderwear from "@/app/[locale]/size-chart/_components/newborn/underwear";

import Girl from "@/app/[locale]/size-chart/_components/girl/girl";
import GirlApparel from "@/app/[locale]/size-chart/_components/girl/apparel";
import GirlFootwear from "@/app/[locale]/size-chart/_components/girl/footwear";
import GirlGloves from "@/app/[locale]/size-chart/_components/girl/gloves";
import GirlHats from "@/app/[locale]/size-chart/_components/girl/hats";
import GirlUnderwearPyjamas from "@/app/[locale]/size-chart/_components/girl/underwear-pyjamas";
import GirlBathrobes from "@/app/[locale]/size-chart/_components/girl/bathrobes";
import GirlBelts from "@/app/[locale]/size-chart/_components/girl/belts";
import GirlUnderwear from "@/app/[locale]/size-chart/_components/girl/underwear";

import Boys from "@/app/[locale]/size-chart/_components/boys/boys";
import BoysApparel from "@/app/[locale]/size-chart/_components/boys/apparel";
import BoysFootwear from "@/app/[locale]/size-chart/_components/boys/footwear";
import BoysGloves from "@/app/[locale]/size-chart/_components/boys/gloves";
import BoysHats from "@/app/[locale]/size-chart/_components/boys/hats";
import BoysScarves from "@/app/[locale]/size-chart/_components/boys/scarves";
import BoysSocks from "@/app/[locale]/size-chart/_components/boys/socks";
import BoysUnderwear from "@/app/[locale]/size-chart/_components/boys/underwear";
import BoysBathrobes from "@/app/[locale]/size-chart/_components/boys/bathrobes";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

type PropsType = {
  type: number;
};

function getTitleByType(type: number): string {
  switch (type) {
    // Women
    case 1:
      return "";
    case 2:
      return "Women Apparel";
    case 3:
      return "Women Jeans";
    case 4:
      return "Women Footwear";
    case 5:
      return "Women Gloves";
    case 6:
      return "Women Hats";
    case 7:
      return "Women Belts";
    case 8:
      return "Women Underwear";
    case 9:
      return "Women Bras";
    case 10:
      return "Women Bathrobes";

    // Men
    case 11:
      return "";
    case 12:
      return "Men Apparel";
    case 13:
      return "Men Jeans";
    case 14:
      return "Men Footwear";
    case 15:
      return "Men Gloves";
    case 16:
      return "Men Hats";
    case 17:
      return "Men Belts";
    case 18:
      return "Men Underwear";
    case 19:
      return "Men Bathrobes";

    // Newborn
    case 20:
      return "";
    case 21:
      return "Newborn Apparel";
    case 22:
      return "Newborn Footwear";
    case 23:
      return "Newborn Gloves";
    case 24:
      return "Newborn Hats";
    case 25:
      return "Newborn Scarves";
    case 26:
      return "Newborn Socks";
    case 27:
      return "Newborn Underwear";

    // Girl
    case 28:
      return "";
    case 29:
      return "Girl Apparel";
    case 30:
      return "Girl Footwear";
    case 31:
      return "Girl Gloves";
    case 32:
      return "Girl Hats";
    case 33:
      return "Girl Belts";
    case 34:
      return "Girl Underwear";
    case 35:
      return "Girl Underwear Pyjamas";
    case 36:
      return "Girl Bathrobes";

    // Boys
    case 37:
      return "";
    case 38:
      return "Boys Apparel";
    case 39:
      return "Boys Footwear";
    case 40:
      return "Boys Gloves";
    case 41:
      return "Boys Hats";
    case 42:
      return "Boys Scarves";
    case 43:
      return "Boys Socks";
    case 44:
      return "Boys Underwear";
    case 45:
      return "Boys Bathrobes";

    default:
      return "";
  }
}

export default function SizeChartContent({ type }: PropsType) {
  const content = () => {
    if (!type) return null;
    if (type === 1) return <Women />;
    if (type === 2) return <WomenApparel />;
    if (type === 3) return <WomenJeans />;
    if (type === 4) return <WomenFootwear />;
    if (type === 5) return <WomenGloves />;
    if (type === 6) return <WomenHats />;
    if (type === 7) return <WomenBelts />;
    if (type === 8) return <WomenUnderwear />;
    if (type === 9) return <WomenBras />;
    if (type === 10) return <WomenBathrobes />;

    if (type === 11) return <Men />;
    if (type === 12) return <MenApparel />;
    if (type === 13) return <MenJeans />;
    if (type === 14) return <MenFootwear />;
    if (type === 15) return <MenGloves />;
    if (type === 16) return <MenHats />;
    if (type === 17) return <MenBelts />;
    if (type === 18) return <MenUnderwear />;
    if (type === 19) return <MenBathrobes />;

    if (type === 20) return <Newborn />;
    if (type === 21) return <NewbornApparel />;
    if (type === 22) return <NewbornFootwear />;
    if (type === 23) return <NewbornGloves />;
    if (type === 24) return <NewbornHats />;
    if (type === 25) return <NewbornScarves />;
    if (type === 26) return <NewbornSocks />;
    if (type === 27) return <NewbornUnderwear />;

    if (type === 28) return <Girl />;
    if (type === 29) return <GirlApparel />;
    if (type === 30) return <GirlFootwear />;
    if (type === 31) return <GirlGloves />;
    if (type === 32) return <GirlHats />;
    if (type === 33) return <GirlBelts />;
    if (type === 34) return <GirlUnderwear />;
    if (type === 35) return <GirlUnderwearPyjamas />;
    if (type === 36) return <GirlBathrobes />;

    if (type === 37) return <Boys />;
    if (type === 38) return <BoysApparel />;
    if (type === 39) return <BoysFootwear />;
    if (type === 40) return <BoysGloves />;
    if (type === 41) return <BoysHats />;
    if (type === 42) return <BoysScarves />;
    if (type === 43) return <BoysSocks />;
    if (type === 44) return <BoysUnderwear />;
    if (type === 45) return <BoysBathrobes />;
  };

  const title = getTitleByType(type);

  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {content()}
    </>
  );
}
