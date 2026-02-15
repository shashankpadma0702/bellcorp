import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-10">Bellcorp</h2>

      <nav className="space-y-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="block w-full text-left hover:bg-gray-800 p-2 rounded"
        >
          Dashboard
        </button>

        <button
          onClick={logout}
          className="block w-full text-left hover:bg-red-600 p-2 rounded"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
