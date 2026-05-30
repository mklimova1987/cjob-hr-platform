export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="card">
          <div className="text-xs font-mono text-slate-400 uppercase mb-1">Engineers</div>
          <div className="text-3xl font-light text-slate-800">79</div>
          <div className="text-xs text-emerald-600 mt-1">↑ +2 this month</div>
        </div>
        <div className="card">
          <div className="text-xs font-mono text-slate-400 uppercase mb-1">Projects</div>
          <div className="text-3xl font-light text-slate-800">12</div>
          <div className="text-xs text-blue-600 mt-1">ORION · TSHD · Yachts</div>
        </div>
        <div className="card">
          <div className="text-xs font-mono text-slate-400 uppercase mb-1">KPI pending</div>
          <div className="text-3xl font-light text-slate-800">3</div>
          <div className="text-xs text-amber-600 mt-1">awaiting approval</div>
        </div>
        <div className="card">
          <div className="text-xs font-mono text-slate-400 uppercase mb-1">Doc expiry</div>
          <div className="text-3xl font-light text-slate-800">5</div>
          <div className="text-xs text-red-600 mt-1">&lt; 30 days</div>
        </div>
      </div>
    </div>
  )
}