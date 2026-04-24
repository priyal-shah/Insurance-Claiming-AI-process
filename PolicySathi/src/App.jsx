import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResultProvider } from "./context/ResultContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Claims from "./pages/Claims";
import Upload from "./pages/Upload";
import Report from "./pages/Report";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <ResultProvider>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/report" element={<Report />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
      </BrowserRouter>
    </ResultProvider>
  );
}