import type { ProductVariant } from '@/types/products';

export type AttributeGroup = {
  name: string;
  type: string | null;
  values: string[];
};

export type SelectedAttributes = Record<string, string>;

function isSellable(variant: ProductVariant): boolean {
  return variant.is_active && variant.is_in_stock;
}

function variantMatchesSelection(
  variant: ProductVariant,
  selected: SelectedAttributes
): boolean {
  return Object.entries(selected).every(([name, value]) =>
    variant.attributes.some(attr => attr.name === name && attr.value === value)
  );
}

/** Groups attribute names → unique values across all variants. */
export function getAttributeGroups(
  variants: ProductVariant[]
): AttributeGroup[] {
  const groups = new Map<
    string,
    { type: string | null; values: Set<string> }
  >();

  for (const variant of variants) {
    for (const attr of variant.attributes) {
      if (!attr.name || !attr.value) continue;
      const existing = groups.get(attr.name) ?? {
        type: attr.type,
        values: new Set<string>(),
      };
      if (!existing.type && attr.type) existing.type = attr.type;
      existing.values.add(attr.value);
      groups.set(attr.name, existing);
    }
  }

  return Array.from(groups.entries()).map(([name, { type, values }]) => ({
    name,
    type,
    values: Array.from(values),
  }));
}

export function isColorAttributeName(
  name: string,
  type?: string | null
): boolean {
  const attrType = type?.toLowerCase() ?? '';
  const attrName = name.toLowerCase();
  return (
    attrType === 'color' ||
    attrType === 'colour' ||
    attrName.includes('color') ||
    attrName.includes('colour') ||
    attrName.includes('لون')
  );
}

export function isColorAttributeGroup(group: AttributeGroup): boolean {
  return isColorAttributeName(group.name, group.type);
}

const NAMED_SWATCH_COLORS: Record<string, string> = {
  black: '#111111',
  white: '#ffffff',
  red: '#dc2626',
  blue: '#2563eb',
  green: '#16a34a',
  yellow: '#eab308',
  orange: '#ea580c',
  pink: '#ec4899',
  purple: '#9333ea',
  brown: '#92400e',
  gray: '#6b7280',
  grey: '#6b7280',
  beige: '#d6c6a8',
  navy: '#1e3a5f',
  gold: '#ca8a04',
  silver: '#a1a1aa',
  // Arabic common labels
  أسود: '#111111',
  ابيض: '#ffffff',
  أبيض: '#ffffff',
  احمر: '#dc2626',
  أحمر: '#dc2626',
  ازرق: '#2563eb',
  أزرق: '#2563eb',
  اخضر: '#16a34a',
  أخضر: '#16a34a',
  اصفر: '#eab308',
  أصفر: '#eab308',
  وردي: '#ec4899',
  بنفسجي: '#9333ea',
  بني: '#92400e',
  رمادي: '#6b7280',
  ذهبي: '#ca8a04',
};

/** Hex / named color → CSS value for swatch rendering (SSR-safe). */
export function resolveSwatchColor(value: string): string | null {
  const trimmed = value.trim();
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(trimmed)) {
    return trimmed;
  }
  const lower = trimmed.toLowerCase();
  if (NAMED_SWATCH_COLORS[lower]) return NAMED_SWATCH_COLORS[lower];
  if (NAMED_SWATCH_COLORS[trimmed]) return NAMED_SWATCH_COLORS[trimmed];
  // "Reds" → "red", "Blacks" → "black"
  if (lower.endsWith('s')) {
    const singular = lower.slice(0, -1);
    if (NAMED_SWATCH_COLORS[singular]) return NAMED_SWATCH_COLORS[singular];
  }
  return null;
}

export function isCompleteSelection(
  groups: AttributeGroup[],
  selected: SelectedAttributes
): boolean {
  if (groups.length === 0) return false;
  return groups.every(group => Boolean(selected[group.name]));
}

export function findMatchingVariant(
  variants: ProductVariant[],
  selected: SelectedAttributes
): ProductVariant | undefined {
  const selectedEntries = Object.entries(selected);
  if (selectedEntries.length === 0) return undefined;

  return variants.find(variant => variantMatchesSelection(variant, selected));
}

/** Exact SKU match — only when every attribute axis is chosen. */
export function findExactMatchingVariant(
  variants: ProductVariant[],
  selected: SelectedAttributes,
  groups: AttributeGroup[]
): ProductVariant | undefined {
  if (!isCompleteSelection(groups, selected)) return undefined;
  return findMatchingVariant(variants, selected);
}

/**
 * Best preview while the shopper is still choosing options:
 * prefer an in-stock partial match, else any partial match.
 */
export function findPreviewVariant(
  variants: ProductVariant[],
  selected: SelectedAttributes
): ProductVariant | undefined {
  if (Object.keys(selected).length === 0) return undefined;

  return (
    variants.find(
      variant =>
        isSellable(variant) && variantMatchesSelection(variant, selected)
    ) ?? findMatchingVariant(variants, selected)
  );
}

/** Whether a value remains possible given the rest of the current selection. */
export function isAttributeValueAvailable(
  variants: ProductVariant[],
  selected: SelectedAttributes,
  attributeName: string,
  value: string
): boolean {
  const nextSelection = { ...selected, [attributeName]: value };

  return variants.some(
    variant =>
      isSellable(variant) && variantMatchesSelection(variant, nextSelection)
  );
}

/**
 * Apply a new attribute choice (Shopify-style):
 * keep other axes only when they still form an in-stock combination.
 */
export function applyAttributeSelection(
  variants: ProductVariant[],
  selected: SelectedAttributes,
  attributeName: string,
  value: string
): SelectedAttributes {
  const withNew: SelectedAttributes = {
    ...selected,
    [attributeName]: value,
  };

  const fullyCompatible = variants.some(
    variant => isSellable(variant) && variantMatchesSelection(variant, withNew)
  );
  if (fullyCompatible) return withNew;

  // Drop incompatible siblings, keeping the newly chosen value.
  const next: SelectedAttributes = { [attributeName]: value };

  for (const [name, currentValue] of Object.entries(selected)) {
    if (name === attributeName) continue;
    const trial = { ...next, [name]: currentValue };
    const ok = variants.some(
      variant => isSellable(variant) && variantMatchesSelection(variant, trial)
    );
    if (ok) next[name] = currentValue;
  }

  return next;
}

export function getEffectivePrice(
  variant: ProductVariant | undefined,
  fallback: { price: number; sale_price: number | null }
) {
  if (!variant) return fallback;
  return {
    price: variant.price,
    sale_price: variant.sale_price,
  };
}

export function getInitialSelection(
  variants: ProductVariant[]
): SelectedAttributes {
  const firstInStock = variants.find(isSellable);
  if (!firstInStock) return {};
  return Object.fromEntries(
    firstInStock.attributes.map(attr => [attr.name, attr.value])
  );
}
