import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT BRAND PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-600 text-white flex-col justify-center px-16">
        <h1 className="text-5xl font-bold mb-6">
          Bellcorp
        </h1>

        <p className="text-lg opacity-90 leading-relaxed">
          Start managing your expenses smarter.
          Build financial discipline with powerful insights.
        </p>

        <div className="mt-10">
          <div className="h-1 w-24 bg-white rounded-full"></div>
        </div>
      </div>

      {/* RIGHT REGISTER PANEL */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-6">
        <form
          onSubmit={submitHandler}
          className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Join Bellcorp Expense Tracker
          </p>

          <div className="space-y-5">

            <div>
              <label className="text-sm text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition shadow-md"
          >
            Create Account
          </button>

          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-purple-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
