import { NextResponse } from "next/server";
import productsData from "@/data/products.json";
import { getGoldPrice } from "@/lib/api";
import { Product } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const goldPrice = await getGoldPrice();
    if (goldPrice === null) {
      return NextResponse.json(
        { message: "Failed to retrieve gold price." },
        { status: 500 }
      );
    }
    const ounce_to_gram = 28.35;
    const productsWithPrice: Product[] = (productsData as Product[]).map(
      (product) => {
        const calculatedPrice =
          ((product.popularityScore + 1) * product.weight * goldPrice) /
          ounce_to_gram;
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
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");

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
    if (sortBy && sortOrder) {
      filteredProducts.sort((a, b) => {
        let aValue: number, bValue: number;

        switch (sortBy) {
          case "price":
            aValue = a.price || 0;
            bValue = b.price || 0;
            break;
          case "popularity":
            aValue = a.popularityScore || 0;
            bValue = b.popularityScore || 0;
            break;
          case "weight":
            aValue = a.weight || 0;
            bValue = b.weight || 0;
            break;
          case "name":
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (sortOrder === "asc") {
              return nameA.localeCompare(nameB);
            } else {
              return nameB.localeCompare(nameA);
            }
          default:
            return 0;
        }

        if (sortOrder === "asc") {
          return aValue - bValue;
        } else if (sortOrder === "desc") {
          return bValue - aValue;
        }

        return 0;
      });
    }
    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error("error in products API:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
