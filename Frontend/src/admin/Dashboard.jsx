// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = "http://localhost:5000";

// const FileBtn = ({ filePath, label }) => {
//   if (!filePath) return <span className="text-gray-300 text-xs">—</span>;
//   const ext = filePath.split(".").pop().toLowerCase();
//   const icon = ext === "pdf" ? "📄" : "🖼️";
//   return (
//     <button
//       onClick={() => window.open(`${BASE_URL}/api/dashboard/download?file=${encodeURIComponent(filePath)}`, "_blank")}
//       className="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded px-2 py-1 text-xs font-medium transition"
//     >
//       {icon} {label}
//     </button>
//   );
// };

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [services, setServices] = useState([]);
//   const [images, setImages] = useState([]);
//   const [inquiries, setInquiries] = useState([]);
//   const [deadlines, setDeadlines] = useState([]);
//   const [activeTab, setActiveTab] = useState("services");
//   const [unreadCount, setUnreadCount] = useState(0);

//   const [registrationType, setRegistrationType] = useState("income-tax");
//   const [registrations, setRegistrations] = useState([]);
//   const [regLoading, setRegLoading] = useState(false);
//   const [regSearch, setRegSearch] = useState("");
//   const [regSummary, setRegSummary] = useState({ income_tax: 0, gst: 0, udyam: 0 });

//   const [form, setForm] = useState({ title: "", short_description: "", full_description: "" });
//   const [serviceImageFile, setServiceImageFile] = useState(null);
//   const [serviceImagePreview, setServiceImagePreview] = useState(null);
//   const [imageForm, setImageForm] = useState({ image_type: "owner", file: null, preview: null });

//   const [deadlineForm, setDeadlineForm] = useState({
//     category: "ITR", name: "", form_type: "", frequency: "yearly",
//     rule_day: "", rule_month: "", is_auto: true, manual_due_date: ""
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => { if (!token) navigate("/admin"); }, [token, navigate]);

//   // ================= LOAD DATA =================
//   const loadServices = () => axios.get(`${BASE_URL}/api/admin/services`, { headers: { Authorization: token } }).then(res => setServices(res.data));
//   const loadImages = () => axios.get(`${BASE_URL}/api/images/admin/all`, { headers: { Authorization: token } }).then(res => setImages(res.data));
//   const loadInquiries = () => axios.get(`${BASE_URL}/api/inquiry`, { headers: { Authorization: token } }).then(res => { setInquiries(res.data); setUnreadCount(res.data.filter(i => i.is_read === 0).length); });
//   const loadDeadlines = () => axios.get(`${BASE_URL}/api/tax-deadlines`).then(res => setDeadlines(res.data)).catch(err => console.log(err));
//   const loadRegSummary = () => axios.get(`${BASE_URL}/api/dashboard/summary`).then(res => setRegSummary(res.data)).catch(console.error);

//   useEffect(() => {
//     if (token) { loadServices(); loadImages(); loadInquiries(); loadDeadlines(); loadRegSummary(); }
//   }, [token]);

//   useEffect(() => {
//     if (activeTab !== "registrations") return;
//     setRegLoading(true); setRegSearch("");
//     axios.get(`${BASE_URL}/api/dashboard/${registrationType}`)
//       .then(res => { setRegistrations(res.data); setRegLoading(false); })
//       .catch(() => setRegLoading(false));
//   }, [registrationType, activeTab]);

//   // ================= DEADLINES =================
//   const saveDeadline = () => {
//     if (!deadlineForm.name || !deadlineForm.rule_day) { alert("Please fill required fields"); return; }
//     if (deadlineForm.frequency === "yearly" && !deadlineForm.rule_month) { alert("Please enter rule month"); return; }
//     if (!deadlineForm.is_auto && !deadlineForm.manual_due_date) { alert("Please select manual due date"); return; }
//     const payload = { ...deadlineForm, rule_day: Number(deadlineForm.rule_day), rule_month: deadlineForm.frequency === "yearly" ? Number(deadlineForm.rule_month) : null, manual_due_date: deadlineForm.is_auto ? null : deadlineForm.manual_due_date };
//     if (editingId) {
//       axios.put(`${BASE_URL}/api/tax-deadlines/${editingId}`, payload, { headers: { Authorization: token } }).then(() => { alert("Updated"); resetDeadline(); }).catch(() => alert("Error updating"));
//     } else {
//       axios.post(`${BASE_URL}/api/tax-deadlines`, payload, { headers: { Authorization: token } }).then(() => { alert("Saved"); resetDeadline(); }).catch(() => alert("Error saving"));
//     }
//   };
//   const deleteDeadline = (id) => { if (!window.confirm("Delete this deadline?")) return; axios.delete(`${BASE_URL}/api/tax-deadlines/${id}`, { headers: { Authorization: token } }).then(() => { alert("Deleted"); loadDeadlines(); }); };
//   const resetDeadline = () => { setDeadlineForm({ category: "ITR", name: "", form_type: "", frequency: "yearly", rule_day: "", rule_month: "", is_auto: true, manual_due_date: "" }); setEditingId(null); loadDeadlines(); };

//   // ================= SERVICES =================
//   const handleServiceImageChange = (e) => { const file = e.target.files[0]; if (file) { const r = new FileReader(); r.onloadend = () => { setServiceImageFile(file); setServiceImagePreview(r.result); }; r.readAsDataURL(file); } };
//   const addService = () => { axios.post(`${BASE_URL}/api/admin/services`, form, { headers: { Authorization: token } }).then(res => { const id = res.data.id; if (serviceImageFile) { const fd = new FormData(); fd.append("image", serviceImageFile); fd.append("service_id", id); axios.post(`${BASE_URL}/api/admin/services/upload-image`, fd, { headers: { Authorization: token, "Content-Type": "multipart/form-data" } }).then(() => { alert("Service Added"); resetServiceForm(); }); } else { alert("Service Added"); resetServiceForm(); } }); };
//   const resetServiceForm = () => { setForm({ title: "", short_description: "", full_description: "" }); setServiceImageFile(null); setServiceImagePreview(null); loadServices(); };
//   const deleteService = (id) => axios.delete(`${BASE_URL}/api/admin/services/${id}`, { headers: { Authorization: token } }).then(() => loadServices());

//   // ================= IMAGES =================
//   const handleImageChange = (e) => { const file = e.target.files[0]; if (file) { const r = new FileReader(); r.onloadend = () => setImageForm({ ...imageForm, file, preview: r.result }); r.readAsDataURL(file); } };
//   const uploadImage = () => { if (!imageForm.file) return alert("Select Image"); setUploading(true); const fd = new FormData(); fd.append("image", imageForm.file); fd.append("image_type", imageForm.image_type); fd.append("image_name", imageForm.file.name); axios.post(`${BASE_URL}/api/images/upload`, fd, { headers: { Authorization: token, "Content-Type": "multipart/form-data" } }).then(() => { alert("Image Uploaded"); setImageForm({ image_type: "owner", file: null, preview: null }); document.getElementById("imageInput").value = ""; loadImages(); }).finally(() => setUploading(false)); };
//   const deleteImage = (id) => { if (!window.confirm("Delete Image?")) return; axios.delete(`${BASE_URL}/api/images/${id}`, { headers: { Authorization: token } }).then(() => loadImages()); };

//   // ================= INQUIRIES =================
//   const markAsRead = (id) => axios.put(`${BASE_URL}/api/inquiry/read/${id}`, {}, { headers: { Authorization: token } }).then(() => loadInquiries());

//   // ================= REGISTRATIONS =================
//   const deleteRegistration = (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;
//     axios.delete(`${BASE_URL}/api/dashboard/${registrationType}/${id}`, { headers: { Authorization: token } })
//       .then(() => { setRegistrations(prev => prev.filter(r => r.id !== id)); loadRegSummary(); })
//       .catch(() => alert("Delete failed"));
//   };

//   const filteredRegs = registrations.filter(r => {
//     if (!regSearch.trim()) return true;
//     const q = regSearch.toLowerCase();
//     return r.full_name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.mobile?.includes(q);
//   });

//   // ================= UI =================
//   return (
//     <div className="min-h-screen bg-gray-50 flex">

//       {/* ══════════════════════════════════
//            LEFT SIDEBAR
//       ══════════════════════════════════ */}
//       <div className="w-64 min-h-screen bg-gradient-to-b from-teal-700 to-teal-900 flex flex-col fixed left-0 top-0 z-30">

//         {/* Brand */}
//         <div className="px-6 py-7 border-b border-teal-600">
//           <h1 className="text-xl font-bold text-white">⚙️ Admin Panel</h1>
//           <p className="text-teal-300 text-xs mt-1">Manage Website</p>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 px-3 py-6 space-y-1">
//           {[
//             { key: "services",      label: "Services",      icon: "📋" },
//             { key: "images",        label: "Images",        icon: "🖼️" },
//             { key: "inquiries",     label: "Inquiries",     icon: "📩" },
//             { key: "deadlines",     label: "Deadlines",     icon: "⏰" },
//             { key: "registrations", label: "Registrations", icon: "📁" },
//           ].map(tab => (
//             <button key={tab.key} onClick={() => setActiveTab(tab.key)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
//                 activeTab === tab.key ? "bg-white text-teal-700 shadow" : "text-teal-100 hover:bg-teal-600"
//               }`}
//             >
//               <span className="text-base">{tab.icon}</span>
//               <span>{tab.label}</span>
//               {tab.key === "inquiries" && unreadCount > 0 && (
//                 <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* Back to Home */}
//         <div className="px-3 py-5 border-t border-teal-600">
//           <button onClick={() => navigate("/")}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-teal-100 hover:bg-teal-600 transition">
//             <span>🏠</span> <span>Back to Home</span>
//           </button>
//         </div>
//       </div>

