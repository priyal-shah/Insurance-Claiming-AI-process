export default function Tables({ rows }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10">

      <table className="w-full text-left">

        <thead className="bg-white/5">
          <tr>
            <th className="p-4">Claim ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>

          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-white/10 hover:bg-white/5"
            >
              <td className="p-4">{row.id}</td>
              <td className="p-4">{row.customer}</td>
              <td className="p-4">{row.amount}</td>
              <td className="p-4">

                <span className={`px-3 py-1 rounded-full text-sm ${
                  row.status === "Approved"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : row.status === "Pending"
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-rose-500/20 text-rose-300"
                }`}>
                  {row.status}
                </span>

              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}