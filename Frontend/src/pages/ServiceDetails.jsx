import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ServiceDetails() {

  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {

    axios.get(`http://localhost:5000/api/services/${id}`)
      .then(res => setService(res.data))
      .catch(err => console.log(err.message));

  }, [id]);

  if (!service) {
    return (
      <p className="text-center mt-32 text-xl font-semibold">
        Loading...
      </p>
    );
  }

  return (
    <>
      <Navbar />

      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-16 px-4">

        <div className="max-w-5xl mx-auto">

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
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
              >
                Book Free Consultation
              </a>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}
