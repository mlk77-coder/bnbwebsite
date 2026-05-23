import { cn } from '@/lib/utils';
import countries from 'i18n-iso-countries';
import { getCountryCallingCode, isSupportedCountry } from 'libphonenumber-js';
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/ar.json'));

/**
 * دالة لجلب قائمة الدول وأكواد الاتصال مع استثناء دول محددة
 * @param excludedCountries - قائمة الدول المراد استثنائها
 * @param locale - اللغة المختارة (مثلاً "ar" للعربية أو "en" للإنجليزية)
 */
const getCountryCodes = (excludedCountries: string[], locale: string) => {
  return Object.entries(countries.getAlpha2Codes())
    .filter(([code]) => !excludedCountries.includes(code))
    .map(([code]) => {
      let callingCode = 'N/A';
      if (isSupportedCountry(code)) {
        try {
          callingCode = getCountryCallingCode(code);
        } catch {
          callingCode = 'N/A';
        }
      }
      return {
        label: `${countries.getName(code, locale)}: +${callingCode}`,
        value: `${countries.getName(code, locale)}: +${callingCode}`,
        code,
        callingCode,
      };
    })
    .filter(country => country.callingCode !== 'N/A')
    .map((country, index) => ({ ...country, id: index + 1 }));
};

const getCountryFlagUrl = (countryCode: string) =>
  `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;

type SelectedCountry = {
  label: string;
  code: string;
  countryCode: string;
};

type PropsType = {
  setPhone: Dispatch<SetStateAction<{ code: string; number: string }>>;
  phone: { code: string; number: string };
  borderColor?: 'border' | 'foreground';
};

/**
 * المكون الرئيسي PhoneNumberInput
 */
const PhoneNumberInput: FC<PropsType> = ({
  setPhone,
  phone,
  borderColor = 'foreground',
}) => {
  const locale = useLocale();
  const excludedCountries = useMemo(() => ['IL'], []);

  const countryCodes = useMemo(
    () => getCountryCodes(excludedCountries, locale),
    [excludedCountries, locale]
  );

  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>({
    label: locale === 'ar' ? 'سوريا: +963' : 'Syria: +963',
    code: '963',
    countryCode: 'SY',
  });
  const [openPopover, setOpenPopover] = useState(false);
  const [inputField, setInputField] = useState(phone.number);

  // تعيين selectedCountry بناءً على phone.code عند التحميل الأولي أو عند تغييره
  useEffect(() => {
    const country = countryCodes.find(c => c.callingCode === phone.code);
    if (country) {
      setSelectedCountry({
        label: country.label,
        code: country.callingCode,
        countryCode: country.code,
      });
    } else {
      // تعيين القيمة الافتراضية إذا لم يتم العثور على تطابق
      setSelectedCountry({
        label: locale === 'ar' ? 'سوريا: +963' : 'Syria: +963',
        code: '963',
        countryCode: 'SY',
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
    <div dir='ltr' className='flex items-center justify-center gap-2'>
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
          'focus-visible:ring-primary/25 h-11 rounded-xl bg-white/80 text-base shadow-sm transition-all',
          borderColor === 'foreground'
            ? 'border-foreground/70'
            : 'border-border'
        )}
        inputMode='tel'
        onChange={e => setInputField(e.target.value)}
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
  selectedCountry: SelectedCountry;
  setSelectedCountry: Dispatch<SetStateAction<SelectedCountry>>;
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  locale: string; // إضافة حقل اللغة
  borderColor?: 'border' | 'foreground';
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
  const tA11y = useTranslations('accessibility');

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          dir='ltr'
          variant='outline'
          role='combobox'
          size='sm'
          aria-label={tA11y('select-phone-country')}
          aria-expanded={openPopover}
          className={cn(
            'h-11 min-w-24 justify-between rounded-xl bg-white/80 px-3 shadow-sm transition-all hover:bg-white',
            borderColor === 'foreground'
              ? 'border-foreground/70'
              : 'border-border'
          )}
        >
          <span className='flex items-center gap-1'>
            <img
              src={getCountryFlagUrl(selectedCountry.countryCode)}
              alt={selectedCountry.countryCode}
              className='h-[14px] w-[20px] rounded-[2px] object-cover shadow-sm'
              loading='lazy'
            />
            <span className='text-sm font-medium'>{`+${selectedCountry.code}`}</span>
          </span>
          <ChevronsUpDown className='ms-1 size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='border-border/70 w-80 overflow-hidden rounded-2xl p-0 shadow-xl'
        align='start'
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        side='bottom'
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <Command
          filter={(value, search) => {
            const selectedCountry = countryCodes.find(
              country => country.value === value
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
            placeholder={locale === 'ar' ? 'بحث' : 'Search'}
            className='h-11 text-sm'
          />
          <CommandEmpty>
            {locale === 'ar' ? 'لا توجد دولة' : 'No Country Found'}
          </CommandEmpty>
          <CommandGroup>
            <CommandList className='scrollbar-hide h-72'>
              {countryCodes.map(countryCode => (
                <CommandItem
                  key={countryCode.id}
                  value={countryCode.value}
                  className='flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm'
                  onSelect={() => {
                    setSelectedCountry({
                      label: countryCode.label,
                      code: countryCode.callingCode,
                      countryCode: countryCode.code,
                    });
                    setOpenPopover(false);
                  }}
                >
                  <img
                    src={getCountryFlagUrl(countryCode.code)}
                    alt={countryCode.code}
                    className='h-[14px] w-[20px] rounded-[2px] object-cover shadow-sm'
                    loading='lazy'
                  />
                  <span className='min-w-12 text-start font-medium'>
                    +{countryCode.callingCode}
                  </span>
                  <span className='text-muted-foreground flex-1 truncate'>
                    {countryCode.label.replace(
                      `: +${countryCode.callingCode}`,
                      ''
                    )}
                  </span>
                  <Check
                    className={cn(
                      'text-primary ms-auto h-4 w-4',
                      selectedCountry.label === countryCode.label
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
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
