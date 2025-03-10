export default function StoreHeader({ data }: any) {
    return (
      <div className="max-w-[1440px] mx-auto md:px-4 md:py-8">
        <div className="relative">
          {/* Main container with subtle shadow and border */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-white md:py-8 px-6">
            {/* Left container (Logo) */}
            <div className=" justify-center md:justify-start flex">
              <div
                style={{
                  width: "clamp(123px, 10vw, 183px)",
                  height: "clamp(123px, 10vw, 183px)",
                }}
                className="rounded-full bg-white flex items-center justify-center p-2 border-[6px] border-[#7FA842]"
              >
                <div className="w-[80%] h-[80%] flex items-center justify-center">
                  <img
                    src={data?.list?.store.logoUrl || "/assets/category-logo.svg"}
                    alt={`${data?.list?.store?.name || "Store"} Logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
  
            {/* Right container (Text content) */}
            <div className="flex flex-col items-center text-center sm:items-center sm:text-center justify-center flex-grow">
              <h1
                className="font-bold text-gray-900 mb-2"
                style={{
                  fontSize: "clamp(24.09px, 2vw, 38.09px)",
                }}
              >
                {data?.list?.store?.name || "N/A"} Coupons & Promo Codes
              </h1>
              <p
                className="text-gray-600 uppercase tracking-wide"
                style={{
                  fontSize: "clamp(10.09px, 5vw, 14px)",
                }}
              >
                TOP OFFERS FOR{" "}
                {new Date()
                  .toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                  .toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  