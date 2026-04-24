import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadZone() {
  const [fileName, setFileName] = useState("");

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFileName(acceptedFiles[0].name);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-cyan-400 bg-cyan-500/5 p-12 rounded-3xl text-center cursor-pointer"
    >
      <input {...getInputProps()} />

      <h2 className="text-2xl font-bold">
        Drop Claim File Here
      </h2>

      <p className="text-slate-400 mt-2">
        PDF / DOCX / Image Supported
      </p>

      <button className="mt-5 px-6 py-3 bg-cyan-500 text-black rounded-2xl font-semibold">
        Browse File
      </button>

      {fileName && (
        <div className="mt-5 text-emerald-400 font-medium">
          Uploaded: {fileName}
        </div>
      )}
    </div>
  );
}