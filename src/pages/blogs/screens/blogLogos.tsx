import { Divider } from "antd";
import IMAGES from "../../../assets/images";

export default function BlogIcons() {
  const categories = [
    { name: "Budget", image: IMAGES.BLOG_LOGO1 },
    { name: "Beauty", image: IMAGES.BLOG_LOGO2 },
    { name: "Fashion", image: IMAGES.BLOG_LOGO3 },
    { name: "Home", image: IMAGES.BLOG_LOGO4 },
    { name: "Tech", image: IMAGES.BLOG_LOGO5 },
    { name: "Travel", image: IMAGES.BLOG_LOGO6 },
    { name: "Deals", image: IMAGES.BLOG_LOGO7 },
    { name: "Calendar", image: IMAGES.BLOG_LOGO8 },
  ];

  return (
    <div>

      <div className="flex justify-center">
        <div className="hidden md:grid grid-cols-4 md:grid-cols-8 gap-16 ">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12"
              />
              <p className="text-sm font-medium mt-1">{category.name}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-6 md:hidden">
          {categories.slice(0, 4).map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12"
              />
              <p className="text-sm font-medium mt-1">{category.name}</p>
            </div>
          ))}
        </div>

      </div>
      <Divider className="h-[2px]"/>
    </div>
  );
}
