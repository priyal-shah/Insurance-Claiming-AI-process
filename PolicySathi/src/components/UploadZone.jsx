import { useDropzone } from "react-dropzone";

export default function UploadZone() {
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-cyan-400 p-12 rounded-3xl text-center bg-cyan-500/5 cursor-pointer"
    >
      <input {...getInputProps()} />

      <h2 className="text-2xl font-bold">
        Drop Claim File Here
      </h2>

      <p className="text-slate-400 mt-2">
        PDF / DOCX / Images Supported
      </p>

      <button className="mt-5 px-6 py-3 bg-cyan-500 text-black rounded-2xl font-semibold">
        Browse File
      </button>

    </div>
  );
}