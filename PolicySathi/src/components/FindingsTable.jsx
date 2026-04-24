export default function FindingsTable({ findings }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10">

      <table className="w-full text-left">

        <thead className="bg-white/5">
          <tr>
            <th className="p-4">Issue</th>
            <th className="p-4">Severity</th>
            <th className="p-4">Confidence</th>
            <th className="p-4">Rule</th>
          </tr>
        </thead>

        <tbody>

          {findings.map((item) => (
            <tr
              key={item.id}
              className="border-t border-white/10 hover:bg-white/5"
            >
              <td className="p-4">{item.issue}</td>
              <td className="p-4">{item.severity}</td>
              <td className="p-4">{item.confidence}%</td>
              <td className="p-4">{item.regulation}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}