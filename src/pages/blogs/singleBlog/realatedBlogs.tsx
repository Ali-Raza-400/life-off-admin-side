import { FaCalendarAlt } from "react-icons/fa"

const RealatedBlogs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Main Content */}
      <div className="w-full md:w-2/3">
        <h1 className="text-3xl font-bold mb-4">What Does Size-Inclusive Mean?</h1>

        <p className="mb-6 text-gray-700">
          Once upon a time, it was virtually impossible to find stylish clothing in extended sizes. Happily, things are
          (slowly but surely) changing, with brands introducing a size range that accommodates a more diverse consumer
          base.
        </p>

        <h2 className="text-3xl font-bold mb-4">What Does Size-Inclusive Mean?</h2>

        <p className="mb-6 text-gray-700">
          Established retailers like Old Navy and Mango are extending their offerings for the first time in history as
          new, inclusivity-focused brands like Universal Standard are popping up and flourishing. Size inclusivity has
          even extended into niche markets <span className="font-medium">like athleisure</span>, with brands like{" "}
          <span className="font-medium">UnderCollective and Fabletics</span> carrying plus-size picks.
        </p>

        <h2 className="text-3xl font-bold mb-4">What Does Size-Inclusive Mean?</h2>

        <p className="mb-6 text-gray-700">
          So what exactly does size-inclusive mean, and why does it matter? In simple terms, size inclusivity means
          designing clothes that fit a range of shapes and sizes. Size-inclusive clothing accommodates all bodies — not
          just those that fit the limited standard sizing system. The growing size inclusive movement challenges
          traditional beauty standards and embraces body positivity in fashion, an industry long criticized for its lack
          of diversity and inclusivity.
        </p>

        <h2 className="text-3xl font-bold mb-4">11 of the Best Size-Inclusive Brands to Shop Now</h2>

        <p className="mb-6 text-gray-700">
          Though there's still a long way to go, we're excited about the direction the fashion world is moving. Whether
          you're looking for a cute sweater or a fashion-forward pair of yoga pants, it's easier than ever to find
          sizing that caters to your body type. To celebrate, we've curated a list of our favorite size-inclusive
          clothing brands to put on your radar.
        </p>
      </div>

      {/* Trending Sidebar */}
      <div className="w-full md:w-1/3">
        <h2 className="text-xl font-bold mb-4 text-center">TRENDING</h2>

        <div className="space-y-4">
          {/* Trending Article 1 */}
          <div className="flex gap-3 border rounded-lg overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ewdfDBJxkKmZINF0REgRFuoONgVT9a.png"
              alt="Starbucks drinks"
              className="w-24 h-24 object-cover"
            />
            <div className="p-2">
              <h3 className="font-medium text-sm">Sorry, These Starbucks Drinks Have Been Discontinued</h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <FaCalendarAlt className="mr-1" />
                <span>Published March 5, 2025</span>
              </div>
            </div>
          </div>

          {/* Trending Article 2 */}
          <div className="flex gap-3 border rounded-lg overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ewdfDBJxkKmZINF0REgRFuoONgVT9a.png"
              alt="Size-inclusive fashion models"
              className="w-24 h-24 object-cover"
            />
            <div className="p-2">
              <h3 className="font-medium text-sm">11 Size-Inclusive Fashion Brands That Should Be On Your Radar</h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <FaCalendarAlt className="mr-1" />
                <span>Published March 5, 2025</span>
              </div>
            </div>
          </div>

          {/* Trending Article 3 */}
          <div className="flex gap-3 border rounded-lg overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ewdfDBJxkKmZINF0REgRFuoONgVT9a.png"
              alt="La Mer cream alternative"
              className="w-24 h-24 object-cover"
            />
            <div className="p-2">
              <h3 className="font-medium text-sm">11 Budget-Conscious Alternatives to La Mer's $390 Crème de la Mer</h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <FaCalendarAlt className="mr-1" />
                <span>Published March 4, 2025</span>
              </div>
            </div>
          </div>

          {/* Trending Article 4 */}
          <div className="flex gap-3 border rounded-lg overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ewdfDBJxkKmZINF0REgRFuoONgVT9a.png"
              alt="Text and email sign-up discounts"
              className="w-24 h-24 object-cover"
            />
            <div className="p-2">
              <h3 className="font-medium text-sm">These 100+ Text & Email Sign-Up Discounts Will Have You Hooked...</h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <FaCalendarAlt className="mr-1" />
                <span>Published March 3, 2025</span>
              </div>
            </div>
          </div>

          {/* Trending Article 5 */}
          <div className="flex gap-3 border rounded-lg overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ewdfDBJxkKmZINF0REgRFuoONgVT9a.png"
              alt="High-fashion Hoka & Marni collaboration"
              className="w-24 h-24 object-cover"
            />
            <div className="p-2">
              <h3 className="font-medium text-sm">Run Out to Buy the High-Fashion Hoka & Marni Collaboration</h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <FaCalendarAlt className="mr-1" />
                <span>Published March 2, 2025</span>
              </div>
            </div>
          </div>

          {/* Advertisement */}
          <div className="mt-6 bg-gray-100 rounded-lg p-4 text-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ewdfDBJxkKmZINF0REgRFuoONgVT9a.png"
              alt="KitchenAid Stand Mixer"
              className="w-24 h-24 object-cover mx-auto mt-2 rounded-full"
            />
            <div className="text-green-600 font-bold">STEAL THIS DEAL</div>
            <div className="text-2xl font-bold mt-2">
              30% OFF KITCHENAID
              <br />
              STAND MIXER
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RealatedBlogs

