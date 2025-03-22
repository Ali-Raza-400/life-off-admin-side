
import { FaCheck } from "react-icons/fa"

// Define the coupon data structure
interface Coupon {
  id: string
  logo: string
  discount: string
  isCode: boolean
  verified: boolean
  brand: string
  description: string
  details: string
  altText: string
}

export default function CouponDeals() {
  // Sample coupon data
  const coupons: Coupon[] = [
    {
      id: "1",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "40%",
      isCode: false,
      verified: true,
      brand: "Buddha Beauty",
      description: "Coupon Code",
      details: "40% Off Buddha Beauty Black Friday Coupon 2023",
      altText: "Buddha Beauty logo",
    },
    {
      id: "2",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "50%",
      isCode: true,
      verified: true,
      brand: "Lelusso",
      description: "Discount Code",
      details: "50% Off Lelusso Luxuso Black Week Coupon Code",
      altText: "Lelusso logo",
    },
    {
      id: "3",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "40%",
      isCode: false,
      verified: true,
      brand: "Buddha Beauty",
      description: "Coupon Code",
      details: "40% Off Buddha Beauty Black Friday Coupon 2023",
      altText: "Ipanema logo",
    },
    {
      id: "4",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "40%",
      isCode: false,
      verified: true,
      brand: "Buddha Beauty",
      description: "Coupon Code",
      details: "40% Off Buddha Beauty Black Friday Coupon 2023",
      altText: "Buddha Beauty logo",
    },
    {
      id: "5",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "50%",
      isCode: false,
      verified: true,
      brand: "Eclecticos",
      description: "Discount Code",
      details: "Buy One Get One With 50% Off Eclecticos Black Friday Coupon",
      altText: "Eclecticos logo",
    },
    {
      id: "6",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "30%",
      isCode: false,
      verified: true,
      brand: "Teaworld",
      description: "Discount Code",
      details: "30% Off Teaworld Black Friday Discount",
      altText: "Teaworld logo",
    },
    {
      id: "7",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "90%",
      isCode: false,
      verified: true,
      brand: "Pngtree",
      description: "Discount Code",
      details: "Upto 90% Off On Black Friday Sale - Pngtree Coupon",
      altText: "Pngtree logo",
    },
    {
      id: "8",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "90%",
      isCode: false,
      verified: true,
      brand: "Pngtree",
      description: "Discount Code",
      details: "Upto 90% Off On Black Friday Sale - Pngtree Coupon",
      altText: "Pngtree logo",
    },
    {
      id: "9",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "25%",
      isCode: true,
      verified: true,
      brand: "Fourth Frontier",
      description: "Coupon Code",
      details: "25% Off Discount Fourth Frontier Black Friday Special Code",
      altText: "Fourth Frontier logo",
    },
    {
      id: "10",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "35%",
      isCode: false,
      verified: true,
      brand: "Saii Resorts",
      description: "Promo Code",
      details: "Upto 35% Off + Free Breakfast - Saii Resorts Black Friday Coupon",
      altText: "Saii Resorts logo",
    },
    {
      id: "11",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "50%",
      isCode: false,
      verified: true,
      brand: "Amaran",
      description: "Discount Code",
      details: "Upto 50% Off On Black Friday Sale Amaran Coupon",
      altText: "Amaran logo",
    },
    {
      id: "12",
      logo: "/placeholder.svg?height=80&width=160",
      discount: "50%",
      isCode: false,
      verified: true,
      brand: "Amaran",
      description: "Discount Code",
      details: "Upto 50% Off On Black Friday Sale Amaran Coupon",
      altText: "Amaran logo",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Free Shipping Coupon Codes & Deals</h1>
      <p className="text-gray-700 mb-8">
        Undoubtedly the biggest shopping holiday for every season, the Black Friday stirs up expectations among
        consumers to save on their luxury purchases. If you are little furious about the crowds in stores, we understand
        you. Accept our open invitation to shop what you love from the most comfortable Black Friday sale ever, that we
        are glad to have for you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="border border-gray-200 rounded-lg p-4 flex flex-col">
            <div className="h-16 flex items-center justify-center mb-4">
              <img
                src={coupon.logo || "/placeholder.svg"}
                alt={coupon.altText}
                width={160}
                height={80}
                className="max-h-full object-contain"
              />
            </div>

            <div className="mb-2">
              {coupon.isCode ? (
                <div className="font-bold text-lg">
                  {coupon.discount} CODE{" "}
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                    <FaCheck className="mr-1" size={10} /> Verified
                  </span>
                </div>
              ) : (
                <div className="font-bold text-lg">
                  {coupon.discount} OFF{" "}
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                    <FaCheck className="mr-1" size={10} /> Verified
                  </span>
                </div>
              )}
              <div className="font-medium">
                {coupon.brand} {coupon.description}
              </div>
              <div className="text-xs text-gray-500 mt-1">{coupon.details}</div>
            </div>

            <div className="mt-auto">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm transition-colors">
                Show Coupon Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

