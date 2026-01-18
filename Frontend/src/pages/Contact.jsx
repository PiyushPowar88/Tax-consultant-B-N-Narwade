import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", message: ""
  });

  const submitForm = () => {
    axios.post("http://localhost:5000/api/inquiry", form)
      .then(() => alert("Inquiry submitted successfully"))
      .catch(()=>alert("Backend not running"));
  };

  return (
    <>
      <Navbar />

      <div className="p-10 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-center">Contact Us</h2>

        <input className="border p-2 w-full mt-4" placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })} />

        <input className="border p-2 w-full mt-4" placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <input className="border p-2 w-full mt-4" placeholder="Phone"
          onChange={e => setForm({ ...form, phone: e.target.value })} />

        <textarea className="border p-2 w-full mt-4" placeholder="Message"
          onChange={e => setForm({ ...form, message: e.target.value })} />

        <button onClick={submitForm}
          className="bg-blue-900 text-white px-6 py-2 mt-4 w-full">
          Submit
        </button>
      </div>
    </>
  );
}
