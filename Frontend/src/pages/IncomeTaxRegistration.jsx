// import React, { useState } from "react";
// import axios from "axios";

// /* ✅ Move IncomeField outside to prevent re-mount */
// const IncomeField = ({
//   name,
//   label,
//   formData,
//   handleChange,
//   numberInputClasses,
//   labelClasses
// }) => (
//   <div>
//     <label className={labelClasses}>{label}</label>
//     <div className="relative">
//       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
//         ₹
//       </span>
//       <input
//         type="text"
//         name={name}
//         value={formData[name]}
//         onChange={handleChange}
//         className={`${numberInputClasses} pl-8`}
//       />
//     </div>
//   </div>
// );

// const IncomeTaxRegistration = () => {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     mobile: "",
//     aadhaar_number: "",
//     pan_number: "",
//     salary_income: "",
//     house_property_income: "",
//     family_pension_income: "",
//     agricultural_income: "",
//     capital_gain_112a: "",
//     interest_savings: "",
//     interest_deposits: "",
//     interest_refund: "",
//     interest_enhanced_comp: "",
//     other_interest_income: ""
//   });

//   const [files, setFiles] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [dragActive, setDragActive] = useState({});

//   /* ✅ functional update prevents weird render issues */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
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
//         "http://localhost:5000/api/registration/income-tax",
//         data,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       alert("Income Tax Registration Submitted Successfully!");
//       setFormData({
//         full_name: "",
//         email: "",
//         mobile: "",
//         aadhaar_number: "",
//         pan_number: "",
//         salary_income: "",
//         house_property_income: "",
//         family_pension_income: "",
//         agricultural_income: "",
//         capital_gain_112a: "",
//         interest_savings: "",
//         interest_deposits: "",
//         interest_refund: "",
//         interest_enhanced_comp: "",
//         other_interest_income: ""
//       });
//       setFiles({});
//     } catch (error) {
//       alert("Submission failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const inputClasses =
//     "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 text-gray-700 bg-white text-base";

//   const numberInputClasses =
//     "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 text-gray-700 bg-white text-base text-right font-medium";

//   const labelClasses =
//     "block text-sm font-semibold text-gray-700 mb-2";

//   const sectionClasses =
//     "bg-white rounded-xl border border-gray-200 p-6 lg:p-8 shadow-sm";

//   const FileUploadField = ({ name, label, accept = "image/*,.pdf" }) => (
//     <div>
//       <label className={labelClasses}>{label}</label>
//       <div
//         className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
//           dragActive[name]
//             ? "border-emerald-500 bg-emerald-50"
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
//                 <span className="font-medium text-emerald-600">Click to upload</span> or drag and drop
//               </p>
//               <p className="text-xs text-gray-400 mt-1">
//                 PDF, PNG, JPG up to 10MB
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto w-full">

//         <form onSubmit={handleSubmit} className="space-y-6">

//           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

//             {/* Personal Info */}
//             <div className={`${sectionClasses} xl:col-span-2`}>
//               <h3 className="text-xl font-bold text-gray-800 mb-6">
//                 Personal Information
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                 <div className="md:col-span-2">
//                   <label className={labelClasses}>Full Name</label>
//                   <input
//                     type="text"
//                     name="full_name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     className={inputClasses}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClasses}>Email Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={inputClasses}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClasses}>Mobile Number</label>
//                   <input
//                     type="tel"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     className={inputClasses}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClasses}>PAN Number</label>
//                   <input
//                     type="text"
//                     name="pan_number"
//                     value={formData.pan_number}
//                     onChange={handleChange}
//                     className={inputClasses}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClasses}>Aadhaar Number</label>
//                   <input
//                     type="text"
//                     name="aadhaar_number"
//                     value={formData.aadhaar_number}
//                     onChange={handleChange}
//                     className={inputClasses}
//                   />
//                 </div>

//               </div>
//             </div>

//             {/* Documents */}
//             <div className={sectionClasses}>
//               <h3 className="text-xl font-bold text-gray-800 mb-6">
//                 Documents
//               </h3>
//               <div className="space-y-4">
//                 <FileUploadField name="pan_photo" label="PAN Card Photo" />
//                 <FileUploadField name="aadhaar_photo" label="Aadhaar Card Photo" />
//               </div>
//             </div>

//           </div>

//           {/* Income Section */}
//           <div className={sectionClasses}>
//             <h3 className="text-xl font-bold text-gray-800 mb-6">
//               Income Details
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

//               <IncomeField name="salary_income" label="Salary Income" formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
//               <IncomeField name="house_property_income" label="House Property" formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
//               <IncomeField name="family_pension_income" label="Family Pension" formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
//               <IncomeField name="agricultural_income" label="Agricultural Income" formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
//               <IncomeField name="capital_gain_112a" label="Capital Gain u/s 112A" formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
//               <IncomeField name="interest_savings" label="Interest from Savings" formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
//               <IncomeField name="interest_deposits" label="Interest from Deposits" formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
//               <IncomeField name="interest_refund" label="Interest on IT Refund" formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
//               <IncomeField name="interest_enhanced_comp" label="Enhanced Compensation" formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
//               <IncomeField name="other_interest_income" label="Other Interest Income" formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />

