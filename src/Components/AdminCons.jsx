import React from 'react'
import { CheckCircle, X, Eye } from "lucide-react";
import consultant1 from "../assets/consultant_img/consultant1.jpg";
import consultant2 from "../assets/consultant_img/consultant2.jpg";

const dummyTherapists = [
    {
      id: 1,
      name: "Dr. Jane Doe",
      email: "jane.doe@email.com",
      type: "Therapist",
      isVerified: false,
      image: consultant1,
      specialization: "Anxiety",
      licenseNumber: "LIC123456",
      experience: "5 years",
      educationCert: "Jane_Degree.pdf",
      resume: "Jane_Resume.pdf",
      govtID: "Jane_NID.jpg",
      specialCert: "Anxiety_Certificate.pdf",
      documents: [
        "Jane_Degree.pdf",
        "Jane_Resume.pdf",
        "Jane_NID.jpg",
        "Anxiety_Certificate.pdf",
      ],
    },
    {
      id: 2,
      name: "Dr. Alex Carter",
      email: "alex.carter@email.com",
      type: "Clinical Psychologist",
      isVerified: true,
      image: consultant2,
      specialization: "Depression",
      licenseNumber: "LIC654321",
      experience: "8 years",
      educationCert: "Alex_Degree.pdf",
      resume: "Alex_Resume.pdf",
      govtID: "Alex_NID.jpg",
      specialCert: "Depression_Certificate.pdf",
      documents: [
        "Alex_Degree.pdf",
        "Alex_Resume.pdf",
        "Alex_NID.jpg",
        "Depression_Certificate.pdf",
      ],
    },
  ];
  
const AdminCons = () => {
  const [activeTab, setActiveTab] = useState("Therapists");
  const [therapists, setTherapists] = useState(dummyTherapists);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const verifyTherapist = (id) => {
    setTherapists((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isVerified: true } : t))
    );
    setSelectedTherapist(null);
  };

  const cancelRequest = (id) => {
    setTherapists((prev) => prev.filter((t) => t.id !== id));
    setSelectedTherapist(null);
  };
  return (
    
    <div>
                {/* Tabs */}
                <div className="flex space-x-4 mb-6">
          {["Therapists", "Resources", "Reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t font-medium transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      {/* Therapists List */}
      {activeTab === "Therapists" && (
          <div className="space-y-4">
            {therapists.map((t) => (
              <div
                key={t.id}
                className="flex items-center p-4 border rounded-lg shadow space-x-4"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 object-cover rounded-full border"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{t.name}</h2>
                  <p className="text-gray-600">{t.type}</p>
                </div>
                <div>
                  {t.isVerified ? (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle size={18} /> Verified
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedTherapist(t)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 flex items-center gap-2"
                    >
                      <Eye size={16} /> View
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

                {/* Modal for View Details */}
                {selectedTherapist && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg relative shadow-xl overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setSelectedTherapist(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                <X size={20} />
              </button>

              <img
                src={selectedTherapist.image}
                alt={selectedTherapist.name}
                className="w-32 h-32 mx-auto object-cover rounded-full border mb-4"
              />

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-1">
                  {selectedTherapist.name}
                </h2>
                <p className="text-gray-600">{selectedTherapist.type}</p>
                <p className="text-gray-500">
                  Specialization: {selectedTherapist.specialization}
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <strong>Full Name:</strong> {selectedTherapist.name}
                </div>
                <div>
                  <strong>Email:</strong> {selectedTherapist.email}
                </div>
                <div>
                  <strong>Specialization:</strong>{" "}
                  {selectedTherapist.specialization}
                </div>
                <div>
                  <strong>License Number:</strong>{" "}
                  {selectedTherapist.licenseNumber}
                </div>
                <div>
                  <strong>Experience:</strong> {selectedTherapist.experience}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Documents:</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 ml-2 space-y-1">
                  <li>
                    <strong>Educational Certificate:</strong>{" "}
                    {selectedTherapist.educationCert}
                  </li>
                  <li>
                    <strong>Resume / CV:</strong> {selectedTherapist.resume}
                  </li>
                  <li>
                    <strong>Govt-issued ID:</strong> {selectedTherapist.govtID}
                  </li>
                  <li>
                    <strong>Specialization Certificate:</strong>{" "}
                    {selectedTherapist.specialCert}
                  </li>
                </ul>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => verifyTherapist(selectedTherapist.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Verify
                </button>
                <button
                  onClick={() => cancelRequest(selectedTherapist.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default AdminCons
