'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';

// Define Product Type
interface Product {
  _id: string;
  name: string;
  price: number;
  image: {
    asset: {
      _ref: string;
    };
  } | null;
  slug: {
    current: string;
  };
  quantity: number;
  tags: string[];
  description: string;
  features: string[];
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  category?: {
    name: string;
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{ name, price, image, slug, category->{name} }`;
      const data: Product[] = await client.fetch(query);
      setProducts(data);
      
      // Extract unique categories
      const uniqueCategories: string[] = [...new Set(data.map((product) => product.category?.name || 'Uncategorized'))];
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  // Filter products based on search & category
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory ? product.category?.name === selectedCategory : true)
  );

  // Paginate products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ minHeight: "92vh" }}>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <SearchBar onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1); // Reset to first page when searching
        }} />

        <CategoryFilter categories={categories} onSelectCategory={(category) => {
          setSelectedCategory(category);
          setCurrentPage(1); // Reset to first page when filtering
        }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.slug.current} product={product} />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredProducts.length / itemsPerPage)} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
