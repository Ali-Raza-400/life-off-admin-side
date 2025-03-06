export default function StoreHeader({ data }: any) {
    console.log("data:::", data?.list?.store)
    return (
        <div className="max-w-[1440px] mx-auto px-4 py-8">
            <div className="relative">
                {/* Main container with green border */}
                <div className="flex flex-col sm:flex-row items-center justify-center rounded-xl border-[10px] border-[#96C121] overflow-visible relative py-6 px-4">

                    {/* Logo container with absolute positioning */}
                    <div className="bg-white border-[8px] border-[#14303B] rounded-xl flex items-center justify-center absolute top-[-9px] left-[-10px] p-[16px]">
                        <img src={`${data?.list?.store.logoUrl ||'/assets/category-logo.svg'}`} alt="A Beka Book Logo" className="h-20 w-auto" />
                    </div>

                    {/* Text content centered inside */}
                    <div className="text-center flex flex-col items-center justify-center w-full">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">{data?.list?.store?.name || 'N/A'}</h1>
                        <p className="text-sm text-gray-600 uppercase tracking-wide">{data?.list?.store?.headingH2 || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
