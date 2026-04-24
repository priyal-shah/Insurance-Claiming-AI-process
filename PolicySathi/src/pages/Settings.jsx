import AppLayout from "../layout/AppLayout";

export default function Settings() {
  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">

          <h2 className="text-xl font-semibold mb-4">
            Preferences
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Dark Mode</span>
              <span>ON</span>
            </div>

            <div className="flex justify-between">
              <span>Email Alerts</span>
              <span>ON</span>
            </div>

            <div className="flex justify-between">
              <span>Push Notifications</span>
              <span>OFF</span>
            </div>

          </div>

        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">

          <h2 className="text-xl font-semibold mb-4">
            Region Rules
          </h2>

          <select className="w-full bg-white/5 p-3 rounded-2xl border border-white/10">
            <option>India</option>
            <option>USA</option>
            <option>EU</option>
            <option>UAE</option>
          </select>

          <button className="mt-5 w-full bg-cyan-500 text-black p-3 rounded-2xl font-semibold">
            Save Settings
          </button>

        </div>

      </div>

    </AppLayout>
  );
}