import type React from "react";
import { FiChevronRight } from "react-icons/fi";
import IMAGES from "../../../assets/images";


export default function AmazonDealsHeader() {
  // Container styles
  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "16px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  // Logo container styles
  const logoContainerStyle: React.CSSProperties = {
    position: "relative",
    width: "64px",
    height: "64px",
    flexShrink: 0,
  };

  // Content container styles
  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  };

  // Main heading styles
  const headingStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "700",
    margin: 0,
    color: "#232F3E", // Amazon's dark blue color
  };

  // Subheading styles
  const subheadingStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#565959",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
  };

  // Cashback text container styles
  const cashbackContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#565959",
  };

  // Arrow icon styles
  const arrowStyle: React.CSSProperties = {
    color: "#565959",
  };

  return (
    <div style={containerStyle}>
      <div style={logoContainerStyle}>
        <img
          src={IMAGES.Bike_Img}
          alt="Amazon Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <div style={contentStyle}>
        <h2 style={headingStyle}>Today's Top Deals</h2>
        <p style={subheadingStyle}>Presented by Amazon</p>
        <div style={cashbackContainerStyle}>
          10% CASH BACK ON AMAZON SERVICES
          <FiChevronRight size={16} style={arrowStyle} />
        </div>
      </div>
    </div>
  );
}
