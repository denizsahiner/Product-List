import { Product } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import CardSlider from "@/components/common/CardSlider";

interface ProductWithPrice extends Product {
  price: number;
}

async function getProducts(): Promise<ProductWithPrice[]> {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://product-list-seven-tawny.vercel.app/"
      : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function Home() {
  let products: ProductWithPrice[] = [];
  let error: string | null = null;
  try {
    products = await getProducts();
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
    } else if (typeof err === "string") {
      error = err;
    } else {
      error = "An unknown error occured";
    }
  }

  return (
    <main>
      <h1 className="font-avenir-book text-3xl md:text-[45px] text-center mt-10 md:mt-55 mb-5 md:mb-10">
        Product List
      </h1>

      <CardSlider cardsToShow={4}>
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </CardSlider>

      {error && (
        <div className="text-center text-red-500 mt-4">
          <strong>Error!</strong>
          <span> {error}</span>
        </div>
      )}
    </main>
  );
}
