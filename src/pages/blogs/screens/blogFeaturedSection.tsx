import { FaCalendarAlt, FaUser } from "react-icons/fa"

export default function BlogFeaturedSection() {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Main Banner */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <div className="relative h-[300px] md:h-[400px]">
          <img src="/placeholder.svg?height=400&width=800" alt="Travel Quiz Banner"  className="object-cover " />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white p-6">
          <div className="text-sm text-gray-600 uppercase tracking-wider mb-2">Travel</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Quiz: What Kind of Budget Traveler Are You?</h1>
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

      {/* Deals Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Apple Watch Deal */}
        <div className="border rounded-lg p-6 flex items-center gap-6 hover:shadow-md transition-shadow">
          <div className="w-32 h-32 relative flex-shrink-0">
            <img src="/placeholder.svg?height=150&width=150" alt="Apple Watch" className="object-contain" />
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-xl">
              THE <span className="text-[#78b144]">BEST</span>
            </h2>
            <h3 className="font-bold text-xl">APPLE WATCH</h3>
            <p className="text-[#78b144] font-bold">DEALS & SALES</p>
            <button className="bg-[#78b144] text-white px-6 py-2 rounded-md hover:bg-[#6a9d3a] transition-colors">
              See More
            </button>
          </div>
        </div>

        {/* AirPods Deal */}
        <div className="border rounded-lg p-6 flex items-center gap-6 hover:shadow-md transition-shadow">
          <div className="w-32 h-32 relative flex-shrink-0">
            <img src="/placeholder.svg?height=150&width=150" alt="Apple AirPods" className="object-contain" />
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-xl">
              THE <span className="text-[#78b144]">BEST</span>
            </h2>
            <h3 className="font-bold text-xl">APPLE AIRPODS</h3>
            <p className="text-[#78b144] font-bold">DEALS & SALES</p>
            <button className="bg-[#78b144] text-white px-6 py-2 rounded-md hover:bg-[#6a9d3a] transition-colors">
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

