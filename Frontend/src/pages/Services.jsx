import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
