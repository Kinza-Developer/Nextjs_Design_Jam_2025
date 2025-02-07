export default function CategoryFilter({ categories, onSelectCategory }: { categories: string[]; onSelectCategory: (category: string) => void }) {
    return (
      <select className="my-3 p-2 border border-gray-300 rounded" onChange={(e) => onSelectCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    );
  }