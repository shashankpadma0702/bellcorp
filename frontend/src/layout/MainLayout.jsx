import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-10 min-h-screen">
        {children}
      </div>
    </div>
  );
}
