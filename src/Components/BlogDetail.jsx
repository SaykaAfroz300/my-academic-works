// BlogDetail.jsx
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogs } from "./BlogList"; // make sure path is correct

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blog) {
    return (
      <div className="p-8">
        <h2 className="text-2xl text-center text-red-500">Blog Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="text-3xl font-bold text-[#1A0B5B] mt-4">
        {blog.title}
      </h2>
      <p className="text-gray-700 mt-4 whitespace-pre-line">
        {blog.fullContent}
      </p>
      <Link
        to="/blog"
        className="mt-6 inline-block bg-[#1A0B5B] text-white px-6 py-3 rounded hover:bg-[#120A3C]"
      >
        Explore other Blogs
      </Link>
    </div>
  );
};

export default BlogDetail;
