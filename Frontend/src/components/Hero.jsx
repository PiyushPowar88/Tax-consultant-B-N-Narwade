// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function Hero() {
//   const [heroImageId, setHeroImageId] = useState(null);

//   useEffect(() => {
//     // Fetch hero background image
//     axios
//       .get("http://localhost:5000/api/images/type/hero")
//       .then((res) => setHeroImageId(res.data.id))
//       .catch((err) => console.log("Hero image not found:", err.message));
//   }, []);

//   const backgroundStyle = heroImageId
//     ? {
//         backgroundImage: `url('http://localhost:5000/api/images/${heroImageId}')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }
//     : {
//         backgroundImage:
//           "linear-gradient(to right, rgb(59, 130, 246), rgb(30, 58, 138))",
//       };

//   return (
//     <div
//       className="relative h-screen px-6 md:px-12 flex items-center"
//       style={backgroundStyle}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       {/* Content */}
//       <div className="max-w-4xl relative z-10">
//         <p className="text-white/80 text-sm font-semibold mb-4">
//           Welcome to B N Narwade & Co.
//         </p>

//         <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
//           Your Trusted Partner in Taxation
//         </h1>

//         <p className="text-white/90 text-lg mb-8 max-w-2xl leading-relaxed">
//           At B N Narwade & Co., our 30+ years of experience enables us to deliver
//           comprehensive tax and financial solutions. Focus on your business
//           while we handle your compliance with precision.
//         </p>

//         <div className="flex gap-4 flex-wrap">
//           <Link
//             to="/contact"
//             className="inline-block bg-white hover:bg-gray-100 text-blue-900 font-semibold px-8 py-3 rounded-lg transition"
//           >
//             Get Consultation
//           </Link>

//           <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 rounded-lg transition">
//             Learn More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







// new updted code for hero component





// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// // Arrow Icon Component
// const ArrowRight = ({ className }) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     width="24" 
//     height="24" 
//     viewBox="0 0 24 24" 
//     fill="none" 
//     stroke="currentColor" 
//     strokeWidth="2" 
//     strokeLinecap="round" 
//     strokeLinejoin="round" 
//     className={className}
//   >
//     <path d="M5 12h14" />
//     <path d="m12 5 7 7-7 7" />
//   </svg>
// );

// export default function Hero() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const x = (e.clientX / window.innerWidth - 0.5) * 20;
//       const y = (e.clientY / window.innerHeight - 0.5) * 20;
//       setMousePosition({ x, y });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Generate icosahedron faces
//   const generateIcosahedron = () => {
//     const faces = [];
//     const phi = (1 + Math.sqrt(5)) / 2;
    
//     const vertices = [
//       [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
//       [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
//       [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
//     ];

//     const faceIndices = [
//       [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
//       [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
//       [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
//       [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
//     ];

//     const scale = 160;

//     faceIndices.forEach((face, i) => {
//       const v1 = vertices[face[0]];
//       const v2 = vertices[face[1]];
//       const v3 = vertices[face[2]];

//       const normal = [
//         (v1[0] + v2[0] + v3[0]) / 3,
//         (v1[1] + v2[1] + v3[1]) / 3,
//         (v1[2] + v2[2] + v3[2]) / 3
//       ];
      
//       const normalizedLength = Math.sqrt(normal[0]**2 + normal[1]**2 + normal[2]**2);
//       const normalizedNormal = normal.map(n => n / normalizedLength);
      
//       const lightDir = [0.3, 0.5, 0.8];
//       const dot = normalizedNormal[0] * lightDir[0] + 
//                   normalizedNormal[1] * lightDir[1] + 
//                   normalizedNormal[2] * lightDir[2];
//       const brightness = Math.max(0.15, (dot + 1) / 2 * 0.3);

//       const yaw = Math.atan2(normal[0], normal[2]) * (180 / Math.PI);
//       const pitch = Math.asin(normal[1] / Math.sqrt(normal[0]**2 + normal[1]**2 + normal[2]**2)) * (180 / Math.PI);
//       const distance = Math.sqrt(v1[0]**2 + v1[1]**2 + v1[2]**2) * scale * 0.85;

//       faces.push({
//         key: i,
//         transform: `rotateY(${yaw}deg) rotateX(${-pitch}deg) translateZ(${distance}px)`,
//         brightness: brightness,
//         opacity: 0.8 + brightness * 0.2
//       });
//     });

