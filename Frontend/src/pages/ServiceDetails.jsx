import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ServiceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/services/${id}`)
      .then((res) => setService(res.data))
      .catch((err) => console.log(err.message));
  }, [id]);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center">
          <p className="text-xl font-semibold text-slate-600">
            Loading...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* ONE SINGLE BACKGROUND WRAPPER */}
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-12 px-4">

        <div className="max-w-5xl mx-auto">

          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/")}
              className="
                inline-flex items-center gap-2
                bg-blue-600 text-white
                px-6 py-2.5
                rounded-lg
                shadow-md
                hover:bg-blue-700
                transition-all duration-300
                font-semibold
              "
            >
              ← Back to Home
            </button>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10">
              {service.title}
            </h1>

            {/* Image */}
            {service.image && (
              <div className="flex justify-center mb-10">
                <img
                  src={`http://localhost:5000/api/admin/services/${service.id}/image`}
                  alt={service.title}
                  className="w-full max-w-xl rounded-xl shadow-lg object-cover"
                />
              </div>
            )}

            {/* Divider */}
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8 rounded"></div>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed text-center mb-10 px-4">
              {service.full_description}
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <a
                href="/contact"
                className="
                  bg-blue-600 text-white
                  px-8 py-3
                  rounded-full
                  text-lg font-semibold
                  hover:bg-blue-700
                  transition shadow-lg
                "
              >
                Book Your Consultation
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}