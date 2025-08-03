"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Product } from "@/lib/types";
import RatingDisplay from "../popularity/Rating";

interface ProductCardProps {
  product: Product & { price: number };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<
    "yellow" | "white" | "rose"
  >("yellow");

  const colorOptions = [
    {
      key: "yellow" as const,
      name: "Yellow Gold",
      bgColor: "bg-[#E6CA97]",
    },
    {
      key: "white" as const,
      name: "White Gold",
      bgColor: "bg-[#D9D9D9]",
    },
    {
      key: "rose" as const,
      name: "Rose Gold",
      bgColor: "bg-[#E1A4A9]",
    },
  ];

  const getSelectedColorName = () => {
    const selectedOption = colorOptions.find(
      (option) => option.key === selectedColor
    );
    return selectedOption?.name || "Yellow Gold";
  };

  return (
    <div className="min-w-[500px] max-w-[500px] min-h-[600px] max-h-[600px] p-4 m-10">
      <img
        src={product.images[selectedColor]}
        alt={product.name}
        className="rounded-3xl h-70 w-70 mb-4"
      />

      <h2 className="font-montserrat-medium text-[15px] mt-4 font-semibold">
        {product.name}
      </h2>

      <h3 className="font-montserrat-regular text-[15px] mt-1 mb-3">
        ${product.price} USD
      </h3>

      <div className="flex gap-2 mb-3">
        {colorOptions.map((color) => (
          <button
            key={color.key}
            onClick={() => setSelectedColor(color.key)}
            className={`
              w-6 h-6 rounded-full transition-all duration-200 p-0.5
              ${
                selectedColor === color.key
                  ? "border border-black"
                  : "hover:border hover:border-gray-300"
              }
            `}
          >
            <div className={`w-full h-full rounded-full ${color.bgColor}`} />
          </button>
        ))}
      </div>
      <p className="font-avenir-book text-[12px] text-sm text-gray-600 mb-2">
        {getSelectedColorName()}
      </p>

      <RatingDisplay score={product.popularityScore} />
    </div>
  );
};

export default ProductCard;
