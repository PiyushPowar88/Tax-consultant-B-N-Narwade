import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
// import BackButton from "../components/BackButton";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", message: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitForm = async () => {
    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.message.trim()) {
      setErrorMessage("All fields are required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    // Phone validation
    if (form.phone.length < 10) {
      setErrorMessage("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:5000/api/inquiry", form);
      setSuccessMessage("✅ Thank you! Your inquiry has been submitted. You'll receive a confirmation email shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "❌ Failed to submit. Please try again.");
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
{/* <BackButton /> */}

{/* Premium Back Button Section */}
<div className="bg-slate-900 pt-6 pl-6">

  <button
    onClick={() => navigate("/")}
    className="
      group
      flex items-center gap-3
      bg-gradient-to-r from-cyan-500 to-teal-500
      text-white
      px-6 py-3
      rounded-full
      shadow-lg
      hover:shadow-cyan-500/40
      hover:scale-105
      transition-all duration-300
      font-semibold
      tracking-wide
    "
  >
    <span className="transform group-hover:-translate-x-1 transition duration-300">
      ←
    </span>

    <span>Back to Home</span>
  </button>

</div>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-3">Contact Us</h2>
            <p className="text-xl text-gray-300">Get in touch with our team. We'll connect you soon!</p>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white rounded-xl shadow-2xl p-8">

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                <p className="font-semibold">{successMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                <p className="font-semibold">{errorMessage}</p>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-5">
              
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                  disabled={loading}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                  disabled={loading}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="Your 10-digit phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                  disabled={loading}
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  placeholder="Tell us about your inquiry..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition resize-none"
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={submitForm}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Inquiry"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-2">
                * All fields are required. We'll send confirmation emails to both you and our admin.
              </p>

            </div>

          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-block p-4 bg-blue-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-gray-400">We'll respond within 24-48 hours</p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-blue-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.92 0 1.759.896 3.331 2.25 4.249l1.548-1.262c.075-.061.178-.087.28-.06l1.175.39A1 1 0 0110.445 13l-.4 2.368a1 1 0 01-.98.832H6a1 1 0 01-.982-.836l-.74-4.435a1 1 0 01.54-1.06l1.548-.773c-.058-.3-.102-.605-.102-.92 0-1.759-.896-3.331-2.25-4.249L4.4 5.757a1 1 0 01-.28.06l-1.175-.39A1 1 0 012 5.403L2.4 2.635A1 1 0 012 3z"></path>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Fast Response</h3>
              <p className="text-gray-400">Quick resolution to your queries</p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-blue-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-.604-2.237a.5.5 0 00-.856.545c.19.324.316.68.316 1.067 0 .387-.126.743-.316 1.067a.5.5 0 10.856.545A2.988 2.988 0 0014 9a2.988 2.988 0 00-.604-1.837z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Support</h3>
              <p className="text-gray-400">Dedicated support team ready to help</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
