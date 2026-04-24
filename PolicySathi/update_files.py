import os

src_dir = r'C:\Users\Administrator\PycharmProjects\policysaathi\PolicySathi\src'

# 1. Update App.jsx
app_jsx_path = os.path.join(src_dir, 'App.jsx')
with open(app_jsx_path, 'r') as f:
    content = f.read()

content = content.replace(
    'import { BrowserRouter, Routes, Route } from "react-router-dom";',
    'import { BrowserRouter, Routes, Route } from "react-router-dom";\nimport { ResultProvider } from "./context/ResultContext";'
)

content = content.replace(
    '  return (\n    <BrowserRouter>',
    '  return (\n    <ResultProvider>\n      <BrowserRouter>'
)

content = content.replace(
    '    </BrowserRouter>\n  );',
    '      </BrowserRouter>\n    </ResultProvider>\n  );'
)

with open(app_jsx_path, 'w') as f:
    f.write(content)

print("Updated App.jsx")

# 2. Update Dashboard.jsx - use context with fallback to mock data
dashboard_path = os.path.join(src_dir, 'pages', 'Dashboard.jsx')
with open(dashboard_path, 'r') as f:
    content = f.read()

content = '''import AppLayout from "../layout/AppLayout";
import KPI from "../components/KPI";
import Charts from "../components/Charts";
import { useResult } from "../context/ResultContext";
import { ragResult } from "../data/ragMockData";

export default function Dashboard() {
  const { result } = useResult();
  const data = result || ragResult;

  return (
    <AppLayout>

      <div className="grid md:grid-cols-4 gap-4">

        <KPI title="Risk Score" value={`${data.summary.riskScore}%`} />
        <KPI title="Confidence" value={`${data.summary.confidence}%`} />
        <KPI title="Status" value={data.summary.status} />
        <KPI title="Review Time" value={data.summary.processingTime} />

      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">

        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-3xl">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Risk Trend
          </h2>

          <Charts />
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">

          <h2 className="text-xl font-semibold mb-4">
            Latest Findings
          </h2>

          {data.findings && data.findings.length > 0 ? (
            data.findings.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 p-4 rounded-2xl mb-3"
              >
                <div>{item.issue}</div>
                <div className="text-rose-300 text-sm mt-1">
                  {item.severity}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-4 text-center">
              <p className="text-emerald-400 text-sm">No issues found</p>
            </div>
          )}

        </div>

      </div>

    </AppLayout>
  );
}
'''

with open(dashboard_path, 'w') as f:
    f.write(content)

print("Updated Dashboard.jsx")

# 3. Update Alerts.jsx
alerts_path = os.path.join(src_dir, 'pages', 'Alerts.jsx')
with open(alerts_path, 'r') as f:
    content = f.read()

content = '''import AppLayout from "../layout/AppLayout";
import { useResult } from "../context/ResultContext";
import { ragResult } from "../data/ragMockData";

export default function Alerts() {
  const { result } = useResult();
  const data = result || ragResult;

  const highRisk = data.findings ? data.findings.filter(
    (x) => x.severity === "High"
  ) : [];

  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Compliance Alerts
      </h1>

      {highRisk.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">

          {highRisk.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 p-6 rounded-3xl"
            >
              <h2 className="text-xl font-semibold">
                {item.issue}
              </h2>

              <p className="text-rose-300 mt-2">
                High Severity
              </p>
            </div>
          ))}

        </div>
      ) : (
        <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-6 text-center">
          <p className="text-emerald-400">No high-risk alerts at this time.</p>
        </div>
      )}

    </AppLayout>
  );
}
'''

with open(alerts_path, 'w') as f:
    f.write(content)

print("Updated Alerts.jsx")

# 4. Update Report.jsx
report_path = os.path.join(src_dir, 'pages', 'Report.jsx')
with open(report_path, 'r') as f:
    content = f.read()

content = '''import AppLayout from "../layout/AppLayout";
import FindingsTable from "../components/FindingsTable";
import { useResult } from "../context/ResultContext";
import { ragResult } from "../data/ragMockData";

export default function Report() {
  const { result } = useResult();
  const data = result || ragResult;

  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Compliance Risk Report
      </h1>

      <FindingsTable findings={data.findings || []} />

    </AppLayout>
  );
}
'''

with open(report_path, 'w') as f:
    f.write(content)

print("Updated Report.jsx")

print("All files updated successfully!")
