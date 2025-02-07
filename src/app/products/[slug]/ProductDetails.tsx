'use client';

import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import { useState } from 'react';
import { useCart } from '@/app/components/context/CartContext';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

export default function ProductDetails({ product }: { product: any }) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-14">
        {product.image?.asset?._ref ? (
          <Image 
          src={urlFor(product.image).url() || '/placeholder.jpg'}
            alt={product.name}
            width={350}
            height={300}
            className="rounded-lg object-cover"
            style={{ marginLeft: "150px" }}
          />
        ) : (
          <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}

        <div style={{ marginRight: "100px", marginTop: "50px" }}>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-lg mt-4">{product.description}</p>
          <p className="text-2xl text-green-600 font-bold mt-6">${product.price}</p>
          <div className="mt-4">
            <label className="mr-3 font-bold text-lg">Quantity:</label>
            <input 
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-2 w-16"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}