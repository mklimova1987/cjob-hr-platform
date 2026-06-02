import { useState } from "react";

// ── Working Calendar Data ──────────────────────────────────────────────────────
const CALENDAR = {
  UA: {
    label: "Ukraine",
    flag: "🇺🇦",
    totalWorkDays: 257,
    totalHours: 2056,
    months: [
      { m: "Jan", wd: 21, h: 168 }, { m: "Feb", wd: 20, h: 160 },
      { m: "Mar", wd: 22, h: 176 }, { m: "Apr", wd: 21, h: 168 },
      { m: "May", wd: 21, h: 168 }, { m: "Jun", wd: 22, h: 176 },
      { m: "Jul", wd: 23, h: 184 }, { m: "Aug", wd: 20, h: 160 },
      { m: "Sep", wd: 22, h: 176 }, { m: "Oct", wd: 22, h: 176 },
      { m: "Nov", wd: 21, h: 168 }, { m: "Dec", wd: 22, h: 176 },
    ],
    holidays: [
      { date: "01.01", name: "New Year's Day" },
      { date: "08.03", name: "International Women's Day" },
      { date: "09.03", name: "Women's Day (transferred)" },
      { date: "12.04", name: "Easter Sunday" },
      { date: "13.04", name: "Easter (transferred)" },
      { date: "01.05", name: "Labour Day" },
      { date: "08.05", name: "Victory over Nazism Day" },
      { date: "31.05", name: "Trinity Sunday" },
      { date: "01.06", name: "Trinity (transferred from 31.05)" },
      { date: "28.06", name: "Constitution Day of Ukraine" },
      { date: "29.06", name: "Constitution Day (transferred)" },
      { date: "15.07", name: "Ukrainian Statehood Day" },
      { date: "24.08", name: "Independence Day" },
      { date: "01.10", name: "Defenders of Ukraine Day" },
      { date: "25.12", name: "Christmas Day" },
    ],
  },
  PL: {
    label: "Poland",
    flag: "🇵🇱",
    totalWorkDays: 251,
    totalHours: 2008,
    months: [
      { m: "Jan", wd: 20, h: 160 }, { m: "Feb", wd: 20, h: 160 },
      { m: "Mar", wd: 22, h: 176 }, { m: "Apr", wd: 21, h: 168 },
      { m: "May", wd: 20, h: 160 }, { m: "Jun", wd: 21, h: 168 },
      { m: "Jul", wd: 23, h: 184 }, { m: "Aug", wd: 20, h: 160 },
      { m: "Sep", wd: 22, h: 176 }, { m: "Oct", wd: 22, h: 176 },
      { m: "Nov", wd: 20, h: 160 }, { m: "Dec", wd: 20, h: 160 },
    ],
    holidays: [
      { date: "01.01", name: "New Year's Day" },
      { date: "06.01", name: "Epiphany" },
      { date: "05.04", name: "Easter Sunday" },
      { date: "06.04", name: "Easter Monday" },
      { date: "01.05", name: "Labour Day" },
      { date: "03.05", name: "Constitution Day Poland" },
      { date: "09.05", name: "Europe Day" },
      { date: "24.05", name: "Whitsun" },
      { date: "04.06", name: "Corpus Christi" },
      { date: "15.08", name: "Assumption Day" },
      { date: "01.11", name: "All Saints' Day" },
      { date: "11.11", name: "Independence Day Poland" },
      { date: "25.12", name: "Christmas Day" },
      { date: "26.12", name: "St. Stephen's Day" },
    ],
  },
  BG: {
    label: "Bulgaria",
    flag: "🇧🇬",
    totalWorkDays: 249,
    totalHours: 1992,
    months: [
      { m: "Jan", wd: 20, h: 160 }, { m: "Feb", wd: 20, h: 160 },
      { m: "Mar", wd: 21, h: 168 }, { m: "Apr", wd: 20, h: 160 },
      { m: "May", wd: 18, h: 144 }, { m: "Jun", wd: 22, h: 176 },
      { m: "Jul", wd: 23, h: 184 }, { m: "Aug", wd: 21, h: 168 },
      { m: "Sep", wd: 20, h: 160 }, { m: "Oct", wd: 22, h: 176 },
      { m: "Nov", wd: 21, h: 168 }, { m: "Dec", wd: 21, h: 168 },
    ],
    holidays: [
      { date: "01.01", name: "New Year's Day" },
      { date: "02.01", name: "New Year's Day (2nd)" },
      { date: "03.03", name: "National Holiday Bulgaria" },
      { date: "10.04", name: "Orthodox Easter Friday" },
      { date: "11.04", name: "Orthodox Easter Saturday" },
      { date: "12.04", name: "Orthodox Easter Sunday" },
      { date: "13.04", name: "Orthodox Easter Monday" },
      { date: "01.05", name: "Labour Day" },
      { date: "06.05", name: "St George's Day" },
      { date: "24.05", name: "Education and Culture Day" },
      { date: "25.05", name: "Education and Culture Day (2nd)" },
      { date: "06.09", name: "Unification Day" },
      { date: "07.09", name: "Unification Day (2nd)" },
      { date: "22.09", name: "Independence Day" },
      { date: "24.12", name: "Christmas Eve" },
      { date: "25.12", name: "Christmas Day" },
      { date: "28.12", name: "Second Day of Christmas" },
      { date: "31.12", name: "New Year's Eve" },
    ],
  },
};

