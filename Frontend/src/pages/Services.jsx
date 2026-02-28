import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import BackButton from "../components/BackButton";
export default function Services() {

  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const loadServices = () => {
    axios.get("http://localhost:5000/api/services")
      .then(res => setServices(res.data))
      .catch(err => console.log(err.message));
  };

  useEffect(() => {
    loadServices();
  }, []);

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

      <div className="min-h-screen bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Our Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {services.map(service => (
              <div
                key={service.id}
                onClick={() => navigate(`/services/${service.id}`)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition"
              >

                {/* Image */}
                {service.image && (
                  <img
                    src={`http://localhost:5000/api/admin/services/${service.id}/image`}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* Info */}
                <div className="p-6 text-center">

                  <h3 className="text-xl font-bold mb-2">
                    {service.title}
                  </h3>

                  <p className="text-gray-600">
                    {service.short_description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  );
}
