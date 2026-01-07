import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State to manage search query
  const [searchQuery, setSearchQuery] = useState("");
  // Data for books
  const books = [
    {
      title: "The Little Book of Mental Health",
      description: "Everyday wellbeing is about how we feel, think and behave. This book focuses on the importance of taking care of your mental state as much as your physical health.",
      pdf: "/assets/books/book1.pdf",
    },
    {
      title: "Look after your mental health using exercise",
      description: "At a very basic level, physical activity means any movement of your body that uses your muscles and expends energy. One of the great things about phyical activity is that there are endless possibilities...",
      pdf: "/assets/books/book2.pdf",
    },
    {
      title: "Mental Health in the Workplace",
      description: "This book explores the intersection between mental health and the workplace, offering insights into the challenges faced by people with mental health difficulties in work settings.",
      pdf: "/assets/books/book3.pdf",
    },
    {
      title: "Wellbeing and Mental Health: A Guide to Looking After Yourself and Others",
      description: "A comprehensive guide on promoting positive mental health, offering advice on emotional wellbeing, coping with challenges, supporting others, and incorporating simple practices into daily life.",
      pdf: "/assets/books/book4.pdf",
    },
    {
      title: "Our Best Ever Mental Health Tips",
      description: "Research-based measures to protect and promote daily mental health, including strategies for stress and emotion management, and the importance of emotional support.",
      pdf: "/assets/books/book5.pdf",
    },
  ];

  // Filtered books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen p-10 bg-blue-100 px-20">
      {/* Title and Subheading */}
      <h1 className="text-4xl font-bold text-center mb-2">Books</h1>
      <h2 className="text-2xl text-center text-gray-600 mb-8">Explore our collection of insightful books</h2>

      {/* Search Bar */}
      <div className="text-center mb-8 flex justify-center">
        <input
          type="text"
          className="p-2 w-full border rounded-lg shadow-md bg-white"
          placeholder="Search Books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="ml-2 p-2 bg-[#1A0B5B] text-white rounded-lg shadow-md"
          onClick={() => setSearchQuery(searchQuery)}
        >
          Search
        </button>
      </div>

      {/* Books List */}
      <div className="space-y-12">
        {filteredBooks.map((book, index) => (
          <div key={index} className="border p-8 rounded-lg shadow-md bg-white">
            <h2 className="text-3xl font-semibold text-[#1A0B5B]">{book.title}</h2>
            <p className="mt-4 text-lg text-gray-700">{book.description}</p>

            {/* PDF Button */}
            <div className="mt-6">
              <a
                href={book.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#1A0B5B] hover:bg-[#1A0B5B]/90 p-3 rounded-lg shadow-md"
              >
                Open PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Links */}
      <div className="w-full flex flex-col items-center mt-12 bg-[#ffffff] p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-[#1A0B5B] mb-4">Explore More Resources</h3>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-lg">Dive deeper into knowledge with our collection of insightful Blogs and recommended Articles that enrich your mental wellness journey.</p>
        <div className="flex space-x-6">
          <Link to="/blog" className="px-8 py-4 bg-[#1A0B5B] text-white text-lg rounded-lg hover:bg-[#120A3C] shadow-md transition-all">Explore Blogs</Link>
          <Link to="/articles" className="px-8 py-4 bg-[#1A0B5B] text-white text-lg rounded-lg hover:bg-[#120A3C] shadow-md transition-all">Explore Articles</Link>
        </div>
      </div>
    </div>
  );
};

export default Books;
