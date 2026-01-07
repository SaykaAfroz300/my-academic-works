import { useState, useEffect } from "react";
import axios from "axios";

export default function AppointmentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [remarks, setRemarks] = useState("");
  const [consultants, setConsultants] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState("");
  const [branch, setBranch] = useState("");

  const fee = type === "Online" ? 2500 : type === "Offline" ? 3500 : 0;

  const availableDates = [
    "21-04-2025 (Fri)", "22-04-2025 (Sat)", "23-04-2025 (Sun)",
    "24-04-2025 (Mon)", "25-04-2025 (Tue)", "28-04-2025 (Fri)",
    "29-04-2025 (Sat)", "30-04-2025 (Sun)",
  ];

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/therapists");
        setConsultants(response.data);
        if (response.data.length > 0) {
          setSelectedConsultant(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    };

    fetchConsultants();
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setGender("");
    setType("");
    setSelectedDate("");
    setSelectedTime("");
    setRemarks("");
    setBranch("");
    setSelectedConsultant(consultants.length > 0 ? consultants[0]._id : "");
  };

  const saveAppointment = async () => {
    if (!name || !email || !phone || !gender || !type || !selectedDate || !selectedTime || !selectedConsultant || !branch) {
      alert("Please fill out all required fields.");
      return;
    }

    const appointmentData = {
      name,
      email,
      phone,
      gender,
      type,
      date: selectedDate,
      time: selectedTime,
      remarks,
      consultant: selectedConsultant,
      branch,
      fee,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/appointments", appointmentData);
      if (res.status === 201) {
        alert("Appointment saved successfully!");
        resetForm();
        // Navigate back to book appointment page after saving
        window.location.href = "/book-appointment";
      } else {
        alert("Failed to save appointment.");
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("An error occurred while saving the appointment.");
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Book an Appointment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-semibold">Patient Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Full Name"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Phone <span className="text-red-500">*</span></label>
          <input
            type="tel"
            className="w-full border rounded p-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Gender <span className="text-red-500">*</span></label>
          <select
            className="w-full border rounded p-2"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Doctor <span className="text-red-500">*</span></label>
          <select
            className="w-full border rounded p-2"
            value={selectedConsultant}
            onChange={(e) => setSelectedConsultant(e.target.value)}
          >
            {consultants.map((consultant) => (
              <option key={consultant._id} value={consultant._id}>
                {consultant.fullName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Branch <span className="text-red-500">*</span></label>
          <select
            className="w-full border rounded p-2"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            <option value="Panthopath L-6">Panthopath L-6</option>
            <option value="Dhanmondi L-2">Dhanmondi L-2</option>
            <option value="Gulshan L-3">Gulshan L-3</option>
            <option value="Uttara L-5">Uttara L-5</option>
            <option value="Mirpur L-7">Mirpur L-7</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Appointment Type <span className="text-red-500">*</span></label>
          <select
            className={`w-full border rounded p-2 ${!type && "border-red-500"}`}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Month</label>
          <select className="w-full border rounded p-2" disabled>
            <option>April 2025</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block font-semibold mb-2">Available Dates <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableDates.map((date) => (
            <label key={date} className="flex items-center gap-2">
              <input
                type="radio"
                name="date"
                value={date}
                checked={selectedDate === date}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {date}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block font-semibold mb-2">Select Time Slot <span className="text-red-500">*</span></label>
        <div className="flex gap-6">
          {["02:00 pm", "04:00 pm"].map((time) => (
            <label key={time} className="flex items-center gap-2">
              <input
                type="radio"
                name="time"
                value={time}
                checked={selectedTime === time}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
              {time}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block font-semibold mb-2">Remarks / Concern (optional)</label>
        <textarea
          className="w-full border rounded p-2 min-h-[80px]"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Any special concern or message for the doctor?"
        />
      </div>


      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={resetForm}
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={saveAppointment}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Appointment
        </button>
      </div>
    </div>
  );
}
