import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./admin/Dashboard";
import AdminSignup from "./pages/AdminSignup";
import ServiceDetails from "./pages/ServiceDetails";
import Location from "./pages/Location";
import AdminSecret from "./pages/AdminSecret";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/location" element={<Location />} />
<Route path="/admin-secret" element={<AdminSecret />} />


      </Routes>
    </BrowserRouter>
  );
}
