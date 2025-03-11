"use client"

import { useState } from "react"
import { FaTag } from "react-icons/fa"

// Sample data - in a real app this would come from an API
const dealsData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  category: "TECH",
  title:
    i % 3 === 0
      ? `Daily Deals: Apple iPad 10 Price Drop, Amazon Fire TV 4K...`
      : i % 3 === 1
        ? `Daily Deals: Score a Bonus TV with Samsung TV Plus Get...`
        : `Daily Deals: Apple Gift Idas from $70, Macy's Flash Sale with...`,
  publishDate: "March 5, 2025",
  imageUrl:
    i % 3 === 0
      ? "/placeholder.svg?height=120&width=200"
      : i % 3 === 1
        ? "/placeholder.svg?height=120&width=200"
        : "/placeholder.svg?height=120&width=200",
}))

export default function BlogDailyDeals() {
  const [visibleDeals, setVisibleDeals] = useState(3)

  const handleViewMore = () => {
    // Show 5 more deals when "VIEW ALL" is clicked
    setVisibleDeals((prev) => prev + 5)
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 rounded-full p-2">
            <FaTag className="text-white text-lg" />
          </div>
          <h2 className="text-xl font-bold">Daily Deals</h2>
        </div>
        <button onClick={handleViewMore} className="text-black font-semibold uppercase tracking-wide text-sm">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {dealsData.slice(0, visibleDeals).map((deal) => (
          <div
            key={deal.id}
            className="flex border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="w-1/4 min-w-[120px]">
              <img src={deal.imageUrl || "/placeholder.svg"} alt={deal.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col justify-between w-3/4">
              <div>
                <span className="text-green-600 font-medium text-sm">{deal.category}</span>
                <h3 className="font-bold text-lg mt-1 line-clamp-2">{deal.title}</h3>
              </div>
              <p className="text-gray-500 text-sm mt-2">Published {deal.publishDate}</p>
            </div>
          </div>
        ))}
      </div>

      {visibleDeals < dealsData.length && (
        <div className="mt-6 text-center">
          <button
            onClick={handleViewMore}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Load More Deals
          </button>
        </div>
      )}
    </div>
  )
}

