export interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    [key: string]: string;
  };
  price?: number;
}
