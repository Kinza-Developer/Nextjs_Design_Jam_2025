import { client } from '@/sanity/lib/client';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

export default async function ProductsPage() {
  const query = `*[_type == "product"]{ name, price, image, slug }`;
  const products = await client.fetch(query);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.slug.current} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