//       {/* ══════════════════════════════════
//            MAIN CONTENT (offset sidebar)
//       ══════════════════════════════════ */}
//       <div className="ml-64 flex-1 flex flex-col min-h-screen">

//         {/* Top bar */}
//         <div className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
//           <h2 className="text-lg font-bold text-gray-700 capitalize">
//             {activeTab.replace("-", " ")}
//           </h2>
//           <button onClick={() => setActiveTab("inquiries")} className="relative text-2xl">
//             🔔
//             {unreadCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 rounded-full text-white">{unreadCount}</span>
//             )}
//           </button>
//         </div>

//         {/* Page content */}
//         <div className="p-8">

//           {/* ================= DEADLINES ================= */}
//           {activeTab === "deadlines" && (
//             <div className="bg-white p-6 rounded shadow">
//               <h2 className="font-bold mb-4 text-lg">Manage Tax Deadlines</h2>
//               <select className="border p-2 w-full mb-2" value={deadlineForm.category} onChange={e => setDeadlineForm({ ...deadlineForm, category: e.target.value })}>
//                 <option value="ITR">Income Tax</option>
//                 <option value="GST">GST</option>
//               </select>
//               <input className="border p-2 w-full mb-2" placeholder="Name (Ex: GSTR-1, Salaried)" value={deadlineForm.name} onChange={e => setDeadlineForm({ ...deadlineForm, name: e.target.value })} />
//               <input className="border p-2 w-full mb-2" placeholder="Form / Type" value={deadlineForm.form_type} onChange={e => setDeadlineForm({ ...deadlineForm, form_type: e.target.value })} />
//               <select className="border p-2 w-full mb-2" value={deadlineForm.frequency} onChange={e => setDeadlineForm({ ...deadlineForm, frequency: e.target.value })}>
//                 <option value="yearly">Yearly</option>
//                 <option value="monthly">Monthly</option>
//               </select>
//               <input type="number" className="border p-2 w-full mb-2" placeholder="Rule Day (Example: 31 or 20)" value={deadlineForm.rule_day} onChange={e => setDeadlineForm({ ...deadlineForm, rule_day: e.target.value })} />
//               {deadlineForm.frequency === "yearly" && (
//                 <input type="number" className="border p-2 w-full mb-2" placeholder="Rule Month (1-12)" value={deadlineForm.rule_month} onChange={e => setDeadlineForm({ ...deadlineForm, rule_month: e.target.value })} />
//               )}
//               <label className="flex items-center gap-2 mb-2">
//                 <input type="checkbox" checked={deadlineForm.is_auto} onChange={e => setDeadlineForm({ ...deadlineForm, is_auto: e.target.checked })} />
//                 Auto Mode
//               </label>
//               {!deadlineForm.is_auto && (
//                 <input type="date" className="border p-2 w-full mb-3" value={deadlineForm.manual_due_date} onChange={e => setDeadlineForm({ ...deadlineForm, manual_due_date: e.target.value })} />
//               )}
//               <button onClick={saveDeadline} className="bg-teal-500 text-white w-full py-2 rounded">Save Deadline</button>
//               <div className="mt-6 space-y-2">
//                 {deadlines.map(d => (
//                   <div key={d.id} className="flex justify-between items-center border p-2 rounded">
//                     <div><b>{d.name}</b> ({d.category}) — {d.due_date}</div>
//                     <div className="space-x-2">
//                       <button onClick={() => { setDeadlineForm({ category: d.category, name: d.name, form_type: d.form_type, frequency: d.frequency, rule_day: d.rule_day, rule_month: d.rule_month, is_auto: d.is_auto, manual_due_date: d.manual_due_date ? d.manual_due_date.split("T")[0] : "" }); setEditingId(d.id); }} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
//                       <button onClick={() => deleteDeadline(d.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ================= SERVICES ================= */}
//           {activeTab === "services" && (
//             <>
//               <div className="bg-white p-6 rounded shadow mb-8">
//                 <h2 className="font-bold mb-4">Add Service</h2>
//                 <input className="w-full border p-2 mb-2" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
//                 <input className="w-full border p-2 mb-2" placeholder="Short Description" value={form.short_description} onChange={e => setForm({ ...form, short_description: e.target.value })} />
//                 <textarea className="w-full border p-2 mb-2" placeholder="Full Description" value={form.full_description} onChange={e => setForm({ ...form, full_description: e.target.value })} />
//                 <input type="file" onChange={handleServiceImageChange} />
//                 {serviceImagePreview && <img src={serviceImagePreview} className="h-32 mt-2" />}
//                 <button onClick={addService} className="bg-teal-500 text-white w-full py-2 mt-3 rounded">Add Service</button>
//               </div>
//               <div className="bg-white rounded shadow overflow-hidden">
//                 <table className="w-full">
//                   <thead className="bg-gray-100"><tr><th className="p-2">ID</th><th>Title</th><th>Short Desc</th><th>Action</th></tr></thead>
//                   <tbody>
//                     {services.map(s => (
//                       <tr key={s.id} className="border-t">
//                         <td className="p-2">{s.id}</td><td>{s.title}</td><td>{s.short_description}</td>
//                         <td><button onClick={() => deleteService(s.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button></td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}

//           {/* ================= IMAGES ================= */}
//           {activeTab === "images" && (
//             <>
//               <div className="bg-white p-6 rounded shadow mb-8 grid md:grid-cols-2 gap-6">
//                 <div>
//                   <h2 className="font-bold mb-3">Upload Image</h2>
//                   <select className="w-full border p-2 mb-3" value={imageForm.image_type} onChange={e => setImageForm({ ...imageForm, image_type: e.target.value })}>
//                     <option value="logo">Logo</option>
//                     <option value="owner">Owner</option>
//                     <option value="clients_logo">Clients</option>
//                     <option value="hero">Hero</option>
//                   </select>
//                   <input id="imageInput" type="file" onChange={handleImageChange} />
//                   <button onClick={uploadImage} disabled={uploading} className="bg-teal-500 text-white w-full py-2 mt-3 rounded">{uploading ? "Uploading..." : "Upload"}</button>
//                 </div>
//                 <div className="border flex items-center justify-center h-48">
//                   {imageForm.preview ? <img src={imageForm.preview} className="h-full" /> : <p className="text-gray-400">Preview</p>}
//                 </div>
//               </div>
//               <div className="bg-white rounded shadow overflow-hidden">
//                 <table className="w-full">
//                   <thead className="bg-gray-100"><tr><th>ID</th><th>Type</th><th>Name</th><th>Preview</th><th>Action</th></tr></thead>
//                   <tbody>
//                     {images.map(img => (
//                       <tr key={img.id} className="border-t">
//                         <td className="p-2">{img.id}</td><td>{img.image_type}</td><td>{img.image_name}</td>
//                         <td><a href={`${BASE_URL}/api/images/${img.id}`} target="_blank" className="text-blue-600">View</a></td>
//                         <td><button onClick={() => deleteImage(img.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button></td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}

//           {/* ================= INQUIRIES ================= */}
//           {activeTab === "inquiries" && (
//             <div className="bg-white rounded shadow overflow-hidden">
//               <table className="w-full">
//                 <thead className="bg-gray-100"><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Status</th></tr></thead>
//                 <tbody>
//   {inquiries.map((i) => (
//     <tr
//       key={i.id}
//       className={`border-t ${i.is_read === 0 ? "bg-yellow-50" : ""}`}
//     >
//       <td className="p-2">{i.id}</td>

//       <td className="p-2">
//         {i.name}
//         {i.visit_count > 1 && (
//           <span className="ml-2 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-semibold">
//             🔁 Returning ({i.visit_count}x)
//           </span>
//         )}
//       </td>

//       <td className="p-2">{i.email}</td>
//       <td className="p-2">{i.phone}</td>
//       <td className="p-2">{i.message}</td>

//       <td className="p-2">
//         {i.is_read === 0 ? (
//           <button
//             onClick={() => markAsRead(i.id)}
//             className="bg-blue-500 text-white px-2 py-1 rounded"
//           >
//             Mark Read
//           </button>
//         ) : (
//           <span className="text-green-600 font-semibold">Read</span>
//         )}
//       </td>
//     </tr>
//   ))}
// </tbody>
                
//               </table>
//             </div>
//           )}

//           {/* ================= REGISTRATIONS ================= */}
//           {activeTab === "registrations" && (
//             <div>

//               {/* Summary Cards */}
//               <div className="grid grid-cols-3 gap-4 mb-6">
//                 {[
//                   { key: "income-tax", label: "Income Tax", count: regSummary.income_tax },
//                   { key: "gst",        label: "GST",         count: regSummary.gst },
//                   { key: "udyam",      label: "Udyam",       count: regSummary.udyam },
//                 ].map(card => (
//                   <button key={card.key} onClick={() => setRegistrationType(card.key)}
//                     className={`bg-white rounded-lg shadow p-5 text-left border-l-4 transition hover:-translate-y-0.5 ${registrationType === card.key ? "border-teal-500" : "border-gray-200"}`}
//                   >
//                     <div className="text-3xl font-bold text-teal-600">{card.count}</div>
//                     <div className="text-sm text-gray-500 mt-1">📁 {card.label} Registrations</div>
//                   </button>
//                 ))}
//               </div>

