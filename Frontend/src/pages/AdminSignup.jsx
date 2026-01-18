import { useState } from "react";
import axios from "axios";

export default function AdminSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const signup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/signup",
        form
      );

      alert(res.data.message);
      window.location.href = "/admin"; // go to login
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-80">
        <h2 className="text-2xl font-bold text-center">Admin Signup</h2>

        <input
          className="border p-2 w-full mt-4"
          placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          className="border p-2 w-full mt-4"
          placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          className="border p-2 w-full mt-4"
          type="password"
          placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button
          onClick={signup}
          className="bg-green-600 text-white w-full py-2 mt-4"
        >
          Create Admin
        </button>
      </div>
    </div>
  );
}
