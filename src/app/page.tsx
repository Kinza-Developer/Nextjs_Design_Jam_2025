import { client } from '@/sanity/lib/client';
import { imageUrlBuilder } from '@/sanity/lib/client'; // Import the imageUrlBuilder function
import Image from 'next/image';

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  image: { asset: { _ref: string } }; // The image field is an object with asset reference
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

async function fetchProducts() {
  const query = `*[_type == "product"]{
    _id,
    name,
    slug,
    image,
    price,
    quantity,
    tags,
    description,
    features,
    dimensions
  }`;
  return await client.fetch<Product[]>(query);
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add Heading with Styling */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-8 text-center rounded-lg shadow-md mb-8">
        <h1 className="text-5xl font-extrabold">Furniture Shop</h1>
        <p className="text-lg mt-2">Find the perfect furniture for your home!</p>
      </div>
      
      <h2 className="text-4xl font-bold text-center mb-8">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
            {product.image?.asset?._ref ? (
              <Image
                src={imageUrlBuilder(client).image(product.image.asset._ref).width(300).height(300).url() || '/placeholder.jpg'} // Use imageUrlBuilder to get the image URL
                alt={product.name}
                width={300}
                height={300}
                className="rounded-t-lg object-cover w-full h-64"
              />
            ) : (
              <div className="bg-gray-200 w-full h-64 rounded-t-lg flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">${product.price}</span>
                <span className="text-sm text-gray-400">Qty: {product.quantity}</span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-1">Features:</h3>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold">Dimensions:</h3>
                <p className="text-gray-500 text-sm">
                  H: {product.dimensions.height}, W: {product.dimensions.width}, D: {product.dimensions.depth}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold">Tags:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
