import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from '../config';


const BASE_URL = API_URL;

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    axios
      .get(`${BASE_URL}/api/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Blog not found:", err.message);
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent" />
        </div>
        <Footer />
      </>
    );
  }

  if (notFound || !blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <p className="text-6xl mb-4">📄</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog Not Found</h2>
          <p className="text-gray-500 mb-6">This article may have been removed or doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
          >
            ← Back to Home
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-800 transition mb-6 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back
          </button>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            {/* Cover Image */}
            {blog.image_path && (
              <div className="w-full h-64 sm:h-80 overflow-hidden">
                <img
                  src={`${BASE_URL}/api/blogs/${blog.id}/image`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 sm:p-10">

              {/* Category + Date */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {blog.category || "General"}
                </span>
                <span className="text-gray-400 text-sm">{formatDate(blog.created_at)}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-snug">
                {blog.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                  {blog.author?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{blog.author || "Admin"}</p>
                  <p className="text-xs text-gray-400">B N Narwade & Co.</p>
                </div>
              </div>

              {/* Summary */}
              {blog.summary && (
                <p className="text-lg text-gray-600 font-medium leading-relaxed mb-6 italic border-l-4 border-teal-400 pl-4">
                  {blog.summary}
                </p>
              )}

              {/* Full Content */}
              <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                {blog.content}
              </div>

              {/* Footer CTA */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-gray-500 text-sm">
                  Found this helpful? Share it with your network.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold px-6 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition shadow"
                >
                  ← Back to Home
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}