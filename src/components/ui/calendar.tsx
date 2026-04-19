"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  format,
  getMonth,
  getYear,
  setMonth as setDateFnsMonth,
  setYear,
} from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import * as React from "react";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  defaultBirthday?: Date;
};

function Calendar({
  className,
  classNames,
  defaultBirthday,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, updateMonth] = React.useState<Date>(() => {
    if (defaultBirthday) return defaultBirthday;
    const today = new Date();
    return new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
  });
  const language = useLocale();

  const handleYearChange = (year: string) => {
    const newDate = setYear(month, parseInt(year));
    updateMonth(newDate);
  };

  const handleMonthChange = (monthIndex: string) => {
    const newDate = setDateFnsMonth(month, parseInt(monthIndex));
    updateMonth(newDate);
  };
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  const currentLocale = language === "ar" ? ar : enUS;
  const currentMonths = Array.from({ length: 12 }, (_, i) =>
    format(setDateFnsMonth(new Date(), i), "LLLL", { locale: currentLocale })
  );

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption: ({ displayMonth }) => {
          const handlePrevMonth = () => {
            updateMonth(
              new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1)
            );
          };
          const handleNextMonth = () => {
            updateMonth(
              new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1)
            );
          };

          return (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={handlePrevMonth}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "size-9 bg-transparent p-0 border-border opacity-50 hover:opacity-100"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-border flex-1"
                    size="sm"
                  >
                    {currentMonths[getMonth(displayMonth)]}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-32">
                  <Command>
                    <CommandGroup>
                      <CommandList>
                        {currentMonths.map((month, index) => (
                          <CommandItem
                            key={month}
                            onSelect={() => handleMonthChange(index.toString())}
                          >
                            {month}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-border flex-1"
                    size="sm"
                  >
                    {getYear(displayMonth)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-32">
                  <Command>
                    <CommandGroup>
                      <CommandList>
                        {years.map((year) => (
                          <CommandItem
                            key={year}
                            onSelect={() => handleYearChange(year.toString())}
                          >
                            {year}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <button
                onClick={handleNextMonth}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "size-9 bg-transparent p-0 border-border opacity-50 hover:opacity-100"
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          );
        },
      }}
      month={month}
      onMonthChange={updateMonth}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
