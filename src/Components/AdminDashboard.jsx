//
import React, { useState } from "react";
import { CheckCircle, Trash2, Home, Users, FileText, Star } from "lucide-react";

const dummyTherapists = [
  { id: 1, name: "Dr. Jane Doe", type: "Therapist", isVerified: false },
  { id: 2, name: "Dr. Alex Carter", type: "Clinical Psychologist", isVerified: true },
];

const dummyResources = [
  { id: 1, title: "Mindfulness Guide", category: "Articles" },
  { id: 2, title: "Stress Management Tips", category: "Videos" },
];

const dummyReviews = [
  { id: 1, user: "Sarah", message: "Amazing session!", rating: 5 },
  { id: 2, user: "Tom", message: "Helpful advice, thanks!", rating: 4 },
];

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Home");
  const [therapists, setTherapists] = useState(dummyTherapists);
  const [resources, setResources] = useState(dummyResources);
  const [reviews, setReviews] = useState(dummyReviews);

  const verifyTherapist = (id) => {
    setTherapists(prev =>
      prev.map(t => t.id === id ? { ...t, isVerified: true } : t)
    );
  };

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const SidebarItem = ({ label, icon: Icon }) => (
    <button
      onClick={() => setSelectedPage(label)}
      className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 ${
        selectedPage === label ? "bg-blue-200 font-semibold" : ""
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-50 p-4 border-r">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <SidebarItem label="Home" icon={Home} />
          <SidebarItem label="Therapists" icon={Users} />
          <SidebarItem label="Resources" icon={FileText} />
          <SidebarItem label="Reviews" icon={Star} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">{selectedPage}</h1>

        {/* Home Overview */}
        {selectedPage === "Home" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg shadow bg-white">
              <h2 className="text-lg font-semibold">Total Therapists</h2>
              <p className="text-2xl text-blue-600">{therapists.length}</p>
            </div>
            <div className="p-4 border rounded-lg shadow bg-white">
              <h2 className="text-lg font-semibold">Resources</h2>
              <p className="text-2xl text-green-600">{resources.length}</p>
            </div>
            <div className="p-4 border rounded-lg shadow bg-white">
              <h2 className="text-lg font-semibold">Reviews</h2>
              <p className="text-2xl text-yellow-500">{reviews.length}</p>
            </div>
          </div>
        )}

        {/* Therapists Section */}
        {selectedPage === "Therapists" && (
          <div className="grid md:grid-cols-2 gap-4">
            {therapists.map(t => (
              <div key={t.id} className="p-4 border rounded-lg shadow bg-white">
                <h2 className="text-xl font-semibold">{t.name}</h2>
                <p className="text-gray-600">{t.type}</p>
                <div className="mt-2">
                  {t.isVerified ? (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle size={18} /> Verified
                    </span>
                  ) : (
                    <button
                      onClick={() => verifyTherapist(t.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resources Section */}
        {selectedPage === "Resources" && (
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map(r => (
              <div key={r.id} className="p-4 border rounded-lg shadow bg-white">
                <h2 className="text-lg font-semibold">{r.title}</h2>
                <p className="text-gray-600">{r.category}</p>
                <button className="text-red-600 text-sm mt-2 hover:underline">
                  Delete Resource
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Section */}
        {selectedPage === "Reviews" && (
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map(r => (
              <div key={r.id} className="p-4 border rounded-lg shadow bg-white">
                <p className="text-lg font-medium">"{r.message}"</p>
                <p className="text-gray-600">- {r.user}</p>
                <p className="text-yellow-500">Rating: {r.rating} ⭐</p>
                <button
                  onClick={() => deleteReview(r.id)}
                  className="text-red-600 text-sm mt-2 flex items-center gap-1 hover:underline"
                >
                  <Trash2 size={16} /> Delete Review
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
