import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Reusable animated component
const ScrollReveal = ({ children, variant = fadeInUp, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [ownerImageId, setOwnerImageId] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [clientsLogos, setClientsLogos] = useState([]);
  const services = [
    {
      icon: "📋",
      title: "GST & Income Tax Solutions",
      items: [
        "Monthly GST Filings",
        "Annual Income Tax Returns",
        "Tax Planning & Optimization",
        "Compliance & Verification",
      ],
      color: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      accentColor: "bg-green-500",
    },
    {
      icon: "📝",
      title: "Business Registrations",
      items: [
        "Company Registration",
        "LLP & Proprietorship Setup",
        "Shop Act Licenses",
        "PAN & ITR Registrations",
      ],
      color: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      accentColor: "bg-blue-500",
    },
    {
      icon: "💼",
      title: "Professional & Compliance",
      items: [
        "Trademark & Patent Filing",
        "Professional Accounting",
        "Compliance Management",
        "Regulatory Guidance",
      ],
      color: "from-teal-50 to-green-50",
      borderColor: "border-teal-200",
      accentColor: "bg-teal-500",
    },
    {
      icon: "🎯",
      title: "Financial Consulting",
      items: [
        "Business Advisory",
        "Financial Planning",
        "Investment Advice",
        "Wealth Tax Support",
      ],
      color: "from-indigo-50 to-blue-50",
      borderColor: "border-indigo-200",
      accentColor: "bg-indigo-500",
    },
  ];

  const whyChooseUs = [
    {
      icon: "👥",
      title: "Expert Team",
      desc: "Experienced professional dedicated to your success",
      bgColor: "bg-blue-50",
      accentColor: "text-blue-600",
    },
    {
      icon: "✅",
      title: "Compliance Assured",
      desc: "100% compliance assured across all services",
      bgColor: "bg-green-50",
      accentColor: "text-green-600",
    },
    {
      icon: "🎯",
      title: "Personalized Service",
      desc: "Customized solutions tailored to your needs",
      bgColor: "bg-purple-50",
      accentColor: "text-purple-600",
    },
  ];

  // Services Carousel
  const serviceCards = [
    {
      id: 1,
      title: "Foreign Investment Approvals",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Auditing",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Litigation",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Tax Consulting",
      image:
        "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=500&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Financial Planning",
      image:
        "https://images.unsplash.com/photo-1553729717-e91a2f023c1d?w=500&h=400&fit=crop",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch owner image on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/images/type/owner")
      .then((res) => {
        setOwnerImageId(res.data.id);
        setLoadingImage(false);
      })
      .catch((err) => {
        console.log("Could not load owner image:", err.message);
        setLoadingImage(false);
      });

    // Fetch all clients logos
    axios
      .get("http://localhost:5000/api/images/admin/all")
      .then((res) => {
        const logos = res.data.filter(
          (img) => img.image_type === "clients_logo",
        );
        setClientsLogos(logos);
      })
      .catch((err) =>
        console.log("Could not load clients logos:", err.message),
      );
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % serviceCards.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [serviceCards.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + serviceCards.length) % serviceCards.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % serviceCards.length);
  };

  // Get visible cards (show 3 cards at a time)
  const getVisibleCards = () => {
    return [
      serviceCards[currentIndex % serviceCards.length],
      serviceCards[(currentIndex + 1) % serviceCards.length],
      serviceCards[(currentIndex + 2) % serviceCards.length],
    ];
  };

  return (
    <>
      <Navbar />
      <Hero />

      {/* About Owner Section */}
      <ScrollReveal>
        <div className="py-20 px-6 md:px-10 bg-white">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-20 mx-20">
            {/* Left Side - Image */}
            <ScrollReveal variant={fadeInLeft} className="flex justify-center md:justify-start">
              <motion.div 
                className="rounded-2xl shadow-2xl overflow-hidden w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {loadingImage ? (
                  <div className="w-full h-[460px] bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Loading image...</p>
                  </div>
                ) : ownerImageId ? (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={`http://localhost:5000/api/images/${ownerImageId}`}
                    alt="Company Owner"
                    className="w-full h-[600px] object-cover"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/1200x700?text=Owner+Photo"
                    alt="Company Owner"
                    className="w-full h-[460px] object-cover"
                  />
                )}
              </motion.div>
            </ScrollReveal>

            {/* Right Side - Text */}
            <ScrollReveal variant={fadeInRight}>
              <div className="space-y-6 text-center md:text-left">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-teal-600 text-base font-semibold tracking-widest uppercase"
                >
                  Serving Our Valued Clients For More Than 30+ Years
                </motion.p>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
                >
                  B N Narwade & Co.
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl text-gray-700 font-medium"
                >
                  Your Trusted Partner
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-700 text-xl leading-relaxed md:mx-0"
                >
                  We are prominent tax and financial consultants in Pune. With over
                  two decades of expertise, we offer comprehensive services
                  including GST filing, income tax returns, business registrations,
                  professional accounting, compliance management, and financial
                  consulting for individuals and businesses across India.
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 text-lg leading-relaxed md:mx-0"
                >
                  Our commitment is to deliver precision, compliance, and growth for
                  every client. We handle your financial compliance with expertise
                  while you focus on your business growth.
                </motion.p>

                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-lg px-10 py-5 rounded-xl shadow-lg transition"
                >
                  Explore More About Us
                </motion.button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      {/* Services Carousel Section */}
            {/* Services Carousel Section - Fixed */}
      <ScrollReveal>
        <div className="py-20 px-6 md:px-12 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3">
                  Our Services
                </p>
                <h2 className="text-5xl font-bold text-gray-900 mb-4">
                  Solutions Tailored to Your Needs, Service Perfected
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  We provide real-world solutions to complex business issues through
                  audit and assurance functions, taxation—international and
                  domestic, startup in India, company formation in India and foreign
                  investment in India etc.
                </p>
              </div>
            </ScrollReveal>

            {/* Carousel Container - Fixed Animation */}
            <ScrollReveal variant={scaleIn} delay={0.2}>
              <div className="relative">
                {/* Remove the motion.div wrapper with initial/visible states */}
                <div className="grid md:grid-cols-3 gap-8">
                  {getVisibleCards().map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80"
                      whileHover={{ y: -10 }}
                    >
                      <motion.img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.1 }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/40 to-transparent flex items-end p-6">
                        <h3 className="text-2xl font-bold text-white">
                          {card.title}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <motion.div 
                  className="flex justify-center items-center gap-6 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrev}
                    className="bg-white hover:bg-gray-200 text-gray-800 font-bold w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center"
                  >
                    ←
                  </motion.button>

                  {/* Dots Indicator */}
                  <div className="flex gap-3">
                    {serviceCards.map((_, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          idx === currentIndex % serviceCards.length
                            ? "bg-blue-500 w-8"
                            : "bg-gray-400 hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    className="bg-white hover:bg-gray-200 text-gray-800 font-bold w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center"
                  >
                    →
                  </motion.button>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      {/* Comprehensive Services Section */}
      <ScrollReveal>
        <div className="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="mb-16 text-center">
                <motion.div 
                  className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mb-6 mx-auto"
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
                <h2 className="text-5xl font-bold text-gray-900 mb-4">
                  Comprehensive Services
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  From GST and income tax filing to business registrations and
                  specialized services, we provide end-to-end financial solutions.
                </p>
              </div>
            </ScrollReveal>

            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`bg-gradient-to-br ${service.color} border-2 ${service.borderColor} p-8 rounded-2xl hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <div
                    className={`w-16 h-1 ${service.accentColor} mb-4 rounded`}
                  ></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {service.title}
                  </h3>
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="text-gray-700 flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span
                          className={`${service.accentColor} text-white rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm`}
                        >
                          ✓
                        </span>
                        <span className="font-medium">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </ScrollReveal>

      {/* Why Choose Us Section */}
      <ScrollReveal>
        <div className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <motion.div 
                  className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mb-6 mx-auto"
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
                <h2 className="text-5xl font-bold text-gray-900 mb-4">
                  Why Choose B N Narwade & Co.?
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  With years of expertise in tax consulting and financial services,
                  we deliver exceptional solutions.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Side - Benefits */}
              <ScrollReveal variant={fadeInLeft}>
                <div className="space-y-6">
                  {whyChooseUs.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10 }}
                      className={`${item.bgColor} border-l-4 border-gray-300 p-6 rounded-lg hover:shadow-lg transition`}
                    >
                      <div className="flex gap-4">
                        <motion.div 
                          className="text-4xl"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div>
                          <h3
                            className={`font-bold text-gray-900 text-lg ${item.accentColor}`}
                          >
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Right Side - Highlights Box */}
              <ScrollReveal variant={fadeInRight}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-10 text-white shadow-2xl"
                >
                  <h3 className="text-3xl font-bold mb-2">Precision</h3>
                  <p className="text-teal-50 mb-8 text-lg">Compliance & Growth</p>

                  <div className="space-y-6 mb-8">
                    {[
                      { icon: "✓", title: "100% Accuracy Guaranteed", desc: "Precise calculations every time" },
                      { icon: "⏰", title: "24/7 Availability", desc: "Always here when you need us" },
                      { icon: "🎯", title: "Expert Support", desc: "Professional guidance throughout" }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-start gap-4 bg-white/10 p-5 rounded-xl backdrop-blur"
                      >
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h4 className="font-bold text-lg">{item.title}</h4>
                          <p className="text-teal-50 text-sm mt-1">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/contact"
                      className="block text-center w-full bg-white hover:bg-gray-50 text-teal-600 font-bold py-4 rounded-xl transition duration-200 shadow-lg"
                    >
                      Schedule Free Consultation
                    </Link>
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Clients Logos Section */}
      <ScrollReveal>
        <div className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <motion.div 
                  className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mb-6 mx-auto"
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
                <h2 className="text-5xl font-bold text-gray-900 mb-4">
                  Our Trusted Clients
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Proud to serve hundreds of satisfied clients across India
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant={scaleIn}>
              {clientsLogos.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {clientsLogos.map((logo, idx) => (
                    <motion.div
                      key={logo.id}
                      variants={fadeInUp}
                      custom={idx}
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-center bg-gray-50 rounded-xl p-6 h-32 hover:shadow-lg transition-all duration-300"
                    >
                      <img
                        src={`http://localhost:5000/api/images/${logo.id}`}
                        alt={logo.image_name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-lg">
                    Client logos coming soon...
                  </p>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      {/* Get in Touch Section */}
      <ScrollReveal>
        <div className="py-20 px-6 md:px-12 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mb-8 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              Get in Touch
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-600 text-lg mb-10"
            >
              Ready to simplify your financial compliance? Get in touch for a free
              consultation.
            </motion.p>
            <motion.div 
              className="flex flex-col md:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold px-10 py-4 rounded-xl transition duration-200 shadow-lg"
                >
                  Contact Us Today
                </Link>
              </motion.div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 font-bold px-10 py-4 rounded-xl transition duration-200"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </ScrollReveal>
      <Footer />
    </>
  );
}