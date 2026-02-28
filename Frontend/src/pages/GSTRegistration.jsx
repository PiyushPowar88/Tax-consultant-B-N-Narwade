// import React, { useState } from "react";
// import axios from "axios";

// const GSTRegistration = () => {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     mobile: "",
//     pan_number: "",
//     aadhaar_number: ""
//   });

//   const [files, setFiles] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [dragActive, setDragActive] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target;
//     if (selectedFiles[0]) {
//       setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
//     }
//   };

//   const handleDrag = (e, fieldName) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(prev => ({ ...prev, [fieldName]: true }));
//     } else if (e.type === "dragleave") {
//       setDragActive(prev => ({ ...prev, [fieldName]: false }));
//     }
//   };

//   const handleDrop = (e, fieldName) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(prev => ({ ...prev, [fieldName]: false }));

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setFiles(prev => ({ ...prev, [fieldName]: e.dataTransfer.files[0] }));
//     }
//   };

//   const removeFile = (fieldName) => {
//     setFiles(prev => {
//       const newFiles = { ...prev };
//       delete newFiles[fieldName];
//       return newFiles;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => data.append(key, formData[key]));
//     Object.keys(files).forEach((key) => data.append(key, files[key]));

//     try {
//       await axios.post(
//         "http://localhost:5000/api/registration/gst",
//         data,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       alert("GST Registration Submitted Successfully!");
//       setFormData({
//         full_name: "",
//         email: "",
//         mobile: "",
//         pan_number: "",
//         aadhaar_number: ""
//       });
//       setFiles({});
//     } catch (error) {
//       alert("Submission failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const inputClasses =
//     "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white";

//   const labelClasses =
//     "block text-sm font-semibold text-gray-700 mb-2";

//   const FileUploadField = ({ name, label, accept = "image/*,.pdf" }) => (
//     <div className="mb-4">
//       <label className={labelClasses}>{label}</label>
//       <div
//         className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
//           dragActive[name]
//             ? "border-blue-500 bg-blue-50"
//             : files[name]
//               ? "border-green-500 bg-green-50"
//               : "border-gray-300 hover:border-gray-400 bg-gray-50"
//         }`}
//         onDragEnter={(e) => handleDrag(e, name)}
//         onDragLeave={(e) => handleDrag(e, name)}
//         onDragOver={(e) => handleDrag(e, name)}
//         onDrop={(e) => handleDrop(e, name)}
//       >
//         <input
//           type="file"
//           name={name}
//           onChange={handleFileChange}
//           accept={accept}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//         />
//         <div className="text-center">
//           {files[name] ? (
//             <div className="flex items-center justify-center space-x-2">
//               <span className="text-sm text-gray-700 font-medium truncate max-w-[200px]">
//                 {files[name].name}
//               </span>
//               <button
//                 type="button"
//                 onClick={() => removeFile(name)}
//                 className="text-red-500 hover:text-red-700 p-1"
//               >
//                 ✕
//               </button>
//             </div>
//           ) : (
//             <>
//               <p className="text-xs text-gray-500">
//                 <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
//               </p>
//               <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG up to 10MB</p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">

//         <div className="text-center mb-8">
//           <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
//             GST Registration
//           </h1>
//           <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto">
//             Complete your GST registration with our secure and streamlined process. We'll handle the paperwork.
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//           <div className="p-6 sm:p-8 lg:p-10">
//             <form onSubmit={handleSubmit} className="space-y-6">

//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
//                   Personal Information
//                 </h3>

//                 <div>
//                   <label className={labelClasses}>Full Name</label>
//                   <input
//                     type="text"
//                     name="full_name"
//                     placeholder="Enter your full name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     className={inputClasses}
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClasses}>Email Address</label>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="your.email@example.com"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className={inputClasses}
//                     />
//                   </div>

//                   <div>
//                     <label className={labelClasses}>Mobile Number</label>
//                     <input
//                       type="tel"
//                       name="mobile"
//                       placeholder="Your mobile number"
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       className={inputClasses}
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClasses}>PAN Number</label>
//                     <input
//                       type="text"
//                       name="pan_number"
//                       placeholder="ABCDE1234F"
//                       value={formData.pan_number}
//                       onChange={handleChange}
//                       className={inputClasses}
//                     />
//                   </div>

//                   <div>
//                     <label className={labelClasses}>Aadhaar Number</label>
//                     <input
//                       type="text"
//                       name="aadhaar_number"
//                       placeholder="1234 5678 9012"
//                       value={formData.aadhaar_number}
//                       onChange={handleChange}
//                       className={inputClasses}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Document Upload Section unchanged except required removed */}
//               <div className="space-y-4 pt-4">
//                 <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
//                   Document Upload
//                 </h3>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <FileUploadField name="pan_photo" label="PAN Card Photo" />
//                   <FileUploadField name="aadhaar_photo" label="Aadhaar Card Photo" />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <FileUploadField name="proprietor_photo" label="Proprietor Photograph" />
//                   <FileUploadField name="shop_photo" label="Shop Photo" />
//                 </div>

