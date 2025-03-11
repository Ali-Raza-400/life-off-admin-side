import { TagOutlined, PercentageOutlined } from "@ant-design/icons"

// Define coupon data structure
interface Coupon {
  id: number
  brand: string
  logo: string
  description: string
  badgeText: string
  badgeColor: string
  bgColor: string
}

export default function AntdCouponPage() {
  // Coupon data
  const coupons: Coupon[] = [
    {
      id: 1,
      brand: "OOFOS",
      logo: "/placeholder.svg?height=80&width=150",
      description: "Women's OOmg Low Shoes As Low As $120",
      badgeText: "$25 OFF",
      badgeColor: "bg-gray-800",
      bgColor: "bg-black",
    },
    {
      id: 2,
      brand: "1800 CONTACTS",
      logo: "/placeholder.svg?height=80&width=150",
      description: "20% Off For New Customers + Free Shipping",
      badgeText: "SPECIAL",
      badgeColor: "bg-blue-600",
      bgColor: "bg-blue-600",
    },
    {
      id: 3,
      brand: "AVIS",
      logo: "/placeholder.svg?height=80&width=150",
      description: "25% Off For New AVIS Customers + Free Shipping",
      badgeText: "SPECIAL",
      badgeColor: "bg-red-600",
      bgColor: "bg-red-600",
    },
    {
      id: 4,
      brand: "1800 CONTACTS",
      logo: "/placeholder.svg?height=80&width=150",
      description: "25% Off For New Skechers Customers + Free Shipping",
      badgeText: "SPECIAL",
      badgeColor: "bg-gray-800",
      bgColor: "bg-gray-800",
    },
    {
      id: 5,
      brand: "ADIDAS",
      logo: "/placeholder.svg?height=80&width=150",
      description: "20% Off For New Adidas Customers + Free Shipping",
      badgeText: "SPECIAL",
      badgeColor: "bg-gray-800",
      bgColor: "bg-black",
    },
    {
      id: 6,
      brand: "ASOS",
      logo: "/placeholder.svg?height=80&width=150",
      description: "10% Cashback For Purchases Sitewide",
      badgeText: "SPECIAL",
      badgeColor: "bg-gray-800",
      bgColor: "bg-gray-800",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-4">About Clothing, Shoes, Accessories coupons</h1>
        <p className="text-sm max-w-2xl mx-auto">
          Listed above you'll find some of the best Clothing, Shoes, Accessories coupons, discounts and promotion codes
          as ranked by the users of iwantfreecoupons.To use a coupon simply click the coupon code then enter the code
          during the store's checkout process.
        </p>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="relative">
              <div
                className={`absolute top-2 left-2 ${coupon.badgeColor} text-white text-xs px-2 py-1 rounded flex items-center`}
              >
                {coupon.badgeText === "$25 OFF" ? (
                  <TagOutlined className="mr-1" style={{ fontSize: "12px" }} />
                ) : (
                  <PercentageOutlined className="mr-1" style={{ fontSize: "12px" }} />
                )}
                <span>{coupon.badgeText}</span>
              </div>
              <div className={`${coupon.bgColor} h-32 flex items-center justify-center p-4`}>
                <div className="text-white text-2xl font-bold">{coupon.brand}</div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold">{coupon.brand}</h3>
              <p className="text-sm my-1">{coupon.description}</p>
              <div className="text-xs text-gray-500 mt-4">Coupon Code</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