//               {/* Sub tabs */}
//               <div className="flex gap-3 mb-4">
//                 {[
//                   { key: "income-tax", label: "📑 Income Tax" },
//                   { key: "gst",        label: "🏪 GST" },
//                   { key: "udyam",      label: "🏭 Udyam" },
//                 ].map(t => (
//                   <button key={t.key} onClick={() => setRegistrationType(t.key)}
//                     className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${registrationType === t.key ? "bg-teal-500 text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-teal-300"}`}
//                   >
//                     {t.label}
//                   </button>
//                 ))}
//               </div>

//               {/* Search */}
//               <div className="flex justify-between items-center mb-3">
//                 <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:border-teal-400"
//                   placeholder="🔍 Search by name, email, mobile..." value={regSearch} onChange={e => setRegSearch(e.target.value)} />
//                 <span className="text-sm text-gray-400">{filteredRegs.length} record(s)</span>
//               </div>

//               {/* Table */}
//               <div className="bg-white rounded-lg shadow overflow-x-auto">
//                 {regLoading ? (
//                   <div className="p-12 text-center text-gray-400">Loading...</div>
//                 ) : filteredRegs.length === 0 ? (
//                   <div className="p-12 text-center text-gray-400">No records found</div>
//                 ) : (
//                   <table className="w-full text-sm">
//                     <thead className="bg-gray-100">
//                       {registrationType === "income-tax" && (
//                         <tr>{["#","Name","Email","Mobile","PAN","Aadhaar","Salary","House Prop.","Pension","Agri.","Cap. Gain","Int. Savings","Int. Deposit","Int. Refund","Enh. Comp","Other Int.","PAN Photo","Aadhaar Front","Aadhaar Back","Date","Action"].map(h => <th key={h} className="p-3 text-left whitespace-nowrap">{h}</th>)}</tr>
//                       )}
//                       {registrationType === "gst" && (
//                         <tr>{["#","Name","Email","Mobile","PAN","Aadhaar","PAN Photo","Aadhaar","Proprietor","Address Proof","Shop Act","Udyam Cert","Shop Photo","Bank Proof","Signature","Date","Action"].map(h => <th key={h} className="p-3 text-left whitespace-nowrap">{h}</th>)}</tr>
//                       )}
//                       {registrationType === "udyam" && (
//                         <tr>{["#","Name","Email","Mobile","PAN","Aadhaar","PAN Photo","Aadhaar","Proprietor","Address Proof","Shop Act","Bank Proof","Signature","Date","Action"].map(h => <th key={h} className="p-3 text-left whitespace-nowrap">{h}</th>)}</tr>
//                       )}
//                     </thead>
//                     <tbody>
//                       {filteredRegs.map((row, i) => (
//                         <tr key={row.id} className="border-t hover:bg-gray-50">

//                           {registrationType === "income-tax" && (
//                             <>
//                               <td className="p-3">{i+1}</td>
//                               <td className="p-3 font-medium whitespace-nowrap">{row.full_name}</td>
//                               <td className="p-3 whitespace-nowrap">{row.email}</td>
//                               <td className="p-3">{row.mobile}</td>
//                               <td className="p-3">{row.pan_number}</td>
//                               <td className="p-3">{row.aadhaar_number}</td>
//                               <td className="p-3">₹{row.salary_income}</td>
//                               <td className="p-3">₹{row.house_property_income}</td>
//                               <td className="p-3">₹{row.family_pension_income}</td>
//                               <td className="p-3">₹{row.agricultural_income}</td>
//                               <td className="p-3">₹{row.capital_gain_112a}</td>
//                               <td className="p-3">₹{row.interest_savings}</td>
//                               <td className="p-3">₹{row.interest_deposits}</td>
//                               <td className="p-3">₹{row.interest_refund}</td>
//                               <td className="p-3">₹{row.interest_enhanced_comp}</td>
//                               <td className="p-3">₹{row.other_interest_income}</td>
//                               <td className="p-3"><FileBtn filePath={row.pan_photo}          label="PAN" /></td>
//                               <td className="p-3"><FileBtn filePath={row.aadhaar_photo}      label="Front" /></td>
//                               <td className="p-3"><FileBtn filePath={row.aadhaar_back_photo} label="Back" /></td>
//                               <td className="p-3 text-gray-400 text-xs whitespace-nowrap">{new Date(row.created_at).toLocaleDateString("en-IN")}</td>
//                               <td className="p-3">
//                                 <button onClick={() => deleteRegistration(row.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition">Delete</button>
//                               </td>
//                             </>
//                           )}

//                           {registrationType === "gst" && (
//                             <>
//                               <td className="p-3">{i+1}</td>
//                               <td className="p-3 font-medium whitespace-nowrap">{row.full_name}</td>
//                               <td className="p-3 whitespace-nowrap">{row.email}</td>
//                               <td className="p-3">{row.mobile}</td>
//                               <td className="p-3">{row.pan_number}</td>
//                               <td className="p-3">{row.aadhaar_number}</td>
//                               <td className="p-3"><FileBtn filePath={row.pan_photo}              label="PAN" /></td>
//                               <td className="p-3"><FileBtn filePath={row.aadhaar_photo}          label="Aadhaar" /></td>
//                               <td className="p-3"><FileBtn filePath={row.proprietor_photo}       label="Proprietor" /></td>
//                               <td className="p-3"><FileBtn filePath={row.business_address_proof} label="Address" /></td>
//                               <td className="p-3"><FileBtn filePath={row.shop_act_license}       label="Shop Act" /></td>
//                               <td className="p-3"><FileBtn filePath={row.udyam_certificate}      label="Udyam" /></td>
//                               <td className="p-3"><FileBtn filePath={row.shop_photo}             label="Shop" /></td>
//                               <td className="p-3"><FileBtn filePath={row.bank_proof}             label="Bank" /></td>
//                               <td className="p-3"><FileBtn filePath={row.signature}              label="Sign" /></td>
//                               <td className="p-3 text-gray-400 text-xs whitespace-nowrap">{new Date(row.created_at).toLocaleDateString("en-IN")}</td>
//                               <td className="p-3">
//                                 <button onClick={() => deleteRegistration(row.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition">Delete</button>
//                               </td>
//                             </>
//                           )}

//                           {registrationType === "udyam" && (
//                             <>
//                               <td className="p-3">{i+1}</td>
//                               <td className="p-3 font-medium whitespace-nowrap">{row.full_name}</td>
//                               <td className="p-3 whitespace-nowrap">{row.email}</td>
//                               <td className="p-3">{row.mobile}</td>
//                               <td className="p-3">{row.pan_number}</td>
//                               <td className="p-3">{row.aadhaar_number}</td>
//                               <td className="p-3"><FileBtn filePath={row.pan_photo}              label="PAN" /></td>
//                               <td className="p-3"><FileBtn filePath={row.aadhaar_photo}          label="Aadhaar" /></td>
//                               <td className="p-3"><FileBtn filePath={row.proprietor_photo}       label="Proprietor" /></td>
//                               <td className="p-3"><FileBtn filePath={row.business_address_proof} label="Address" /></td>
//                               <td className="p-3"><FileBtn filePath={row.shop_act_license}       label="Shop Act" /></td>
//                               <td className="p-3"><FileBtn filePath={row.bank_proof}             label="Bank" /></td>
//                               <td className="p-3"><FileBtn filePath={row.signature}              label="Sign" /></td>
//                               <td className="p-3 text-gray-400 text-xs whitespace-nowrap">{new Date(row.created_at).toLocaleDateString("en-IN")}</td>
//                               <td className="p-3">
//                                 <button onClick={() => deleteRegistration(row.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition">Delete</button>
//                               </td>
//                             </>
//                           )}

//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             </div>
//           )}

//         </div>{/* end p-8 */}
//       </div>{/* end main content */}
//     </div>
//   );
// }














// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// export default function Dashboard() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // ================= STATES =================
//   const [services, setServices] = useState([]);
//   const [images, setImages] = useState([]);
//   const [inquiries, setInquiries] = useState([]);
//   const [deadlines, setDeadlines] = useState([]);

//   const [activeTab, setActiveTab] = useState("services");
//   const [registrationType, setRegistrationType] = useState("income-tax");
//   const [unreadCount, setUnreadCount] = useState(0);

//   const [form, setForm] = useState({
//     title: "",
//     short_description: "",
//     full_description: ""
//   });

//   const [serviceImageFile, setServiceImageFile] = useState(null);
//   const [serviceImagePreview, setServiceImagePreview] = useState(null);

//   const [imageForm, setImageForm] = useState({
//     image_type: "owner",
//     file: null,
//     preview: null
//   });

//    // Deadline Form
//  const [deadlineForm, setDeadlineForm] = useState({
//  category: "ITR",
//   name: "",
//   form_type: "",
//   frequency: "yearly",
//   rule_day: "",
//   rule_month: "",
//   is_auto: true,
//   manual_due_date: ""
// });
// const [editingId, setEditingId] = useState(null);

//   const [uploading, setUploading] = useState(false);



//   // Redirect to login if no token
//   useEffect(() => {
//     if (!token) {
//       navigate("/admin");
//     }
//   }, [token, navigate]);

//   // ================= LOAD DATA =================

//   const loadServices = () => {
//     axios.get("http://localhost:5000/api/admin/services", {
//       headers: { Authorization: token }
//     }).then(res => setServices(res.data));
//   };

//   const loadImages = () => {
//     axios.get("http://localhost:5000/api/images/admin/all", {
//       headers: { Authorization: token }
//     }).then(res => setImages(res.data));
//   };

//   const loadInquiries = () => {
//     axios.get("http://localhost:5000/api/inquiry", {
//       headers: { Authorization: token }
//     }).then(res => {
//       setInquiries(res.data);

