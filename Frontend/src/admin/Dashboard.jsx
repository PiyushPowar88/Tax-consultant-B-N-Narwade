import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const token = localStorage.getItem("token");

  // ================= STATES =================
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const [activeTab, setActiveTab] = useState("services");
  const [unreadCount, setUnreadCount] = useState(0);

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


  // ================= LOAD DATA =================

  const loadServices = () => {
    axios.get("http://localhost:5000/api/admin/services", {
      headers: { Authorization: token }
    }).then(res => setServices(res.data));
  };

  const loadImages = () => {
    axios.get("http://localhost:5000/api/images/admin/all", {
      headers: { Authorization: token }
    }).then(res => setImages(res.data));
  };

  const loadInquiries = () => {
    axios.get("http://localhost:5000/api/inquiry", {
      headers: { Authorization: token }
    }).then(res => {
      setInquiries(res.data);

      const unread = res.data.filter(i => i.is_read === 0);
      setUnreadCount(unread.length);
    });
  };


  useEffect(() => {
    if (token) {
      loadServices();
      loadImages();
      loadInquiries();
    }
  }, [token]);


  // ================= SERVICE =================

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


  const addService = () => {
    axios.post("http://localhost:5000/api/admin/services", form, {
      headers: { Authorization: token }
    }).then(res => {

      const serviceId = res.data.id;

      if (serviceImageFile) {

        const fd = new FormData();
        fd.append("image", serviceImageFile);
        fd.append("service_id", serviceId);

        axios.post("http://localhost:5000/api/admin/services/upload-image", fd, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
          }
        }).then(() => {
          alert("Service Added");
          resetServiceForm();
        });

      } else {
        alert("Service Added");
        resetServiceForm();
      }

    });
  };


  const resetServiceForm = () => {
    setForm({ title: "", short_description: "", full_description: "" });
    setServiceImageFile(null);
    setServiceImagePreview(null);
    loadServices();
  };


  const deleteService = (id) => {
    axios.delete(`http://localhost:5000/api/admin/services/${id}`, {
      headers: { Authorization: token }
    }).then(() => loadServices());
  };



  // ================= IMAGES =================

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


  const uploadImage = () => {

    if (!imageForm.file) return alert("Select Image");

    setUploading(true);

    const fd = new FormData();
    fd.append("image", imageForm.file);
    fd.append("image_type", imageForm.image_type);
    fd.append("image_name", imageForm.file.name);

    axios.post("http://localhost:5000/api/images/upload", fd, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data"
      }
    }).then(() => {

      alert("Image Uploaded");

      setImageForm({
        image_type: "owner",
        file: null,
        preview: null
      });

      document.getElementById("imageInput").value = "";

      loadImages();

    }).finally(() => setUploading(false));
  };


  const deleteImage = (id) => {

    if (!window.confirm("Delete Image?")) return;

    axios.delete(`http://localhost:5000/api/images/${id}`, {
      headers: { Authorization: token }
    }).then(() => loadImages());
  };



  // ================= INQUIRIES =================

  const markAsRead = (id) => {

    axios.put(`http://localhost:5000/api/inquiry/read/${id}`, {}, {
      headers: { Authorization: token }
    }).then(() => {
      loadInquiries();
    });

  };



  // ================= UI =================

  return (
    <div className="min-h-screen bg-gray-50">


      {/* HEADER */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-teal-100">Manage Website</p>
          </div>


          {/* Notification Bell */}
          <button
            onClick={() => setActiveTab("inquiries")}
            className="relative text-white text-2xl"
          >
            🔔

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

        </div>
      </div>


      {/* TABS */}
      <div className="max-w-7xl mx-auto px-6 pt-6">

        <div className="flex gap-6 border-b">

          <button
            onClick={() => setActiveTab("services")}
            className={`pb-3 font-semibold ${
              activeTab === "services"
                ? "border-b-4 border-teal-500 text-teal-600"
                : "text-gray-500"
            }`}
          >
            📋 Services
          </button>

          <button
            onClick={() => setActiveTab("images")}
            className={`pb-3 font-semibold ${
              activeTab === "images"
                ? "border-b-4 border-teal-500 text-teal-600"
                : "text-gray-500"
            }`}
          >
            🖼️ Images
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`pb-3 font-semibold ${
              activeTab === "inquiries"
                ? "border-b-4 border-teal-500 text-teal-600"
                : "text-gray-500"
            }`}
          >
            📩 Inquiries
          </button>

        </div>
      </div>



      <div className="max-w-7xl mx-auto px-6 py-10">


        {/* ================= SERVICES ================= */}
        {activeTab === "services" && (

          <>
            <div className="bg-white p-6 rounded shadow mb-8">

              <h2 className="font-bold mb-4">Add Service</h2>

              <input
                className="w-full border p-2 mb-2"
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />

              <input
                className="w-full border p-2 mb-2"
                placeholder="Short Description"
                value={form.short_description}
                onChange={e => setForm({ ...form, short_description: e.target.value })}
              />

              <textarea
                className="w-full border p-2 mb-2"
                placeholder="Full Description"
                value={form.full_description}
                onChange={e => setForm({ ...form, full_description: e.target.value })}
              />


              <input type="file" onChange={handleServiceImageChange} />

              {serviceImagePreview && (
                <img
                  src={serviceImagePreview}
                  className="h-32 mt-2"
                />
              )}


              <button
                onClick={addService}
                className="bg-teal-500 text-white w-full py-2 mt-3 rounded"
              >
                Add Service
              </button>

            </div>


            <div className="bg-white rounded shadow overflow-hidden">

              <table className="w-full">

                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">ID</th>
                    <th>Title</th>
                    <th>Short Desc</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {services.map(s => (
                    <tr key={s.id} className="border-t">

                      <td className="p-2">{s.id}</td>
                      <td>{s.title}</td>
                      <td>{s.short_description}</td>

                      <td>
                        <button
                          onClick={() => deleteService(s.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
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




        {/* ================= IMAGES ================= */}
        {activeTab === "images" && (

          <>
            <div className="bg-white p-6 rounded shadow mb-8 grid md:grid-cols-2 gap-6">

              <div>

                <h2 className="font-bold mb-3">Upload Image</h2>

                <select
                  className="w-full border p-2 mb-3"
                  value={imageForm.image_type}
                  onChange={e => setImageForm({ ...imageForm, image_type: e.target.value })}
                >

                  <option value="logo">Logo</option>
                  <option value="owner">Owner</option>
                  <option value="clients_logo">Clients</option>
                  <option value="hero">Hero</option>

                </select>


                <input
                  id="imageInput"
                  type="file"
                  onChange={handleImageChange}
                />


                <button
                  onClick={uploadImage}
                  disabled={uploading}
                  className="bg-teal-500 text-white w-full py-2 mt-3 rounded"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>

              </div>


              <div className="border flex items-center justify-center h-48">

                {imageForm.preview ? (
                  <img
                    src={imageForm.preview}
                    className="h-full"
                  />
                ) : (
                  <p className="text-gray-400">Preview</p>
                )}

              </div>

            </div>


            <div className="bg-white rounded shadow overflow-hidden">

              <table className="w-full">

                <thead className="bg-gray-100">
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Preview</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {images.map(img => (
                    <tr key={img.id} className="border-t">

                      <td className="p-2">{img.id}</td>
                      <td>{img.image_type}</td>
                      <td>{img.image_name}</td>

                      <td>
                        <a
                          href={`http://localhost:5000/api/images/${img.id}`}
                          target="_blank"
                          className="text-blue-600"
                        >
                          View
                        </a>
                      </td>

                      <td>
                        <button
                          onClick={() => deleteImage(img.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
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



        {/* ================= INQUIRIES ================= */}
        {activeTab === "inquiries" && (

          <div className="bg-white rounded shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>

              </thead>


              <tbody>

                {inquiries.map(i => (

                  <tr
                    key={i.id}
                    className={`border-t ${i.is_read === 0 ? "bg-yellow-50" : ""}`}
                  >

                    <td className="p-2">{i.id}</td>
                    <td>{i.name}</td>
                    <td>{i.email}</td>
                    <td>{i.phone}</td>
                    <td>{i.message}</td>

                    <td>

                      {i.is_read === 0 ? (

                        <button
                          onClick={() => markAsRead(i.id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Mark Read
                        </button>

                      ) : (

                        <span className="text-green-600 font-semibold">
                          Read
                        </span>

                      )}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}
