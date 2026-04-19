"use client";

import { SizeSection } from "@/types/size-chart";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";

type PropsType = {
  index: number;
  handleNext: (index: number) => void;
  handlePrevious: (index: number) => void;
  section: SizeSection & {
    currentColumn: number;
    animationDirection: number;
  };
};

const SizeChartMobileSection: FC<PropsType> = ({
  section,
  index,
  handleNext,
  handlePrevious,
}) => {
  return (
    <div className="mb-8">
      {section.mainTitle.length > 0 ? (
        <div
          dangerouslySetInnerHTML={{
            __html: section.mainTitle,
          }}
        />
      ) : null}
      <div className="flex items-end justify-between mb-6">
        <button
          onClick={() => handlePrevious(index)}
          className="p-2 text-orange hover:bg-green-50 rounded-full"
          aria-label="Previous size"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h2 className="text-orange font-medium">{section.title}</h2>
          <div className="text-2xl font-bold mt-2 whitespace-pre-line">
            {section.sizes[section.currentColumn]}
          </div>
        </div>
        <button
          onClick={() => handleNext(index)}
          className="p-2 text-orange hover:bg-green-50 rounded-full"
          aria-label="Next size"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div>
        {section.rows.map((row, idx) => (
          <div
            key={idx}
            className={`flex justify-between p-4 ${
              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <span className="font-medium">{row.label}</span>
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={`${idx}-${section.currentColumn}`}
                initial={{
                  opacity: 0,
                  x: -section.animationDirection * 50, // تعديل الاتجاه هنا
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: section.animationDirection * 50, // كما هو
                }}
                transition={{ duration: 0.2 }}
              >
                {row.values[section.currentColumn]}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeChartMobileSection;
