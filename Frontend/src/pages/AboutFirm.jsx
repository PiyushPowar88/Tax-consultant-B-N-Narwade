import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AboutFirm = () => {

  const [logoImageId, setLogoImageId] = useState(null);

  // Fetch Company Logo
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/images/type/logo")
      .then((res) => setLogoImageId(res.data.id))
      .catch((err) => console.log("Logo not found:", err.message));
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">

      {/* ================= Navbar ================= */}
      <nav className="bg-white px-6 py-4 shadow-sm border-b">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-3">

            {logoImageId && (
              <img
                src={`http://localhost:5000/api/images/${logoImageId}`}
                alt="B N Narwade Logo"
                className="h-14 w-auto object-contain"
              />
            )}

            <div>
              <h2 className="font-bold text-lg">
                B. N. Narwade & Co
              </h2>

              <p className="text-xs text-gray-500">
                Finance & Tax Consulting
              </p>
            </div>

          </Link>

          {/* Menu */}
          <div className="flex gap-6 text-sm font-medium">

            <Link to="/" className="hover:text-green-600">
              Home
            </Link>

            <Link to="/services" className="hover:text-green-600">
              Services
            </Link>

            <Link to="/contact" className="hover:text-green-600">
              Contact
            </Link>

          </div>

        </div>

      </nav>


      {/* ================= Hero ================= */}
      <section className="py-24 px-6 text-center bg-gray-50">

        <div className="flex flex-col items-center space-y-6">

          {/* Logo */}
          {logoImageId && (
            <img
              src={`http://localhost:5000/api/images/${logoImageId}`}
              alt="B N Narwade Logo"
              className="h-28 w-auto object-contain drop-shadow-md"
            />
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-green-600 tracking-wide">
            B. N. NARWADE & CO
          </h1>

          <p className="text-xl text-gray-700 font-medium">
            Strategic Finance & Taxation Consulting
          </p>

          <p className="max-w-2xl text-gray-500 leading-relaxed">
            Elevating Financial Integrity. Driving Business Growth.
          </p>

        </div>

      </section>


      {/* ================= About ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-sm my-12">

        {/* Left */}
        <div>

          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            About Our Firm
          </h2>

          <p className="text-gray-700 leading-relaxed">
            At B. N. Narwade & Co, we believe taxation and finance
            should empower businesses. We bridge the gap between
            complex regulations and practical success.
          </p>

          <p className="mt-4 text-gray-600">
            We deliver clarity, compliance, and confidence for
            sustainable growth.
          </p>

        </div>

        {/* Right */}
        <div className="bg-gray-50 rounded-xl p-8 border">

          <h3 className="text-xl font-semibold mb-4 text-green-600">
            The Narwade Advantage
          </h3>

          <ul className="space-y-3 text-gray-700">

            <li>✔ Client-Centric Approach</li>
            <li>✔ Technology-Driven Services</li>
            <li>✔ Strong Regulatory Expertise</li>
            <li>✔ Transparent Advisory</li>
            <li>✔ Ethical Practices</li>

          </ul>

        </div>

      </section>


      {/* ================= Services ================= */}
      <section className="bg-white py-20 px-6 rounded-2xl shadow-sm mx-6 my-12">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-12 text-green-600">
            Our Expertise
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">

              <h3 className="font-semibold text-lg mb-3">
                Strategic Taxation
              </h3>

              <p className="text-gray-600 text-sm">
                GST filing, ITR, audits, appeals,
                and litigation support.
              </p>

            </div>


            {/* Card 2 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">

              <h3 className="font-semibold text-lg mb-3">
                Financial Architecture
              </h3>

              <p className="text-gray-600 text-sm">
                Accounting, MIS reporting,
                payroll, and audits.
              </p>

            </div>


            {/* Card 3 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">

              <h3 className="font-semibold text-lg mb-3">
                Corporate Compliance
              </h3>

              <p className="text-gray-600 text-sm">
                Company law, MSME, FEMA,
                and startup advisory.
              </p>

            </div>


<div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">

              <h3 className="font-semibold text-lg mb-3">
                Timely Compliance
              </h3>

              <p className="text-gray-600 text-sm">
                Compelete compliance calendar, timely filings,
                and proactive reminders.
              </p>

            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">

              <h3 className="font-semibold text-lg mb-3">
                Updated Expertise and Knowladege
              </h3>

              <p className="text-gray-600 text-sm">
                Regular training, workshops, and knowledge sharing
                sessions to stay ahead of regulatory changes.
              </p>

            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">

              <h3 className="font-semibold text-lg mb-3">
Fastest servies               </h3>

              <p className="text-gray-600 text-sm">
                We understand the importance of timely compliance and
                financial reporting. Our team is committed to delivering
                services with the utmost efficiency, ensuring that all
                filings and reports are completed accurately and on time.
              </p>

            </div>
          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="text-center py-20 bg-white rounded-2xl shadow-sm mx-6 my-12">

        <h2 className="text-3xl font-bold mb-4">
          Book a Strategic Consultation
        </h2>

        <p className="text-gray-600 mb-8">
          Let us help you turn compliance into opportunity.
        </p>

        <Link
          to="/contact"
          className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
        >
          Contact Us
        </Link>

      </section>


      {/* ================= Footer ================= */}
      <footer className="bg-gray-200 text-center py-6 text-sm text-gray-600">

        © {new Date().getFullYear()} B. N. Narwade & Co. All Rights Reserved.

      </footer>

    </div>
  );
};

export default AboutFirm;
