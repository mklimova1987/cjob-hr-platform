import { useState } from 'react'

const DEPT_DATA = {
  company:    { bg: 'bg-slate-50',   Employees: '79', engSub: '↑ +2 this month',        engColor: 'text-emerald-600', projects: '12', projSub: 'ORION · TSHD · Yachts',       projColor: 'text-blue-600',  kpi: '3', kpiSub: 'awaiting approval', kpiColor: 'text-amber-600', doc: '5', docSub: '< 30 days',          docColor: 'text-red-600'   },
  hull:       { bg: 'bg-blue-50',    Employees: '15', engSub: 'Lead → Junior',           engColor: 'text-emerald-600', projects: '4',  projSub: 'ORION · TSHD · Jack-Up',      projColor: 'text-blue-600',  kpi: '2', kpiSub: 'awaiting approval', kpiColor: 'text-amber-600', doc: '1', docSub: '1 termination 01.06', docColor: 'text-red-600'   },
  structural: { bg: 'bg-indigo-50',  Employees: '32', engSub: 'Gdańsk + Mykolaiv',       engColor: 'text-emerald-600', projects: '5',  projSub: 'ORION · TSHD · Yachts',       projColor: 'text-blue-600',  kpi: '1', kpiSub: 'awaiting approval', kpiColor: 'text-amber-600', doc: '2', docSub: '< 30 days',          docColor: 'text-red-600'   },
  mp:         { bg: 'bg-emerald-50', Employees: '31', engSub: 'Mykolaiv',                engColor: 'text-emerald-600', projects: '3',  projSub: 'Yachts · Dredging',            projColor: 'text-blue-600',  kpi: '0', kpiSub: 'all reviewed',      kpiColor: 'text-slate-400', doc: '2', docSub: '< 30 days',          docColor: 'text-red-600'   },
  basic:      { bg: 'bg-amber-50',   Employees: '4',  engSub: 'Gdańsk',                  engColor: 'text-emerald-600', projects: '2',  projSub: 'Basic Design',                 projColor: 'text-blue-600',  kpi: '0', kpiSub: 'all reviewed',      kpiColor: 'text-slate-400', doc: '0', docSub: 'all valid',          docColor: 'text-slate-400' },
  fea:        { bg: 'bg-purple-50',  Employees: '5',  engSub: 'Gdańsk',                  engColor: 'text-emerald-600', projects: '3',  projSub: 'FEA · Structural',             projColor: 'text-blue-600',  kpi: '1', kpiSub: 'awaiting approval', kpiColor: 'text-amber-600', doc: '1', docSub: '< 30 days',          docColor: 'text-red-600'   },
  equipment:  { bg: 'bg-red-50',     Employees: '5',  engSub: 'Mykolaiv',                engColor: 'text-emerald-600', projects: '2',  projSub: 'Equipment · Outfitting',       projColor: 'text-blue-600',  kpi: '0', kpiSub: 'all reviewed',      kpiColor: 'text-slate-400', doc: '0', docSub: 'all valid',          docColor: 'text-slate-400' },
  electrical: { bg: 'bg-sky-50',     Employees: '2',  engSub: 'Gdańsk',                  engColor: 'text-emerald-600', projects: '1',  projSub: 'Electrical systems',           projColor: 'text-blue-600',  kpi: '0', kpiSub: 'all reviewed',      kpiColor: 'text-slate-400', doc: '0', docSub: 'all valid',          docColor: 'text-slate-400' },
}

const DEPTS = [
  { id: 'company',    label: 'Company',         count: 79, color: 'blue'   },
  { id: 'hull',       label: 'Hull Outfitting',  count: 15, color: 'blue'   },
  { id: 'structural', label: 'Structural',       count: 32, color: 'blue'   },
  { id: 'mp',         label: 'M&P',              count: 31, color: 'green'  },
  { id: 'basic',      label: 'Basic Design',     count: 4,  color: 'amber'  },
  { id: 'fea',        label: 'FEA',              count: 5,  color: 'purple' },
  { id: 'equipment',  label: 'Equipment',        count: 5,  color: 'red'    },
  { id: 'electrical', label: 'Electrical',       count: 2,  color: 'sky'    },
]

