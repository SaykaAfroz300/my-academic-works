
import { useState } from "react"; // Import useState for handling component state
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle page navigation

// Static data for therapists (this will be replaced with actual data in a real-world app)
const therapists = [
  {
    _id: "1",
    name: "Dr. John Doe",
    specialization: "Psychologist",
    availability: "Mon-Fri, 9AM-5PM",
    image: "src/assets/consultant_img/consultant1.jpg",
  },
  {
    _id: "2",
    name: "Dr. June Smith",
    specialization: "Therapist",
    availability: "Mon-Fri, 10AM-6PM",
    image: "src/assets/consultant_img/consultant2.jpg",
  },
  {
    _id: "3",
    name: "Dr. Alexa Brown",
    specialization: "Counselor",
    availability: "Mon-Fri, 8AM-4PM",
    image: "src/assets/consultant_img/consultant3.jpg",
  },
  {
    _id: "4",
    name: "Dr. Michael Johnson",
    specialization: "Clinical Psychologist",
    availability: "Mon-Fri, 7AM-3PM",
    image: "src/assets/consultant_img/consultant4.jpg",
  },
  {
    _id: "5",
    name: "Dr. Emily Carter",
    specialization: "Behavioral Therapist",
    availability: "Mon-Fri, 9AM-5PM",
    image: "src/assets/consultant_img/consultant5.jpg",
  },
  {
    _id: "6",
    name: "Dr. William Thomas",
    specialization: "Marriage Counselor",
    availability: "Mon-Fri, 10AM-6PM",
    image: "src/assets/consultant_img/consultant6.jpg",
  },
  {
    _id: "7",
    name: "Dr. Ethan Martinez",
    specialization: "Child Psychologist",
    availability: "Mon-Fri, 8AM-4PM",
    image: "src/assets/consultant_img/consultant7.jpg",
  },
  {
    _id: "8",
    name: "Dr. Sophia Anderson",
    specialization: "Family Therapist",
    availability: "Mon-Fri, 7AM-3PM",
    image: "src/assets/consultant_img/consultant8.jpg",
  },
  {
    _id: "9",
    name: "Dr. Olivia Wilson",
    specialization: "Cognitive Therapist",
    availability: "Mon-Fri, 9AM-5PM",
    image: "src/assets/consultant_img/consultant9.jpg",
  },
  {
    _id: "10",
    name: "Dr. Ava Robinson",
    specialization: "Mental Health Counselor",
    availability: "Mon-Fri, 10AM-6PM",
    image: "src/assets/consultant_img/consultant10.jpg",
  },
];

const BookAppointment = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  const handleTherapistClick = (id) => {
    navigate(`/consultant/${id}`);
  };
  

  const filteredTherapists = therapists.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
        Our Consultants
      </h2>
      <p className="text-center text-gray-500 mb-4">

        Click a consultants photo to proceed to login.

      </p>

      <input
        type="text"
        placeholder="Search by name or specialization..."
        className="w-full p-2 mb-4 border rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredTherapists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((t) => (
            <div
              key={t._id}
              className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 flex flex-col items-center space-y-4"
              onClick={() => handleTherapistClick(t._id)}

            >
              <img
                src={t.image}
                alt={t.name}
                className="w-48 h-48 object-cover rounded-full border"
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold">{t.name}</h3>
                <p className="text-gray-600">{t.specialization}</p>
                <p className="text-gray-500">Available: {t.availability}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No consultants found.</p>
      )}
    </div>
  );
};

export default BookAppointment;