const QUARTERS = [
  { label: "Q1", months: [0, 1, 2] },
  { label: "Q2", months: [3, 4, 5] },
  { label: "Q3", months: [6, 7, 8] },
  { label: "Q4", months: [9, 10, 11] },
];

// ── Mock Data ──────────────────────────────────────────────────────────────────
const DOCUMENTS = [
  { id: 1, name: "Employment Contract — Petrenko O.", category: "contract", date: "2019-03-15", expires: null, status: "active", employee: "Oleksandr Petrenko" },
  { id: 2, name: "Employment Contract — Savchenko D.", category: "contract", date: "2021-06-01", expires: null, status: "active", employee: "Dmytro Savchenko" },
  { id: 3, name: "NDA — Bondarenko M.", category: "nda", date: "2022-01-10", expires: null, status: "active", employee: "Maria Bondarenko" },
  { id: 4, name: "Safety Certificate — Petrenko O.", category: "certificate", date: "2024-06-01", expires: "2026-06-01", status: "expiring", employee: "Oleksandr Petrenko" },
  { id: 5, name: "Engineering License — Lysenko S.", category: "certificate", date: "2023-01-10", expires: "2025-12-31", status: "expired", employee: "Serhii Lysenko" },
  { id: 6, name: "Order #12 — Termination", category: "order", date: "2026-05-20", expires: null, status: "active", employee: "Engineer #12" },
  { id: 7, name: "Order #11 — Promotion Petrenko", category: "order", date: "2025-11-01", expires: null, status: "active", employee: "Oleksandr Petrenko" },
];

const VISAS = [
  { id: 1, employee: "Oleksandr Petrenko", type: "Schengen C", country: "Poland", issued: "2024-03-01", expires: "2026-03-01", status: "active" },
  { id: 2, employee: "Dmytro Savchenko", type: "Schengen C", country: "Germany", issued: "2023-09-15", expires: "2025-09-15", status: "expired" },
  { id: 3, employee: "Maria Bondarenko", type: "Work Permit", country: "Netherlands", issued: "2025-01-20", expires: "2027-01-20", status: "active" },
  { id: 4, employee: "Serhii Lysenko", type: "Schengen C", country: "Poland", issued: "2025-06-01", expires: "2026-05-31", status: "expiring" },
  { id: 5, employee: "Vasyl Melnyk", type: "Business Visa", country: "Norway", issued: "2024-11-10", expires: "2026-11-10", status: "active" },
];