const colorMap = {
  blue:   { bg: 'bg-blue-50',    dot: 'bg-blue-500',    pill: 'bg-blue-50 text-blue-700 border-blue-200'       },
  amber:  { bg: 'bg-amber-50',   dot: 'bg-amber-500',   pill: 'bg-amber-50 text-amber-700 border-amber-200'    },
  purple: { bg: 'bg-purple-50',  dot: 'bg-purple-500',  pill: 'bg-purple-50 text-purple-700 border-purple-200' },
  green:  { bg: 'bg-emerald-50', dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  red:    { bg: 'bg-red-50',     dot: 'bg-red-500',     pill: 'bg-red-50 text-red-700 border-red-200'          },
  sky:    { bg: 'bg-sky-50',     dot: 'bg-sky-500',     pill: 'bg-sky-50 text-sky-700 border-sky-200'          },
  pink:   { bg: 'bg-pink-50',    dot: 'bg-pink-500',    pill: 'bg-pink-50 text-pink-700 border-pink-200'       },
}

const alertDot = { red: 'bg-red-500', amber: 'bg-amber-500', blue: 'bg-blue-500', green: 'bg-emerald-500' }

const modules = [
  {
    title: 'Core HR',
    owner: 'Head of Department',
    to: '/Employees',
    stats: 'Персональна картка · Org structure · Lifecycle',
    tags: ['lifecycle auto', 'org chart'],
    color: 'green',
  },
  {
    title: 'Talent Management',
    owner: 'Head of Department',
    to: '/hull',
    stats: 'Матриця компетенцій · IDP · Навчання · CV-генерація',
    tags: ['matrix auto', 'CV generation'],
    alert: '1 termination 01.06',
    color: 'purple',
  },
  {
    title: 'HR Legal & Compliance',
    owner: 'Office Manager',
    to: '/legal',
    stats: 'Документи · Накази · Відпустки · Паспорти',
    tags: ['expiry 90/30/7d', 'birthday alerts'],
    color: 'red',
  },
  {
    title: 'Performance & KPI',
    owner: 'Head of Department',
    to: '/kpi',
    stats: 'Оцінка · L-Scale · Remark Tool · Бонуси',
    tags: ['auto 30–40%', 'Engineering Seniority'],
    color: 'amber',
  },
  {
    title: 'Time & Capacity',
    owner: 'Head of Department',
    to: '/capacity',
    stats: 'Yaware · Табель · Loading · Відпустки',
    tags: ['Yaware auto', '13-month plan'],
    color: 'blue',
  },
  {
    title: 'Projects & Coordination',
    owner: 'GPM / Coordinator',
    to: '/projects',
    stats: 'ORION · TSHD · Yachts · Jack-Up',
    tags: ['MS Project sync', 'Power BI'],
    color: 'red',
  },
  {
    title: 'Reporting & Analytics',
    owner: 'Head of Department',
    to: '/reports',
    stats: 'Звіти · Дашборди PBI · Quarter Analysis',
    tags: ['auto from modules'],
    color: 'sky',
  },
  {
    title: 'Timesheet',
    owner: 'Office Manager · М.Назаренко',
    to: '/timesheet',
    stats: '79 employees · May 2026',
    tags: ['Yaware 02:00', 'Calamari.pl'],
    color: 'blue',
  },
]

const alerts = [
  { color: 'red',   text: 'SQR error (w=3) — ORION project, Hull structural',       time: 'today 09:14 · email → Lead + Head'               },
  { color: 'amber', text: 'Schengen visa expires in 22 days — Kovalenko O.',         time: 'today 08:00 · Office Manager notified'            },
  { color: 'blue',  text: 'Grade: Petrenko M. Middle → Senior · seniority III→II',  time: 'yesterday · PDP needs_update triggered', link: true },
  { color: 'green', text: '🎂 Birthday tomorrow — Sydorenko Anna (M&P)',             time: 'today · Office Manager reminder sent'             },
]

export default function Dashboard() {
  const [activeDept, setActiveDept] = useState('company')
  const d = DEPT_DATA[activeDept] || DEPT_DATA.company

  return (
    <div className={`transition-colors duration-500 ${d.bg} -m-6 p-6 min-h-screen`}>

      {/* Dept switcher strip */}
      <div className="flex gap-1.5 flex-wrap mb-5 items-center">
        {DEPTS.map(dept => {
          const c = colorMap[dept.color]
          const isActive = activeDept === dept.id
          return (
            <button
              key={dept.id}
              onClick={() => setActiveDept(dept.id)}
              className={`text-xs font-semibold font-mono px-3 py-1 rounded-full border transition-all ${
                isActive
                  ? `${c.pill} shadow-sm ring-1 ring-offset-1 ring-current scale-105`
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              {dept.label} {dept.count}
            </button>
          )
        })}
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/70 text-slate-500 ml-1">
          ~110K man-hours/year · ISO 9001 BV
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { l: 'Employees',       v: d.Employees, s: d.engSub,  c: d.engColor,  t: 'blue'   },
          { l: 'Active projects', v: d.projects,  s: d.projSub, c: d.projColor, t: 'purple' },
          { l: 'KPI pending',     v: d.kpi,       s: d.kpiSub,  c: d.kpiColor,  t: 'amber'  },
          { l: 'Doc expiry',      v: d.doc,       s: d.docSub,  c: d.docColor,  t: 'red'    },
        ].map(m => (
          <div key={m.l} className={`card border-t-2 border-${m.t}-400`}>
            <div className="text-[10px] font-semibold font-mono text-slate-400 uppercase tracking-wider mb-1">{m.l}</div>
            <div className="text-3xl font-light text-slate-800">{m.v}</div>
            <div className={`text-xs mt-1 ${m.c}`}>{m.s}</div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-3">Platform modules</div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {modules.map(mod => {
          const c = colorMap[mod.color]
          return (
            <a key={mod.title} href={mod.to} className="card hover:border-blue-300 hover:shadow-md transition-all cursor-pointer no-underline block">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                  <div className={`w-3 h-3 rounded-full ${c.dot}`}></div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">{mod.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{mod.owner}</div>
                </div>
              </div>
              <div className="text-xs text-slate-500 mb-2">{mod.stats}</div>
              <div className="flex gap-1 flex-wrap">
                {mod.tags.map(t => (
                  <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">{t}</span>
                ))}
                {mod.alert && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-mono">{mod.alert}</span>
                )}
              </div>
            </a>
          )
        })}
      </div>

      {/* Bottom two cols */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <div className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-3">Active triggers</div>
          {alerts.map((a, i) => (
            <div key={i} className="flex gap-2.5 py-2 border-b border-slate-100 last:border-0">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alertDot[a.color]}`}></div>
              <div>
                <div className={`text-xs ${a.link ? 'text-blue-600 font-medium' : 'text-slate-700'}`}>{a.text}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-3">Automation today</div>
          {[
            { l: 'Yaware import — timesheets (79)', s: '✓ 02:00',    c: 'bg-emerald-50 text-emerald-700' },
            { l: 'Capacity recalculation',          s: '✓ 02:15',    c: 'bg-emerald-50 text-emerald-700' },
            { l: 'Expiry alerts — visas + docs',    s: '✓ 08:00',    c: 'bg-emerald-50 text-emerald-700' },
            { l: 'KPI auto-score (ERP + Yaware)',   s: '⟳ running', c: 'bg-blue-50 text-blue-700'       },
            { l: 'Power BI report refresh',         s: '15:00',      c: 'bg-slate-100 text-slate-500'    },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0 text-xs text-slate-600">
              <span className="flex-1">{t.l}</span>
              <span className={`text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full ${t.c}`}>{t.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
