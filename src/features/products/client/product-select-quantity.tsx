'use client';

import QuantityInput from '@/components/quantity-input';
import useProductDetailsStore from '@/store/use-product-details-store';

const ProductSelectQuantity = () => {
  const quantity = useProductDetailsStore(state => state.quantity);
  const setQuantity = useProductDetailsStore(state => state.setQuantity);
  return <QuantityInput value={quantity} setValue={setQuantity} />;
};

export default ProductSelectQuantity;
