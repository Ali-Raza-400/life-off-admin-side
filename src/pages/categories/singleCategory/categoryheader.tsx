import { FaBolt, FaArrowRight } from "react-icons/fa";

export default function CategoryHeader({ data }: any) {
  const category = data?.list || {}; // Use `list` as primary source

  return (
    <div className="max-w-7xl mx-auto p-4 mt-6">
      <div className="flex items-center gap-6">
        {/* Logo Circle */}
        <div className="relative flex-shrink-0">
          <div style={{width:'clamp(150px, 18vw, 200px)',height:'clamp(150px, 18vw, 200px)'}} className="w-[200px] h-[200px] rounded-full border-4 border-[#a3e635] flex items-center justify-center bg-[#232F3E]">
            {/* <img
              src={category.image || "/placeholder.svg"}
              alt={category.categoryTitle || "Category Image"}
              width={60}
              height={60}
              className="object-cover rounded-full"
            /> */}
              <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  
                  className= " rounded-full w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[33.9px] font-bold tracking-tight" style={{fontSize:'clamp(24px, 2vw, 33.9px)'}}>
            {category.categoryTitle || "Category"}
          </h1>
          <p className="text-[15.5px] font-semibold tracking-wider text-gray-600" style={{fontSize:'clamp(12px, 2vw, 15.5px)'}}>
            {category.categoryDescription || "No description available"}
          </p>
          <div className="flex items-center gap-2 mt-1 text-[14.32px] font-medium" style={{fontSize:'clamp(12px, 2vw, 13.5px)'}}>
            <FaBolt className="text-[#a3e635]" />
            <span className="tracking-wide">{category.categoryName}</span>
            <FaArrowRight className="text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
