import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentForm from './AppointmentForm';

const ConsultantProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [consultant, setConsultant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

  useEffect(() => {
    // Check if redirected from login with flag to show appointment form or show attachments
    if (location.state?.showAppointmentForm) {
      setShowAppointmentForm(true);
    } else if (location.state?.showAttachments) {
      setShowDocuments(true);
    }
  }, [location.state]);

  const handleBookNowClick = () => {
    console.log('Book Now clicked');
    try {
      // Always navigate to login page first
      navigate('/login', { state: { from: `/consultant/${id}`, consultantId: id, consultantName: consultant?.fullName || '' } });
    } catch (error) {
      console.error('Error in Book Now click handler:', error);
    }
  };

  const handleAttachmentsClick = () => {
    // Always navigate to login page first with state to show attachments after login
    navigate('/login', { state: { from: `/consultant/${id}`, showAppointmentForm: false, showAttachments: true } });
  };

  useEffect(() => {
    const fetchConsultant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/therapists/${id}`);
        console.log("Fetched consultant data:", response.data);
        setConsultant(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching consultant data:", err);
        setError('Failed to fetch consultant data.');
        setLoading(false);
      }
    };

    fetchConsultant();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading consultant profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  if (!consultant) {
    return <div className="text-center text-red-600 mt-10">Consultant not found</div>;
  }

  if (showAppointmentForm) {
    return <AppointmentForm key={id} consultantName={consultant.fullName} />;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-xl">
      {/* Main layout with image and bio */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left: Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={consultant?.documents?.profilePhoto || "/default-avatar.jpg"}
            alt={consultant?.fullName || "Consultant"}
            className="w-52 h-52 rounded-xl object-cover border-4 border-blue-200 shadow-md"
          />
        </div>

        {/* Right: Info */}
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold text-blue-700">{consultant?.fullName || "N/A"}</h1>
          <h2 className="text-xl text-gray-600 font-medium">{consultant?.specialization || "N/A"}</h2>
          <p className="text-sm text-gray-600">Experience: {consultant?.experience || "N/A"} years</p>
          <p className="text-sm text-gray-600">License No: {consultant?.licenseNumber || "N/A"}</p>
          <p className="text-gray-700 italic">
            "Passionate about guiding you toward better mental well-being."
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Contact + Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
        <p><strong>Schedule:</strong> {consultant?.availability || "N/A"}</p>
        <p><strong>Phone:</strong> {consultant?.phone || "N/A"}</p>
        <p><strong>Email:</strong> {consultant?.email || "N/A"}</p>
        <p><strong>Facebook:</strong> fb.com/{consultant?.fullName?.split(" ")[1]?.toLowerCase() || "profile"}</p>
      </div>

      {/* Specializations */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Specialization</h3>
        <p className="text-gray-700">{consultant?.specialization || "N/A"}</p>
      </div>

      {/* Certificates Section */}
      {(consultant?.documents?.educationalCertificates || consultant?.documents?.specializationCertificates) ? (
        <div className="mt-10 flex gap-40 justify-center">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Educational Certificates</h3>
            {consultant.documents.educationalCertificates ? (
              <img
                src={consultant.documents.educationalCertificates}
                alt="Educational Certificate"
                className="w-80 h-80 object-cover rounded-lg shadow-md border"
              />
            ) : (
              <p className="text-gray-500">No educational certificates available.</p>
            )}
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Specialization Certificates</h3>
            {consultant.documents.specializationCertificates ? (
              <img
                src={consultant.documents.specializationCertificates}
                alt="Specialization Certificate"
                className="w-80 h-80 object-cover rounded-lg shadow-md border"
              />
            ) : (
              <p className="text-gray-500">No specialization certificates available.</p>
            )}
          </div>
        </div>
      ) : null}

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Contact + Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
        <p><strong>Schedule:</strong> {consultant.availability}</p>
        <p><strong>Phone:</strong> +880123456789</p>
        <p><strong>Email:</strong> consultant@example.com</p>
        <p><strong>Facebook:</strong> fb.com/{consultant.name.split(" ")[1].toLowerCase()}</p>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-700"
          onClick={handleAttachmentsClick}
        >
          Attachments
        </button>
        <button
          type="button"
          className="bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700"
          onClick={handleBookNowClick}
        >
          Book Now
        </button>
      </div>

      {showDocuments && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-inner max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">Other Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {consultant.educationalCertificates && consultant.educationalCertificates.length > 0 ? (
              <div>
                <h4 className="text-xl font-semibold mb-2">Educational Certificates</h4>
                {consultant.educationalCertificates.map((cert, index) => (
                  <img
                    key={index}
                    src={cert}
                    alt={`Educational Certificate ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md mb-4 border"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No educational certificates available.</p>
            )}

            {consultant.specializationCertificates && consultant.specializationCertificates.length > 0 ? (
              <div>
                <h4 className="text-xl font-semibold mb-2">Specialization Certificates</h4>
                {consultant.specializationCertificates.map((cert, index) => (
                  <img
                    key={index}
                    src={cert}
                    alt={`Specialization Certificate ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md mb-4 border"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specialization certificates available.</p>
            )}

            {consultant.certificates && consultant.certificates.length > 0 ? (
              <div>
                <h4 className="text-xl font-semibold mb-2">Certificates</h4>
                {consultant.certificates.map((cert, index) => (
                  <img
                    key={index}
                    src={cert}
                    alt={`Certificate ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md mb-4 border"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No certificates available.</p>
            )}

            {consultant.documents?.resume ? (
              <div>
                <h4 className="text-xl font-semibold mb-2">Resume</h4>
                <a href={consultant.documents.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Resume
                </a>
              </div>
            ) : (
              <p className="text-gray-500">No resume available.</p>
            )}

            {consultant.documents?.governmentID ? (
              <div>
                <h4 className="text-xl font-semibold mb-2">Government ID</h4>
                <a href={consultant.documents.governmentID} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Government ID
                </a>
              </div>
            ) : (
              <p className="text-gray-500">No government ID available.</p>
            )}

            {consultant.documents?.consentForm ? (
              <div>
                <h4 className="text-xl font-semibold mb-2">Consent Form</h4>
                <a href={consultant.documents.consentForm} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Consent Form
                </a>
              </div>
            ) : (
              <p className="text-gray-500">No consent form available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantProfile;
