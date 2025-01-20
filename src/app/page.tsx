import Navbar from "./components/Navbar";
import Link from "next/link"; // Importing Link for navigation

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center">Welcome to Furniture Shop</h1>
        <p className="text-lg text-center mt-4">
          Discover a wide range of beautifully crafted furniture for your home. We offer quality and comfort for every style.
        </p>

        <div className="flex justify-center mt-6">
          <Link href="/products">
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">
                Explore Our Products
              </button>
          </Link>
        </div>
      </div>
    </>
  );
}
