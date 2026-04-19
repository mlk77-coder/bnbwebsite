import { cn } from "@/lib/utils";
import countries from "i18n-iso-countries";
import { getCountryCallingCode, isSupportedCountry } from "libphonenumber-js";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
} from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useLocale } from "next-intl";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/ar.json"));

/**
 * دالة لجلب قائمة الدول وأكواد الاتصال مع استثناء دول محددة
 * @param excludedCountries - قائمة الدول المراد استثنائها
 * @param locale - اللغة المختارة (مثلاً "ar" للعربية أو "en" للإنجليزية)
 */
const getCountryCodes = (excludedCountries: string[], locale: string) => {
  return Object.entries(countries.getAlpha2Codes())
    .filter(([code]) => !excludedCountries.includes(code))
    .map(([code]) => {
      let callingCode = "N/A";
      if (isSupportedCountry(code)) {
        try {
          callingCode = getCountryCallingCode(code);
        } catch {
          callingCode = "N/A";
        }
      }
      return {
        label: `${countries.getName(code, locale)}: +${callingCode}`,
        value: `${countries.getName(code, locale)}: +${callingCode}`,
        code,
        callingCode,
      };
    })
    .filter((country) => country.callingCode !== "N/A")
    .map((country, index) => ({ ...country, id: index + 1 }));
};

type PropsType = {
  setPhone: Dispatch<SetStateAction<{ code: string; number: string }>>;
  phone: { code: string; number: string };
  borderColor?: "border" | "foreground";
};

/**
 * المكون الرئيسي PhoneNumberInput
 */
const PhoneNumberInput: FC<PropsType> = ({
  setPhone,
  phone,
  borderColor = "foreground",
}) => {
  const locale = useLocale();
  const excludedCountries = useMemo(() => ["IL"], []);

  const countryCodes = useMemo(
    () => getCountryCodes(excludedCountries, locale),
    [excludedCountries, locale]
  );

  const [selectedCountry, setSelectedCountry] = useState<{ label: string; code: string }>({
    label: locale === "ar" ? "لبنان: +961" : "Lebanon: +961",
    code: "961",
  });
  const [openPopover, setOpenPopover] = useState(false);
  const [inputField, setInputField] = useState(phone.number);

  // تعيين selectedCountry بناءً على phone.code عند التحميل الأولي أو عند تغييره
  useEffect(() => {
    const country = countryCodes.find((c) => c.callingCode === phone.code);
    if (country) {
      setSelectedCountry({
        label: country.label,
        code: country.callingCode,
      });
    } else {
      // تعيين القيمة الافتراضية إذا لم يتم العثور على تطابق
      setSelectedCountry({
        label: locale === "ar" ? "لبنان: +961" : "Lebanon: +961",
        code: "961",
      });
    }
  }, [phone.code, countryCodes, locale]);

  // تحديث phone عند تغيير inputField أو selectedCountry
  useEffect(() => {
    setPhone({
      code: selectedCountry.code,
      number: inputField,
    });
  }, [inputField, selectedCountry, setPhone]);

  return (
    <div dir="ltr" className="flex justify-center gap-1 items-center">
      <CountrySelector
        countryCodes={countryCodes}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        openPopover={openPopover}
        borderColor={borderColor}
        setOpenPopover={setOpenPopover}
        locale={locale} // تمرير اللغة إلى مكون CountrySelector
      />
      <Input
        value={inputField}
        className={cn(
          borderColor === "foreground" ? "border-foreground" : "border-border"
        )}
        onChange={(e) => setInputField(e.target.value)}
      />
    </div>
  );
};

/**
 * مكون CountrySelector المسؤول عن اختيار الدولة
 */
type CountrySelectorProps = {
  countryCodes: {
    label: string;
    value: string;
    code: string;
    callingCode: string;
    id: number;
  }[];
  selectedCountry: { label: string; code: string };
  setSelectedCountry: Dispatch<SetStateAction<{ label: string; code: string }>>;
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  locale: string; // إضافة حقل اللغة
  borderColor?: "border" | "foreground";
};

const CountrySelector: FC<CountrySelectorProps> = ({
  countryCodes,
  selectedCountry,
  setSelectedCountry,
  openPopover,
  borderColor,
  setOpenPopover,
  locale, // تمرير اللغة للتحكم بالواجهة
}) => {
  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          dir="ltr"
          variant="outline"
          role="combobox"
          size="sm"
          aria-label="select phone number"
          aria-expanded={openPopover}
          className={cn(
            "justify-between h-10 rounded-lg",
            borderColor === "foreground" ? "border-foreground" : "border-border"
          )}
        >
          {`+${selectedCountry.code}`}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        dir={locale === "ar" ? "rtl" : "ltr"}
        side="bottom"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command
          filter={(value, search) => {
            const selectedCountry = countryCodes.find(
              (country) => country.value === value
            );
            if (!selectedCountry) return 0;
            return selectedCountry.label
              .toLowerCase()
              .includes(search.toLowerCase())
              ? 1
              : 0;
          }}
        >
          <CommandInput
            placeholder={locale === "ar" ? "بحث" : "Search"}
            className="text-sm"
          />
          <CommandEmpty>
            {locale === "ar" ? "لا توجد دولة" : "No Country Found"}
          </CommandEmpty>
          <CommandGroup>
            <CommandList className="h-[200px] scrollbar-hide">
              {countryCodes.map((countryCode) => (
                <CommandItem
                  key={countryCode.id}
                  value={countryCode.value}
                  className="text-xs cursor-pointer"
                  onSelect={() => {
                    setSelectedCountry({
                      label: countryCode.label,
                      code: countryCode.callingCode,
                    });
                    setOpenPopover(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCountry.label === countryCode.label
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {countryCode.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PhoneNumberInput;
