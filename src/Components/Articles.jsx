import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Articles = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State to manage search query
  const [searchQuery, setSearchQuery] = useState("");
  // Data for articles
  const articles = [
    {
      title: "An integrative collaborative care model for people with mental illness and physical comorbidities",
      abstract: "Many individuals with mental health problems have comorbid physical conditions, or may present with substance/alcohol misuse or abuse issues. This results in complex treatment challenges that may not be adequately addressed by a model of care that is solely delivered by an individual clinician using a sole intervention...",
      pdf: "/assets/articles/article1.pdf", // Replace with actual file paths
    },
    {
      title: "Cognitive–behavioral therapy for management of mental health and stress-related disorders: Recent advances in techniques and technologies",
      abstract: "Cognitive–behavioral therapy (CBT) helps individuals to eliminate avoidant and safety-seeking behaviors that prevent self-correction of faulty beliefs, thereby facilitating stress management to reduce stress-related disorders and enhance mental health...",
      pdf: "/assets/articles/article2.pdf", // Replace with actual file paths
    },
    {
      title: "Understanding Your Mental Wellbeing",
      abstract: "An important first step in improving your mental health is developing a clear understanding of your signs of poor mental wellbeing. The impact of the changes you make will become clearer if you have a decent understanding of how poor mental wellbeing impacts your mind, body and behaviour...",
      pdf: "/assets/articles/article3.pdf", // Replace with actual file paths
    },
    // Add more articles as needed
    {
      title: "Generalized Anxiety Disorder:When Worry Gets Out of Control",
      abstract: "Do you often find yourself worrying about everyday issues for no obvious reason? Are you always waiting for disaster to strike or excessively worried about things such as health, money, family, work, or school?If so, you may have a type of anxiety disorder called generalized anxiety disorder (GAD). GAD can make daily life feel like a constant state of worry, fear, and dread. The good news is GAD is treatable. Learn more about the symptoms of GAD and how to find help",
      pdf: "/assets/articles/article4.pdf", // Replace with actual file paths
    },
    {
      title: "A journal exploring Depression",
      abstract: "Everyone feels sad or low sometimes, but these feelings usually pass. Depression (also called major depression, major depressive disorder, or clinical depression) is different.  It can cause severe symptoms that affect how a person feels, thinks, and handles daily activities, such as sleeping, eating, or working. Depression can affect anyone regardless of age, gender, race or ethnicity, income, culture, or education. Research suggests that genetic, biological, environmental, and psychological factors play a role in the disorder. Learn more..",
      pdf: "/assets/articles/article5.pdf", // Replace with actual file paths
    },
  ];

  // Filtered articles based on search query
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen p-10 bg-blue-100 px-20">
      {/* Title and Subheading */}
      <h1 className="text-4xl font-bold text-center mb-2">Articles</h1>
      <h2 className="text-2xl text-center text-gray-600 mb-8">Explore our collection of insightful articles</h2>

      {/* Search Bar */}
      <div className="text-center mb-8 flex justify-center">
        <input
          type="text"
          className="p-2 w-full border rounded-lg shadow-md bg-white"
          placeholder="Search Articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="ml-2 p-2 bg-[#1A0B5B] text-white rounded-lg shadow-md"
          onClick={() => {}}
        >
          Search
        </button>
      </div>

      {/* Articles List */}
      <div className="space-y-12">
        {filteredArticles.map((article, index) => (
          <div key={index} className="border p-8 rounded-lg shadow-md bg-white">
            <h2 className="text-3xl font-semibold text-[#1A0B5B]">{article.title}</h2>
            <p className="mt-4 text-lg text-gray-700">{article.abstract}</p>

            {/* PDF Button */}
            <div className="mt-6">
              <a
                href={article.pdf}
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
                <p className="text-lg text-gray-700 mb-6 text-center max-w-lg">Dive deeper into knowledge with our collection of insightful Blogs and recommended Books that enrich your mental wellness journey.</p>
                <div className="flex space-x-6">
                    <Link to="/blog" className="px-8 py-4 bg-[#1A0B5B] text-white text-lg rounded-lg hover:bg-[#120A3C] shadow-md transition-all">Explore Blogs</Link>
                    <Link to="/books" className="px-8 py-4 bg-[#1A0B5B] text-white text-lg rounded-lg hover:bg-[#120A3C] shadow-md transition-all">Explore Books</Link>
                </div>
            </div>
    </div>
  );
};

export default Articles;
