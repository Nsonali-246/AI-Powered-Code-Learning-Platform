import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

    const { login } = useAuth();
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      console.log(data);
      login(data);
      navigate("/dashboard");

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200 font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-500 hover:underline">
            Register
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;