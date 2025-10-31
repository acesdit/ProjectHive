import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Home from "./Home";
import "./App.css";
import SafetyInstructions from "./SafetyInstructions";
import DisasterTrack from "./DisasterTrack";
import SheltersandRescueTeams from "./Shelters&RescueTeams";
import FundsandAidSupplies from "./Funds&AidSupplies";
import AdminLogin from "./AdminLogin";
import Adminhome from "./Adminhome";
import Adminsafety from "./Adminsafety";
import AdminDisaster from "./AdminDisaster";
import AdminShelter from "./AdminShelter";
import AdminFunds from "./AdminFunds";
import AdminEmergency from "./AdminEmergency";
import AdminAid from "./AdminAid";
import AdminRescue from "./AdminRescue";
import DefaultHome from "./DefaultHome";

import VolunteerRegistrationForm from "./VolunteerRegistration";

import Donateform from "./Donateform";
import AdminVolunteer from "./AdminVolunteer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/safety" element={<SafetyInstructions />} />
        <Route path="/disaster" element={<DisasterTrack />} />
        <Route path="/shelter" element={<SheltersandRescueTeams />} />
        <Route path="/funds" element={<FundsandAidSupplies />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<Adminhome />} />
        <Route path="/adminsafety" element={<Adminsafety />} />
        <Route path="/admindisaster" element={<AdminDisaster />} />
        <Route path="/adminshelter" element={<AdminShelter />} />
        <Route path="/adminfunds" element={<AdminFunds />} />
        <Route path="/adminemergency" element={<AdminEmergency />} />
        <Route path="/adminaid" element={<AdminAid />} />
        <Route path="/" element={<DefaultHome />} />
        <Route path="/adminv" element={<AdminVolunteer />} />
        <Route path="/adminrescue" element={<AdminRescue />} />
        <Route path="/donate" element={<Donateform />} />
        <Route path="/v" element={<VolunteerRegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
