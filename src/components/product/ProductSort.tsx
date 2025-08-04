"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const ProductSort: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSortBy = searchParams.get('sortBy');
  const currentSortOrder = searchParams.get('sortOrder');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    const newParams = new URLSearchParams(searchParams.toString());

    if (sortBy && sortOrder) {
      newParams.set('sortBy', sortBy);
      newParams.set('sortOrder', sortOrder);
    } else {
      newParams.delete('sortBy');
      newParams.delete('sortOrder');
    }
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex justify-end mx-4 md:mx-20 my-4">
      <select
        onChange={handleSortChange}
        value={`${currentSortBy || ''}-${currentSortOrder || ''}`}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Sort By</option>
        <option value="popularity-desc">Popularity (Descending)</option>
        <option value="popularity-asc">Popularity (Ascending)</option>
        <option value="price-desc">Price (Descending)</option>
        <option value="price-asc">Price (Ascending)</option>
      </select>
    </div>
  );
};

export default ProductSort;