//     return faces;
//   };

//   const icosahedronFaces = generateIcosahedron();

//   return (
//     <div className="min-h-screen w-full bg-[#151618] text-white font-sans overflow-hidden selection:bg-green-500 selection:text-white relative">
//       {/* Background Ambient Gradients */}
//       <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-green-900/10 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

//       {/* Main Content Container */}
//       <main className="relative z-10 container mx-auto px-6 h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8">
        
//         {/* Left Column: Text Content - EXACTLY AS ORIGINAL */}
//         <div className="flex-1 flex flex-col items-start space-y-8 max-w-2xl animate-fade-in-up">
//           <p className="text-green-400/80 text-lg md:text-xl lg:text-2xl font-semibold tracking-wider uppercase">
//   Welcome to B N Narwade & Co.
// </p>

//           <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
//             Your Trusted Partner in <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
//               Taxation & Compliance
//             </span>
//           </h1>
          
//           <p className="text-lg text-gray-400 max-w-md leading-relaxed">
//             With 30+ years of experience, we deliver comprehensive tax and financial solutions. 
//             Focus on your business while we handle your compliance with precision.
//           </p>

//           <div className="flex flex-wrap gap-4 pt-4">
//             <Link
//               to="/contact"
//               className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#1f2023] hover:bg-[#2a2b2e] border border-gray-700 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <span className="relative font-medium text-white">
//                 Get Free Consultation
//               </span>
//               <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>

//             <Link
//   to="/about-firm"
//   className="px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-xl font-medium transition-colors duration-300 shadow-lg shadow-white/5"
// >
//   Learn More
// </Link>
//           </div>
//         </div>

//         {/* Right Column: 3D Icosahedron - Shifted LEFT slightly */}
//         <div className="flex-1 w-full h-[500px] lg:h-[700px] flex items-center justify-center lg:justify-center perspective-[1200px] lg:translate-x-20 xl:translate-x-32">
          
//           <div 
//             className="relative w-[380px] h-[380px] lg:w-[450px] lg:h-[450px] preserve-3d transition-transform duration-100 ease-out"
//             style={{
//               transform: `rotateX(${-15 + mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
//             }}
//           >
//             <div className="polyhedron-wrapper-large w-full h-full preserve-3d animate-spin-slow">
              
//               {/* Green Glow Core */}
//               <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 bg-green-500/70 rounded-full blur-[90px] animate-pulse-glow" />
//               <div className="absolute top-1/2 left-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2 bg-emerald-400/50 rounded-full blur-[45px]" />

//               {/* SMALLER Inner Text Ring - Reduced from 360/420 to 260/300 */}
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] lg:w-[300px] lg:h-[300px] preserve-3d animate-spin-reverse">
//                 <svg viewBox="0 0 320 320" className="w-full h-full">
//                   <defs>
//                     <path id="circlePath" d="M 160, 160 m -110, 0 a 110,110 0 1,1 220,0 a 110,110 0 1,1 -220,0" fill="none" />
//                   </defs>
//                   {/* Smaller text size too */}
//                   <text className="fill-green-400/80 text-[16px] lg:text-[18px] font-bold tracking-[0.25em] uppercase">
//                     <textPath href="#circlePath">
//                       • TAX EXPERTS • COMPLIANCE • CONSULTING • TRUSTED •
//                     </textPath>
//                   </text>
//                 </svg>
//               </div>

//               {/* SMALLER Outer Text Ring - Reduced from 500/580 to 340/400 */}
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] lg:w-[500px] lg:h-[500px] preserve-3d animate-spin-slow-reverse">
//                 <svg viewBox="0 0 440 440" className="w-full h-full">
//                   <defs>
//                     <path id="circlePath2" d="M 220, 220 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" fill="none" />
//                   </defs>
//                   {/* Smaller text size too */}
//                   <text className="fill-green-300 text-[14px] lg:text-[16px] font-bold tracking-[0.25em] uppercase">
//                     <textPath href="#circlePath2">
//                       • PAN • TAN • UDYAM REGISTRATION • IEC CERTIFICATE • PROFESSIONAL TAX • INCOME TAX •
//                     </textPath>
//                   </text>
//                 </svg>
//               </div>