const LEAVES = [
  { id: 1, employee: "Oleksandr Petrenko", type: "Annual", from: "2026-07-01", to: "2026-07-14", days: 14, status: "approved" },
  { id: 2, employee: "Dmytro Savchenko", type: "Annual", from: "2026-06-15", to: "2026-06-28", days: 14, status: "pending" },
  { id: 3, employee: "Maria Bondarenko", type: "Sick Leave", from: "2026-05-20", to: "2026-05-24", days: 5, status: "approved" },
  { id: 4, employee: "Serhii Lysenko", type: "Unpaid", from: "2026-08-01", to: "2026-08-07", days: 7, status: "pending" },
];

const ORDERS = [
  { id: 1, number: "№12", title: "Termination — Engineer #12", date: "2026-05-20", effective: "2026-06-01", type: "termination", signedBy: "I. Kovalenko" },
  { id: 2, number: "№11", title: "Promotion — O. Petrenko to Lead Engineer", date: "2025-11-01", effective: "2025-11-01", type: "promotion", signedBy: "I. Kovalenko" },
  { id: 3, number: "№10", title: "Hiring — V. Melnyk", date: "2025-08-15", effective: "2025-09-01", type: "hiring", signedBy: "I. Kovalenko" },
];

const BIRTHDAYS = [
  { name: "Dmytro Savchenko", date: "1990-06-04", department: "Hull Outfitting", daysUntil: 5 },
  { name: "Oksana Hrytsenko", date: "1993-06-17", department: "Hull Outfitting", daysUntil: 18 },
  { name: "Vasyl Melnyk", date: "1988-07-03", department: "Hull Outfitting", daysUntil: 34 },
  { name: "Maria Bondarenko", date: "1991-07-22", department: "Hull Outfitting", daysUntil: 53 },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function daysUntilExpiry(isoDate) {
  if (!isoDate) return null;
  return Math.ceil((new Date(isoDate) - new Date()) / (1000 * 60 * 60 * 24));
}

const statusStyle = {
  active:   "bg-green-50 text-green-700 border border-green-200",
  expiring: "bg-amber-50 text-amber-700 border border-amber-200",
  expired:  "bg-red-50 text-red-600 border border-red-200",
  approved: "bg-green-50 text-green-700 border border-green-200",
  pending:  "bg-blue-50 text-blue-700 border border-blue-200",
};

const orderTypeStyle = {
  termination: "bg-red-50 text-red-700 border border-red-200",
  promotion:   "bg-violet-50 text-violet-700 border border-violet-200",
  hiring:      "bg-green-50 text-green-700 border border-green-200",
  salary:      "bg-blue-50 text-blue-700 border border-blue-200",
};

const leaveTypeStyle = {
  "Annual":     "bg-indigo-50 text-indigo-700 border border-indigo-200",
  "Sick Leave": "bg-rose-50 text-rose-700 border border-rose-200",
  "Unpaid":     "bg-gray-100 text-gray-600 border border-gray-200",
};

const docCategoryIcon = { contract: "📄", nda: "🔒", certificate: "🏅", order: "📋" };

// ── Calendar Tab ───────────────────────────────────────────────────────────────
function TabCalendar() {
  const [loc, setLoc] = useState("UA");
  const cal = CALENDAR[loc];
  const currentMonth = new Date().getMonth(); // 0-indexed

  return (
    <div className="space-y-5">
      {/* Header info */}
      <div className="text-xs text-gray-400 flex items-center gap-1.5">
        <span>ℹ️</span> Managed by Office Manager · Affects Timesheet, Capacity & Engineer Profile
      </div>

      {/* Location switcher */}
      <div className="flex gap-2">
        {Object.entries(CALENDAR).map(([key, c]) => (
          <button
            key={key}
            onClick={() => setLoc(key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              loc === key
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
            }`}
          >
            <span>{c.flag}</span> {c.label}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="text-xs text-blue-500 font-mono uppercase tracking-wider mb-1">Working Days 2026</div>
          <div className="text-3xl font-light text-blue-700">{cal.totalWorkDays}</div>
          <div className="text-xs text-blue-400 mt-1">days</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <div className="text-xs text-emerald-500 font-mono uppercase tracking-wider mb-1">Working Hours 2026</div>
          <div className="text-3xl font-light text-emerald-700">{cal.totalHours}</div>
          <div className="text-xs text-emerald-400 mt-1">hours @ 40h/week</div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <div className="text-xs text-amber-500 font-mono uppercase tracking-wider mb-1">Public Holidays</div>
          <div className="text-3xl font-light text-amber-700">{cal.holidays.length}</div>
          <div className="text-xs text-amber-400 mt-1">days off</div>
        </div>
      </div>

      {/* Monthly breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Breakdown</div>
          <div className="text-xs text-gray-400">Working days / hours</div>
        </div>
        <div className="p-4">
          {/* Quarter rows */}
          {QUARTERS.map(q => (
            <div key={q.label} className="mb-4 last:mb-0">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">{q.label}</div>
              <div className="grid grid-cols-3 gap-2">
                {q.months.map(mi => {
                  const mo = cal.months[mi];
                  const isCurrentMonth = mi === currentMonth;
                  return (
                    <div
                      key={mi}
                      className={`p-3 rounded-lg border transition-all ${
                        isCurrentMonth
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-100"
                      }`}
                    >
                      <div className={`text-xs font-semibold mb-1 ${isCurrentMonth ? "text-blue-700" : "text-gray-600"}`}>
                        {mo.m} {isCurrentMonth && <span className="text-[10px] font-normal">← now</span>}
                      </div>
                      <div className={`text-lg font-semibold ${isCurrentMonth ? "text-blue-700" : "text-gray-800"}`}>
                        {mo.wd}
                      </div>
                      <div className="text-[10px] text-gray-400">{mo.h}h</div>
                    </div>
                  );
                })}
              </div>
              {/* Quarter total */}
              <div className="flex justify-end mt-1.5 gap-4 text-xs text-gray-500 font-mono">
                <span>Total: <strong>{q.months.reduce((s, i) => s + cal.months[i].wd, 0)} days</strong></span>
                <span><strong>{q.months.reduce((s, i) => s + cal.months[i].h, 0)}h</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Holidays list */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Public Holidays {cal.flag}</div>
        </div>
        <div className="divide-y divide-gray-50">
          {cal.holidays.map((h, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors">
              <div className="text-sm text-gray-800">{h.name}</div>
              <div className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{h.date}.2026</div>
            </div>
          ))}
        </div>
      </div>

      {/* Location → Engineer mapping note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="text-xs font-semibold text-slate-600 mb-2">📍 Location → Calendar mapping</div>
        <div className="space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" /> Mykolaiv → Ukraine calendar (257 days · 2056h)</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" /> Gdańsk → Poland calendar (251 days · 2008h)</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" /> Sofia → Bulgaria calendar (249 days · 1992h)</div>
        </div>
        <div className="text-[10px] text-slate-400 mt-2 font-mono">Applied to: Timesheet norm · Capacity planning · Leave balance · Profile</div>
      </div>
    </div>
  );
}

// ── Documents Tab ──────────────────────────────────────────────────────────────
function TabDocuments() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? DOCUMENTS : DOCUMENTS.filter(d => d.status === filter);
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {["all", "active", "expiring", "expired"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs rounded-full border capitalize transition-colors ${filter === f ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}>{f}</button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map(doc => (
          <div key={doc.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-3">
              <span className="text-xl">{docCategoryIcon[doc.category] || "📄"}</span>
              <div>
                <div className="text-sm font-medium text-gray-800">{doc.name}</div>
                <div className="text-xs text-gray-400">{doc.employee} · {formatDate(doc.date)}{doc.expires ? ` · Expires ${formatDate(doc.expires)}` : ""}</div>
              </div>
            </div>
            <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${statusStyle[doc.status]}`}>{doc.status}</span>
          </div>
        ))}
      </div>
      <button className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors">+ Upload document</button>
    </div>
  );
}

// ── Visas Tab ──────────────────────────────────────────────────────────────────
function TabVisas() {
  return (
    <div className="space-y-3">
      {VISAS.map(v => {
        const days = daysUntilExpiry(v.expires);
        return (
          <div key={v.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-lg">🛂</div>
              <div>
                <div className="text-sm font-medium text-gray-800">{v.employee}</div>
                <div className="text-xs text-gray-400">{v.type} · {v.country} · Expires: {formatDate(v.expires)}</div>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-2 py-0.5 text-xs rounded-full capitalize block mb-1 ${statusStyle[v.status]}`}>{v.status}</span>
              {days !== null && days <= 90 && (
                <span className={`text-xs ${days < 0 ? "text-red-500" : days <= 30 ? "text-amber-600" : "text-gray-400"}`}>
                  {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d left`}
                </span>
              )}
            </div>
          </div>
        );
      })}
      <button className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors">+ Add visa record</button>
    </div>
  );
}

