import { FaCalendarAlt } from "react-icons/fa";
import IMAGES from "../../../assets/images";

export default function BlogBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <article className="space-y-6">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          11 Size-Inclusive Fashion Brands That Should Be on Your Radar
        </h1>

        {/* Author and Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            By{" "}
            <a href="#" className="font-medium text-black hover:underline">
              Maria Lalonde
            </a>
          </span>
          <span className="text-gray-400">•</span>
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="h-4 w-4" />
            February 28, 2025
          </span>
        </div>

        {/* Featured Image */}
        <div className="relative w-full">
          <img
            src={IMAGES?.BLOG_BANNER}
            alt="Three women of different body types wearing white t-shirts and jeans"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* Article Content */}
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed text-gray-700">
            Fashion should be for everyone, regardless of size. These 11 brands are leading the way in size-inclusive
            fashion, offering stylish options for all body types without compromising on quality or design.
          </p>

          <p className="text-gray-700">
            In recent years, the fashion industry has begun to embrace size inclusivity, with more brands extending
            their size ranges and featuring diverse models in their campaigns. However, there's still a long way to go.
            These brands aren't just adding a few larger sizes as an afterthought—they're designing with all body types
            in mind from the start.
          </p>
        </div>
      </article>
    </div>
  );
}
