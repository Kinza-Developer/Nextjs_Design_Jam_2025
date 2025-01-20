import { client, imageUrlBuilder } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  product: {
    _id: string;
    name: string;
    slug: { current: string };
    image: { asset: { _ref: string } } | null;
    price: number;
    quantity: number;
    tags: string[];
    description: string;
    features: string[];
    dimensions: {
      height: string;
      width: string;
      depth: string;
    };
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  // Check if the product has an image and generate the URL correctly
  const imageUrl = product.image && product.image.asset 
    ? imageUrlBuilder(client).image(product.image.asset._ref).width(300).height(300).url() 
    : '/placeholder.jpg'; // Use fallback if no image

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <Link href={`/products/${product.slug.current}`}>
        <Image
          src={imageUrl}  // Use the generated image URL or fallback
          alt={product.name}
          width={300}
          height={300}
          className="rounded-t-lg object-cover w-full h-64"
        />
        <h2 className="text-lg font-bold mt-2">{product.name}</h2>
        <p className="text-green-600 font-semibold">${product.price}</p>
      </Link>
    </div>
  );
}
