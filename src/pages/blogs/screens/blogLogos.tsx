export default function BlogIcons() {
    const categories = [
      { name: "Budget", image: "/placeholder.svg" },
      { name: "Beauty", image: "/placeholder.svg" },
      { name: "Fashion", image: "/placeholder.svg" },
      { name: "Home", image: "/placeholder.svg" },
      { name: "Tech", image: "/placeholder.svg" },
      { name: "Travel", image: "/placeholder.svg" },
      { name: "Deals", image: "/placeholder.svg" },
      { name: "Calendar", image: "/placeholder.svg" },
    ];
  
    return (
      <div className="flex justify-center">
        <div className="hidden md:grid grid-cols-4 md:grid-cols-8 gap-6 ">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12"
              />
              <p className="text-sm font-medium mt-1">{category.name}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-6 md:hidden">
          {categories.slice(0,4).map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12"
              />
              <p className="text-sm font-medium mt-1">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  