//               {/* Icosahedron Faces - Same size */}
//               {icosahedronFaces.map((face) => (
//                 <div
//                   key={face.key}
//                   className="absolute left-1/2 top-1/2 w-0 h-0 preserve-3d"
//                   style={{
//                     transform: face.transform
//                   }}
//                 >
//                   <div 
//                     className="absolute w-[100px] h-[116px] -translate-x-1/2 -translate-y-1/2"
//                     style={{
//                       background: `linear-gradient(135deg, 
//                         rgba(${55 + face.brightness * 70}, ${60 + face.brightness * 60}, ${65 + face.brightness * 50}, ${face.opacity}) 0%, 
//                         rgba(${35 + face.brightness * 40}, ${38 + face.brightness * 35}, ${42 + face.brightness * 30}, ${face.opacity}) 100%)`,
//                       clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
//                       boxShadow: 'inset 0 0 40px rgba(34, 197, 94, 0.08)',
//                       border: '1px solid rgba(100, 110, 120, 0.3)'
//                     }}
//                   />
//                 </div>
//               ))}

//               {/* Wireframe Overlay */}
//               <div className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: '25s' }}>
//                 {icosahedronFaces.map((face, i) => (
//                   <div
//                     key={`wire-${i}`}
//                     className="absolute left-1/2 top-1/2 w-0 h-0"
//                     style={{
//                       transform: face.transform
//                     }}
//                   >
//                     <div 
//                       className="absolute w-[100px] h-[116px] -translate-x-1/2 -translate-y-1/2"
//                       style={{
//                         clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
//                         border: '1px solid rgba(120, 130, 140, 0.15)'
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>

//             </div>
//           </div>
//         </div>
//       </main>

     

//       {/* Styles */}
//       <style>{`
//         .preserve-3d {
//           transform-style: preserve-3d;
//         }
        
//         .polyhedron-wrapper-large {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           transform-style: preserve-3d;
//           animation: rotateCube 25s infinite linear;
//         }

//         @keyframes rotateCube {
//           0% { transform: rotateX(-10deg) rotateY(0deg) rotateZ(5deg); }
//           100% { transform: rotateX(-10deg) rotateY(360deg) rotateZ(5deg); }
//         }

//         @keyframes pulse-glow {
//           0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.95); }
//           50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.15); }
//         }

//         @keyframes spinReverse {
//           0% { transform: translate(-50%, -50%) rotateZ(0deg); }
//           100% { transform: translate(-50%, -50%) rotateZ(-360deg); }
//         }

//         @keyframes spinSlowReverse {
//           0% { transform: translate(-50%, -50%) rotateZ(0deg); }
//           100% { transform: translate(-50%, -50%) rotateZ(360deg); }
//         }

//         .animate-spin-slow {
//           animation: rotateCube 25s infinite linear;
//         }

//         .animate-pulse-glow {
//           animation: pulse-glow 4s infinite ease-in-out;
//         }

//         .animate-spin-reverse {
//           animation: spinReverse 18s infinite linear;
//         }

//         .animate-spin-slow-reverse {
//           animation: spinSlowReverse 30s infinite linear;
//         }

//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out forwards;
//           opacity: 0;
//           transform: translateY(20px);
//         }

//         @keyframes fadeInUp {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }












// resoponsive 



import { useState, useEffect, useId } from "react";
import { Link } from "react-router-dom";

