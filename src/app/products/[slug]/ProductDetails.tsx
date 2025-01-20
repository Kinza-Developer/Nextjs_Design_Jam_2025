'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import Navbar from '@/app/components/Navbar';
import { useCart } from '@/app/components/context/CartContext';

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  image: { asset: { _ref: string } }; // Ensure this matches your schema
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

export default function ProductDetails({ product }: { product: Product }) {
    const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1, // Default to 1 when adding for the first time
      image: product.image.asset._ref, // Pass the image reference
    });
  };

  return (
    <>
    <Navbar />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
      {/* Product Image */}
      {product.image?.asset?._ref ? (
        <Image
          src={urlFor(product.image.asset._ref)} // Use urlFor to get the correct image URL
          alt={product.name}
          width={300}
          height={300}
          className="rounded-lg object-cover"
        />
      ) : (
        <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center">
          <span>No Image Available</span>
        </div>
      )}

      {/* Product Details */}
      <div>
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-lg mt-4">{product.description}</p>
        <p className="text-2xl text-green-600 font-bold mt-6">${product.price}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
    </>
  );
}
