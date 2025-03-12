import { FaCalendarAlt, FaUser } from "react-icons/fa"


export default function BlogFeaturedSection({ data }: any) {


  return (
    <div className="max-w-6xl mx-auto  space-y-6">
      {/* Main Banner */}
      <p className="text-center mb-12">Every product and brand is selected by liveoffcoupon editors. We may earn a commission on the items you choose to buy. Learn more.</p>
      {data && data?.list?.slice(1, 2)?.map((blog: any, _index: any) => {
        return (
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-[300px] md:h-[700px]">
              <img src={blog?.featuredImage || "/placeholder.svg?height=400&width=800"} alt="Travel Quiz Banner" className="object-cover " />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white p-6">
              <div className="text-sm text-gray-600 uppercase tracking-wider mb-2">Travel</div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{blog?.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400" />
                  <span>Published March 1, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-400" />
                  <span>By Maria Lalonde</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}



      {/* Deals Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {data?.list?.slice(2, 4).map((item: any, index: any) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center p-6 border border-[#8abb44] rounded-lg bg-white"
          >
            {/* Image Section */}
            <div className="w-40 md:w-48 flex-shrink-0 mb-4 md:mb-0">
              <img
                src={item?.featuredImage || "/placeholder.svg?height=200&width=200"}
                alt={item.title}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left md:ml-8">
              <h3 className="font-bold text-xl">{item.title}</h3>
              <p className="text-[#78b144] font-bold">{item.category?.categoryTitle || "DEALS & SALES"}</p>

              {/* Button */}
              <button className="inline-block px-6 py-2 bg-[#8abb44] text-white font-medium rounded-full hover:bg-[#7aa93a] transition-colors">
                See More
              </button>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

