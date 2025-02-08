'use client';

import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import { useState } from 'react';
import { useCart } from '@/app/components/context/CartContext';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

// Define Product Type
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: {
    asset: {
      _ref: string;
    };
  };
}

// Sanity Image URL Builder
const builder = imageUrlBuilder(client);
const urlFor = (source: Product['image']) => builder.image(source);

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image.asset._ref,
    });
  };

  return (
    <div style={{ minHeight: "92vh" }}>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-14 px-4 md:px-0">
        {/* Image Section */}
        {product.image?.asset?._ref ? (
          <div className="flex justify-center md:block">
            <Image 
              src={urlFor(product.image).url() || '/placeholder.jpg'}
              alt={product.name}
              width={350}
              height={300}
              className="rounded-lg object-cover"
              style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "100%" }}
            />
          </div>
        ) : (
          <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}

        {/* Details Section */}
        <div className="text-center md:text-left px-4 my-7 md:px-0">
          <h1 className="text-2xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-base md:text-lg mt-2 md:mt-4">{product.description}</p>
          <p className="text-xl md:text-2xl text-green-600 font-bold mt-4 md:mt-6">${product.price}</p>

          <div className="mt-4 flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-3">
            <label className="font-bold text-base my-1 md:text-lg">Quantity:</label>
            <input 
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-2 w-16 text-center rounded-md"
            />
          </div>

          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-all w-full md:w-auto"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
