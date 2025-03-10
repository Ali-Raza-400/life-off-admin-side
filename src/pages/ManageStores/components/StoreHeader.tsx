export default function StoreHeader({ data }: any) {
    return (
        <div className="max-w-[1440px] mx-auto md:px-4 md:py-8">
            <div className="relative">
                {/* Main container with subtle shadow and border */}
                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-10 rounded-xl bg-white md:py-8 px-6">
                    {/* Logo container */}
                    <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center p-6 border-4 border-[#7FA842]">
                        <img 
                            src={data?.list?.store.logoUrl || '/assets/category-logo.svg'} 
                            alt={`${data?.list?.store?.name || 'Store'} Logo`}
                            className="w-[183px] h-[89px] object-contain"
                        />
                    </div>

                    {/* Text content */}
                    <div className="flex flex-col items-center text-center sm:items-center sm:text-left flex-grow">
                        <h1 style={{
										fontSize: "clamp(24.09px, 2vw, 38.09px)",
									}} className="text-[38.09px] sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                            {data?.list?.store?.name || 'N/A'} Coupons & Promo Codes
                        </h1>
                        <p className="text-[14px] text-gray-600 uppercase tracking-wide" style={{
										fontSize: "clamp(10.09px, 5vw, 14px)",
									}}>
                            TOP OFFERS FOR {new Date().toLocaleString('en-US', { 
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            }).toUpperCase()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
