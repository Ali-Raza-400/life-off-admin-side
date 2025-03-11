import { FaCalendarAlt } from "react-icons/fa"

export default function BlogNewsLayout() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Latest News */}
        <div className="lg:col-span-6 space-y-8">
          {/* Latest Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">THE LASTEST</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tech Card */}
              <div className="border rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Tech Deals"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-semibold text-green-600">DAILY DEALS</span>
                  <h3 className="font-bold mt-2 mb-2">Daily Deals: Apple iPad 10 Price Drop, Amazon Fire TV 4K...</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <FaCalendarAlt className="mr-1" />
                    Published March 5, 2025
                  </div>
                </div>
              </div>

              {/* Maurices Card */}
              <div className="border rounded-lg overflow-hidden">
                <img src="/placeholder.svg?height=200&width=300" alt="Maurices" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-xs font-semibold text-blue-600">BUDGET</span>
                  <h3 className="font-bold mt-2 mb-2">You Don't Want To Miss These New Arrivals From maurices</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <FaCalendarAlt className="mr-1" />
                    Published March 5, 2025
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Luggage Card */}
            <div className="border rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Luggage Deals"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-purple-600">TRAVEL</span>
                <h3 className="font-bold mt-2 mb-2">Daily Deals: Apple iPad 10 Price Drop, Amazon Fire TV 4K...</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <FaCalendarAlt className="mr-1" />
                  Published March 5, 2025
                </div>
              </div>
            </div>

            {/* Concert Card */}
            <div className="border rounded-lg overflow-hidden">
              <img src="/placeholder.svg?height=200&width=300" alt="Concert" className="w-full h-48 object-cover" />
              <div className="p-4">
                <span className="text-xs font-semibold text-yellow-600">ENTERTAINMENT</span>
                <h3 className="font-bold mt-2 mb-2">You Don't Want To Miss These New Arrivals From maurices</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <FaCalendarAlt className="mr-1" />
                  Published March 5, 2025
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Trending */}
        <div className="lg:col-span-6">
          <h2 className="text-xl font-bold mb-4">TRENDING</h2>
          <div className="space-y-4">
            {/* Trending Items */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex gap-4 border-b pb-4">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt={`Trending ${item}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold mb-1">Sorry, These Starbucks Drinks Have Been Discontinued</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <FaCalendarAlt className="mr-1" />
                    Published March 5, 2025
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