//                 <FileUploadField name="business_address_proof" label="Business Address Proof" />

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <FileUploadField name="shop_act_license" label="Shop Act License" />
//                   <FileUploadField name="udyam_certificate" label="Udyam Registration Certificate" />
//                 </div>

//                 <FileUploadField name="bank_proof" label="Bank Proof (Cancelled Cheque / Passbook)" />
//               </div>

//               <div className="pt-6">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg shadow-lg ${
//                     isSubmitting
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
//                   }`}
//                 >
//                   {isSubmitting ? "Processing..." : "Submit GST Information"}
//                 </button>
//               </div>

//             </form>

            
//           </div>
//         </div>

//   {/* Trust Badges */}
//         <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400 text-xs">
//           <div className="flex items-center space-x-2">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             <span>256-bit SSL Secured</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//             </svg>
//             <span>Government Authorized</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span>24/7 Support</span>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default GSTRegistration;





import React, { useState } from "react";
import axios from "axios";

const GSTRegistration = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    pan_number: "",
    aadhaar_number: ""
  });

  const [files, setFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles[0]) {
      setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleDrag = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => ({ ...prev, [fieldName]: true }));
    } else if (e.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [fieldName]: false }));
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(prev => ({ ...prev, [fieldName]: e.dataTransfer.files[0] }));
    }
  };

  const removeFile = (fieldName) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fieldName];
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    Object.keys(files).forEach((key) => data.append(key, files[key]));

    try {
      await axios.post(
        "http://localhost:5000/api/registration/gst",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("GST Registration Submitted Successfully!");
      setFormData({ full_name: "", email: "", mobile: "", pan_number: "", aadhaar_number: "" });
      setFiles({});
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white";

  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  const FileUploadField = ({ name, label, accept = "image/*,.pdf" }) => (
    <div className="mb-4">
      <label className={labelClasses}>{label}</label>
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
          dragActive[name]
            ? "border-blue-500 bg-blue-50"
            : files[name]
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
        }`}
        onDragEnter={(e) => handleDrag(e, name)}
        onDragLeave={(e) => handleDrag(e, name)}
        onDragOver={(e) => handleDrag(e, name)}
        onDrop={(e) => handleDrop(e, name)}
      >
        <input
          type="file" name={name} onChange={handleFileChange} accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center">
          {files[name] ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-700 font-medium truncate max-w-[200px]">{files[name].name}</span>
              <button type="button" onClick={() => removeFile(name)} className="text-red-500 hover:text-red-700 p-1">✕</button>
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-500">
                <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG up to 10MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">GST Registration</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto">
            Complete your GST registration with our secure and streamlined process. We'll handle the paperwork.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Personal Information</h3>

                <div>
                  <label className={labelClasses}>Full Name</label>
                  <input type="text" name="full_name" placeholder="Enter your full name"
                    value={formData.full_name} onChange={handleChange} className={inputClasses} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Email Address</label>
                    <input type="email" name="email" placeholder="your.email@example.com"
                      value={formData.email} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Mobile Number</label>
                    <input type="tel" name="mobile" placeholder="Your mobile number"
                      value={formData.mobile} onChange={handleChange} className={inputClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>PAN Number</label>
                    <input type="text" name="pan_number" placeholder="ABCDE1234F"
                      value={formData.pan_number} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Aadhaar Number</label>
                    <input type="text" name="aadhaar_number" placeholder="1234 5678 9012"
                      value={formData.aadhaar_number} onChange={handleChange} className={inputClasses} />
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Document Upload</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileUploadField name="pan_photo"       label="PAN Card Photo" />
                  <FileUploadField name="aadhaar_photo"   label="Aadhaar Card Photo" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileUploadField name="proprietor_photo" label="Proprietor Photograph" />
                  <FileUploadField name="shop_photo"       label="Shop Photo" />
                </div>

                <FileUploadField name="business_address_proof" label="Business Address Proof" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileUploadField name="shop_act_license"  label="Shop Act License" />
                  <FileUploadField name="udyam_certificate" label="Udyam Registration Certificate" />
                </div>

                <FileUploadField name="bank_proof" label="Bank Proof (Cancelled Cheque / Passbook)" />

                {/* 🆕 NEW Signature field */}
                <FileUploadField name="signature" label="Signature" />
              </div>

              <div className="pt-6">
                <button
                  type="submit" disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg shadow-lg ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  }`}
                >
                  {isSubmitting ? "Processing..." : "Submit GST Information"}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400 text-xs">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>256-bit SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Government Authorized</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>24/7 Support</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GSTRegistration;