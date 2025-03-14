import { FaCalendarAlt } from "react-icons/fa";

export default function BlogBanner({ data }: any) {
  console.log("data:::", data);
  
  // Fallback static data
  const defaultTitle = "11 Size-Inclusive Fashion Brands That Should Be on Your Radar";
  const defaultAuthor = "Maria Lalonde";
  const defaultDate = "February 28, 2025";
  const defaultImage = "https://via.placeholder.com/800x400";
  const defaultContent = "Fashion should be for everyone, regardless of size...";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <article className="space-y-6">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {data?.list?.title || defaultTitle}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            By {" "}
            <a href="#" className="font-medium text-black hover:underline">
              {defaultAuthor}
            </a>
          </span>
          <span className="text-gray-400">•</span>
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="h-4 w-4" />
            {defaultDate}
          </span>
        </div>

        {/* Featured Image */}
        <div className="relative w-full">
          <img
            src={data?.list?.featuredImage || defaultImage}
            alt={data?.list?.title || "Blog Image"}
            className="w-full  h-1/2 object-cover rounded-md"
          />
        </div>

        {/* Article Content */}
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed text-gray-700">
            {data?.list?.content || defaultContent}
          </p>
        </div>
      </article>
    </div>
  );
}
