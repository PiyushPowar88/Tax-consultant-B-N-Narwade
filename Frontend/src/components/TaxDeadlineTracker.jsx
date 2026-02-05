import { useEffect, useState } from "react";
import axios from "axios";

/* ================= DATE HELPERS ================= */

function getToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function getDaysLeft(dateStr) {
  const d = new Date(dateStr);

  const due = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const today = getToday();

  const diff = due - today;

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  const d = new Date(dateStr);

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ================= URGENCY ================= */

function getUrgency(daysLeft) {
  if (daysLeft <= 0) return { color: "bg-gray-500", label: "Expired" };

  if (daysLeft <= 7) return { color: "bg-red-500", label: "Urgent" };

  if (daysLeft <= 30) return { color: "bg-orange-500", label: "Hurry" };

  return { color: "bg-green-500", label: "Safe" };
}

/* ================= MAIN ================= */

export default function TaxDeadlineTracker() {
  const [data, setData] = useState([]);

  const loadDeadlines = () => {
    axios
      .get("http://localhost:5000/api/tax-deadlines")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDeadlines();
  }, []);

  // Split categories
  const itrData = data.filter((d) => d.category === "ITR");
  const gstData = data.filter((d) => d.category === "GST");

  /* ================= CARD ================= */

  const renderCard = (item) => {
    const daysLeft = getDaysLeft(item.due_date);
    const urgency = getUrgency(daysLeft);

    const progress = Math.min(100, Math.max(0, ((120 - daysLeft) / 120) * 100));

    return (
      <div key={item.id} className="p-4 bg-gray-50 rounded-xl shadow border">
        <div className="flex justify-between mb-2">
          <h3 className="font-bold text-2xl">{item.name}</h3>

          <span className="text-xl text-gray-600">{item.category}</span>
        </div>

        {item.form_type && (
          <p className="text-lg text-gray-600 mb-2">
            Form / Type: <b>{item.form_type}</b>
          </p>
        )}

        <p className="text-lg text-gray-600 mb-3">
          Due: <b>{formatDate(item.due_date)}</b>
        </p>

        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className={`h-4 ${urgency.color}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between mt-2 text-lg font-medium">
          <span>
            {daysLeft > 0 ? `${daysLeft} Days Left` : "Deadline Passed"}
          </span>

          <span
            className={`font-bold ${
              urgency.label === "Safe"
                ? "text-green-600"
                : urgency.label === "Hurry"
                  ? "text-orange-600"
                  : urgency.label === "Urgent"
                    ? "text-red-600"
                    : "text-gray-600"
            }`}
          >
            {urgency.label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="py-8 mt-2 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12">
          Tax Due Date Tracker
        </h2>

        {/* ================= ITR ================= */}

        <h3 className="text-3xl font-bold mb-4 text-blue-700">📄 Income Tax</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {itrData.map(renderCard)}
        </div>

        {/* ================= GST ================= */}

        <h3 className="text-2xl font-bold mb-4 text-green-700">🧾 GST</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gstData.map(renderCard)}
        </div>
      </div>
    </div>
  );
}
