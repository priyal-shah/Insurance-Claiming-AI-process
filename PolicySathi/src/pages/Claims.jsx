import AppLayout from "../layout/AppLayout";
import { queueData } from "../data/ragMockData";

export default function Claims() {
  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Claims Review Center
      </h1>

      <div className="space-y-4">

        {queueData.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 border border-white/10 p-5 rounded-3xl flex justify-between"
          >
            <div>
              <div className="font-semibold">{item.id}</div>
              <div className="text-slate-400">{item.customer}</div>
            </div>

            <div>{item.amount}</div>

            <div>{item.status}</div>

          </div>
        ))}

      </div>

    </AppLayout>
  );
}