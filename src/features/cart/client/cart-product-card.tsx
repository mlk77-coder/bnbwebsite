'use client';

import { CartItem } from '@/types/cart';
import Image from 'next/image';
import { FC } from 'react';
import CartItemVariants from '@/features/cart/client/cart-item-variants';
import ProductCartQuantity from '@/features/cart/client/product-cart-quantity';
import RemoveProductFromCart from '@/features/cart/client/remove-product-from-cart';
import { useTranslations } from 'next-intl';
import { formatPrice } from '@/lib/utils';
import useCurrencyStore from '@/store/use-currency-store';
import { Link } from '@/navigation';
import { CheckCircle2, PackageX, Sparkles } from 'lucide-react';

type PropsType = {
  item: CartItem;
};

const CartProductCard: FC<PropsType> = ({ item }) => {
  const t = useTranslations();
  const currency = useCurrencyStore(state => state.currency);
  const symbol = useCurrencyStore(state => state.symbol);
  const product = item.product;
  const variant = item.variant;
  const variantAttrs = variant?.attributes ?? [];
  const basePrice = variant?.price ?? product.price;
  const salePrice = variant?.sale_price ?? product.sale_price;
  const unitPrice = salePrice ?? basePrice;
  const hasSale =
    salePrice !== null && salePrice !== undefined && salePrice < basePrice;
  const stockLabel = !product.is_available
    ? t('out-of-stock')
    : product.stock_quantity > 5
      ? t('in-stock')
      : t('few-in-stock');

  return (
    <article className='group md:border-primary/10 md:shadow-primary/5 md:hover:border-primary/20 md:hover:shadow-primary/10 relative w-full bg-white md:overflow-hidden md:rounded-3xl md:border md:p-5 md:shadow-sm md:transition-shadow md:hover:shadow-md'>
      {/* ── Mobile (< md): compact list row (Shopify / Amazon style) ── */}
      <div className='flex gap-3 border-b border-gray-100 py-4 last:border-b-0 md:hidden'>
        <Link
          href={`/products/${product.id}`}
          className='relative size-21 shrink-0 overflow-hidden rounded-lg bg-gray-50'
        >
          <Image
            className='size-full object-cover'
            src={product.image ?? '/no-product.svg'}
            width={168}
            height={168}
            alt={product.name}
            sizes='84px'
          />
          {hasSale ? (
            <span className='bg-primary text-primary-foreground absolute inset-s-1 top-1 rounded px-1 py-0.5 text-[9px] font-bold uppercase'>
              {t('sale')}
            </span>
          ) : null}
        </Link>

        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <div className='flex items-start gap-1'>
            <Link href={`/products/${product.id}`} className='min-w-0 flex-1'>
              <h2
                title={product.name}
                className='line-clamp-2 text-sm leading-snug font-medium text-gray-900'
              >
                {product.name}
              </h2>
            </Link>
            <RemoveProductFromCart item={item} inline />
          </div>

          {variantAttrs.length > 0 ? (
            <CartItemVariants attributes={variantAttrs} />
          ) : null}

          <p
            className={
              product.is_available
                ? 'text-xs text-green-700'
                : 'text-xs font-medium text-red-600'
            }
          >
            {!product.is_available ? (
              <span className='inline-flex items-center gap-1'>
                <PackageX className='size-3 shrink-0' />
                {stockLabel}
              </span>
            ) : (
              <span className='inline-flex items-center gap-1'>
                <CheckCircle2 className='size-3 shrink-0' />
                {stockLabel}
              </span>
            )}
          </p>

          <div className='flex flex-wrap items-baseline gap-x-2 gap-y-0.5'>
            <span className='text-sm font-semibold text-gray-900'>
              {formatPrice(unitPrice * currency, symbol)}
            </span>
            {hasSale ? (
              <span className='text-xs text-gray-400 line-through'>
                {formatPrice(basePrice * currency, symbol)}
              </span>
            ) : null}
          </div>

          <div className='flex items-center justify-between gap-3 pt-0.5'>
            <ProductCartQuantity item={item} size='compact' />
            <p className='shrink-0 text-base font-bold text-gray-900'>
              {formatPrice(item.subtotal * currency, symbol)}
            </p>
          </div>
        </div>
      </div>

      {/* ── Desktop (md+): rich card ── */}
      <div className='relative hidden md:grid md:grid-cols-[auto_1fr] md:gap-5'>
        <RemoveProductFromCart item={item} />

        <Link
          href={`/products/${product.id}`}
          className='bg-secondary relative block overflow-hidden rounded-2xl'
        >
          <Image
            className='size-32 shrink-0 object-cover transition-transform duration-500 group-hover:scale-105'
            src={product.image ?? '/no-product.svg'}
            width={300}
            height={300}
            alt={product.name}
          />
          {hasSale ? (
            <span className='bg-primary text-primary-foreground absolute inset-s-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold shadow'>
              <Sparkles className='size-3' />
              {t('sale')}
            </span>
          ) : null}
        </Link>

        <div className='flex min-w-0 flex-col justify-between gap-3 pe-8'>
          <div className='space-y-2.5'>
            <Link
              className='inline-block w-full'
              href={`/products/${product.id}`}
            >
              <h2
                title={product.name}
                className='font-body text-foreground hover:text-primary line-clamp-2 text-base font-semibold tracking-normal transition-colors lg:text-lg'
              >
                {product.name}
              </h2>
            </Link>

            {variantAttrs.length > 0 ? (
              <CartItemVariants attributes={variantAttrs} />
            ) : null}

            <div className='flex flex-wrap items-center gap-2'>
              {!product.is_available ? (
                <span className='inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600'>
                  <PackageX className='size-3.5' />
                  {stockLabel}
                </span>
              ) : (
                <span className='inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-600'>
                  <CheckCircle2 className='size-3.5' />
                  {stockLabel}
                </span>
              )}
            </div>
          </div>

          <div className='grid grid-cols-[1fr_auto] items-end gap-3'>
            <div className='bg-secondary/40 grid grid-cols-2 gap-3 rounded-2xl p-3'>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-xs tracking-wide uppercase'>
                  {t('price')}
                </span>
                <div className='flex flex-wrap items-baseline gap-2'>
                  <span className='text-foreground font-semibold'>
                    {formatPrice(unitPrice * currency, symbol)}
                  </span>
                  {hasSale ? (
                    <span className='text-muted-foreground text-xs line-through'>
                      {formatPrice(basePrice * currency, symbol)}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-xs tracking-wide uppercase'>
                  {t('total')}
                </span>
                <p className='text-primary font-bold'>
                  {formatPrice(item.subtotal * currency, symbol)}
                </p>
              </div>
            </div>

            <ProductCartQuantity item={item} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartProductCard;
