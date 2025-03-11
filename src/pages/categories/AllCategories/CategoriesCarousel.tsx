"use client"

import { useState, useRef, useEffect } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

interface Category {
  id: number
  image: string
  title: string
}

export default function CategorySlider({ data }: any) {
  const categories: Category[] = data?.list?.map((category: any) => ({
    id: category.id,
    image: category.image,
    title: category.categoryTitle, // Assuming the title in the API is 'categoryTitle'
  })) || []

  const [isEnd, setIsEnd] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft
      const scrollWidth = sliderRef.current.scrollWidth
      const clientWidth = sliderRef.current.clientWidth

      // If we are at the end, disable the right arrow
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        setIsEnd(true)
      } else {
        setIsEnd(false)
      }
    }
  }

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.clientWidth,
        behavior: 'smooth',
      })
    }
  }

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.clientWidth,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    // Attach the scroll event listener
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener("scroll", handleScroll)
    }
    return () => {
      if (slider) {
        slider.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 text-center">Top Coupons & Deals Categories</h2>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={false} // Always enable the prev button
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md border border-gray-200 text-green-600 hover:text-green-700 transition-colors`}
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isEnd} // Disable if at the end
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md border border-gray-200 text-green-600 hover:text-green-700 transition-colors ${isEnd ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FiChevronRight className="w-6 h-6" />
        </button>

        {/* Categories Container */}
        <div className="overflow-hidden px-8">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-300 ease-in-out gap-4 overflow-x-auto scroll-smooth"
            style={{ scrollBehavior: "smooth", overflow: 'hidden' }}
          >
            {categories.map((category) => (
              <div key={category.id} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-full pt-[100%] rounded-full overflow-hidden border-2 border-gray-100">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xs font-medium text-center text-gray-800 uppercase">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
