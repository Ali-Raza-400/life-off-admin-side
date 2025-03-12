import { FaCalendarAlt } from "react-icons/fa"

export default function BlogNewsLayout({ data }: any) {
  // Ensure data exists before mapping
  if (!data?.list || data.list.length === 0) return <p>No data available</p>;

  // Split data: First 4 for latest news, rest for trending
  const latestNews = data.list.slice(0, 4); 
  const trendingNews = data.list.slice(0,4);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Latest News */}
        <div className="lg:col-span-6 space-y-8">
          <h2 className="text-xl font-bold mb-4">THE LATEST</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestNews.map((item:any, index:any) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <img
                  src={item.featuredImage || "/placeholder.svg?height=200&width=300"}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-semibold text-green-600">
                    {item.category?.categoryTitle || "CATEGORY"}
                  </span>
                  <h3 className="font-bold mt-2 mb-2">{item.title}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <FaCalendarAlt className="mr-1" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Trending News */}
        <div className="lg:col-span-6">
          <h2 className="text-xl font-bold mb-8">TRENDING</h2>
          <div className="space-y-4">
            {trendingNews.map((item:any, index:any) => (
              <div key={index} className="flex gap-4 border-b pb-4">
                <img
                  src={item.featuredImage || "/placeholder.svg?height=80&width=80"}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <FaCalendarAlt className="mr-1" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}

            {/* Deal Banner */}
            <div className="bg-[#1a3a3a] text-white p-6 rounded-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-green-400 text-sm font-semibold">STEAL THIS DEAL</span>
                <h3 className="text-2xl font-bold mt-2">
                  30% OFF KITCHENAID
                  <br />
                  STAND MIXER
                </h3>
              </div>
              <div className="absolute right-0 bottom-0">
                <div className="w-24 h-24 bg-green-400 rounded-full -mb-6 -mr-6 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=60&width=60"
                    alt="KitchenAid Mixer"
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