//       const unread = res.data.filter(i => i.is_read === 0);
//       setUnreadCount(unread.length);
//     });
//   };


//   useEffect(() => {
//     if (token) {
//       loadServices();
//       loadImages();
//       loadInquiries();
//       loadDeadlines();
//     }
//   }, [token]);


//   // ================= DEADLINES =================

//   const loadDeadlines = () => {
//   axios
//     .get("http://localhost:5000/api/tax-deadlines")
//     .then((res) => {
//       setDeadlines(res.data);
//     })
//     .catch((err) => {
//       console.log("Load deadlines error:", err);
//     });
// };

// const saveDeadline = () => {

//   // ===== VALIDATION =====

//   if (!deadlineForm.name || !deadlineForm.rule_day) {
//     alert("Please fill required fields");
//     return;
//   }

//   // If yearly, rule_month required
//   if (
//     deadlineForm.frequency === "yearly" &&
//     !deadlineForm.rule_month
//   ) {
//     alert("Please enter rule month");
//     return;
//   }

//   // If Auto OFF, manual date required
//   if (
//     !deadlineForm.is_auto &&
//     !deadlineForm.manual_due_date
//   ) {
//     alert("Please select manual due date");
//     return;
//   }

//   // ===== PREPARE PAYLOAD =====

//   const payload = {
//     ...deadlineForm,
//     rule_day: Number(deadlineForm.rule_day),
//     rule_month:
//       deadlineForm.frequency === "yearly"
//         ? Number(deadlineForm.rule_month)
//         : null,
//     manual_due_date: deadlineForm.is_auto
//       ? null
//       : deadlineForm.manual_due_date
//   };

//   // ===== EDIT =====
//   if (editingId) {

//     axios.put(
//       `http://localhost:5000/api/tax-deadlines/${editingId}`,
//       payload,
//       {
//         headers: { Authorization: token }
//       }
//     ).then(() => {

//       alert("Updated");
//       resetDeadline();

//     }).catch(err => {
//       console.log(err);
//       alert("Error updating");
//     });

//   }

//   // ===== ADD =====
//   else {
// console.log("Sending Payload:", payload);

//     axios.post(
//       "http://localhost:5000/api/tax-deadlines",
//       payload,
//       {
//         headers: { Authorization: token }
//       }
//     ).then(() => {

//       alert("Saved");
//       resetDeadline();

//     }).catch(err => {
//       console.log(err);
//       alert("Error saving");
//     });

//   }
// };



// const deleteDeadline = (id) => {

//   if (!window.confirm("Delete this deadline?")) return;

//   axios.delete(
//     `http://localhost:5000/api/tax-deadlines/${id}`,
//     {
//       headers: { Authorization: token }
//     }
//   ).then(() => {

//     alert("Deleted");

//     loadDeadlines();
//   });
// };



//   // ================= SERVICE =================

//   const handleServiceImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setServiceImageFile(file);
//         setServiceImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   const addService = () => {
//     axios.post("http://localhost:5000/api/admin/services", form, {
//       headers: { Authorization: token }
//     }).then(res => {

//       const serviceId = res.data.id;

//       if (serviceImageFile) {

//         const fd = new FormData();
//         fd.append("image", serviceImageFile);
//         fd.append("service_id", serviceId);

//         axios.post("http://localhost:5000/api/admin/services/upload-image", fd, {
//           headers: {
//             Authorization: token,
//             "Content-Type": "multipart/form-data"
//           }
//         }).then(() => {
//           alert("Service Added");
//           resetServiceForm();
//         });

//       } else {
//         alert("Service Added");
//         resetServiceForm();
//       }

//     });
//   };


//   const resetServiceForm = () => {
//     setForm({ title: "", short_description: "", full_description: "" });
//     setServiceImageFile(null);
//     setServiceImagePreview(null);
//     loadServices();
//   };


//   const deleteService = (id) => {
//     axios.delete(`http://localhost:5000/api/admin/services/${id}`, {
//       headers: { Authorization: token }
//     }).then(() => loadServices());
//   };



