import { NextResponse } from "next/server";
import productsData from "@/data/products.json";
import { getGoldPrice } from "@/lib/api";
import { Product } from "@/lib/types";

export async function GET(request: Request) {
  try {
    
    let goldPrice: number;
    try {
      const fetchedPrice = await getGoldPrice();
      goldPrice = fetchedPrice || 2000; 
    } catch (error) {
      console.warn("Gold price API failed, using fallback:", error);
      goldPrice = 2000; 
    }

    const ounce_to_gram = 28.35;
    const productsWithPrice: Product[] = (productsData as Product[]).map(
      (product) => {
        const calculatedPrice =
          (product.popularityScore + 1) * product.weight * goldPrice / ounce_to_gram;
        return {
          ...product,
          price: parseFloat(calculatedPrice.toFixed(2)),
        };
      }
    );

    const { searchParams } = new URL(request.url);
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minPopularity = searchParams.get("minPopularity");

    let filteredProducts = productsWithPrice;

    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price && p.price >= parseFloat(minPrice)
      );
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price && p.price <= parseFloat(maxPrice)
      );
    }
    if (minPopularity) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.popularityScore && p.popularityScore >= parseFloat(minPopularity)
      );
    }

    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error("Error in products API:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}