// ── Leaves Tab ─────────────────────────────────────────────────────────────────
function TabLeaves() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? LEAVES : LEAVES.filter(l => l.status === filter);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["all", "approved", "pending"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs rounded-full border capitalize transition-colors ${filter === f ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}>{f}</button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map(l => (
          <div key={l.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-lg">📅</div>
              <div>
                <div className="text-sm font-medium text-gray-800">{l.employee}</div>
                <div className="text-xs text-gray-400">{formatDate(l.from)} → {formatDate(l.to)} · {l.days} days</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${leaveTypeStyle[l.type]}`}>{l.type}</span>
              <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${statusStyle[l.status]}`}>{l.status}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors">+ New leave request</button>
    </div>
  );
}

// ── Orders Tab ─────────────────────────────────────────────────────────────────
function TabOrders() {
  return (
    <div className="space-y-3">
      {ORDERS.map(o => (
        <div key={o.id} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all group">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-lg">📋</div>
              <div>
                <div className="text-sm font-medium text-gray-800">{o.number} · {o.title}</div>
                <div className="text-xs text-gray-400">Issued: {formatDate(o.date)} · Effective: {formatDate(o.effective)} · Signed: {o.signedBy}</div>
              </div>
            </div>
            <span className={`px-2 py-0.5 text-xs rounded-full capitalize flex-shrink-0 ${orderTypeStyle[o.type]}`}>{o.type}</span>
          </div>
        </div>
      ))}
      <button className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors">+ New order</button>
    </div>
  );
}

// ── Birthdays Tab ──────────────────────────────────────────────────────────────
function TabBirthdays() {
  const sorted = [...BIRTHDAYS].sort((a, b) => a.daysUntil - b.daysUntil);
  return (
    <div className="space-y-3">
      <div className="text-xs text-gray-400 flex items-center gap-1.5"><span>ℹ️</span> Data collected by Office Manager (M. Nazarenko)</div>
      {sorted.map(b => (
        <div key={b.name} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${b.daysUntil <= 7 ? "bg-pink-50 border-pink-200" : "bg-white border-gray-100 hover:border-pink-200"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${b.daysUntil === 0 ? "bg-pink-200" : "bg-pink-50 border border-pink-100"}`}>
              {b.daysUntil === 0 ? "🎉" : "🎂"}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">{b.name}</div>
              <div className="text-xs text-gray-400">{b.department} · {formatDate(b.date)}</div>
            </div>
          </div>
          <div className={`text-sm font-semibold ${b.daysUntil === 0 ? "text-pink-600" : b.daysUntil <= 7 ? "text-pink-500" : b.daysUntil <= 14 ? "text-amber-500" : "text-gray-400"}`}>
            {b.daysUntil === 0 ? "Today! 🎉" : `${b.daysUntil}d`}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Overview Tab ───────────────────────────────────────────────────────────────
function TabOverview() {
  const expiring = VISAS.filter(v => v.status === "expiring").length;
  const expired  = VISAS.filter(v => v.status === "expired").length + DOCUMENTS.filter(d => d.status === "expired").length;
  const pending  = LEAVES.filter(l => l.status === "pending").length;
  const upcoming = BIRTHDAYS.filter(b => b.daysUntil <= 14).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Total Employees", value: 15, icon: "👥", color: "bg-blue-50 text-blue-600" },
          { label: "Expiring Docs/Visas", value: expiring, icon: "⚠️", color: "bg-amber-50 text-amber-600", alert: expiring > 0 },
          { label: "Expired", value: expired, icon: "🔴", color: "bg-red-50 text-red-600", alert: expired > 0 },
          { label: "Pending Leaves", value: pending, icon: "📅", color: "bg-indigo-50 text-indigo-600" },
          { label: "Birthdays (14d)", value: upcoming, icon: "🎂", color: "bg-pink-50 text-pink-600" },
          { label: "Open Orders", value: ORDERS.length, icon: "📋", color: "bg-slate-50 text-slate-600" },
        ].map(m => (
          <div key={m.label} className={`rounded-xl p-4 ${m.color} ${m.alert ? "ring-2 ring-offset-1 ring-amber-300" : ""}`}>
            <div className="text-2xl mb-1">{m.icon}</div>
            <div className="text-2xl font-bold">{m.value}</div>
            <div className="text-xs opacity-70 mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Calendar summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Working Calendar 2026</div>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(CALENDAR).map(([key, c]) => (
            <div key={key} className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-lg mb-1">{c.flag}</div>
              <div className="text-xs font-semibold text-gray-700">{c.label}</div>
              <div className="text-lg font-bold text-blue-600 mt-1">{c.totalWorkDays}</div>
              <div className="text-[10px] text-gray-400">{c.totalHours}h / year</div>
            </div>
          ))}
        </div>
      </div>

      {upcoming > 0 && (
        <div className="rounded-xl bg-pink-50 border border-pink-200 p-4">
          <div className="text-sm font-semibold text-pink-800 mb-3 flex items-center gap-2"><span>🎂</span> Upcoming Birthdays</div>
          {BIRTHDAYS.filter(b => b.daysUntil <= 14).map(b => (
            <div key={b.name} className="flex items-center justify-between text-xs text-pink-700">
              <span>{b.name}</span>
              <span className="font-medium">{b.daysUntil === 0 ? "🎉 Today!" : `in ${b.daysUntil} days`}</span>
            </div>
          ))}
          <div className="text-xs text-pink-500 mt-3">Collected by Office Manager</div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
const TABS = ["Overview", "Calendar", "Documents", "Visas", "Leaves", "Orders", "Birthdays"];

export default function Legal() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">HR Legal & Compliance</h1>
          <p className="text-sm text-gray-500 mt-0.5">Documents · Visas · Leaves · Orders · Calendar · Birthdays</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
          + Add Record
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 overflow-x-auto">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}>
            {tab}
            {tab === "Calendar" && <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">UA·PL·BG</span>}
            {tab === "Visas" && VISAS.filter(v => v.status !== "active").length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">{VISAS.filter(v => v.status !== "active").length}</span>
            )}
            {tab === "Leaves" && LEAVES.filter(l => l.status === "pending").length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">{LEAVES.filter(l => l.status === "pending").length}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "Overview"   && <TabOverview />}
      {activeTab === "Calendar"   && <TabCalendar />}
      {activeTab === "Documents"  && <TabDocuments />}
      {activeTab === "Visas"      && <TabVisas />}
      {activeTab === "Leaves"     && <TabLeaves />}
      {activeTab === "Orders"     && <TabOrders />}
      {activeTab === "Birthdays"  && <TabBirthdays />}
    </div>
  );
}
