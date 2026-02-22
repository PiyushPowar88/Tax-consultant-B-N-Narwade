import React, { useState } from "react";
import IncomeTaxRegistration from "./IncomeTaxRegistration";
import GSTRegistration from "./GSTRegistration";
import UdyamRegistration from "./UdyamRegistration";

const RegistrationPage = () => {
  const [serviceType, setServiceType] = useState("income_tax");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const services = [
    { 
      id: "income_tax", 
      label: "Income Tax Registration", 
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "emerald",
      description: "File your ITR and manage tax compliance"
    },
    { 
      id: "gst", 
      label: "GST Registration", 
      icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z",
      color: "blue",
      description: "Register for Goods & Services Tax"
    },
    { 
      id: "udyam", 
      label: "Udyam Registration", 
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      color: "amber",
      description: "MSME registration for small businesses"
    }
  ];

  const currentService = services.find(s => s.id === serviceType);

  const renderForm = () => {
    switch(serviceType) {
      case "gst": return <GSTRegistration />;
      case "udyam": return <UdyamRegistration />;
      default: return <IncomeTaxRegistration />;
    }
  };

  const getThemeColors = () => {
    switch(serviceType) {
      case "gst": return "from-blue-900 via-blue-950 to-slate-900";
      case "udyam": return "from-amber-900 via-amber-950 to-slate-900";
      default: return "from-emerald-900 via-emerald-950 to-slate-900";
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeColors()} transition-all duration-500`}>
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">Registration Portal</span>
            </div>

            {/* Desktop Service Selector */}
            <div className="hidden md:flex items-center space-x-1 bg-black/20 rounded-lg p-1">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setServiceType(service.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    serviceType === service.id
                      ? "bg-white text-gray-900 shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                  </svg>
                  <span>{service.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <span className="font-medium">{currentService?.label}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setServiceType(service.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                        serviceType === service.id ? 'bg-gray-50 border-r-4 border-' + service.color + '-500' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-lg bg-${service.color}-100`}>
                        <svg className={`w-5 h-5 text-${service.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{service.label}</p>
                        <p className="text-xs text-gray-500">{service.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              {currentService?.label}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              {currentService?.description}. Complete your registration securely and get your certificate delivered fast.
            </p>
            
            {/* Progress Steps */}
            {/* <div className="flex items-center justify-center space-x-4 text-sm text-white/60">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-semibold">1</div>
                <span className="hidden sm:inline">Fill Details</span>
              </div>
              <div className="w-12 h-0.5 bg-white/20"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-semibold">2</div>
                <span className="hidden sm:inline">Upload Docs</span>
              </div>
              <div className="w-12 h-0.5 bg-white/20"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-semibold">3</div>
                <span className="hidden sm:inline">Get Certificate</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form Container */}
          <div className="animate-fade-in">
            {renderForm()}
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-black/20 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/60 text-sm text-center md:text-left">
              <p>&copy; 2024 Registration Portal. All rights reserved.</p>
              <p className="text-white/40 text-xs mt-1">Authorized by Government of India</p>
            </div>
            
            <div className="flex items-center space-x-6 text-white/60">
              <a href="#" className="hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors text-sm">Support</a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white/40 text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>256-bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </footer> */}

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RegistrationPage;