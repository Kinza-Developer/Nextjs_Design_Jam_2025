import Navbar from "./components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <Image 
          src="/hero-furniture.png" 
          alt="Furniture Shop" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-90"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">Welcome to Furniture Shop</h1>
          <p className="text-lg mt-4 drop-shadow-md font-semibold">Discover a wide range of beautifully crafted furniture for your home.</p>
          <Link href="/products">
            <button className="mt-6 px-8 py-3 bg-blue-400 text-white font-semibold rounded-full hover:bg-blue-800 transition duration-300 shadow-lg">
              Explore Our Products
            </button>
          </Link>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/products?category=Sofas" className="group">
            <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-md">
              <Image src="/sofa.jpg" alt="Sofas" layout="fill" objectFit="cover" className="group-hover:scale-105 transition duration-300" />
            </div>
            <p className="text-xl font-semibold mt-4">Sofas</p>
          </Link>
          <Link href="/products?category=Tables" className="group">
            <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-md">
              <Image src="/table.jpg" alt="Tables" layout="fill" objectFit="cover" className="group-hover:scale-105 transition duration-300" />
            </div>
            <p className="text-xl font-semibold mt-4">Tables</p>
          </Link>
          <Link href="/products?category=Chairs" className="group">
            <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-md">
              <Image src="/chair.jpg" alt="Chairs" layout="fill" objectFit="cover" className="group-hover:scale-105 transition duration-300" />
            </div>
            <p className="text-xl font-semibold mt-4">Chairs</p>
          </Link>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-800 text-white py-16 text-center">
        <h2 className="text-3xl font-bold">Upgrade Your Home Today</h2>
        <p className="mt-4 text-lg">Shop now and bring elegance and comfort to your home.</p>
        <Link href="/products">
          <button className="mt-6 px-8 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-full hover:bg-yellow-600 transition duration-300">
            Browse Collection
          </button>
        </Link>
      </div>
    </div>
  );
}