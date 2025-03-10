
interface Category {
  id: string;
  image: string;
  title: string;
}

export default function CategoryGrid({ data }: any) {
  // Optionally log the incoming data for debugging
  console.log(data?.list);

  const categories = data?.list || []; // Safely access the list

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">All Coupons & Deals Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {categories.map((category: Category) => (
          <div key={category.id} className="flex flex-col items-center group cursor-pointer">
            <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-3 bg-gray-50">
              {/* Image container */}
              <div className="absolute inset-0 border-2 border-gray-100 rounded-full overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Category title */}
            <h3 className="text-xs font-medium text-center text-gray-800">{category.categoryTitle}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
