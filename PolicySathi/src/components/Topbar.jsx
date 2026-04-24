export default function Topbar() {
  return (
    <div className="flex justify-between items-center mb-8">

      <input
        placeholder="Search claims / policies..."
        className="bg-white/5 border border-white/10 p-3 rounded-2xl w-full max-w-xl outline-none"
      />

      <div className="flex gap-3 ml-4">

        <button className="bg-white/5 p-3 rounded-2xl">
          🔔
        </button>

        <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black">
          A
        </div>

      </div>

    </div>
  );
}