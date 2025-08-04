import { Product } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import CardSlider from "@/components/common/CardSlider";
import ProductSort from "@/components/product/ProductSort";

interface ProductWithPrice extends Product {
  price: number;
}

async function getProducts(
  sortBy?: string,
  sortOrder?: string
): Promise<ProductWithPrice[]> {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://product-list-seven-tawny.vercel.app/"
      : "http://localhost:3000";

  const params = new URLSearchParams();
  if (sortBy) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);

  const queryString = params.toString();
  const url = `${baseUrl}/api/products${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function Home(props: { 
  searchParams: Promise<{ sortBy?: string; sortOrder?: string }> 
}) {
  let products: ProductWithPrice[] = [];
  let error: string | null = null;
 try {
    const searchParams = await props.searchParams;
    products = await getProducts(searchParams?.sortBy, searchParams?.sortOrder);
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
      <ProductSort />
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
