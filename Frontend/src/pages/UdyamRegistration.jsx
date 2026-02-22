import React, { useState } from "react";
import axios from "axios";

const UdyamRegistration = () => {
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
        "http://localhost:5000/api/registration/udyam",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Udyam Registration Submitted Successfully!");
      setFormData({
        full_name: "",
        email: "",
        mobile: "",
        pan_number: "",
        aadhaar_number: ""
      });
      setFiles({});
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-200 text-gray-700 bg-white text-base";

  const labelClasses =
    "block text-sm font-semibold text-gray-700 mb-2";

  const sectionClasses =
    "bg-white rounded-xl border border-gray-200 p-6 lg:p-8 shadow-sm";

  const FileUploadField = ({ name, label, accept = "image/*,.pdf", optional = false }) => (
    <div>
      <label className={labelClasses}>
        {label}
        {optional && (
          <span className="text-gray-400 text-xs ml-2 font-normal">
            (Optional)
          </span>
        )}
      </label>
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
          dragActive[name]
            ? "border-amber-500 bg-amber-50"
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
              <button
                type="button"
                onClick={() => removeFile(name)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                ✕
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-500">
                <span className="font-medium text-amber-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, PNG, JPG up to 10MB
              </p>
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

            <div className={`${sectionClasses} xl:col-span-2`}>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelClasses}>Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>PAN Number</label>
                  <input
                    type="text"
                    name="pan_number"
                    placeholder="ABCDE1234F"
                    value={formData.pan_number}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadhaar_number"
                    placeholder="1234 5678 9012"
                    value={formData.aadhaar_number}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            <div className={sectionClasses}>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Identity Proof
              </h3>

              <div className="space-y-4">
                <FileUploadField name="aadhaar_photo" label="Aadhaar Card Photo" />
                <FileUploadField name="pan_photo" label="PAN Card Photo" />
                <FileUploadField name="proprietor_photo" label="Proprietor Photograph" />
              </div>
            </div>
          </div>

          <div className={sectionClasses}>
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Business Documents
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <FileUploadField name="business_address_proof" label="Business Address Proof" />
              <FileUploadField name="bank_proof" label="Bank Proof (Cancelled Cheque)" />
              <FileUploadField name="shop_act_license" label="Shop Act License" optional />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-10 py-4 rounded-lg font-semibold text-white text-lg ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              }`}
            >
              {isSubmitting ? "Processing..." : "Submit Udyam Registration"}
            </button>
          </div>




        </form>


         <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="text-amber-400 font-bold text-2xl mb-1">100%</div>
            <div className="text-slate-300 text-sm">Government Compliant</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="text-amber-400 font-bold text-2xl mb-1">24hrs</div>
            <div className="text-slate-300 text-sm">Certificate Delivery</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="text-amber-400 font-bold text-2xl mb-1">Lifetime</div>
            <div className="text-slate-300 text-sm">Registration Validity</div>
          </div>
        </div>

      </div>
    </div>
  );
};




export default UdyamRegistration;