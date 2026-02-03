import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSecret() {

  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Hardcoded password (Change this!)
  const ADMIN_SECRET = "12345";


  const verifySecret = () => {

    if (secret === ADMIN_SECRET) {
      navigate("/admin-signup");
    } else {
      setError("Invalid access password");
    }

  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 to-cyan-600 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-3">
          Admin Access
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Enter admin password to continue
        </p>


        <input
          type="password"
          placeholder="Enter secret password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg mb-4 focus:ring-2 focus:ring-teal-500 outline-none"
        />


        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}


        <button
          onClick={verifySecret}
          className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-3 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition"
        >
          Verify
        </button>


        <div className="mt-5 text-center">

          <a href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Login
          </a>

        </div>

      </div>

    </div>
  );
}
