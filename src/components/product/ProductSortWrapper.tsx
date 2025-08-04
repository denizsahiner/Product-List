import { Suspense } from 'react';
import ProductSort from './ProductSort';

const ProductSortFallback = () => (
  <div className="flex justify-end mx-4 md:mx-20 my-4">
    <div className="p-2 border border-gray-300 rounded-md shadow-sm w-48 bg-gray-100">
      Loading sort options...
    </div>
  </div>
);

export default function ProductSortWrapper() {
  return (
    <Suspense fallback={<ProductSortFallback />}>
      <ProductSort />
    </Suspense>
  );
}