"use client"
import { useState } from "react"
import { BiSearch, BiMenu } from "react-icons/bi"
import IMAGES from "../../../assets/images"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="max-w-[1440px] mx-auto mt-4 relative z-50">
      {/* Desktop Navbar */}
      <div className="h-[65px] hidden lg:flex">
        {/* Left side with white background */}
        <div className="bg-white flex items-center px-8">
          <img src={`${IMAGES.STORE_LOGO}`} alt="Logo" className="h-12" />
        </div>

        {/* Rest of navbar with dark background */}
        <div className="flex-1 bg-[#14303B] flex items-center justify-between px-8">
          {/* Center navigation */}
          <div className="flex-1 flex items-center justify-center space-x-8">
            <NavLink href="#">Stores</NavLink>
            <NavLink href="#">Categories</NavLink>
            <NavLink href="#">Best Deals</NavLink>
            <NavLink href="#">Savings Tips</NavLink>
          </div>

          {/* Right side - Search */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Store Here"
                className="max-w-[280px] pl-4 pr-12 py-2 border-none focus:outline-none focus:ring-0"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-[#96C121] text-white">
                <BiSearch className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar - New stacked design */}
      <div className="lg:hidden flex flex-col">
        {/* Logo centered at top */}
        <div className="bg-white flex justify-center py-4">
          <img src="/assets/logo.svg" alt="Logo" className="h-12" />
        </div>

        {/* Search bar and menu toggle on second line */}
        <div className="bg-[#14303B] flex items-center p-4">
          {/* Search bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search Store Here"
              className="w-full pl-4 pr-12 py-2 border-none focus:outline-none focus:ring-0"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-[#96C121] text-white">
              <BiSearch className="h-5 w-5" />
            </button>
          </div>

          {/* Menu toggle */}
          <button className="text-white p-2 ml-4" onClick={() => setMenuOpen(!menuOpen)}>
            <BiMenu className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#14303B] p-4 absolute w-full left-0 z-50 shadow-lg">
          <ul className="flex flex-col space-y-4">
            <li>
              <NavLink href="#">Stores</NavLink>
            </li>
            <li>
              <NavLink href="#">Categories</NavLink>
            </li>
            <li>
              <NavLink href="#">Best Deals</NavLink>
            </li>
            <li>
              <NavLink href="#">Savings Tips</NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

// NavLink component for consistent styling
const NavLink = ({ href, children }: any) => {
  return (
    <a href={href} className="text-[16px] font-medium text-white hover:text-gray-200 transition-colors">
      {children}
    </a>
  )
}

export default Navbar

