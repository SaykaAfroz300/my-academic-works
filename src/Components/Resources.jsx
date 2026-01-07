/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaRegNewspaper, FaBlog, FaArrowRight } from 'react-icons/fa';
import Heading from './Heading';
import breathingTechniques from "../assets/blog_img/breathing-techniques.jpg";
import selfCompassion from "../assets/blog_img/self-compassion.jpg";
import selfHarm from "../assets/blog_img/self-harm.jpg";
const Resources = () => {
  // Articles data (with 2 articles)
  const articles = [
    {
      title: "An integrative collaborative care model for people with mental illness and physical comorbidities",
      abstract: "Many individuals with mental health problems have comorbid physical conditions, or may present with substance/alcohol misuse or abuse issues. This results in complex treatment challenges that may not be adequately addressed by a model of care that is solely delivered by an individual clinician using a sole intervention...",
      pdf: "./assets/articles/article1.pdf", 
    },
    {
      title: "Cognitive–behavioral therapy for management of mental health and stress-related disorders: Recent advances in techniques and technologies",
      abstract: "Cognitive–behavioral therapy (CBT) helps individuals to eliminate avoidant and safety-seeking behaviors that prevent self-correction of faulty beliefs, thereby facilitating stress management to reduce stress-related disorders and enhance mental health...",
      pdf: "./assets/articles/article2.pdf", 
    },
  ];

  // Books data
  const books = [
    {
      title: "The Little Book of Mental Health",
      description: "Everyday wellbeing is about how we feel, think and behave. This book focuses on the importance of taking care of your mental state as much as your physical health.",
      pdf: "./assets/books/book1.pdf",
    },
    {
      title: "Look after your mental health using exercise",
      description: "At a very basic level, physical activity means any movement of your body that uses your muscles and expends energy. One of the great things about phyical activity is that there are endless possibilities...",
      pdf: "./assets/books/book2.pdf",
    },
    {
      title: "Mental Health in the Workplace",
      description: "This book explores the intersection between mental health and the workplace, offering insights into the challenges faced by people with mental health difficulties in work settings.",
      pdf: "./assets/books/book3.pdf",
    },
  ];
  const blog = [
    {
        id: 1,
        title: "Breathing Techniques For Anxiety You Can Start Using Today",
        description: "Discover effective breathing techniques for anxiety to reduce stress, improve mental health, and build resilience. Learn practical methods like 4-7-8 and box breathing.",
        image: breathingTechniques
    },
    {
        id: 2,
        title: "What Is Self-Compassion: 5 Facts, 4 Myths, And 5 Ways To Practice It",
        description: "Discover what is self-compassion and how it boosts mental health. Learn 5 key facts, debunk myths, and get tips for building a compassionate mindset.",
        image: selfCompassion
    },
    {
        id: 3,
        title: "How To Stop Cutting: 7 Ways To Quit Self-Harm For Good",
        description: "Self-harm is the act of intentionally hurting yourself to feel pain or to perhaps distract yourself from the agony of mental disorders like anxiety, depression, and stress.",
       
        image: selfHarm
    }
];

  return (
    <div className="w-full min-h-screen bg-blue-100 p-10">
      {/* Heading Section */}
      <Heading 
        Headline={"Resources"} 
        pagename={"Explore insightful Blogs, Articles, and Books etc"} 
      />
     
      {/* Description Below Heading */}
      <div className="mt-6 text-center">
        <p className="text-lg text-gray-700">
          We provide these resources to support your mental health and well-being. Our collection of <Link to="/blog" className="text-[#1A0B5B] font-semibold">blogs</Link>, <Link to="/articles" className="text-[#1A0B5B] font-semibold">articles</Link>, and <Link to="/books" className="text-[#1A0B5B] font-semibold">books</Link> aims to offer valuable insights, coping strategies, and expert advice to help you navigate your mental health journey. Whether you&apos;re looking for self-care tips, psychological guidance, or personal stories, our resources are here to provide support every step of the way.
        </p>
      </div>

      {/* Resource Links */}
      <div className="grid grid-cols-3 gap-8 text-center w-full max-w-7xl mx-auto mt-10">
        
        {/* Blog Section */}
        <Link to="/blog" className="p-8 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
          <FaBlog className="mx-auto w-28 h-28 mb-6" />
          <h2 className="text-3xl font-semibold text-[#1A0B5B]">Blogs</h2>
          <p className="text-gray-600">Explore insightful blogs recommended by experts in the mental health field.</p>
        </Link>

        {/* Articles Section */}
        <Link to="/articles" className="p-8 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
          <FaRegNewspaper className="mx-auto w-28 h-28 mb-6" />
          <h2 className="text-3xl font-semibold text-[#1A0B5B]">Articles</h2>
          <p className="text-gray-600">Read research articles and journals that provide in-depth understanding of mental health topics.</p>
        </Link>

        {/* Books Section */}
        <Link to="/books" className="p-8 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
          <FaBook className="mx-auto w-28 h-28 mb-6" />
          <h2 className="text-3xl font-semibold text-[#1A0B5B]">Books</h2>
          <p className="text-gray-600">Discover books written by mental health professionals that guide you on your journey.</p>
        </Link>
      </div>

      <hr className="my-12 border-2 border-[#1A0B5B]" />
      
      {/* Blog Posts Section */}
      <div className="mt-16">
                <h3 className="text-4xl font-bold text-center text-[#1A0B5B] mb-8">Blogs</h3>
                <div className="grid grid-cols-3 gap-6 text-center w-full max-w-7xl mx-auto">
                    {blog.map((blog) => (
                        <div key={blog.id} className="p-8 border rounded-lg shadow-md bg-white">
                            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                            <h4 className="text-2xl font-semibold text-[#1A0B5B]">{blog.title}</h4>
                            <p className="text-gray-600 mt-4">{blog.description}</p>
                            <Link to={`/blog/${blog.id}`} className="mt-4 inline-block text-white bg-[#1A0B5B] p-3 rounded-lg hover:bg-[#120A3C] transition-all">Explore</Link>
                        </div>
                    ))}
                </div>
                <div className="mt-6 text-center">
                    <Link to="/blog" className="text-[#1A0B5B] font-semibold text-xl flex items-center justify-center gap-2">Explore More Blogs <FaArrowRight /></Link>
                </div>
            </div>
            <hr className="my-12 border-2 border-[#1A0B5B]" />
            
      {/* Additional Articles Section (2 Articles in Row) */}
      <div className="mt-16">
        <h3 className="text-4xl font-bold text-center text-[#1A0B5B] mb-8">Articles</h3>
        <div className="grid grid-cols-2 gap-8 text-center w-full max-w-7xl mx-auto">
          {articles.map((article, index) => (
            <div key={index} className="p-8 border rounded-lg shadow-md bg-white">
              <h4 className="text-2xl font-semibold text-[#1A0B5B]">{article.title}</h4>
              <p className="text-gray-600 text-justify mt-4">{article.abstract}</p>
              <a href={article.pdf} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-white bg-[#1A0B5B] p-3 rounded-lg hover:bg-[#120A3C] transition-all">
                Open PDF
              </a>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/articles" className="text-[#1A0B5B] font-semibold text-xl flex items-center justify-center gap-2">
            Explore More Articles <FaArrowRight />
          </Link>
        </div>
      </div>

      <hr className="my-12 border-2 border-[#1A0B5B]" />
      
      
      {/* Additional Books Section (3 Books in Row) */}
      <div className="mt-16">
        <h3 className="text-4xl font-bold text-center text-[#1A0B5B] mb-8">Books</h3>
        <div className="grid grid-cols-3 gap-8 text-center w-full max-w-7xl mx-auto">
          {books.map((book, index) => (
            <div key={index} className="p-8 border rounded-lg shadow-md bg-white">
              <h4 className="text-2xl font-semibold text-[#1A0B5B]">{book.title}</h4>
              <p className="text-gray-600 text-justify mt-4">{book.description}</p>
              <a href={book.pdf} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-white bg-[#1A0B5B] p-3 rounded-lg hover:bg-[#120A3C] transition-all">
                Open PDF
              </a>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/books" className="text-[#1A0B5B] font-semibold text-xl flex items-center justify-center gap-2">
            Explore More Books <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resources;