//             </div>

//             {/* Your commented total block remains untouched */}

//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-white text-lg bg-gradient-to-r from-emerald-600 to-emerald-700"
//           >
//             {isSubmitting ? "Processing..." : "Submit Income Tax Information"}
//           </button>

//         </form>

//            {/* Footer Trust Badges */}
//         <div className="mt-8 flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
//           <div className="flex items-center space-x-2">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//             </svg>
//             <span>e-Filing Authorized</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             <span>256-bit Encryption</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//             </svg>
//             <span>ISO 27001 Certified</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IncomeTaxRegistration;





import React, { useState } from "react";
import axios from "axios";

/* ✅ Move IncomeField outside to prevent re-mount */
const IncomeField = ({
  name,
  label,
  formData,
  handleChange,
  numberInputClasses,
  labelClasses
}) => (
  <div>
    <label className={labelClasses}>{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
        ₹
      </span>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`${numberInputClasses} pl-8`}
      />
    </div>
  </div>
);

const IncomeTaxRegistration = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    aadhaar_number: "",
    pan_number: "",
    salary_income: "",
    house_property_income: "",
    family_pension_income: "",
    agricultural_income: "",
    capital_gain_112a: "",
    interest_savings: "",
    interest_deposits: "",
    interest_refund: "",
    interest_enhanced_comp: "",
    other_interest_income: ""
  });

  const [files, setFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        "http://localhost:5000/api/registration/income-tax",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Income Tax Registration Submitted Successfully!");
      setFormData({
        full_name: "", email: "", mobile: "", aadhaar_number: "", pan_number: "",
        salary_income: "", house_property_income: "", family_pension_income: "",
        agricultural_income: "", capital_gain_112a: "", interest_savings: "",
        interest_deposits: "", interest_refund: "", interest_enhanced_comp: "",
        other_interest_income: ""
      });
      setFiles({});
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 text-gray-700 bg-white text-base";

  const numberInputClasses =
    "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 text-gray-700 bg-white text-base text-right font-medium";

  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";
  const sectionClasses = "bg-white rounded-xl border border-gray-200 p-6 lg:p-8 shadow-sm";

  const FileUploadField = ({ name, label, accept = "image/*,.pdf" }) => (
    <div>
      <label className={labelClasses}>{label}</label>
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
          dragActive[name]
            ? "border-emerald-500 bg-emerald-50"
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
          type="file"
          name={name}
          onChange={handleFileChange}
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center">
          {files[name] ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-700 font-medium truncate max-w-[200px]">
                {files[name].name}
              </span>
              <button type="button" onClick={() => removeFile(name)} className="text-red-500 hover:text-red-700 p-1">✕</button>
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-500">
                <span className="font-medium text-emerald-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG up to 10MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Personal Info */}
            <div className={`${sectionClasses} xl:col-span-2`}>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelClasses}>Full Name</label>
                  <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Mobile Number</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>PAN Number</label>
                  <input type="text" name="pan_number" value={formData.pan_number} onChange={handleChange} className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Aadhaar Number</label>
                  <input type="text" name="aadhaar_number" value={formData.aadhaar_number} onChange={handleChange} className={inputClasses} />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className={sectionClasses}>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Documents</h3>
              <div className="space-y-4">
                <FileUploadField name="pan_photo"          label="PAN Card Photo" />
                <FileUploadField name="aadhaar_photo"      label="Aadhaar Card (Front)" />
                <FileUploadField name="aadhaar_back_photo" label="Aadhaar Card (Back)" />  {/* 🆕 NEW */}
              </div>
            </div>

          </div>

          {/* Income Section */}
          <div className={sectionClasses}>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Income Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              <IncomeField name="salary_income"          label="Salary Income"           formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
              <IncomeField name="house_property_income"  label="House Property"           formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
              <IncomeField name="family_pension_income"  label="Family Pension"           formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
              <IncomeField name="agricultural_income"    label="Agricultural Income"      formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
              <IncomeField name="capital_gain_112a"      label="Capital Gain u/s 112A"   formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
              <IncomeField name="interest_savings"       label="Interest from Savings"   formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
              <IncomeField name="interest_deposits"      label="Interest from Deposits"  formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
              <IncomeField name="interest_refund"        label="Interest on IT Refund"   formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
              <IncomeField name="interest_enhanced_comp" label="Enhanced Compensation"   formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
              <IncomeField name="other_interest_income"  label="Other Interest Income"   formData={formData} handleChange={handleChange} numberInputClasses={numberInputClasses} labelClasses={labelClasses} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-white text-lg bg-gradient-to-r from-emerald-600 to-emerald-700"
          >
            {isSubmitting ? "Processing..." : "Submit Income Tax Information"}
          </button>

        </form>

        {/* Footer Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>e-Filing Authorized</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTaxRegistration;