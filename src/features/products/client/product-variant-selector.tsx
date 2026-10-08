'use client';

import {
  applyAttributeSelection,
  findExactMatchingVariant,
  findMatchingVariant,
  getAttributeGroups,
  getEffectivePrice,
  getInitialSelection,
  isAttributeValueAvailable,
  isColorAttributeGroup,
  resolveSwatchColor,
  type SelectedAttributes,
} from '@/features/products/lib/variant-utils';
import { cn } from '@/lib/utils';
import useProductDetailsStore from '@/store/use-product-details-store';
import type { ProductDetails } from '@/types/products';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useMemo, useState } from 'react';

type PropsType = {
  product: ProductDetails;
};

const ProductVariantSelector: FC<PropsType> = ({ product }) => {
  const t = useTranslations();
  const setSelectedVariantId = useProductDetailsStore(
    state => state.setSelectedVariantId
  );
  const setSelectedVariantAttributes = useProductDetailsStore(
    state => state.setSelectedVariantAttributes
  );
  const setProductDetail = useProductDetailsStore(
    state => state.setProductDetail
  );
  const setIsProductAvailable = useProductDetailsStore(
    state => state.setIsProductAvailable
  );

  const groups = useMemo(
    () => getAttributeGroups(product.variants),
    [product.variants]
  );

  const [selected, setSelected] = useState<SelectedAttributes>(() =>
    getInitialSelection(product.variants)
  );

  const exactVariant = useMemo(
    () => findExactMatchingVariant(product.variants, selected, groups),
    [product.variants, selected, groups]
  );

  const previewVariant = useMemo(
    () => exactVariant ?? findMatchingVariant(product.variants, selected),
    [exactVariant, product.variants, selected]
  );

  useEffect(() => {
    if (product.variants.length === 0 || groups.length === 0) {
      const displayPrice =
        product.sale_price && product.sale_price < product.price
          ? product.sale_price
          : product.price;

      setSelectedVariantId(null);
      setSelectedVariantAttributes([]);
      setIsProductAvailable(product.is_available);
      setProductDetail({
        name: product.name,
        image: product.image,
        price: displayPrice,
        salePrice: product.sale_price,
        compareAtPrice: product.price,
      });
      return;
    }

    const priceInfo = getEffectivePrice(previewVariant, {
      price: product.price,
      sale_price: product.sale_price,
    });
    const displayPrice =
      priceInfo.sale_price && priceInfo.sale_price < priceInfo.price
        ? priceInfo.sale_price
        : priceInfo.price;

    setSelectedVariantId(exactVariant?.id ?? null);
    setSelectedVariantAttributes(
      exactVariant
        ? exactVariant.attributes.map(attr => ({
            attribute_name: attr.name,
            value: attr.value,
          }))
        : []
    );
    setIsProductAvailable(
      exactVariant ? exactVariant.is_active && exactVariant.is_in_stock : false
    );
    setProductDetail({
      name: product.name,
      image: previewVariant?.images[0] || product.image,
      price: displayPrice,
      salePrice: priceInfo.sale_price,
      compareAtPrice: priceInfo.price,
    });
  }, [
    exactVariant,
    groups.length,
    previewVariant,
    product,
    setIsProductAvailable,
    setProductDetail,
    setSelectedVariantAttributes,
    setSelectedVariantId,
  ]);

  if (product.variants.length === 0 || groups.length === 0) return null;

  const handleSelect = (attributeName: string, value: string) => {
    setSelected(prev =>
      applyAttributeSelection(product.variants, prev, attributeName, value)
    );
  };

  return (
    <div className='space-y-4'>
      {groups.map(group => {
        const isColor = isColorAttributeGroup(group);
        const selectedValue = selected[group.name];

        return (
          <div key={group.name} className='space-y-2'>
            <p className='text-sm'>
              <span className='text-primary font-semibold'>{group.name}</span>
              <span className='text-muted-foreground'>
                {selectedValue ? `: ${selectedValue}` : ''}
              </span>
            </p>

            <div
              className={cn('flex flex-wrap', isColor ? 'gap-2' : 'gap-1.5')}
              role='listbox'
              aria-label={group.name}
            >
              {group.values.map(value => {
                const isSelected = selectedValue === value;
                const isAvailable = isAttributeValueAvailable(
                  product.variants,
                  selected,
                  group.name,
                  value
                );
                const swatch = isColor ? resolveSwatchColor(value) : null;

                if (isColor) {
                  return (
                    <button
                      key={`${group.name}-${value}`}
                      type='button'
                      role='option'
                      aria-selected={isSelected}
                      aria-label={value}
                      title={value}
                      disabled={!isAvailable && !isSelected}
                      onClick={() => handleSelect(group.name, value)}
                      className={cn(
                        'relative flex size-8 items-center justify-center rounded-full border transition-colors',
                        isSelected
                          ? 'border-primary border-2'
                          : 'border-border/60 hover:border-primary/35',
                        !isAvailable &&
                          !isSelected &&
                          'cursor-not-allowed opacity-30'
                      )}
                    >
                      <span
                        className={cn(
                          'size-[22px] rounded-full border border-black/5',
                          !swatch &&
                            'bg-muted text-muted-foreground flex items-center justify-center text-[8px] font-medium uppercase'
                        )}
                        style={swatch ? { backgroundColor: swatch } : undefined}
                      >
                        {!swatch ? value.slice(0, 2) : null}
                      </span>
                      {!isAvailable && !isSelected ? (
                        <span
                          className='pointer-events-none absolute inset-0 flex items-center justify-center'
                          aria-hidden
                        >
                          <span className='bg-foreground/35 h-px w-3.5 rotate-45' />
                        </span>
                      ) : null}
                    </button>
                  );
                }

                return (
                  <button
                    key={`${group.name}-${value}`}
                    type='button'
                    role='option'
                    aria-selected={isSelected}
                    disabled={!isAvailable && !isSelected}
                    onClick={() => handleSelect(group.name, value)}
                    className={cn(
                      'relative min-w-8 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
                      isSelected
                        ? 'border-primary bg-background text-foreground border-2'
                        : 'border-border/60 text-foreground hover:border-primary/35',
                      !isAvailable &&
                        !isSelected &&
                        'text-muted-foreground cursor-not-allowed opacity-35'
                    )}
                  >
                    {value}
                    {!isAvailable && !isSelected ? (
                      <span
                        className='bg-muted-foreground/50 absolute inset-x-1 top-1/2 h-px -translate-y-1/2'
                        aria-hidden
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {exactVariant && !exactVariant.is_in_stock ? (
        <p className='text-destructive text-xs font-medium'>
          {t('out-of-stock')}
        </p>
      ) : null}

      {!exactVariant && Object.keys(selected).length === groups.length ? (
        <p className='text-muted-foreground text-xs'>
          {t('product.variant-unavailable')}
        </p>
      ) : null}
    </div>
  );
};

export default ProductVariantSelector;
