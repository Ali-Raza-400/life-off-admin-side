
import { useRef, useState } from "react"
import { FiClock, FiCheck, FiPlus } from "react-icons/fi"
import ProductSlider from "./ProductSlider"

export default function CouponTabs({ data }: any) {
    const couponsRef = useRef<HTMLDivElement>(null)
    const storeInfoRef = useRef<HTMLDivElement>(null)
    const faqsRef = useRef<HTMLDivElement>(null)

    function mapCoupons(apiCoupons: any[]) {
        const today = new Date();
        console.log("today:::", today)
        return apiCoupons.map(coupon => {
            console.log("coupon.endDate:::", coupon);

            const isExpired = new Date(coupon.endDate) < today;  // Check if coupon is expired
            const isActive = !isExpired && coupon.isVerified;   // Coupon is active only if not expired and verified
            const type = isExpired ? "Expired" : (isActive ? "Active" : "Unverified");

            return {
                id: coupon.id,
                type: type,  // Assign Active, Unverified, or Expired
                discount: coupon?.mainImage || "DEAL",
                // Use "code" as the discount if available
                second_img: coupon?.secondaryImage,
                title: coupon.name,
                expiry: isExpired ? "Expired" : `Expires ${new Date(coupon.endDate).toLocaleDateString()}`,
                verified: coupon.isVerified,
                description: coupon.detail,
                buttonText: isExpired ? "Expired" : coupon?.code ? "Click to Reveal" : "Click to Activate"  // Show "Expired" button if coupon is expired
            };
        });
    }


    const coupons = mapCoupons(data?.list?.store?.coupons || []);
    console.log("coupons:::", coupons)

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            // Scroll to the section with some offset for the header
            window.scrollTo({
                top: ref.current.offsetTop - 80,
                behavior: "smooth"
            })
        }
    }

    const [expandedId, setExpandedId] = useState<any>(null);

    return (
        <div className="max-w-[1440px]  font-sans  mx-auto px-4 py-8">
            {/* Fixed Tabs */}
            <div className="sticky top-0 z-10 bg-white border-b">
                <div className="flex">
                    <button
                        onClick={() => scrollToSection(couponsRef as any)}
                        className="px-4 py-2 text-sm font-medium text-green-600 border-b-2 border-green-600"
                    >
                        Coupons
                    </button>
                    <button
                        onClick={() => scrollToSection(storeInfoRef as any)}
                        className="px-4 py-2 text-sm font-medium text-gray-600"
                    >
                        Store Info
                    </button>
                    <button
                        onClick={() => scrollToSection(faqsRef as any)}
                        className="px-4 py-2 text-sm font-medium text-gray-600"
                    >
                        FAQs
                    </button>
                </div>
            </div>

            {/* Content Sections */}
            <div>
                {/* Coupons Section */}
                <div ref={couponsRef} className="py-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3">
                            {["Active", "Unverified", "Expired"].map((section) => {
                                const filteredCoupons = coupons.filter((coupon) => coupon.type === section);

                                return (
                                    <div key={section}>
                                        <h2 className="text-xl font-bold mb-4">{section} Coupons</h2>

                                        {/* If there are no coupons of this type */}
                                        {filteredCoupons.length === 0 ? (
                                            <div className="text-gray-500 text-sm">No coupons available in this category.</div>
                                        ) : (
                                            filteredCoupons.map((coupon) => {
                                                const hasDescription = coupon.description && coupon.description.trim() !== "";

                                                return (
                                                    <div key={coupon.id} className="border rounded-md p-4 mb-4">
                                                        <div className="flex flex-col md:flex-row md:items-center">
                                                            <div className="flex-1">
                                                                <div className="flex items-start gap-4">
                                                                    <div className="text-center">
                                                                        <div
                                                                            className={`font-bold text-xl ${section === "Expired" ? "text-gray-700" : "text-green-600"
                                                                                }`}
                                                                        >
                                                                            {coupon?.discount}
                                                                        </div>
                                                                        <div>{coupon?.second_img}</div>
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="text-xs text-gray-500">DEAL</div>
                                                                        <div className="font-medium">{coupon.title}</div>
                                                                        <div className="flex items-center text-xs mt-1">
                                                                            <FiClock className="text-gray-400 mr-1" />
                                                                            <span className="text-gray-500 mr-2">{coupon.expiry}</span>
                                                                            {coupon.verified && (
                                                                                <span className="flex items-center">
                                                                                    <FiCheck className="text-green-500 mr-1" />
                                                                                    <span className="text-green-500">Verified</span>
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 md:mt-0">
                                                                <button
                                                                    className={`text-white text-sm font-medium py-1.5 px-4 rounded-md ${section === "Expired"
                                                                        ? "bg-gray-400 cursor-not-allowed"
                                                                        : "bg-gray-800 hover:bg-gray-700"
                                                                        }`}
                                                                    onClick={() => window.location.href = data?.list?.store?.htmlCode}
                                                                >
                                                                    {coupon.buttonText}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* See Details Button (Always Show) */}
                                                        <div
                                                            className="text-xs text-gray-600 flex items-center mt-4 pt-2 border-t cursor-pointer"
                                                            onClick={() => setExpandedId(expandedId === coupon.id ? null : coupon.id)}
                                                        >
                                                            <span>See Details</span>
                                                            <span className="ml-1">{expandedId === coupon.id ? "−" : "+"}</span>
                                                        </div>

                                                        {/* Expandable Section */}
                                                        {expandedId === coupon.id && (
                                                            <div className="mt-2 text-sm text-gray-700">
                                                                {hasDescription ? coupon.description : "No additional details available."}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right sidebar */}
                        <div className="w-full lg:w-1/3">
                            {/* Why Trust Us section */}
                            <div className="border rounded-lg p-5 mb-6 bg-white shadow-sm">
                                <h3 className="font-bold text-lg mb-3">Why Trust Us?</h3>
                                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                                    {data?.list?.store?.metaDescription ||
                                        "Not all coupon sites are created equal — that's because leafPromoCode.com has a team and a process that sets us apart. Every day, our curation team scours the web for all your favorite retailers. Then, our validation team works overnight to test and verify every code to ensure they work. From there, our merchandising team reviews each validated code and hand-picks the best coupons for our users. Our team just verified today's deals on February 29, 2024."
                                    }
                                </p>

                                <a href="#" className="text-sm text-blue-600 hover:underline font-medium">
                                    Learn How We Verify Coupons
                                </a>
                            </div>

                            {/* Website info */}
                            <div className="mb-4 text-center">
                                <div className="text-sm font-medium mb-1 underline cursor-pointer">leafpromocode.com</div>
                                <div className="text-sm font-medium mb-5">24 Offers Available</div>
                            </div>

                            {/* Filters section */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium mb-2">Filters Offers</h3>
                                <div className="space-y-2">
                                    <button className="w-full bg-[#7FA842] hover:bg-[#81ac41] transition-colors text-white rounded-full py-2 font-medium text-sm">
                                        All (24)
                                    </button>
                                    <button className="w-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 rounded-full py-2 font-medium text-sm">
                                        Deals (10)
                                    </button>
                                    <button className="w-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 rounded-full py-2 font-medium text-sm">
                                        Sales (3)
                                    </button>
                                </div>
                            </div>

                            {/* Similar Stores section */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-3">Similar Stores</h3>
                                <ul className="text-sm space-y-1.5">
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Scholastic
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Carson Dellosa Education
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Alpha Omega Publications
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Trend Enterprises
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            BJU Press
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Rainbow Resource Center
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Sonlight
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Didax
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            UMD Stores
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            DonorsChoose.org
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            FunShine Express
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Popular Stores section */}
                            <div>
                                <h3 className="text-lg font-bold mb-3">Popular Stores</h3>
                                <ul className="text-sm space-y-1.5">
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            The Mailbox
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            ABCmouse
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            LakeShore Learning
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Archer and Olive
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Spellbinders
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Really Good Stuff
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            School Specialty
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Creative Teaching
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                            Discount School Supply
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    data?.list?.store?.products?.length > 0 && <div className="my-16"><ProductSlider data={data} /></div>
                }


                {/* Store Info Section */}
                <div ref={storeInfoRef} className="pt-8 border-t">
                    {/* Render Store Article */}
                    <div
                        ref={storeInfoRef}
                        className="prose lg:prose-xl"
                    >
                        {data?.list?.store?.storeArticle ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: data?.list?.store?.storeArticle }}
                            />
                        ) : (
                            <p className="text-gray-500">No article available at the moment. Stay tuned for more updates!</p>
                        )}
                    </div>
                </div>


                {/* FAQs Section */}
                <div ref={faqsRef} className=" ">
                    <h2 className="text-2xl font-bold py-12">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        {(data?.list?.store?.faqs || []).map((faq: any, index: number) => (
                            <div key={index} className="border-b pb-4">
                                <details className="group">
                                    <summary className="flex justify-between items-center w-full text-left font-bold cursor-pointer">
                                        {faq.question}
                                        <FiPlus className="text-gray-500 group-open:hidden" />
                                        <FiCheck className="text-gray-500 hidden group-open:inline" />
                                    </summary>
                                    <p className="mt-2 text-gray-700">{faq.answer}</p>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
