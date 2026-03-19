import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API_URL from '../config';


const BASE_URL = API_URL;

const CATEGORIES = ["All", "GST", "Income Tax", "Business", "Compliance", "General"];

export default function BlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/blogs`)
      .then((res) => {
  setBlogs(res.data);
          setLoading(false);
      })
      .catch((err) => {
        console.error("Could not load blogs:", err.message);
        setLoading(false);
      });
  }, []);

  const filtered = Array.isArray(blogs)
  ? activeCategory === "All"
    ? blogs
    : blogs.filter((b) => b.category === activeCategory)
  : [];

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-teal-500 border-t-transparent" />
      </div>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <div className="w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mb-5 mx-auto rounded" />
          <p className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-2">
            Our Blog
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Latest Insights & Updates
          </h2>
          <p className="text-gray-500 text-base lg:text-lg max-w-2xl mx-auto">
            Stay informed with expert articles on GST, Income Tax, compliance,
            and financial planning.
          </p>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                activeCategory === cat
                  ? "bg-teal-500 text-white border-teal-500 shadow"
                  : "bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Cards Grid ── */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No blogs in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/blogs/${blog.id}`)}
                className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {blog.image_path ? (
                    <img
                      src={`${BASE_URL}/api/blogs/${blog.id}/image`}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center">
                      <span className="text-5xl opacity-30">📰</span>
                    </div>
                  )}
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {blog.category || "General"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
                    {blog.summary}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold">
                        {blog.author?.charAt(0)?.toUpperCase() || "A"}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{blog.author || "Admin"}</span>
                    </div>
                    <span className="text-xs text-gray-400">{formatDate(blog.created_at)}</span>
                  </div>
                </div>

                {/* Read More */}
                <div className="px-5 pb-5">
                  <span className="inline-flex items-center gap-1 text-teal-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Read More <span className="text-base">→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── View All Button ── */}
        {blogs.length > 3 && (
          <div className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/blogs")}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold px-10 py-3 rounded-xl shadow-lg transition text-sm lg:text-base"
            >
              View All Articles
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}