//   // ================= IMAGES =================

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageForm({ ...imageForm, file, preview: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   const uploadImage = () => {

//     if (!imageForm.file) return alert("Select Image");

//     setUploading(true);

//     const fd = new FormData();
//     fd.append("image", imageForm.file);
//     fd.append("image_type", imageForm.image_type);
//     fd.append("image_name", imageForm.file.name);

//     axios.post("http://localhost:5000/api/images/upload", fd, {
//       headers: {
//         Authorization: token,
//         "Content-Type": "multipart/form-data"
//       }
//     }).then(() => {

//       alert("Image Uploaded");

//       setImageForm({
//         image_type: "owner",
//         file: null,
//         preview: null
//       });

//       document.getElementById("imageInput").value = "";

//       loadImages();

//     }).finally(() => setUploading(false));
//   };


//   const deleteImage = (id) => {

//     if (!window.confirm("Delete Image?")) return;

//     axios.delete(`http://localhost:5000/api/images/${id}`, {
//       headers: { Authorization: token }
//     }).then(() => loadImages());
//   };



//   // ================= INQUIRIES =================

//   const markAsRead = (id) => {

//     axios.put(`http://localhost:5000/api/inquiry/read/${id}`, {}, {
//       headers: { Authorization: token }
//     }).then(() => {
//       loadInquiries();
//     });

//   };

// const resetDeadline = () => {

//   setDeadlineForm({
//     category: "ITR",   // 👈 important
//     name: "",
//     form_type: "",
//     frequency: "yearly",
//     rule_day: "",
//     rule_month: "",
//     is_auto: true,
//     manual_due_date: ""
//   });

//   setEditingId(null);
//   loadDeadlines();
// };

//   // ================= UI =================

//   return (
//     <div className="min-h-screen bg-gray-50">


//       {/* HEADER */}
//       <div className="bg-gradient-to-r from-teal-600 to-cyan-600">
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

//           <div>
//             <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
//             <p className="text-teal-100">Manage Website</p>
//           </div>


//           {/* Notification Bell */}
//           <button
//             onClick={() => setActiveTab("inquiries")}
//             className="relative text-white text-2xl"
//           >
//             🔔

//             {unreadCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 rounded-full">
//                 {unreadCount}
//               </span>
//             )}
//           </button>

//         </div>
//       </div>


//       {/* TABS */}
//       <div className="max-w-7xl mx-auto px-6 pt-6">

//         <div className="flex gap-6 border-b">

//           <button
//             onClick={() => setActiveTab("services")}
//             className={`pb-3 font-semibold ${
//               activeTab === "services"
//                 ? "border-b-4 border-teal-500 text-teal-600"
//                 : "text-gray-500"
//             }`}
//           >
//             📋 Services
//           </button>

//           <button
//             onClick={() => setActiveTab("images")}
//             className={`pb-3 font-semibold ${
//               activeTab === "images"
//                 ? "border-b-4 border-teal-500 text-teal-600"
//                 : "text-gray-500"
//             }`}
//           >
//             🖼️ Images
//           </button>

//           <button
//             onClick={() => setActiveTab("inquiries")}
//             className={`pb-3 font-semibold ${
//               activeTab === "inquiries"
//                 ? "border-b-4 border-teal-500 text-teal-600"
//                 : "text-gray-500"
//             }`}
//           >
//             📩 Inquiries
//           </button>

//            <button
//             onClick={() => setActiveTab("deadlines")}
//             className={`pb-3 font-semibold ${
//               activeTab === "deadlines"
//                 ? "border-b-4 border-teal-500 text-teal-600"
//                 : "text-gray-500"
//             }`}
//           >
//             ⏰ Deadlines
//           </button>
// <button
//   onClick={() => setActiveTab("registrations")}
//   className={`pb-3 font-semibold ${
//     activeTab === "registrations"
//       ? "border-b-4 border-teal-500 text-teal-600"
//       : "text-gray-500"
//   }`}
// >
//    Registrations
// </button>
//         </div>
//       </div>



//       <div className="max-w-7xl mx-auto px-6 py-10">


//           {/* ================= DEADLINES ================= */}
//        {activeTab === "deadlines" && (

//   <div className="bg-white p-6 rounded shadow">

//     <h2 className="font-bold mb-4 text-lg">
//       Manage Tax Deadlines
//     </h2>

//     {/* CATEGORY */}
//     <select
//       className="border p-2 w-full mb-2"
//       value={deadlineForm.category}
//       onChange={(e) =>
//         setDeadlineForm({
//           ...deadlineForm,
//           category: e.target.value
//         })
//       }
//     >
//       <option value="ITR">Income Tax</option>
//       <option value="GST">GST</option>
//     </select>

//     {/* NAME */}
//     <input
//       className="border p-2 w-full mb-2"
//       placeholder="Name (Ex: GSTR-1, Salaried)"
//       value={deadlineForm.name}
//       onChange={(e) =>
//         setDeadlineForm({
//           ...deadlineForm,
//           name: e.target.value
//         })
//       }
//     />

//     {/* FORM TYPE */}
//     <input
//       className="border p-2 w-full mb-2"
//       placeholder="Form / Type"
//       value={deadlineForm.form_type}
//       onChange={(e) =>
//         setDeadlineForm({
//           ...deadlineForm,
//           form_type: e.target.value
//         })
//       }
//     />

//     {/* FREQUENCY */}
//     <select
//       className="border p-2 w-full mb-2"
//       value={deadlineForm.frequency}
//       onChange={(e) =>
//         setDeadlineForm({
//           ...deadlineForm,
//           frequency: e.target.value
//         })
//       }
//     >
//       <option value="yearly">Yearly</option>
//       <option value="monthly">Monthly</option>
//     </select>

//     {/* RULE DAY */}
//     <input
//       type="number"
//       className="border p-2 w-full mb-2"
//       placeholder="Rule Day (Example: 31 or 20)"
//       value={deadlineForm.rule_day}
//       onChange={(e) =>
//         setDeadlineForm({
//           ...deadlineForm,
//           rule_day: e.target.value
//         })
//       }
//     />

//     {/* RULE MONTH (ONLY IF YEARLY) */}
//     {deadlineForm.frequency === "yearly" && (
//       <input
//         type="number"
//         className="border p-2 w-full mb-2"
//         placeholder="Rule Month (1-12)"
//         value={deadlineForm.rule_month}
//         onChange={(e) =>
//           setDeadlineForm({
//             ...deadlineForm,
//             rule_month: e.target.value
//           })
//         }
//       />
//     )}

//     {/* AUTO TOGGLE */}
//     <label className="flex items-center gap-2 mb-2">
//       <input
//         type="checkbox"
//         checked={deadlineForm.is_auto}
//         onChange={(e) =>
//           setDeadlineForm({
//             ...deadlineForm,
//             is_auto: e.target.checked
//           })
//         }
//       />
//       Auto Mode
//     </label>

//     {/* MANUAL DATE (ONLY IF AUTO OFF) */}
//     {!deadlineForm.is_auto && (
//       <input
//         type="date"
//         className="border p-2 w-full mb-3"
//         value={deadlineForm.manual_due_date}
//         onChange={(e) =>
//           setDeadlineForm({
//             ...deadlineForm,
//             manual_due_date: e.target.value
//           })
//         }
//       />
//     )}

//     <button
//       onClick={saveDeadline}
//       className="bg-teal-500 text-white w-full py-2 rounded"
//     >
//       Save Deadline
//     </button>

//     {/* LIST */}
//     <div className="mt-6 space-y-2">
//       {deadlines.map(d => (
//         <div
//           key={d.id}
//           className="flex justify-between items-center border p-2 rounded"
//         >
//           <div>
//             <b>{d.name}</b> ({d.category}) — {d.due_date}
//           </div>

//           <div className="space-x-2">

//             <button
//               onClick={() => {
//                 setDeadlineForm({
//                   category: d.category,
//                   name: d.name,
//                   form_type: d.form_type,
//                   frequency: d.frequency,
//                   rule_day: d.rule_day,
//                   rule_month: d.rule_month,
//                   is_auto: d.is_auto,
//                   manual_due_date: d.manual_due_date
//                     ? d.manual_due_date.split("T")[0]
//                     : ""
//                 });
//                 setEditingId(d.id);
//               }}
//               className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
//             >
//               Edit
//             </button>

//             <button
//               onClick={() => deleteDeadline(d.id)}
//               className="px-3 py-1 bg-red-500 text-white rounded text-sm"
//             >
//               Delete
//             </button>

//           </div>
//         </div>
//       ))}
//     </div>

//   </div>
// )}




//         {/* ================= SERVICES ================= */}
//         {activeTab === "services" && (

//           <>
//             <div className="bg-white p-6 rounded shadow mb-8">

//               <h2 className="font-bold mb-4">Add Service</h2>

//               <input
//                 className="w-full border p-2 mb-2"
//                 placeholder="Title"
//                 value={form.title}
//                 onChange={e => setForm({ ...form, title: e.target.value })}
//               />

//               <input
//                 className="w-full border p-2 mb-2"
//                 placeholder="Short Description"
//                 value={form.short_description}
//                 onChange={e => setForm({ ...form, short_description: e.target.value })}
//               />

//               <textarea
//                 className="w-full border p-2 mb-2"
//                 placeholder="Full Description"
//                 value={form.full_description}
//                 onChange={e => setForm({ ...form, full_description: e.target.value })}
//               />


//               <input type="file" onChange={handleServiceImageChange} />

//               {serviceImagePreview && (
//                 <img
//                   src={serviceImagePreview}
//                   className="h-32 mt-2"
//                 />
//               )}


//               <button
//                 onClick={addService}
//                 className="bg-teal-500 text-white w-full py-2 mt-3 rounded"
//               >
//                 Add Service
//               </button>

//             </div>


//             <div className="bg-white rounded shadow overflow-hidden">

//               <table className="w-full">

//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="p-2">ID</th>
//                     <th>Title</th>
//                     <th>Short Desc</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {services.map(s => (
//                     <tr key={s.id} className="border-t">

//                       <td className="p-2">{s.id}</td>
//                       <td>{s.title}</td>
//                       <td>{s.short_description}</td>

//                       <td>
//                         <button
//                           onClick={() => deleteService(s.id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded"
//                         >
//                           Delete
//                         </button>
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>

//               </table>

//             </div>
//           </>
//         )}




//         {/* ================= IMAGES ================= */}
//         {activeTab === "images" && (

//           <>
//             <div className="bg-white p-6 rounded shadow mb-8 grid md:grid-cols-2 gap-6">

//               <div>

//                 <h2 className="font-bold mb-3">Upload Image</h2>

//                 <select
//                   className="w-full border p-2 mb-3"
//                   value={imageForm.image_type}
//                   onChange={e => setImageForm({ ...imageForm, image_type: e.target.value })}
//                 >

//                   <option value="logo">Logo</option>
//                   <option value="owner">Owner</option>
//                   <option value="clients_logo">Clients</option>
//                   <option value="hero">Hero</option>

//                 </select>


//                 <input
//                   id="imageInput"
//                   type="file"
//                   onChange={handleImageChange}
//                 />


//                 <button
//                   onClick={uploadImage}
//                   disabled={uploading}
//                   className="bg-teal-500 text-white w-full py-2 mt-3 rounded"
//                 >
//                   {uploading ? "Uploading..." : "Upload"}
//                 </button>

//               </div>


//               <div className="border flex items-center justify-center h-48">

//                 {imageForm.preview ? (
//                   <img
//                     src={imageForm.preview}
//                     className="h-full"
//                   />
//                 ) : (
//                   <p className="text-gray-400">Preview</p>
//                 )}

//               </div>

//             </div>


//             <div className="bg-white rounded shadow overflow-hidden">

//               <table className="w-full">

//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th>ID</th>
//                     <th>Type</th>
//                     <th>Name</th>
//                     <th>Preview</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {images.map(img => (
//                     <tr key={img.id} className="border-t">

//                       <td className="p-2">{img.id}</td>
//                       <td>{img.image_type}</td>
//                       <td>{img.image_name}</td>

//                       <td>
//                         <a
//                           href={`http://localhost:5000/api/images/${img.id}`}
//                           target="_blank"
//                           className="text-blue-600"
//                         >
//                           View
//                         </a>
//                       </td>

//                       <td>
//                         <button
//                           onClick={() => deleteImage(img.id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded"
//                         >
//                           Delete
//                         </button>
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>

//               </table>

//             </div>
//           </>
//         )}

// {/* ================= REGISTRATIONS EXPORT ================= */}
// {activeTab === "registrations" && (

//   <div className="bg-white p-8 rounded shadow">

//     <h2 className="font-bold text-lg mb-6">
//       Download Registration Reports
//     </h2>

//     <div className="grid md:grid-cols-2 gap-6">

//       <div>

//         <label className="block mb-2 font-semibold">
//           Select Registration Type
//         </label>

//         <select
//           value={registrationType}
//           onChange={(e) => setRegistrationType(e.target.value)}
//           className="w-full border p-3 rounded mb-4"
//         >
//           <option value="income-tax">Income Tax</option>
//           <option value="gst">GST</option>
//           <option value="udyam">Udyam</option>
//         </select>

//         <button
//           onClick={() =>
//             window.open(
//               `http://localhost:5000/api/export/${registrationType}`,
//               "_blank"
//             )
//           }
//           className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded font-semibold transition"
//         >
//           Download Excel
//         </button>

//       </div>

//       <div className="flex items-center justify-center text-gray-400">
//         Latest submissions appear on top automatically.
//       </div>

//     </div>

//   </div>

// )}

//         {/* ================= INQUIRIES ================= */}
//         {activeTab === "inquiries" && (

//           <div className="bg-white rounded shadow overflow-hidden">

//             <table className="w-full">

//               <thead className="bg-gray-100">

//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Message</th>
//                   <th>Status</th>
//                 </tr>

//               </thead>


//               <tbody>

//                 {inquiries.map(i => (

//                   <tr
//                     key={i.id}
//                     className={`border-t ${i.is_read === 0 ? "bg-yellow-50" : ""}`}
//                   >

//                     <td className="p-2">{i.id}</td>
//                     <td>{i.name}</td>
//                     <td>{i.email}</td>
//                     <td>{i.phone}</td>
//                     <td>{i.message}</td>

//                     <td>

//                       {i.is_read === 0 ? (

//                         <button
//                           onClick={() => markAsRead(i.id)}
//                           className="bg-blue-500 text-white px-2 py-1 rounded"
//                         >
//                           Mark Read
//                         </button>

//                       ) : (

//                         <span className="text-green-600 font-semibold">
//                           Read
//                         </span>

//                       )}

//                     </td>

//                   </tr>
//                 ))}

//               </tbody>

//             </table>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const FileBtn = ({ filePath, label }) => {
  if (!filePath) return <span className="text-gray-300 text-xs">—</span>;
  const ext = filePath.split(".").pop().toLowerCase();
  const icon = ext === "pdf" ? "📄" : "🖼️";
  return (
    <button
      onClick={() => window.open(`${BASE_URL}/${filePath}`, "_blank")}
      className="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded px-2 py-1 text-xs font-medium transition"
    >
      {icon} {label}
    </button>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ================= STATES =================
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [activeTab, setActiveTab] = useState("services");
  const [unreadCount, setUnreadCount] = useState(0);

  const [registrationType, setRegistrationType] = useState("income-tax");
  const [registrations, setRegistrations] = useState([]);
  const [regLoading, setRegLoading] = useState(false);
  const [regSearch, setRegSearch] = useState("");
  const [regSummary, setRegSummary] = useState({ income_tax: 0, gst: 0, udyam: 0 });

  const [form, setForm] = useState({ title: "", short_description: "", full_description: "" });
  const [serviceImageFile, setServiceImageFile] = useState(null);
  const [serviceImagePreview, setServiceImagePreview] = useState(null);
  const [imageForm, setImageForm] = useState({ image_type: "owner", file: null, preview: null });

  const [deadlineForm, setDeadlineForm] = useState({
    category: "ITR",
    name: "",
    form_type: "",
    frequency: "yearly",
    rule_day: "",
    rule_month: "",
    is_auto: true,
    manual_due_date: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ================= GALLERY STATES =================
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryForm, setGalleryForm] = useState({ caption: "", file: null, preview: null });
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryPage, setGalleryPage] = useState(1);
  const [galleryPagination, setGalleryPagination] = useState({ total: 0, pages: 1, limit: 10 });

  // ================= AUTH CHECK =================
  useEffect(() => {
    if (!token) navigate("/admin");
  }, [token, navigate]);

  // ================= LOAD DATA =================
  const loadServices = () => {
    axios
      .get(`${BASE_URL}/api/admin/services`, { headers: { Authorization: token } })
      .then(res => setServices(res.data))
      .catch(err => console.error("❌ Error loading services:", err.message));
  };

  const loadImages = () => {
    axios
      .get(`${BASE_URL}/api/images/admin/all`, { headers: { Authorization: token } })
      .then(res => setImages(res.data))
      .catch(err => console.error("❌ Error loading images:", err.message));
  };

  const loadInquiries = () => {
    axios
      .get(`${BASE_URL}/api/inquiry`, { headers: { Authorization: token } })
      .then(res => {
        setInquiries(res.data.data || res.data);
        const unread = (res.data.data || res.data).filter(i => i.is_read === 0).length;
        setUnreadCount(unread);
      })
      .catch(err => console.error("❌ Error loading inquiries:", err.message));
  };

  const loadDeadlines = () => {
    axios
      .get(`${BASE_URL}/api/tax-deadlines`)
      .then(res => setDeadlines(res.data.data || res.data))
      .catch(err => console.error("❌ Error loading deadlines:", err.message));
  };

  const loadRegSummary = () => {
    axios
      .get(`${BASE_URL}/api/dashboard/summary`)
      .then(res => setRegSummary(res.data))
      .catch(err => console.error("❌ Error loading summary:", err.message));
  };

  const loadGalleryImages = (page = 1) => {
    const offset = (page - 1) * galleryPagination.limit;
    axios
      .get(`${BASE_URL}/api/gallery`, {
        params: { limit: 10, offset },
        headers: { Authorization: token }
      })
      .then(res => {
        setGalleryImages(res.data.data);
        setGalleryPagination(res.data.pagination);
        setGalleryPage(page);
      })
      .catch(err => console.error("❌ Error loading gallery:", err.message));
  };

  // Load all data on mount
  useEffect(() => {
    if (token) {
      loadServices();
      loadImages();
      loadInquiries();
      loadDeadlines();
      loadRegSummary();
      loadGalleryImages();
    }
  }, [token]);

  // Load registrations when tab or type changes
  useEffect(() => {
    if (activeTab !== "registrations") return;
    setRegLoading(true);
    setRegSearch("");
    axios
      .get(`${BASE_URL}/api/dashboard/${registrationType}`)
      .then(res => {
        setRegistrations(res.data.data || res.data);
        setRegLoading(false);
      })
      .catch(err => {
        console.error("❌ Error loading registrations:", err.message);
        setRegLoading(false);
      });
  }, [registrationType, activeTab]);

  // ================= DEADLINES HANDLERS =================
  const saveDeadline = () => {
    if (!deadlineForm.name || !deadlineForm.rule_day) {
      alert("Please fill required fields");
      return;
    }
    if (deadlineForm.frequency === "yearly" && !deadlineForm.rule_month) {
      alert("Please enter rule month");
      return;
    }
    if (!deadlineForm.is_auto && !deadlineForm.manual_due_date) {
      alert("Please select manual due date");
      return;
    }

    const payload = {
      ...deadlineForm,
      rule_day: Number(deadlineForm.rule_day),
      rule_month: deadlineForm.frequency === "yearly" ? Number(deadlineForm.rule_month) : null,
      manual_due_date: deadlineForm.is_auto ? null : deadlineForm.manual_due_date
    };

    if (editingId) {
      axios
        .put(`${BASE_URL}/api/tax-deadlines/${editingId}`, payload, { headers: { Authorization: token } })
        .then(() => {
          alert("✅ Deadline updated");
          resetDeadline();
        })
        .catch(() => alert("❌ Error updating deadline"));
    } else {
      axios
        .post(`${BASE_URL}/api/tax-deadlines`, payload, { headers: { Authorization: token } })
        .then(() => {
          alert("✅ Deadline saved");
          resetDeadline();
        })
        .catch(() => alert("❌ Error saving deadline"));
    }
  };

  const deleteDeadline = (id) => {
    if (!window.confirm("Delete this deadline?")) return;
    axios
      .delete(`${BASE_URL}/api/tax-deadlines/${id}`, { headers: { Authorization: token } })
      .then(() => {
        alert("✅ Deadline deleted");
        loadDeadlines();
      })
      .catch(() => alert("❌ Error deleting deadline"));
  };

  const resetDeadline = () => {
    setDeadlineForm({
      category: "ITR",
      name: "",
      form_type: "",
      frequency: "yearly",
      rule_day: "",
      rule_month: "",
      is_auto: true,
      manual_due_date: ""
    });
    setEditingId(null);
    loadDeadlines();
  };

  // ================= SERVICES HANDLERS =================
  const handleServiceImageChange = (e) => {
    const file = e.target.files?.[0];
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
    if (!form.title || !form.short_description || !form.full_description) {
      alert("Please fill all service fields");
      return;
    }

    axios
      .post(`${BASE_URL}/api/admin/services`, form, { headers: { Authorization: token } })
      .then(res => {
        const serviceId = res.data.id;
        if (serviceImageFile) {
          const formData = new FormData();
          formData.append("image", serviceImageFile);
          formData.append("service_id", serviceId);
          axios
            .post(`${BASE_URL}/api/admin/services/upload-image`, formData, {
              headers: { Authorization: token, "Content-Type": "multipart/form-data" }
            })
            .then(() => {
              alert("✅ Service added with image");
              resetServiceForm();
            })
            .catch(() => alert("❌ Error uploading service image"));
        } else {
          alert("✅ Service added");
          resetServiceForm();
        }
      })
      .catch(() => alert("❌ Error adding service"));
  };

  const resetServiceForm = () => {
    setForm({ title: "", short_description: "", full_description: "" });
    setServiceImageFile(null);
    setServiceImagePreview(null);
    loadServices();
  };

  const deleteService = (id) => {
    if (!window.confirm("Delete this service?")) return;
    axios
      .delete(`${BASE_URL}/api/admin/services/${id}`, { headers: { Authorization: token } })
      .then(() => {
        alert("✅ Service deleted");
        loadServices();
      })
      .catch(() => alert("❌ Error deleting service"));
  };

  // ================= IMAGES HANDLERS =================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageForm({ ...imageForm, file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = () => {
    if (!imageForm.file) {
      alert("Select an image first");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("image", imageForm.file);
    formData.append("image_type", imageForm.image_type);
    formData.append("image_name", imageForm.file.name);

    axios
      .post(`${BASE_URL}/api/images/upload`, formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" }
      })
      .then(() => {
        alert("✅ Image uploaded");
        setImageForm({ image_type: "owner", file: null, preview: null });
        const imageInput = document.getElementById("imageInput");
        if (imageInput) imageInput.value = "";
        loadImages();
      })
      .catch(() => alert("❌ Error uploading image"))
      .finally(() => setUploading(false));
  };

  const deleteImage = (id) => {
    if (!window.confirm("Delete this image?")) return;
    axios
      .delete(`${BASE_URL}/api/images/${id}`, { headers: { Authorization: token } })
      .then(() => {
        alert("✅ Image deleted");
        loadImages();
      })
      .catch(() => alert("❌ Error deleting image"));
  };

  // ================= INQUIRIES HANDLERS =================
  const markAsRead = (id) => {
    axios
      .put(`${BASE_URL}/api/inquiry/${id}/read`, {}, { headers: { Authorization: token } })
      .then(() => {
        alert("✅ Marked as read");
        loadInquiries();
      })
      .catch(() => alert("❌ Error updating inquiry"));
  };

  // ================= GALLERY HANDLERS =================
  const handleGalleryImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryForm({ ...galleryForm, file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadGalleryImage = () => {
    if (!galleryForm.file) {
      alert("Select an image first");
      return;
    }
    setGalleryUploading(true);
    const formData = new FormData();
    formData.append("image", galleryForm.file);
    formData.append("caption", galleryForm.caption);

    axios
      .post(`${BASE_URL}/api/gallery`, formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" }
      })
      .then(() => {
        alert("✅ Gallery image uploaded");
        setGalleryForm({ caption: "", file: null, preview: null });
        const galleryInput = document.getElementById("galleryInput");
        if (galleryInput) galleryInput.value = "";
        loadGalleryImages(1);
      })
      .catch(() => alert("❌ Error uploading gallery image"))
      .finally(() => setGalleryUploading(false));
  };

  const deleteGalleryImage = (id) => {
    if (!window.confirm("Delete this gallery image?")) return;
    axios
      .delete(`${BASE_URL}/api/gallery/${id}`, { headers: { Authorization: token } })
      .then(() => {
        alert("✅ Gallery image deleted");
        loadGalleryImages(1);
      })
      .catch(() => alert("❌ Error deleting gallery image"));
  };

  // ================= REGISTRATIONS HANDLERS =================
  const deleteRegistration = (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    axios
      .delete(`${BASE_URL}/api/dashboard/${registrationType}/${id}`, { headers: { Authorization: token } })
      .then(() => {
        setRegistrations(prev => prev.filter(r => r.id !== id));
        loadRegSummary();
        alert("✅ Registration deleted");
      })
      .catch(() => alert("❌ Error deleting registration"));
  };

  const filteredRegs = registrations.filter(r => {
    if (!regSearch.trim()) return true;
    const q = regSearch.toLowerCase();
    return (
      r.full_name?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.mobile?.includes(q)
    );
  });

  // ================= RENDER =================
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ══════════════════════════════════
           LEFT SIDEBAR
      ══════════════════════════════════ */}
      <div className="w-64 min-h-screen bg-gradient-to-b from-teal-700 to-teal-900 flex flex-col fixed left-0 top-0 z-30">
        {/* Brand */}
        <div className="px-6 py-7 border-b border-teal-600">
          <h1 className="text-xl font-bold text-white">⚙️ Admin Panel</h1>
          <p className="text-teal-300 text-xs mt-1">Manage Website</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {[
            { key: "services", label: "Services", icon: "📋" },
            { key: "images", label: "Images", icon: "🖼️" },
            { key: "gallery", label: "Gallery", icon: "🎨" },
            { key: "inquiries", label: "Inquiries", icon: "📩" },
            { key: "deadlines", label: "Deadlines", icon: "⏰" },
            { key: "registrations", label: "Registrations", icon: "📁" }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-white text-teal-700 shadow"
                  : "text-teal-100 hover:bg-teal-600"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.key === "inquiries" && unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Back to Home */}
        <div className="px-3 py-5 border-t border-teal-600">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-teal-100 hover:bg-teal-600 transition"
          >
            <span>🏠</span>
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════
           MAIN CONTENT
      ══════════════════════════════════ */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <h2 className="text-lg font-bold text-gray-700 capitalize">
            {activeTab.replace("-", " ")}
          </h2>
          <button onClick={() => setActiveTab("inquiries")} className="relative text-2xl hover:scale-110 transition">
            🔔
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 rounded-full text-white font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {/* ================= GALLERY ================= */}
          {activeTab === "gallery" && (
            <>
              <div className="bg-white p-6 rounded shadow mb-8 grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="font-bold mb-3">Upload Gallery Image</h2>
                  <textarea
                    className="w-full border p-2 mb-3 h-20 rounded"
                    placeholder="Image caption (optional)"
                    value={galleryForm.caption}
                    onChange={e => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                  />
                  <input
                    id="galleryInput"
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryImageChange}
                    className="mb-2 w-full"
                  />
                  <button
                    onClick={uploadGalleryImage}
                    disabled={galleryUploading}
                    className="bg-teal-500 text-white w-full py-2 rounded font-semibold hover:bg-teal-600 disabled:opacity-50"
                  >
                    {galleryUploading ? "Uploading..." : "Upload to Gallery"}
                  </button>
                </div>
                <div className="border-2 flex items-center justify-center h-48 rounded bg-gray-50">
                  {galleryForm.preview ? (
                    <img src={galleryForm.preview} alt="Preview" className="h-full rounded" />
                  ) : (
                    <p className="text-gray-400 text-center">Image Preview</p>
                  )}
                </div>
              </div>

              {/* Gallery Images Table */}
              <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Image</th>
                      <th className="p-3 text-left">Caption</th>
                      <th className="p-3 text-left">Uploaded</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleryImages.map(img => (
                      <tr key={img.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{img.id}</td>
                        <td className="p-3">
                          <img
                            src={`${BASE_URL}/${img.image_path}`}
                            alt="Gallery"
                            className="h-12 w-12 object-cover rounded"
                          />
                        </td>
                        <td className="p-3 max-w-xs truncate">{img.caption || "—"}</td>
                        <td className="p-3 text-gray-500 text-sm">
                          {new Date(img.uploaded_at).toLocaleDateString("en-IN")}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => deleteGalleryImage(img.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {galleryImages.length === 0 && (
                  <div className="p-8 text-center text-gray-400">No gallery images yet</div>
                )}
              </div>

              {/* Pagination */}
              {galleryPagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {Array.from({ length: galleryPagination.pages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => loadGalleryImages(page)}
                      className={`px-4 py-2 rounded ${
                        galleryPage === page
                          ? "bg-teal-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ================= DEADLINES ================= */}
          {activeTab === "deadlines" && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="font-bold mb-4 text-lg">Manage Tax Deadlines</h2>
              <select className="border p-2 w-full mb-2 rounded" value={deadlineForm.category} onChange={e => setDeadlineForm({ ...deadlineForm, category: e.target.value })}>
                <option value="ITR">Income Tax</option>
                <option value="GST">GST</option>
              </select>
              <input
                className="border p-2 w-full mb-2 rounded"
                placeholder="Name (Ex: GSTR-1, Salaried)"
                value={deadlineForm.name}
                onChange={e => setDeadlineForm({ ...deadlineForm, name: e.target.value })}
              />
              <input
                className="border p-2 w-full mb-2 rounded"
                placeholder="Form / Type"
                value={deadlineForm.form_type}
                onChange={e => setDeadlineForm({ ...deadlineForm, form_type: e.target.value })}
              />
              <select className="border p-2 w-full mb-2 rounded" value={deadlineForm.frequency} onChange={e => setDeadlineForm({ ...deadlineForm, frequency: e.target.value })}>
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
              </select>
              <input
                type="number"
                className="border p-2 w-full mb-2 rounded"
                placeholder="Rule Day (Example: 31 or 20)"
                value={deadlineForm.rule_day}
                onChange={e => setDeadlineForm({ ...deadlineForm, rule_day: e.target.value })}
              />
              {deadlineForm.frequency === "yearly" && (
                <input
                  type="number"
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Rule Month (1-12)"
                  value={deadlineForm.rule_month}
                  onChange={e => setDeadlineForm({ ...deadlineForm, rule_month: e.target.value })}
                />
              )}
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={deadlineForm.is_auto}
                  onChange={e => setDeadlineForm({ ...deadlineForm, is_auto: e.target.checked })}
                />
                Auto Mode
              </label>
              {!deadlineForm.is_auto && (
                <input
                  type="date"
                  className="border p-2 w-full mb-3 rounded"
                  value={deadlineForm.manual_due_date}
                  onChange={e => setDeadlineForm({ ...deadlineForm, manual_due_date: e.target.value })}
                />
              )}
              <button onClick={saveDeadline} className="bg-teal-500 text-white w-full py-2 rounded font-semibold hover:bg-teal-600">
                {editingId ? "Update Deadline" : "Save Deadline"}
              </button>
              <div className="mt-6 space-y-2">
                {deadlines.map(d => (
                  <div key={d.id} className="flex justify-between items-center border p-3 rounded hover:bg-gray-50">
                    <div>
                      <b>{d.name}</b> <span className="text-gray-500">({d.category})</span>
                      <span className="ml-2 text-sm text-gray-600">📅 {d.due_date}</span>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => {
                          setDeadlineForm({
                            category: d.category,
                            name: d.name,
                            form_type: d.form_type,
                            frequency: d.frequency,
                            rule_day: d.rule_day,
                            rule_month: d.rule_month,
                            is_auto: d.is_auto,
                            manual_due_date: d.manual_due_date ? d.manual_due_date.split("T")[0] : ""
                          });
                          setEditingId(d.id);
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteDeadline(d.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= SERVICES ================= */}
          {activeTab === "services" && (
            <>
              <div className="bg-white p-6 rounded shadow mb-8">
                <h2 className="font-bold mb-4">Add Service</h2>
                <input
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Title"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Short Description"
                  value={form.short_description}
                  onChange={e => setForm({ ...form, short_description: e.target.value })}
                />
                <textarea
                  className="w-full border p-2 mb-2 h-24 rounded"
                  placeholder="Full Description"
                  value={form.full_description}
                  onChange={e => setForm({ ...form, full_description: e.target.value })}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleServiceImageChange}
                  className="mb-2"
                />
                {serviceImagePreview && (
                  <img src={serviceImagePreview} alt="Preview" className="h-32 mt-2 rounded" />
                )}
                <button
                  onClick={addService}
                  className="bg-teal-500 text-white w-full py-2 mt-3 rounded font-semibold hover:bg-teal-600"
                >
                  Add Service
                </button>
              </div>
              <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Short Desc</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(s => (
                      <tr key={s.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{s.id}</td>
                        <td className="p-3 font-medium">{s.title}</td>
                        <td className="p-3">{s.short_description}</td>
                        <td className="p-3">
                          <button
                            onClick={() => deleteService(s.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
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
                    className="w-full border p-2 mb-3 rounded"
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
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-2"
                  />
                  <button
                    onClick={uploadImage}
                    disabled={uploading}
                    className="bg-teal-500 text-white w-full py-2 mt-3 rounded font-semibold hover:bg-teal-600 disabled:opacity-50"
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
                <div className="border-2 flex items-center justify-center h-48 rounded bg-gray-50">
                  {imageForm.preview ? (
                    <img src={imageForm.preview} alt="Preview" className="h-full rounded" />
                  ) : (
                    <p className="text-gray-400 text-center">Image Preview</p>
                  )}
                </div>
              </div>
              <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Preview</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {images.map(img => (
                      <tr key={img.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{img.id}</td>
                        <td className="p-3">{img.image_type}</td>
                        <td className="p-3">{img.image_name}</td>
                        <td className="p-3">
                          <a
                            href={`${BASE_URL}/uploads/${img.image_name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </a>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => deleteImage(img.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
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
            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Message</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map(i => (
                    <tr
                      key={i.id}
                      className={`border-t hover:bg-gray-50 ${i.is_read === 0 ? "bg-yellow-50" : ""}`}
                    >
                      <td className="p-3">{i.id}</td>
                      <td className="p-3 font-medium">
                        {i.name}
                        {i.visit_count > 1 && (
                          <span className="ml-2 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                            🔁 Returning ({i.visit_count}x)
                          </span>
                        )}
                      </td>
                      <td className="p-3">{i.email}</td>
                      <td className="p-3">{i.phone}</td>
                      <td className="p-3 max-w-xs truncate">{i.message}</td>
                      <td className="p-3">
                        {i.is_read === 0 ? (
                          <button
                            onClick={() => markAsRead(i.id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                          >
                            Mark Read
                          </button>
                        ) : (
                          <span className="text-green-600 font-semibold">✅ Read</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {inquiries.length === 0 && (
                <div className="p-8 text-center text-gray-400">No inquiries found</div>
              )}
            </div>
          )}

          {/* ================= REGISTRATIONS ================= */}
          {activeTab === "registrations" && (
            <div>
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { key: "income-tax", label: "Income Tax", count: regSummary.income_tax },
                  { key: "gst", label: "GST", count: regSummary.gst },
                  { key: "udyam", label: "Udyam", count: regSummary.udyam }
                ].map(card => (
                  <button
                    key={card.key}
                    onClick={() => setRegistrationType(card.key)}
                    className={`bg-white rounded-lg shadow p-5 text-left border-l-4 transition hover:-translate-y-0.5 ${
                      registrationType === card.key ? "border-teal-500" : "border-gray-200"
                    }`}
                  >
                    <div className="text-3xl font-bold text-teal-600">{card.count}</div>
                    <div className="text-sm text-gray-500 mt-1">📁 {card.label} Registrations</div>
                  </button>
                ))}
              </div>

              {/* Sub Tabs */}
              <div className="flex gap-3 mb-4">
                {[
                  { key: "income-tax", label: "📑 Income Tax" },
                  { key: "gst", label: "🏪 GST" },
                  { key: "udyam", label: "🏭 Udyam" }
                ].map(t => (
                  <button
                    key={t.key}
                    onClick={() => setRegistrationType(t.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      registrationType === t.key
                        ? "bg-teal-500 text-white"
                        : "bg-white text-gray-500 border border-gray-200 hover:border-teal-300"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex justify-between items-center mb-4">
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:border-teal-400"
                  placeholder="🔍 Search by name, email, mobile..."
                  value={regSearch}
                  onChange={e => setRegSearch(e.target.value)}
                />
                <span className="text-sm text-gray-500">{filteredRegs.length} record(s)</span>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                {regLoading ? (
                  <div className="p-12 text-center text-gray-400">⏳ Loading...</div>
                ) : filteredRegs.length === 0 ? (
                  <div className="p-12 text-center text-gray-400">No records found</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 sticky top-0">
                      {registrationType === "income-tax" && (
                        <tr>
                          {[
                            "#", "Name", "Email", "Mobile", "PAN", "Aadhaar", "Salary",
                            "House Prop.", "Pension", "Agri.", "Cap. Gain", "Int. Savings",
                            "Int. Deposit", "Int. Refund", "Enh. Comp", "Other Int.",
                            "PAN Photo", "Aadhaar Front", "Aadhaar Back", "Date", "Action"
                          ].map(h => (
                            <th key={h} className="p-3 text-left whitespace-nowrap font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      )}
                      {registrationType === "gst" && (
                        <tr>
                          {[
                            "#", "Name", "Email", "Mobile", "PAN", "Aadhaar", "PAN Photo",
                            "Aadhaar", "Proprietor", "Address Proof", "Shop Act", "Udyam Cert",
                            "Shop Photo", "Bank Proof", "Signature", "Date", "Action"
                          ].map(h => (
                            <th key={h} className="p-3 text-left whitespace-nowrap font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      )}
                      {registrationType === "udyam" && (
                        <tr>
                          {[
                            "#", "Name", "Email", "Mobile", "PAN", "Aadhaar", "PAN Photo",
                            "Aadhaar", "Proprietor", "Address Proof", "Shop Act", "Bank Proof",
                            "Signature", "Date", "Action"
                          ].map(h => (
                            <th key={h} className="p-3 text-left whitespace-nowrap font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      )}
                    </thead>
                    <tbody>
                      {filteredRegs.map((row, i) => (
                        <tr key={row.id} className="border-t hover:bg-gray-50">
                          {registrationType === "income-tax" && (
                            <>
                              <td className="p-3">{i + 1}</td>
                              <td className="p-3 font-medium whitespace-nowrap">{row.full_name}</td>
                              <td className="p-3 whitespace-nowrap">{row.email}</td>
                              <td className="p-3">{row.mobile}</td>
                              <td className="p-3">{row.pan_number}</td>
                              <td className="p-3">{row.aadhaar_number}</td>
                              <td className="p-3">₹{row.salary_income || 0}</td>
                              <td className="p-3">₹{row.house_property_income || 0}</td>
                              <td className="p-3">₹{row.family_pension_income || 0}</td>
                              <td className="p-3">₹{row.agricultural_income || 0}</td>
                              <td className="p-3">₹{row.capital_gain_112a || 0}</td>
                              <td className="p-3">₹{row.interest_savings || 0}</td>
                              <td className="p-3">₹{row.interest_deposits || 0}</td>
                              <td className="p-3">₹{row.interest_refund || 0}</td>
                              <td className="p-3">₹{row.interest_enhanced_comp || 0}</td>
                              <td className="p-3">₹{row.other_interest_income || 0}</td>
                              <td className="p-3">
                                <FileBtn filePath={row.pan_photo} label="PAN" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.aadhaar_photo} label="Front" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.aadhaar_back_photo} label="Back" />
                              </td>
                              <td className="p-3 text-gray-400 text-xs whitespace-nowrap">
                                {new Date(row.created_at).toLocaleDateString("en-IN")}
                              </td>
                              <td className="p-3">
                                <button
                                  onClick={() => deleteRegistration(row.id)}
                                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition"
                                >
                                  Delete
                                </button>
                              </td>
                            </>
                          )}

                          {registrationType === "gst" && (
                            <>
                              <td className="p-3">{i + 1}</td>
                              <td className="p-3 font-medium whitespace-nowrap">{row.full_name}</td>
                              <td className="p-3 whitespace-nowrap">{row.email}</td>
                              <td className="p-3">{row.mobile}</td>
                              <td className="p-3">{row.pan_number}</td>
                              <td className="p-3">{row.aadhaar_number}</td>
                              <td className="p-3">
                                <FileBtn filePath={row.pan_photo} label="PAN" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.aadhaar_photo} label="Aadhaar" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.proprietor_photo} label="Proprietor" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.business_address_proof} label="Address" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.shop_act_license} label="Shop Act" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.udyam_certificate} label="Udyam" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.shop_photo} label="Shop" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.bank_proof} label="Bank" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.signature} label="Sign" />
                              </td>
                              <td className="p-3 text-gray-400 text-xs whitespace-nowrap">
                                {new Date(row.created_at).toLocaleDateString("en-IN")}
                              </td>
                              <td className="p-3">
                                <button
                                  onClick={() => deleteRegistration(row.id)}
                                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition"
                                >
                                  Delete
                                </button>
                              </td>
                            </>
                          )}

                          {registrationType === "udyam" && (
                            <>
                              <td className="p-3">{i + 1}</td>
                              <td className="p-3 font-medium whitespace-nowrap">{row.full_name}</td>
                              <td className="p-3 whitespace-nowrap">{row.email}</td>
                              <td className="p-3">{row.mobile}</td>
                              <td className="p-3">{row.pan_number}</td>
                              <td className="p-3">{row.aadhaar_number}</td>
                              <td className="p-3">
                                <FileBtn filePath={row.pan_photo} label="PAN" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.aadhaar_photo} label="Aadhaar" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.proprietor_photo} label="Proprietor" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.business_address_proof} label="Address" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.shop_act_license} label="Shop Act" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.bank_proof} label="Bank" />
                              </td>
                              <td className="p-3">
                                <FileBtn filePath={row.signature} label="Sign" />
                              </td>
                              <td className="p-3 text-gray-400 text-xs whitespace-nowrap">
                                {new Date(row.created_at).toLocaleDateString("en-IN")}
                              </td>
                              <td className="p-3">
                                <button
                                  onClick={() => deleteRegistration(row.id)}
                                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition"
                                >
                                  Delete
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}