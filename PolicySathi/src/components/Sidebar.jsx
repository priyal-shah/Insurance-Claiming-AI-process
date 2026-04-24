import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
     ["Upload", "/upload"],
    ["Dashboard", "/dashboard"],
    ["Claims", "/claims"],
    ["Risk Report", "/report"],
    ["Alerts", "/alerts"],
    /*["Analytics", "/analytics"],
    ["Settings", "/settings"],*/
  ];

  return (
    <div className="w-72 bg-white/5 border-r border-white/10 p-6 hidden md:block">

      <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        PolicySathi
      </h1>

      {menu.map(([name, path]) => (
        <Link
          key={path}
          to={path}
          className={`block p-4 rounded-2xl mb-2 transition ${
            pathname === path
              ? "bg-cyan-500 text-black font-semibold"
              : "hover:bg-white/5"
          }`}
        >
          {name}
        </Link>
      ))}

    </div>
  );
}