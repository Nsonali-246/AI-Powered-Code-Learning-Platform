import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const [tutorials, setTutorials] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  // 🔹 Fetch tutorials
  const fetchTutorials = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tutorials");
      const data = await res.json();
      setTutorials(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  // 🔹 Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE
        const res = await fetch(
          `http://localhost:5000/api/tutorials/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
          }
        );

        const updated = await res.json();

        setTutorials(
          tutorials.map((t) =>
            t._id === editingId ? updated : t
          )
        );

        setEditingId(null);
      } else {
        // CREATE
        const res = await fetch(
          "http://localhost:5000/api/tutorials",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
          }
        );

        const data = await res.json();

        setTutorials([data, ...tutorials]);
      }

      setForm({ title: "", content: "" });
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // 🔹 Delete tutorial
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tutorials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTutorials(tutorials.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔥 Navbar */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-xl mb-6">
        <h1 className="text-xl font-bold text-indigo-600">
          CodeLearn 🚀
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Hi, {user?.name}
          </span>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔥 Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Tutorial" : "Create Tutorial"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Title"
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            placeholder="Content"
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
          />

          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      </div>

      {/* 🔥 Tutorials */}
      <div className="grid md:grid-cols-2 gap-4">
        {tutorials.map((t) => (
          <div
            key={t._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg text-indigo-600">
              {t.title}
            </h3>

            <p className="text-gray-600 mt-2">
              {t.content}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-400">
                By {t.user?.name}
              </span>

              {user?._id === t.user?._id && (
                <div className="flex gap-2">

                  {/* Edit */}
                  <button
                    onClick={() => {
                      setForm({
                        title: t.title,
                        content: t.content,
                      });
                      setEditingId(t._id);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;