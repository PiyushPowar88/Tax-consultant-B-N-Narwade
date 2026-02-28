import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:5000";

export default function GalleryPage() {
      const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 12,
    offset: 0,
    pages: 1,
    currentPage: 1
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  // Load images
  const loadGallery = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const offset = (page - 1) * pagination.limit;
      const response = await axios.get(`${BASE_URL}/api/gallery`, {
        params: {
          limit: pagination.limit,
          offset
        }
      });

      if (response.data.success) {
        setImages(response.data.data);
        setPagination(prev => ({
          ...prev,
          ...response.data.pagination,
          currentPage: page
        }));

        const loadingStates = {};
        response.data.data.forEach(img => {
          loadingStates[img.id] = true;
        });
        setImageLoadingStates(loadingStates);
      }
    } catch (err) {
      console.error("❌ Error loading gallery:", err.message);
      setError("Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  // Load gallery on mount
  useEffect(() => {
    loadGallery(1);
  }, []);

  // Handle image load
  const handleImageLoad = (imageId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [imageId]: false
    }));
  };

  // Handle pagination
  const goToPage = (page) => {
    if (page < 1 || page > pagination.pages) return;
    loadGallery(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Lightbox navigation
  const handlePrevImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    }
  };

  const handleNextImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, images]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-teal-100 text-lg max-w-2xl">
            Discover our professional workspace, team, and projects
          </p>
        </div>
      </div>
<div className="pt-6 pl-6">
  <button
    onClick={() => navigate("/")}
    className="
      inline-flex
      items-center
      gap-2
      bg-gradient-to-r from-teal-500 to-cyan-500
      text-white
      px-7 py-3
      rounded-full
      shadow-md
      hover:from-teal-600
      hover:to-cyan-600
      transition-all duration-300
      font-semibold
    "
  >
    ← Back to Home
  </button>
</div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">⚠️ {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && images.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500 text-xl">No gallery images yet</p>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 text-left"
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
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                        imageLoadingStates[image.id] ? "opacity-0" : "opacity-100"
                      }`}
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay with caption */}
                  {image.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white font-medium text-sm line-clamp-3">
                        {image.caption}
                      </p>
                    </div>
                  )}

                  {/* Hover icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 rounded-full p-3 backdrop-blur-sm">
                      <svg
                        className="w-6 h-6 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 12a2 2 0 100-4 2 2 0 000 4z"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => goToPage(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Page numbers */}
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        pagination.currentPage === page
                          ? "bg-teal-600 text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => goToPage(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.pages}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Image count */}
            <p className="text-center text-gray-500 text-sm mt-6">
              Showing {images.length} of {pagination.total} images
            </p>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition"
              aria-label="Close"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image container */}
            <div className="relative flex-1 overflow-hidden bg-black rounded-lg">
              <img
                src={`${BASE_URL}/${selectedImage.image_path}`}
                alt={selectedImage.caption || "Gallery image"}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Caption */}
            {selectedImage.caption && (
              <p className="text-white mt-4 text-center text-lg">
                {selectedImage.caption}
              </p>
            )}

            {/* Navigation buttons */}
            {images.length > 1 && (
              <div className="flex justify-between items-center mt-4 gap-4">
                <button
                  onClick={handlePrevImage}
                  disabled={images[0].id === selectedImage.id}
                  className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <span className="text-white text-sm font-medium">
                  {images.findIndex(img => img.id === selectedImage.id) + 1} / {images.length}
                </span>

                <button
                  onClick={handleNextImage}
                  disabled={images[images.length - 1].id === selectedImage.id}
                  className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                  aria-label="Next image"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Keyboard hint */}
            <p className="text-gray-400 text-xs text-center mt-4">
              Use arrow keys to navigate • Press ESC to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}