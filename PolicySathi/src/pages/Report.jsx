import AppLayout from "../layout/AppLayout";
import { issues } from "../data/ragMockData";

export default function Report() {
 return (
  <AppLayout>

   <h1 className="text-3xl mb-6">Risk Report</h1>

   {issues.map((item)=>(
    <div
      key={item.issue}
      className="bg-white/5 p-4 rounded-2xl mb-3"
    >
      {item.issue} | {item.severity} | {item.confidence}
    </div>
   ))}

  </AppLayout>
 );
}