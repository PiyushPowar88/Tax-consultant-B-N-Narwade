import Navbar from "../components/Navbar";
// import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

export default function Location() {
  const navigate = useNavigate();
  return (
    
    <>
      <Navbar />
{/* <BackButton /> */}

<div className="pt-6 pl-6">
  <button
    onClick={() => navigate("/")}
    className="
      inline-flex
      items-center
      gap-2
      bg-gradient-to-r from-teal-500 to-cyan-500
      text-white
      px-7 py-3
      rounded-full
      shadow-md
      hover:from-teal-600
      hover:to-cyan-600
      transition-all duration-300
      font-semibold
    "
  >
    ← Back to Home
  </button>
</div>

      <div className="min-h-screen bg-gray-100 py-16 px-6">

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-10">

          {/* Heading */}
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Our Office Location
          </h1>

          <p className="text-center text-gray-600 mb-10 text-lg">
            Visit us at B N Narwade & Co. for personalized tax and financial consultation.
          </p>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.0607495674367!2d73.85132187496285!3d18.51746788257548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06f25555555%3A0x97a6110be661da96!2sB%20N%20Narwade%20%26%20Co!5e1!3m2!1sen!2sin!4v1770044175427!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="B N Narwade Location"
            />

          </div>

        </div>

      </div>
    </>
  );
}