// Arrow Icon Component
const ArrowRight = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const innerPathId = useId();
  const outerPathId = useId();

  useEffect(() => {
    const checkTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(checkTouch);

    if (checkTouch) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const generateIcosahedron = (scale = 160) => {
    const faces = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    
    const vertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    const faceIndices = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];

    faceIndices.forEach((face, i) => {
      const v1 = vertices[face[0]];
      const v2 = vertices[face[1]];
      const v3 = vertices[face[2]];

      const normal = [
        (v1[0] + v2[0] + v3[0]) / 3,
        (v1[1] + v2[1] + v3[1]) / 3,
        (v1[2] + v2[2] + v3[2]) / 3
      ];
      
      const normalizedLength = Math.sqrt(normal[0]**2 + normal[1]**2 + normal[2]**2);
      const normalizedNormal = normal.map(n => n / normalizedLength);
      
      const lightDir = [0.3, 0.5, 0.8];
      const dot = normalizedNormal[0] * lightDir[0] + 
                  normalizedNormal[1] * lightDir[1] + 
                  normalizedNormal[2] * lightDir[2];
      const brightness = Math.max(0.15, (dot + 1) / 2 * 0.3);

      const yaw = Math.atan2(normal[0], normal[2]) * (180 / Math.PI);
      const pitch = Math.asin(normal[1] / Math.sqrt(normal[0]**2 + normal[1]**2 + normal[2]**2)) * (180 / Math.PI);
      const distance = Math.sqrt(v1[0]**2 + v1[1]**2 + v1[2]**2) * scale * 0.85;

      faces.push({
        key: i,
        transform: `rotateY(${yaw}deg) rotateX(${-pitch}deg) translateZ(${distance}px)`,
        brightness: brightness,
        opacity: 0.8 + brightness * 0.2
      });
    });

    return faces;
  };

  const mobileFaces = generateIcosahedron(90);
  const desktopFaces = generateIcosahedron(160);

  return (
    <div className="min-h-screen w-full bg-[#151618] text-white font-sans overflow-hidden selection:bg-green-500 selection:text-white relative">
      {/* Background Ambient Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-green-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <main className="relative z-10 container mx-auto px-6 h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8">
        
        {/* Left Column: Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start space-y-6 lg:space-y-8 max-w-2xl text-center lg:text-left animate-fade-in-up z-20">
          <p className="text-green-400/80 text-lg md:text-xl lg:text-2xl font-semibold tracking-wider uppercase">
            Welcome to B N Narwade & Co.
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Your Trusted Partner in <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Taxation & Compliance
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-md leading-relaxed">
            With 30+ years of experience, we deliver comprehensive tax and financial solutions. 
            Focus on your business while we handle your compliance with precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1f2023] hover:bg-[#2a2b2e] border border-gray-700 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative font-medium text-white">
                Get Free Consultation
              </span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/about-firm"
              className="px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-xl font-medium transition-colors duration-300 shadow-lg shadow-white/5 text-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Icosahedron - MOBILE VERSION */}
        <div className="lg:hidden flex-1 w-full h-[320px] flex items-center justify-center perspective-[1200px] z-10">
          <div 
            className="relative w-[280px] h-[280px] preserve-3d"
            style={{
              transform: `scale(0.75) rotateX(-15deg) rotateY(${mousePosition.x * 0.5}deg)`
            }}
          >
            <IcosahedronContent 
              faces={mobileFaces}
              innerPathId={`inner-${innerPathId}`}
              outerPathId={`outer-${outerPathId}`}
              sizeClass="w-[100px] h-[116px]"
              glowSize="w-48 h-48"
              innerGlow="w-28 h-28"
              innerRing="w-[260px] h-[260px]"
              outerRing="w-[440px] h-[440px]"
              textSizeInner="text-[16px]"
              textSizeOuter="text-[14px]"
            />
          </div>
        </div>

        {/* Right Column: 3D Icosahedron - DESKTOP VERSION */}
        <div className="hidden lg:flex flex-1 w-full h-[500px] lg:h-[700px] items-center justify-center lg:justify-center perspective-[1200px] lg:translate-x-20 xl:translate-x-32 z-10">
          <div 
            className="relative w-[380px] h-[380px] lg:w-[450px] lg:h-[450px] preserve-3d transition-transform duration-100 ease-out"
            style={{
              transform: isTouchDevice 
                ? 'rotateX(-15deg) rotateY(0deg)' 
                : `rotateX(${-15 + mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
            }}
          >
            <IcosahedronContent 
              faces={desktopFaces}
              innerPathId={`inner-${innerPathId}`}
              outerPathId={`outer-${outerPathId}`}
              sizeClass="w-[100px] h-[116px]"
              glowSize="w-48 h-48"
              innerGlow="w-28 h-28"
              innerRing="w-[260px] h-[260px] lg:w-[300px] lg:h-[300px]"
              outerRing="w-[440px] h-[440px] lg:w-[500px] lg:h-[500px]"
              textSizeInner="text-[16px] lg:text-[18px]"
              textSizeOuter="text-[14px] lg:text-[16px]"
            />
          </div>
        </div>
      </main>

      {/* Styles */}
      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .polyhedron-wrapper-large {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: rotateCube 25s infinite linear;
        }

        @keyframes rotateCube {
          0% { transform: rotateX(-10deg) rotateY(0deg) rotateZ(5deg); }
          100% { transform: rotateX(-10deg) rotateY(360deg) rotateZ(5deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.95); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.15); }
        }

        @keyframes spinReverse {
          0% { transform: translate(-50%, -50%) rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) rotateZ(-360deg); }
        }

        @keyframes spinSlowReverse {
          0% { transform: translate(-50%, -50%) rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) rotateZ(360deg); }
        }

        .animate-spin-slow {
          animation: rotateCube 25s infinite linear;
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s infinite ease-in-out;
        }

        .animate-spin-reverse {
          animation: spinReverse 18s infinite linear;
        }

        .animate-spin-slow-reverse {
          animation: spinSlowReverse 30s infinite linear;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile adjustments */
        @media (max-width: 1024px) {
          main {
            height: auto !important;
            min-height: 100vh;
            padding-top: 6rem;
            padding-bottom: 3rem;
          }
          
          .polyhedron-wrapper-large {
            animation-duration: 35s;
          }
          .animate-spin-slow {
            animation-duration: 35s;
          }
          .animate-spin-reverse {
            animation-duration: 25s;
          }
          .animate-spin-slow-reverse {
            animation-duration: 45s;
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-spin-slow,
          .animate-spin-reverse,
          .animate-spin-slow-reverse,
          .animate-pulse-glow,
          .animate-fade-in-up {
            animation: none;
          }
          .animate-fade-in-up {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// Reusable Icosahedron Content Component
function IcosahedronContent({ 
  faces, 
  innerPathId,
  outerPathId,
  sizeClass, 
  glowSize, 
  innerGlow, 
  innerRing, 
  outerRing, 
  textSizeInner, 
  textSizeOuter 
}) {
  return (
    <div className="polyhedron-wrapper-large w-full h-full preserve-3d animate-spin-slow">
      
      {/* Green Glow Core */}
      <div className={`absolute top-1/2 left-1/2 ${glowSize} -translate-x-1/2 -translate-y-1/2 bg-green-500/70 rounded-full blur-[90px] animate-pulse-glow`} />
      <div className={`absolute top-1/2 left-1/2 ${innerGlow} -translate-x-1/2 -translate-y-1/2 bg-emerald-400/50 rounded-full blur-[45px]`} />

      {/* Inner Text Ring */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${innerRing} preserve-3d animate-spin-reverse`}>
        <svg viewBox="0 0 320 320" className="w-full h-full">
          <defs>
            <path id={innerPathId} d="M 160, 160 m -110, 0 a 110,110 0 1,1 220,0 a 110,110 0 1,1 -220,0" fill="none" />
          </defs>
          <text className={`fill-green-400/80 ${textSizeInner} font-bold tracking-[0.25em] uppercase`}>
            <textPath href={`#${innerPathId}`}>
              • TAX EXPERTS • COMPLIANCE • CONSULTING • TRUSTED •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Outer Text Ring */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${outerRing} preserve-3d animate-spin-slow-reverse`}>
        <svg viewBox="0 0 440 440" className="w-full h-full">
          <defs>
            <path id={outerPathId} d="M 220, 220 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" fill="none" />
          </defs>
          <text className={`fill-green-300 ${textSizeOuter} font-bold tracking-[0.25em] uppercase`}>
            <textPath href={`#${outerPathId}`}>
              • PAN • TAN • UDYAM REGISTRATION • GST • PROFESSIONAL TAX • INCOME TAX •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Icosahedron Faces */}
      {faces.map((face) => (
        <div
          key={face.key}
          className="absolute left-1/2 top-1/2 w-0 h-0 preserve-3d"
          style={{ transform: face.transform }}
        >
          <div 
            className={`absolute ${sizeClass} -translate-x-1/2 -translate-y-1/2`}
            style={{
              background: `linear-gradient(135deg, 
                rgba(${55 + face.brightness * 70}, ${60 + face.brightness * 60}, ${65 + face.brightness * 50}, ${face.opacity}) 0%, 
                rgba(${35 + face.brightness * 40}, ${38 + face.brightness * 35}, ${42 + face.brightness * 30}, ${face.opacity}) 100%)`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              boxShadow: 'inset 0 0 40px rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(100, 110, 120, 0.3)'
            }}
          />
        </div>
      ))}

      {/* Wireframe Overlay */}
      <div className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: '25s' }}>
        {faces.map((face, i) => (
          <div
            key={`wire-${i}`}
            className="absolute left-1/2 top-1/2 w-0 h-0"
            style={{ transform: face.transform }}
          >
            <div 
              className={`absolute ${sizeClass} -translate-x-1/2 -translate-y-1/2`}
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                border: '1px solid rgba(120, 130, 140, 0.15)'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}