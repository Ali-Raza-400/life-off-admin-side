"use client";

import React from "react";
import {
  FaCar,
  FaFilm,
  FaBaby,
  FaSprayCan,
  FaPaw,
  FaBriefcase,
  FaGamepad,
  FaHeartbeat,
  FaLaptopCode,
  FaTshirt,
  FaUtensils,
  FaGraduationCap,
  FaMoneyBillWave,
  FaShoppingBasket,
  FaMobileAlt,
  FaTools,
  FaStore,
  FaLeaf,
  FaPlane,
  FaShoppingBag,
} from "react-icons/fa";

// Define the category type
interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
}

export default function CouponCategories() {
  // Categories data with icons
  const categories: Category[] = [
    { id: 1, name: "AUTOMOTIVE", icon: <FaCar size={24} /> },
    { id: 2, name: "ENTERTAINMENT", icon: <FaFilm size={24} /> },
    { id: 3, name: "BABY CARE", icon: <FaBaby size={24} /> },
    { id: 4, name: "PERSONAL CARE", icon: <FaSprayCan size={24} /> },
    { id: 5, name: "PETS CARE", icon: <FaPaw size={24} /> },

    { id: 6, name: "BUSINESS", icon: <FaBriefcase size={24} /> },
    { id: 7, name: "HOBBY & TOYS", icon: <FaGamepad size={24} /> },
    { id: 8, name: "HEALTH", icon: <FaHeartbeat size={24} /> },
    { id: 9, name: "SOFTWARE", icon: <FaLaptopCode size={24} /> },
    { id: 10, name: "CLOTHING", icon: <FaTshirt size={24} /> },

    { id: 11, name: "FOOD & GIFTS", icon: <FaUtensils size={24} /> },
    { id: 12, name: "EDUCATION", icon: <FaGraduationCap size={24} /> },
    { id: 13, name: "FINANCIAL SERVICES", icon: <FaMoneyBillWave size={24} /> },
    { id: 14, name: "FOOD & GROCERY", icon: <FaShoppingBasket size={24} /> },
    { id: 15, name: "ELECTRONICS", icon: <FaMobileAlt size={24} /> },

    { id: 16, name: "HOME SERVICES", icon: <FaTools size={24} /> },
    { id: 17, name: "RESTAURANTS", icon: <FaStore size={24} /> },
    { id: 18, name: "HOME & GARDEN", icon: <FaLeaf size={24} /> },
    { id: 19, name: "TRAVEL & TOURS", icon: <FaPlane size={24} /> },
    { id: 20, name: "STORES", icon: <FaShoppingBag size={24} /> },
  ];

  // Container styles
  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 16px",
  };

  // Heading styles
  const headingStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
  };

  // Grid container styles
  const gridContainerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
  };

  // Media queries handled with window.matchMedia in useEffect
  React.useEffect(() => {
    const updateGridColumns = () => {
      const gridElement = document.getElementById("categories-grid");
      if (gridElement) {
        if (window.innerWidth >= 1024) {
          gridElement.style.gridTemplateColumns = "repeat(5, 1fr)";
        } else if (window.innerWidth >= 768) {
          gridElement.style.gridTemplateColumns = "repeat(4, 1fr)";
        } else if (window.innerWidth >= 640) {
          gridElement.style.gridTemplateColumns = "repeat(3, 1fr)";
        } else {
          gridElement.style.gridTemplateColumns = "repeat(2, 1fr)";
        }
      }
    };

    // Initial call
    updateGridColumns();

    // Add event listener
    window.addEventListener("resize", updateGridColumns);

    // Cleanup
    return () => window.removeEventListener("resize", updateGridColumns);
  }, []);

  // Category item styles
  const categoryItemStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  // Icon container styles
  const iconContainerStyle: React.CSSProperties = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    position: "relative",
    transition: "box-shadow 0.3s ease",
  };

  // Category name styles
  const categoryNameStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: "500",
    textAlign: "center",
  };

  // Icon styles
  const iconStyle: React.CSSProperties = {
    color: "#4b5563",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>All Coupons & Deals Categories</h2>

      <div id="categories-grid" style={gridContainerStyle}>
        {categories.map((category) => (
          <div key={category.id} style={categoryItemStyle}>
            <div
              style={iconContainerStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={iconStyle}>{category.icon}</div>
            </div>
            <span style={categoryNameStyle}>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
