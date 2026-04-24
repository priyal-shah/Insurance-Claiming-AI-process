import AppLayout from "../layout/AppLayout";

export default function Settings() {
  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">

        <select className="w-full bg-white/5 p-3 rounded-2xl border border-white/10">
          <option>India</option>
          <option>USA</option>
          <option>EU</option>
        </select>

        <button className="mt-5 w-full bg-cyan-500 text-black p-3 rounded-2xl font-semibold">
          Save Settings
        </button>

      </div>

    </AppLayout>
  );
}