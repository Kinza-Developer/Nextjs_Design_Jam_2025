import { client } from '@/sanity/lib/client';
import ProductDetails from './ProductDetails';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "product" && slug.current == $slug][0]`;
  const product = await client.fetch(query, { slug: params.slug });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <ProductDetails product={product} />
    </div>
  );
}
