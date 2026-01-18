import { useState, useEffect } from "react";
import axios from "axios";

export default function Hero() {
  const [heroImageId, setHeroImageId] = useState(null);

  useEffect(() => {
    // Fetch hero background image
    axios.get("http://localhost:5000/api/images/type/hero")
      .then(res => setHeroImageId(res.data.id))
      .catch(err => console.log("Hero image not found:", err.message));
  }, []);

  const backgroundStyle = heroImageId 
    ? {
        backgroundImage: `url('http://localhost:5000/api/images/${heroImageId}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        backgroundImage: 'linear-gradient(to right, rgb(59, 130, 246), rgb(30, 58, 138))',
      };

  return (
    <div 
      className="relative py-32 px-6 md:px-12 min-h-[500px] flex items-center"
      style={backgroundStyle}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="max-w-4xl relative z-10">
        <p className="text-white/80 text-sm font-semibold mb-4">
          Welcome to B N Narwade & Co.
        </p>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Your Trusted Partner in Taxation
        </h1>
        
        <p className="text-white/90 text-lg mb-8 max-w-2xl leading-relaxed">
          At B N Narwade & Co., our 30+ years of experience enables us to deliver comprehensive tax and financial solutions. Focus on your business while we handle your compliance with precision.
        </p>
        
        <div className="flex gap-4 flex-wrap">
          <button className="bg-white hover:bg-gray-100 text-blue-900 font-semibold px-8 py-3 rounded-lg transition">
            Get Consultation
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 rounded-lg transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
