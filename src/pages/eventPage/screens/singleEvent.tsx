import DealCard from "./dealCard"
import StoreGrid from "./storeGrid"

export default function ChristmasDeals({ data }: any) {
  console.log("data::", data)

  // Extract stores for the StoreGrid component
  const storeList = data?.stores?.map((store: any) => store.name) || []

  // Transform coupons data to match the DealCard component format
  const dealsList =
    data?.coupons?.map((coupon: any) => ({
      discount: coupon.mainImage || "",
      type: coupon.secondaryImage || "OFF",
      brand: coupon.name,
      description: coupon.codeImage || "Coupon Code",
      verified: coupon.isVerified,
      expiry: formatDate(coupon.endDate),
      logo: coupon.storeId ? getStoreLogo(data.stores, coupon.storeId) : "/placeholder.svg?height=40&width=40",
      code: coupon.code,
      htmlCodeUrl: coupon.htmlCodeUrl,
      detail: coupon.detail,
    })) || []

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">{data?.title || "Christmas Deals 2025"}</h1>

      <p className="text-gray-700 mb-8">
        {data?.description ||
          "Undoubtedly the biggest shopping holiday for many years, the Black Friday stirs up expectations among consumers to save on their luxury purchases. If you are little furious about the crowds in stores, we understand you. Accept our open invitation to shop what you love from the most comfortable Black Friday sale ever, that we are glad to have for you."}
      </p>

      {/* Feature Stores */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Feature Stores</h2>
        <StoreGrid stores={storeList.length > 0 ? storeList : featureStores} />
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {(dealsList.length > 0 ? dealsList : deals).map((deal:any, index:any) => (
          <DealCard key={index} {...deal} />
        ))}
      </div>

      {/* Size Inclusive Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{data?.extraDescriptionHeading || "What Does Size-Inclusive Mean?"}</h2>
        <p className="text-gray-700">
          {data?.extraDescriptionContent ||
            "What is in your list of New Year's resolutions? If savings are on it, we predict that you will succeed. Since you are already here and we have been committed to coupons and fashion, it will be perfect if we get together. Christmas is time for you to prepare for endless party, sweet gifts and now savings too. Because we are arranging plenty of them! Sign up with us, take our discount deals and shopping advice that will feel like perfect Christmas treat. Retailers may have set records of earning millions over a holiday season, you can set new ones. By saving your money with up to 90% off coupons that stores offer at special occasions like Christmas, you can essentially control your budgets for months. Forget about the good ones! These's accessories, Daniel Wellington watches and The Tie Bar deals may make you pretty happy, as soon as you click them."}
        </p>
      </div>
    </div>
  )
}

// Helper function to format date
function formatDate(dateString: string): string {
  if (!dateString) return "N/A"

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch (error) {
    return "N/A"
  }
}

// Helper function to get store logo by storeId
function getStoreLogo(stores: any[], storeId: string): string {
  if (!stores || !storeId) return "/placeholder.svg?height=40&width=40"

  const store = stores.find((store) => store.id === storeId)
  return store?.logoUrl || "/placeholder.svg?height=40&width=40"
}

// Fallback data in case the API data is not available
const featureStores = [
  "Bludhie Beauty",
  "Lelusso",
  "Ipanema",
  "Sali Resorts",
  "Prepworld",
  "Progrow",
  "Fourth Frontier",
  "Amaran",
]

const deals = [
  {
    discount: "40%",
    type: "OFF" as const,
    brand: "Bludhie Beauty",
    description: "Coupon Code",
    verified: true,
    expiry: "Dec 31, 2025",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    discount: "50%",
    type: "CODE" as const,
    brand: "Lelusso",
    description: "Discount Code",
    verified: true,
    expiry: "Dec 25, 2025",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    discount: "40%",
    type: "OFF" as const,
    brand: "Bludhie Beauty",
    description: "Coupon Code",
    verified: true,
    expiry: "Dec 31, 2025",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    discount: "50%",
    type: "OFF" as const,
    brand: "Lelusso",
    description: "Discount Code",
    verified: true,
    expiry: "Jan 15, 2026",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    discount: "30%",
    type: "OFF" as const,
    brand: "Prepworld",
    description: "Discount Code",
    verified: true,
    expiry: "Dec 31, 2025",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    discount: "90%",
    type: "OFF" as const,
    brand: "Progrow",
    description: "Discount Code",
    verified: true,
    expiry: "Jan 31, 2026",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    discount: "25%",
    type: "CODE" as const,
    brand: "Fourth Frontier",
    description: "Coupon Code",
    verified: true,
    expiry: "Dec 25, 2025",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    discount: "35%",
    type: "OFF" as const,
    brand: "Sali Resorts",
    description: "Promo Code",
    verified: true,
    expiry: "Jan 10, 2026",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    discount: "50%",
    type: "OFF" as const,
    brand: "Amaran",
    description: "Discount Code",
    verified: true,
    expiry: "Dec 31, 2025",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

