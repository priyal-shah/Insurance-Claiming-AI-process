import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-darkbg text-white">
      <Sidebar />

      <div className="flex-1 p-6">
        <Topbar />
        {children}
      </div>
    </div>
  );
}