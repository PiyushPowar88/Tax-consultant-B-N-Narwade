import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [logoImageId, setLogoImageId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch company logo
    axios.get("http://localhost:5000/api/images/type/logo")
      .then(res => setLogoImageId(res.data.id))
      .catch(err => console.log("Logo not found:", err.message));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-white text-gray-900 px-6 py-4 shadow-md border-b border-gray-200">
      <div className="flex justify-between items-center">
        {/* Logo & Title Section */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          {/* Logo Image */}
{logoImageId && (
  <img 
    src={`http://localhost:5000/api/images/${logoImageId}`}
    alt="B N Narwade Logo"
    className="h-20 w-35"
  />
)}
          
          {/* Title */}
         <div className="flex flex-col">
  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
    B N Narwade
  </h1>
  <p className="text-sm sm:text-base text-gray-600">
    Tax & Financial Consultants
  </p>
</div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium transition">Home</Link>
          <Link to="/services" className="text-gray-700 hover:text-teal-600 font-medium transition">Services</Link>
          <Link to="/contact" className="text-gray-700 hover:text-teal-600 font-medium transition">Contact</Link>
      <Link
  to="/location"
  className="text-gray-700 hover:text-green-600 font-medium transition flex items-center gap-1"
>
  Location 
</Link>
<a
  href="https://www.incometax.gov.in/iec/foportal/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-700 hover:text-teal-600 font-medium transition flex items-center gap-1"
>
  Income Tax Portal
</a>

<a
  href="https://www.gst.gov.in/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-700 hover:text-teal-600 font-medium transition flex items-center gap-1"
>
  Goods and Services Tax
</a>

<a
  href="https://www.mahagst.gov.in/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-700 hover:text-teal-600 font-medium transition flex items-center gap-1"
>
  Mahagst
</a>

<a
  href="https://www.icegate.gov.in/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-700 hover:text-teal-600 font-medium transition flex items-center gap-1"
>
  ICEGATE
</a>

          
          {token ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-teal-600 font-medium transition">
                📊 Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/admin" 
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Admin Login
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button className="md:hidden text-gray-900" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
  <div className="md:hidden mt-4 space-y-3 pb-3 border-t pt-3">
          <Link to="/" className="block text-gray-700 hover:text-teal-600 font-medium transition">Home</Link>
          <Link to="/services" className="block text-gray-700 hover:text-teal-600 font-medium transition">Services</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-teal-600 font-medium transition">Contact</Link>
    <Link
  to="/location"
  className="block text-gray-700 hover:text-green-600 font-medium transition"
>
  Location
</Link>



{/* Income Tax */}
<a
  href="https://www.incometax.gov.in/iec/foportal/"
  target="_blank"
  rel="noopener noreferrer"
  className="block text-gray-700 hover:text-teal-600 font-medium transition"
>
  Income Tax
</a>

{/* GST */}
<a
  href="https://www.gst.gov.in/"
  target="_blank"
  rel="noopener noreferrer"
  className="block text-gray-700 hover:text-teal-600 font-medium transition"
>
  GST
</a>

{/* MahaGST */}
<a
  href="https://www.mahagst.gov.in/"
  target="_blank"
  rel="noopener noreferrer"
  className="block text-gray-700 hover:text-teal-600 font-medium transition"
>
  MahaGST
</a>

{/* ICEGATE */}
<a
  href="https://www.icegate.gov.in/"
  target="_blank"
  rel="noopener noreferrer"
  className="block text-gray-700 hover:text-teal-600 font-medium transition"
>
  ICEGATE
</a>







          {token ? (
            <>
              <Link to="/dashboard" className="block text-gray-700 hover:text-teal-600 font-medium transition">
                📊 Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/admin" 
              className="block bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold text-center transition"
            >
              Admin Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
