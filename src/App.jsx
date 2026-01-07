import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import OptionsPage from './Components/OptionsPage';
import Navbar from './Components/Navbar';
import Resources from './Components/Resources';
import Footer from './Components/Footer';
import LogIn from './Components/LogIn';
import SelfTest from './Components/SelfTest';
import BookAppointment from "./Components/BookAppointment"; 
import Registration from './Components/Registration';
import MoodEnhancement from './Components/MoodEnhancement';
import MoodTracking from './Components/MoodTracking';
import Helpline from './Components/Helpline'; 
import BlogList from './Components/BlogList';
import BlogDetail from './Components/BlogDetail';
import Articles from './Components/Articles';
import Books from './Components/Books';
import PatientDashboard from './Components/PatientDashboard';
import Feedback from './Components/Feedback';
import Home from './pages/Home';
import AboutUs from './Components/AboutUS';
import AppointmentForm from './Components/AppointmentForm';
import ActivitySection from './Components/ActivitySection';
import HistorySection from './Components/HistorySection';
import ProfileSettings from './Components/ProfileSettings';
import ConsultantProfile  from './Components/ConsultantProfile';
import AdminDashboard from './Components/AdminDashboard';
import Admin from './Pages/Admin';
import ConsultantDashboard from './Components/ConsultantDashboard';
import NotFound from './Components/NotFound';




function App() {
  return (
    <>
      {/* Header and Navbar should stay on all pages */}
      <Header />
      <Navbar />

      {/* Define Routes for Navigation */}

        <Routes>
          {/* Define different routes for different components */}
         
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/assessment" element={<SelfTest />} />
          <Route path="/options" element={<OptionsPage />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/moodtracking" element={<MoodTracking/>} />
          <Route path="/moodenhancement" element={<MoodEnhancement/>} />
          <Route path="/helpline" element={<Helpline />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/books" element={<Books />} />
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/consultdashboard" element={<ConsultantDashboard/>} />
          <Route path="/books" element={<Books />} /> 
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />        <Route path="/appointmentform" element={<AppointmentForm />} />
          <Route path="/activitysection" element={<ActivitySection />} />
          <Route path="/historysection" element={<HistorySection />} />
          <Route path="/profilesettings" element={<ProfileSettings />} />
          <Route path="/consultant/:id" element={<ConsultantProfile />} />
          <Route path="/admin" element ={<Admin/>}/>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          <Route path="*" element={<NotFound />} />

        </Routes>


      {/* Footer is displayed on all pages */}
     
      <Footer />
    </>
  );
}

export default App;
