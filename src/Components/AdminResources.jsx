import React, { useState, useRef } from "react"; 
import { FaPlus, FaTrash } from "react-icons/fa";

const initialResources = {
  blogs: [
    { id: 1, title: "Breathing Techniques", image: "/assets/blog_img/breathing-techniques.jpg" },
    { id: 2, title: "Self Compassion", image: "/assets/blog_img/self-compassion.jpg" },
  ],
  articles: [
    { id: 1, title: "CBT & Stress", file: "/assets/articles/article2.pdf" },
  ],
  books: [
    { id: 1, title: "Mental Health Book", file: "/assets/books/book1.pdf" },
  ]
};

const AdminResources = () => {
  const [resources, setResources] = useState(initialResources);
  const fileInputs = {
    blogs: useRef(),
    articles: useRef(),
    books: useRef(),
  };

  const handleDelete = (type, id) => {
    setResources((prev) => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const handleUpload = (type, fileInfo) => {
    const newResource = {
      id: Date.now(),
      title: fileInfo.name,
      file: URL.createObjectURL(fileInfo), // Only preview
    };

    setResources(prev => ({
      ...prev,
      [type]: [...prev[type], newResource]
    }));
  };

  const renderSection = (type, label) => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mt-8 mb-4">{label}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {resources[type].map(res => (
          <div key={res.id} className="border p-4 rounded shadow bg-white relative">
            {res.image && <img src={res.image} alt={res.title} className="h-40 object-cover mb-2" />}
            <h3 className="font-semibold truncate">{res.title}</h3>
            {res.file && <a href={res.file} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Open</a>}
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => handleDelete(type, res.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <input
          type="file"
          accept={type === "blogs" ? "image/*" : ".pdf"}
          ref={fileInputs[type]}
          className="hidden"
          onChange={(e) => {
            if (e.target.files[0]) {
              handleUpload(type, e.target.files[0]);
              e.target.value = "";
            }
          }}
        />
        <button
          onClick={() => fileInputs[type].current.click()}
          className="mt-2 inline-flex items-center gap-2 bg-[#1A0B5B] text-white px-5 py-2 rounded-full hover:bg-[#120A3C] transition-all shadow"
        >
          <FaPlus /> Add New {label.slice(0, -1)}
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Manage Resources</h1>
      {renderSection("blogs", "Blogs")}
      {renderSection("articles", "Articles")}
      {renderSection("books", "Books")}
    </div>
  );
};

export default AdminResources;
