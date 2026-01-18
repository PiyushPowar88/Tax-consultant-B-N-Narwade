import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState("services");

  const [form, setForm] = useState({
    title: "",
    short_description: "",
    full_description: ""
  });

  const [serviceImageFile, setServiceImageFile] = useState(null);
  const [serviceImagePreview, setServiceImagePreview] = useState(null);

  const [imageForm, setImageForm] = useState({
    image_type: "owner",
    file: null,
    preview: null
  });

  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("token");

  // ===== Load Services =====
  const loadServices = () => {
    axios.get("http://localhost:5000/api/admin/services", {
      headers: { Authorization: token }
    })
    .then(res => setServices(res.data))
    .catch(() => alert("Failed to load services"));
  };

  // ===== Load Images =====
  const loadImages = () => {
    axios.get("http://localhost:5000/api/images/admin/all", {
      headers: { Authorization: token }
    })
    .then(res => setImages(res.data))
    .catch(() => {});
  };

  useEffect(() => {
    if (token) {
      loadServices();
      loadImages();
    }
  }, [token]);

  // ===== Service Image Select =====
  const handleServiceImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceImageFile(file);
        setServiceImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ===== Add Service =====
  const addService = () => {
    axios.post("http://localhost:5000/api/admin/services", form, {
      headers: { Authorization: token }
    })
    .then((res) => {
      const serviceId = res.data.id;

      if (serviceImageFile) {
        const formData = new FormData();
        formData.append("image", serviceImageFile);
        formData.append("service_id", serviceId);

        axios.post("http://localhost:5000/api/admin/services/upload-image", formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
          }
        }).then(() => {
          alert("Service & Image Added");
          resetServiceForm();
        }).catch(() => {
          alert("Service added but image failed");
          resetServiceForm();
        });
      } else {
        alert("Service Added");
        resetServiceForm();
      }
    })
    .catch(() => alert("Failed to add service"));
  };

  const resetServiceForm = () => {
    setForm({ title:"", short_description:"", full_description:"" });
    setServiceImageFile(null);
    setServiceImagePreview(null);
    loadServices();
  };

  // ===== Delete Service =====
  const deleteService = (id) => {
    axios.delete(`http://localhost:5000/api/admin/services/${id}`, {
      headers: { Authorization: token }
    }).then(() => loadServices());
  };

  // ===== Image Select =====
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageForm({ ...imageForm, file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ===== Upload Image =====
  const uploadImage = () => {
    if (!imageForm.file) return alert("Select Image");

    setUploading(true);
    const formData = new FormData();
    formData.append("image", imageForm.file);
    formData.append("image_type", imageForm.image_type);
    formData.append("image_name", imageForm.file.name);

    axios.post("http://localhost:5000/api/images/upload", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data"
      }
    }).then(() => {
      alert("Image Uploaded");
      setImageForm({ image_type: "owner", file: null, preview: null });
      document.getElementById("imageInput").value = "";
      loadImages();
    }).catch(() => alert("Upload failed"))
      .finally(() => setUploading(false));
  };

  // ===== Delete Image =====
  const deleteImage = (id) => {
    if (window.confirm("Delete Image?")) {
      axios.delete(`http://localhost:5000/api/images/${id}`, {
        headers: { Authorization: token }
      }).then(() => loadImages());
    }
  };

  // ===== UI =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 border-b-4 border-teal-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-teal-100 mt-2">Manage services & website images</p>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex gap-6 border-b-2 border-gray-200">
          <button onClick={()=>setActiveTab("services")}
            className={`px-6 py-3 font-semibold border-b-4 ${
              activeTab==="services" ? "border-teal-500 text-teal-600" : "border-transparent text-gray-500"
            }`}>
            📋 Services
          </button>

          <button onClick={()=>setActiveTab("images")}
            className={`px-6 py-3 font-semibold border-b-4 ${
              activeTab==="images" ? "border-teal-500 text-teal-600" : "border-transparent text-gray-500"
            }`}>
            🖼️ Images
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ===== SERVICES TAB ===== */}
        {activeTab === "services" && (
          <>
            <div className="bg-white rounded-xl shadow p-8 mb-10 border">
              <h2 className="text-xl font-bold mb-4">Add New Service</h2>

              <input className="input w-full mb-3 border p-3"
                placeholder="Service Title"
                value={form.title}
                onChange={e=>setForm({...form,title:e.target.value})}/>

              <input className="input w-full mb-3 border p-3"
                placeholder="Short Description"
                value={form.short_description}
                onChange={e=>setForm({...form,short_description:e.target.value})}/>

              <textarea className="input w-full mb-3 border p-3"
                placeholder="Full Description"
                value={form.full_description}
                onChange={e=>setForm({...form,full_description:e.target.value})}/>

              <input type="file" onChange={handleServiceImageChange}/>
              {serviceImagePreview && (
                <img src={serviceImagePreview} className="h-40 mt-3 rounded object-cover"/>
              )}

              <button onClick={addService}
                className="bg-teal-500 text-white w-full py-3 mt-4 rounded">
                Add Service
              </button>
            </div>

            <div className="bg-white rounded-xl shadow border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(s=>(
                    <tr key={s.id} className="border-t">
                      <td className="p-3">{s.id}</td>
                      <td className="p-3">{s.title}</td>
                      <td className="p-3">{s.short_description}</td>
                      <td className="p-3">
                        <button onClick={()=>deleteService(s.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ===== IMAGES TAB (PROFESSIONAL UI) ===== */}
        {activeTab === "images" && (
          <>
            <div className="bg-white rounded-xl shadow border p-8 mb-10">
              <div className="grid md:grid-cols-2 gap-8">

                {/* FORM */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Upload Image</h2>

                  <label className="text-sm font-semibold">Image Type</label>
                  <select
                    value={imageForm.image_type}
                    onChange={(e)=>setImageForm({...imageForm,image_type:e.target.value})}
                    className="w-full border p-3 rounded mb-4">
                    <option value="logo">Company Logo</option>
                    <option value="owner">Company Owner</option>
                    <option value="clients_logo">Clients Logo</option>
                    <option value="hero">Hero Section</option>
                    <option value="service">Service Icon</option>
                    <option value="team">Team Member</option>
                    <option value="other">Other</option>
                  </select>

                  <input id="imageInput" type="file" onChange={handleImageChange}/>

                  <button onClick={uploadImage}
                    disabled={uploading}
                    className="bg-teal-500 text-white w-full py-3 mt-4 rounded">
                    {uploading ? "Uploading..." : "Upload Image"}
                  </button>
                </div>

                {/* PREVIEW */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Preview</h2>
                  <div className="border-2 border-dashed rounded h-64 flex items-center justify-center bg-gray-50">
                    {imageForm.preview ?
                      <img src={imageForm.preview} className="h-full object-cover"/> :
                      <p className="text-gray-400">No image selected</p>}
                  </div>
                </div>

              </div>
            </div>

            {/* IMAGE TABLE */}
            <div className="bg-white rounded-xl shadow border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">File</th>
                    <th className="p-3">Preview</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map(img=>(
                    <tr key={img.id} className="border-t">
                      <td className="p-3">{img.id}</td>
                      <td className="p-3">{img.image_type}</td>
                      <td className="p-3">{img.image_name}</td>
                      <td className="p-3">
                        <a href={`http://localhost:5000/api/images/${img.id}`}
                           target="_blank"
                           className="text-blue-600 font-semibold">
                          View
                        </a>
                      </td>
                      <td className="p-3">
                        <button onClick={()=>deleteImage(img.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
