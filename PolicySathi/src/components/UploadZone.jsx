import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useResult } from "../context/ResultContext";

export default function UploadZone() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setResult } = useResult();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Upload failed");
    }

    setLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false
  });

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high": return "text-red-400 bg-red-400/10";
      case "medium": return "text-amber-400 bg-amber-400/10";
      case "low": return "text-emerald-400 bg-emerald-400/10";
      default: return "text-slate-400 bg-slate-400/10";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "high risk": return "text-red-400";
      case "medium risk": return "text-amber-400";
      case "low risk": return "text-yellow-400";
      default: return "text-emerald-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-cyan-400 p-12 rounded-3xl text-center cursor-pointer hover:bg-cyan-400/5 transition-colors"
      >
        <input {...getInputProps()} />
        <h2 className="text-2xl font-bold">Upload Claim File</h2>
        {fileName && <p className="mt-3 text-slate-300">{fileName}</p>}
        {loading && <p className="mt-3 text-cyan-400">Analyzing...</p>}
        {error && <p className="mt-3 text-red-400">{error}</p>}
      </div>
    </div>
  );
}