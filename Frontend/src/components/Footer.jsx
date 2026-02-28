import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaWhatsapp,
} from "react-icons/fa6";

export default function Footer() {

  const [logoImageId, setLogoImageId] = useState(null);


  // Fetch logo (Same as Navbar)
  useEffect(() => {

    axios
      .get("http://localhost:5000/api/images/type/logo")
      .then(res => setLogoImageId(res.data.id))
      .catch(err => console.log("Footer logo not found:", err.message));

  }, []);


  return (
    <footer className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">

      {/* Main Footer */}
<div className="max-w-screen-xl mx-auto px-6 py-16">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          {/* Company Info */}
          <div className="space-y-5">


            {/* Logo + Name */}
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition"
            >

              {/* Logo */}
              {logoImageId && (
                <img
                  src={`http://localhost:5000/api/images/${logoImageId}`}
                  alt="B N Narwade Logo"
                  className="h-14 w-auto bg-white p-1 rounded"
                />
              )}

              {/* Name */}
              <div>

                <h3 className="text-xl font-bold">
                  B N Narwade
                </h3>

                <p className="text-sm text-teal-100">
                  Tax & Financial Consultants
                </p>

              </div>

            </Link>


            {/* Tagline */}
            <p className="italic text-teal-100">
              "Your Trusted Financial Partner"
            </p>


            {/* Description */}
            <p className="text-teal-50 leading-relaxed">
              We provide professional tax, compliance, and financial consulting
              services to individuals and businesses across India.
            </p>

          </div>


          {/* Our Services */}
          <div>

            <h4 className="text-xl font-semibold mb-5">
              Our Services
            </h4>

            <ul className="space-y-3 text-teal-50">

              <li>GST & Income Tax Filing</li>
              <li>Business Registration</li>
              <li>Accounting Services</li>
              <li>Compliance Management</li>
              <li>Financial Consulting</li>

            </ul>

          </div>


          {/* Quick Links */}
          <div>

            <h4 className="text-xl font-semibold mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3 text-teal-50">

              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/location">Location</Link></li>

            </ul>

          </div>


          {/* Contact Info */}
          <div>

            <h4 className="text-xl font-semibold mb-5">
              Contact Us
            </h4>

            <ul className="space-y-4 text-teal-50">

              <li className="flex gap-3">
                <FaLocationDot />
                Pune, Maharashtra, India
              </li>

              <li className="flex gap-3">
                <FaPhone />
                +91-7498416057
              </li>

               <li className="flex gap-3">
                <FaWhatsapp />
                +91-7498416057
              </li>

              <li className="flex gap-3">
                <FaEnvelope />
                bnnarwadeandco@gmail.com
              </li>

              <li className="flex gap-3">
                <FaGlobe />
                www.bnnarwade.com
              </li>

            </ul>


            {/* Social Icons */}
            <div className="flex gap-4 mt-6">

              <a
  href="https://www.linkedin.com/in/b-n-narwade-and-co-7993b43aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition"
>
  <FaLinkedinIn />
</a>

              {/* <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30">
                <FaXTwitter />
              </a> */}

              <a href="https://www.facebook.com/share/1F3d713uPZ/" 
              target="_blank"
  rel="noopener noreferrer"
              className="bg-white/20 p-3 rounded-full hover:bg-white/30">
                <FaFacebookF />
              </a>

              <a href="https://www.instagram.com/bnnarwadeandco?igsh=emk2MmIwbGtxMTJy" 
               target="_blank"
  rel="noopener noreferrer"
              className="bg-white/20 p-3 rounded-full hover:bg-white/30">
                <FaInstagram />
              </a>

            </div>

          </div>

   {/* Office Timings */}
<div className="mt-8">
  <h4 className="text-lg font-semibold mb-3">
    Office Timings
  </h4>
  <ul className="space-y-2 text-teal-50 text-sm">
    <li>Monday - Saturday: 10:30 AM - 7:00 PM</li>
    <li>Sunday: Closed</li>
  </ul>
</div>
        </div>

      </div>


      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-5 text-center text-sm text-teal-100">

        © {new Date().getFullYear()} B N Narwade & Co. | All Rights Reserved.

      </div>

    </footer>
  );
}
