import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function UploadZone() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "YOUR_API_URL_HERE",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-cyan-400 p-12 rounded-3xl text-center cursor-pointer"
    >
      <input {...getInputProps()} />

      <h2 className="text-2xl font-bold">
        Upload Claim File
      </h2>

      {fileName && (
        <p className="mt-3 text-slate-300">
          {fileName}
        </p>
      )}

      {loading && (
        <p className="mt-3 text-cyan-400">
          Uploading...
        </p>
      )}

      {result && (
        <div className="mt-4 text-emerald-400">
          Success
        </div>
      )}
    </div>
  );
}