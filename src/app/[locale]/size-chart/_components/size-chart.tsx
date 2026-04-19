"use client";

import { useMediaQuery } from "@/app/hooks/use-media-query";
import { SizeSection } from "@/types/size-chart";
import { useState } from "react";
import SizeChartMobileSection from "./size-chart-mobile-section";
import SizeChartTable from "./size-chart-table";

interface SizeChartProps {
  sections: SizeSection[];
  disclaimer?: string[];
}

const SizeChart: React.FC<SizeChartProps> = ({ sections, disclaimer = [] }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sectionsState, setSectionsState] = useState(
    sections.map((section) => ({
      ...section,
      currentColumn: 0,
      animationDirection: 0,
    }))
  );

  const handleNext = (index: number) => {
    setSectionsState((prevSections) =>
      prevSections.map((section, idx) =>
        idx === index
          ? {
              ...section,
              currentColumn: (section.currentColumn + 1) % section.sizes.length,
              animationDirection: 1,
            }
          : section
      )
    );
  };

  const handlePrevious = (index: number) => {
    setSectionsState((prevSections) =>
      prevSections.map((section, idx) =>
        idx === index
          ? {
              ...section,
              currentColumn:
                (section.currentColumn - 1 + section.sizes.length) %
                section.sizes.length,
              animationDirection: -1,
            }
          : section
      )
    );
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      {isMobile
        ? sectionsState.map((section, index) => (
            <SizeChartMobileSection
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              index={index}
              key={index}
              section={section}
            />
          ))
        : sections.map((section, idx) => (
            <div key={idx}>
              {section.mainTitle.length > 0 ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: section.mainTitle,
                  }}
                />
              ) : null}

              <SizeChartTable section={section} />
            </div>
          ))}

      {disclaimer.length > 0 && (
        <div className="text-[9px] text-gray-500 space-y-1 mt-8">
          {disclaimer.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizeChart;
