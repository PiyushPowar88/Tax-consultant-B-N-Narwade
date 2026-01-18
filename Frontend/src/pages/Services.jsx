import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Services() {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem("token");

  const loadServices = () => {
    axios.get("http://localhost:5000/api/services")
      .then(res => setServices(res.data))
      .catch(err => console.log("Error loading services:", err.message));
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
              <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden">

                {/* Service Image */}
                {service.image && (
                  <img
                    src={`http://localhost:5000/api/admin/services/${service.id}/image`}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-3">{service.short_description}</p>
                  <p className="text-gray-700 text-sm">{service.full_description}</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
