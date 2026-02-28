import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

export default function HomeGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  useEffect(() => {
    const loadFeaturedImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BASE_URL}/api/gallery/featured?limit=4`);
        
        console.log("Gallery API Response:", response.data); // Debug log
        
        if (response.data.success && response.data.data) {
          setImages(response.data.data);
          const loadingStates = {};
          response.data.data.forEach(img => {
            loadingStates[img.id] = true;
          });
          setImageLoadingStates(loadingStates);
        } else if (Array.isArray(response.data)) {
          // Handle if response is directly an array
          setImages(response.data);
          const loadingStates = {};
          response.data.forEach(img => {
            loadingStates[img.id] = true;
          });
          setImageLoadingStates(loadingStates);
        }
      } catch (err) {
        console.error("❌ Error loading gallery:", err);
        console.error("Error message:", err.message);
        console.error("Error response:", err.response?.data);
        // Don't set error - just show empty state with button
        setError(null);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedImages();
  }, []);

  const handleImageLoad = (imageId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [imageId]: false
    }));
  };

  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
            Our Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our professional workspace and team in action
          </p>
          <div className="w-16 h-1 bg-teal-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 mb-12">
            <p className="text-gray-500 text-lg mb-4">⚠️ {error}</p>
            <p className="text-gray-400 text-sm">Please check the browser console for details</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 mb-12">
            <p className="text-gray-500 text-lg mb-4">📷 No gallery images yet</p>
            <p className="text-gray-400 text-sm">Images will appear here once they are uploaded from the admin panel</p>
          </div>
        ) : (
          <>
            {/* Gallery Grid - Only shown if images exist */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gray-200 aspect-square">
                    {/* Skeleton loader */}
                    {imageLoadingStates[image.id] && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    )}
                    
                    <img
                      src={`${BASE_URL}/${image.image_path}`}
                      alt={image.caption || "Gallery image"}
                      onLoad={() => handleImageLoad(image.id)}
                      onError={(e) => {
                        console.error("Image failed to load:", image.image_path);
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%239ca3af' text-anchor='middle' dy='.3em'%3EImage not found%3C/text%3E%3C/svg%3E";
                        handleImageLoad(image.id);
                      }}
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                        imageLoadingStates[image.id] ? "opacity-0" : "opacity-100"
                      }`}
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay with caption */}
                  {image.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white font-medium text-sm line-clamp-2">
                        {image.caption}
                      </p>
                    </div>
                  )}

                  {/* Hover icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 rounded-full p-3 backdrop-blur-sm">
                      <svg
                        className="w-5 h-5 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* View More Button - ALWAYS VISIBLE */}
        <div className="flex justify-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <span>View Full Gallery</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Debug Info (Remove in production) */}
        {/* {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
            <p>🔍 Debug Info: {images.length} images loaded | Loading: {loading.toString()}</p>
            <p>📍 API URL: {BASE_URL}/api/gallery/featured</p>
          </div> */}
        {/* )} */}
      </div>
    </section>
  );
}