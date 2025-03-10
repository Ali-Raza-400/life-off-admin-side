"use client"

import { useState, useEffect, useRef } from "react"
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa"

export default function ProductSlider({ data }: any) {
    console.log("data:::",data);
    
  const products = data?.list?.store?.products || []

  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(3)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Update cards to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1)
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2)
      } else {
        setCardsToShow(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const totalSlides = Math.max(products.length - cardsToShow + 1, 1)
  const isNavigationDisabled = products.length <= cardsToShow

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * (100 / cardsToShow)}%)`
    }
  }, [currentIndex, cardsToShow])

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8">
        
      <div className="flex items-center justify-center">
        {/* Left arrow */}
        <button
          onClick={prevSlide}
          disabled={isNavigationDisabled}
          className={`absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-colors
            ${isNavigationDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#7FA842] text-white hover:bg-[#6b9339]"}`}
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>

        {/* Slider track */}
        <div className="overflow-hidden relative w-full">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${(products.length / cardsToShow) * 100}%` }}
          >
            {products.map((product:any) => {
                console.log("product:::",product);
                
                return(
              <div key={product.id} className="px-3" style={{ width: `${100 / products.length}%` }}>
                <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">{product.heading}</h3>
                    <div className="flex items-center my-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${i < 4 ? "text-yellow-400" : "text-gray-300"} text-sm`} // Default rating 4
                          />
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-lg">${parseFloat(product.currentPrice).toFixed(2)}</span>
                      <span className="text-gray-500 text-sm line-through">${parseFloat(product.oldPrice).toFixed(2)}</span>
                    </div>
                    <a
                      href={product.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center py-2 bg-[#7FA842] text-white rounded font-medium hover:bg-[#6b9339] transition-colors"
                    >
                      Get Deal
                    </a>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={nextSlide}
          disabled={isNavigationDisabled}
          className={`absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-colors
            ${isNavigationDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#7FA842] text-white hover:bg-[#6b9339]"}`}
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}
