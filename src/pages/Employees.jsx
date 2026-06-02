import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const employees = [
  // Management
  { id: 101, name: 'Kovalenko Iryna',    role: 'Head of Engineering',      dept: 'Management',    office: 'Mykolaiv', seniority: null,   cad: [],                      online: true  },
  { id: 102, name: 'Nazarenko Maria',    role: 'Office Manager',           dept: 'Management',    office: 'Mykolaiv', seniority: null,   cad: [],                      online: true  },
  { id: 103, name: 'Bardin Mikhail',     role: 'Head, Varna Branch',       dept: 'Management',    office: 'Varna',    seniority: null,   cad: [],                      online: false },
  { id: 104, name: 'GPM Poland',         role: 'General Project Manager',  dept: 'Management',    office: 'Gdańsk',   seniority: null,   cad: [],                      online: true  },
  { id: 105, name: 'GPM Ukraine',        role: 'General Project Manager',  dept: 'Management',    office: 'Mykolaiv', seniority: null,   cad: [],                      online: true  },
  { id: 106, name: 'GPM Quality',        role: 'GPM / Quality Manager',    dept: 'Management',    office: 'Mykolaiv', seniority: null,   cad: [],                      online: false },
  { id: 107, name: 'GPM Bulgaria',       role: 'General Project Manager',  dept: 'Management',    office: 'Varna',    seniority: null,   cad: [],                      online: false },
  // Structural / Hull
  { id: 1,  name: 'Petrenko Mykhailo',  role: 'Hull Structural Engineer', dept: 'Hull',          office: 'Gdańsk',   seniority: 'II',   cad: ['Cadmatic', 'AVEVA'],   online: true  },
  { id: 2,  name: 'Kovalenko Oleksiy',  role: 'Lead Hull Engineer',       dept: 'Hull',          office: 'Gdańsk',   seniority: 'Lead', cad: ['Cadmatic', 'AVEVA'],   online: true  },
  { id: 3,  name: 'Kravchenko Dmytro',  role: 'Shell Plating Engineer',   dept: 'Hull',          office: 'Gdańsk',   seniority: 'III',  cad: ['Cadmatic'],             online: true  },
  // Hull Outfitting
  { id: 4,  name: 'Savchenko Dmytro',   role: 'Hull Outfitting Engineer', dept: 'Hull Outfitting', office: 'Mykolaiv', seniority: 'I',  cad: ['AutoCAD', 'AVEVA'],    online: true  },
  { id: 5,  name: 'Bondarenko Maria',   role: 'Hull Outfitting Engineer', dept: 'Hull Outfitting', office: 'Gdańsk',   seniority: 'I',  cad: ['AVEVA'],               online: false },
  { id: 6,  name: 'Lysenko Serhii',     role: 'Hull Outfitting Engineer', dept: 'Hull Outfitting', office: 'Mykolaiv', seniority: 'II', cad: ['AutoCAD'],             online: true  },
  { id: 7,  name: 'Melnyk Vasyl',       role: 'Hull Outfitting Engineer', dept: 'Hull Outfitting', office: 'Mykolaiv', seniority: 'II', cad: ['AutoCAD', 'FORAN'],    online: true  },
  { id: 12, name: 'Sydorenko Taras',    role: 'Junior Engineer',          dept: 'Hull Outfitting', office: 'Mykolaiv', seniority: '-',  cad: ['AutoCAD'],             online: false, termination: '01.06.2026' },
  // M&P (includes Electrical)
  { id: 8,  name: 'Sydorenko Anna',     role: 'Piping Systems Engineer',  dept: 'M&P',           office: 'Mykolaiv', seniority: 'I',    cad: ['Siemens NX'],          online: true  },
  { id: 9,  name: 'Bondarenko Yulia',   role: 'Piping Engineer',          dept: 'M&P',           office: 'Mykolaiv', seniority: 'II',   cad: ['Siemens NX', 'AVEVA'], online: false },
  { id: 10, name: 'Moroz Andriy',       role: 'ER & Machinery Engineer',  dept: 'M&P',           office: 'Gdańsk',   seniority: 'III',  cad: ['Siemens NX'],          online: true  },
  { id: 11, name: 'Karpenko Natalia',   role: 'Electrical Engineer',      dept: 'M&P',           office: 'Gdańsk',   seniority: 'III',  cad: ['AVEVA'],               online: false },
  { id: 13, name: 'Zinchenko Mykola',   role: 'HVAC Engineer',            dept: 'M&P',           office: 'Mykolaiv', seniority: 'III',  cad: ['Siemens NX'],          online: true  },
  // Basic Design
  { id: 14, name: 'Tkachenko Olena',    role: 'Basic Design Engineer',    dept: 'Basic Design',  office: 'Gdańsk',   seniority: 'I',    cad: ['NAPA', 'Cadmatic'],    online: false },
  { id: 15, name: 'Polishchuk Vasyl',   role: 'Naval Architect',          dept: 'Basic Design',  office: 'Gdańsk',   seniority: 'II',   cad: ['NAPA'],                online: true  },
  // FEA
  { id: 16, name: 'Marchenko Vasyl',    role: 'FE Analysis Engineer',     dept: 'FEA',           office: 'Mykolaiv', seniority: 'III',  cad: ['ANSYS', 'Femap'],      online: false },
  { id: 17, name: 'Hrytsenko Oksana',   role: 'FEA Engineer',             dept: 'FEA',           office: 'Mykolaiv', seniority: 'II',   cad: ['ANSYS'],               online: true  },
  // Equipment
  { id: 18, name: 'Shevchenko Ivan',    role: 'Equipment Design Engineer',dept: 'Equipment',     office: 'Mykolaiv', seniority: 'II',   cad: ['SolidWorks'],          online: true  },
  { id: 19, name: 'Boyko Roman',        role: 'Equipment Engineer',       dept: 'Equipment',     office: 'Mykolaiv', seniority: '-',    cad: ['SolidWorks'],          online: false },
]

const seniorityConfig = {
  'Lead': { label: 'Lead',     cls: 'bg-violet-100 text-violet-800 border-violet-200' },
  'I':    { label: 'Cat. I',   cls: 'bg-blue-100 text-blue-800 border-blue-200' },
  'II':   { label: 'Cat. II',  cls: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  'III':  { label: 'Cat. III', cls: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  '-':    { label: 'Junior',   cls: 'bg-slate-100 text-slate-500 border-slate-200' },
}

const deptColors = {
  'Management':    'bg-slate-100 text-slate-600',
  'Hull':          'bg-blue-50 text-blue-700',
  'Hull Outfitting':'bg-indigo-50 text-indigo-700',
  'M&P':           'bg-green-50 text-green-700',
  'Basic Design':  'bg-amber-50 text-amber-700',
  'FEA':           'bg-purple-50 text-purple-700',
  'Equipment':     'bg-red-50 text-red-700',
}

const avatarColors = [
  'from-blue-500 to-blue-800','from-purple-500 to-indigo-700','from-emerald-500 to-green-700',
  'from-amber-500 to-orange-600','from-red-500 to-rose-700','from-sky-500 to-blue-600',
  'from-teal-500 to-cyan-700','from-violet-500 to-purple-700','from-pink-500 to-rose-600',
]

const initials = name => name.split(' ').map(n => n[0]).join('').slice(0, 2)

// ── Org Chart ─────────────────────────────────────────────────────────────────
const ORG = {
  name: 'Supervisory Board', role: '', children: [
    { name: 'CEO', role: '', office: 'Mykolaiv', children: [
      { name: 'CFO', role: '', office: 'Mykolaiv', children: [] },
      { name: 'GPM Poland', role: 'General Project Manager', office: 'Gdańsk', flag: '🇵🇱', children: [] },
      { name: 'GPM Ukraine', role: 'General Project Manager', office: 'Mykolaiv', flag: '🇺🇦', children: [] },
      { name: 'GPM Quality', role: 'GPM / Quality Manager', office: 'Mykolaiv', flag: '🇺🇦', children: [] },
      { name: 'GPM Bulgaria', role: 'General Project Manager', office: 'Varna', flag: '🇧🇬', children: [] },
      { name: 'Office Managers', role: 'UA · PL · BG', office: '', children: [] },
      { name: 'Accounting', role: 'Head · 3 persons', office: 'Mykolaiv', children: [] },
      { name: 'IT Department', role: 'Head · 3 engineers', office: '', children: [] },
      { name: 'Kovalenko Iryna', role: 'Head of Engineering', office: 'Mykolaiv', id: 101, children: [
        { name: 'Basic Design Group', role: '4 engineers', dept: 'Basic Design', children: [] },
        { name: 'Hull Department', role: '24 engineers', dept: 'Hull', children: [] },
        { name: 'Pipes & Systems Dept.', role: '39 engineers (incl. Electrical)', dept: 'M&P', children: [] },
        { name: 'R&D Group', role: '7 engineers', dept: 'FEA', children: [] },
        { name: 'Hull Outfitting Dept.', role: '17 engineers', dept: 'Hull Outfitting', children: [] },
        { name: 'Equipment Design Group', role: '5 engineers', dept: 'Equipment', children: [] },
      ]},
    ]},
  ]
}

function OrgNode({ node, navigate, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2)
  const hasChildren = node.children && node.children.length > 0
  const deptColor = node.dept ? deptColors[node.dept] : null

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => {
          if (node.id) navigate(`/engineers/${node.id}`)
          else if (hasChildren) setOpen(!open)
        }}
        className={`relative px-3 py-2 rounded-xl border text-center cursor-pointer transition-all min-w-[130px] max-w-[160px] mb-1
          ${node.id ? 'hover:border-blue-400 hover:shadow-md bg-white border-blue-200' :
            deptColor ? `bg-white border-gray-200 hover:border-blue-300` :
            depth === 0 ? 'bg-slate-700 text-white border-slate-600' :
            depth === 1 ? 'bg-slate-100 border-slate-300' :
            'bg-white border-gray-200 hover:border-blue-300'
          }`}
      >
        {node.flag && <div className="text-base mb-0.5">{node.flag}</div>}
        <div className={`text-xs font-semibold ${depth === 0 ? 'text-white' : 'text-gray-800'}`}>{node.name}</div>
        {node.role && <div className="text-[10px] text-gray-400 mt-0.5">{node.role}</div>}
        {node.office && <div className="text-[10px] text-gray-400 font-mono">{node.office}</div>}
        {deptColor && <div className={`text-[10px] px-1.5 py-0.5 rounded-full mt-1 inline-block ${deptColor}`}>{node.dept}</div>}
        {hasChildren && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-[10px] text-blue-600">
            {open ? '−' : '+'}
          </div>
        )}
      </div>

      {hasChildren && open && (
        <div className="mt-4 flex gap-3 flex-wrap justify-center">
          {node.children.map((child, i) => (
            <OrgNode key={i} node={child} navigate={navigate} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────
const TABS = ['List', 'Org Chart']

export default function Engineers() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [activeTab, setActiveTab] = useState('List')

  const depts = ['All', 'Management', 'Hull', 'Hull Outfitting', 'M&P', 'Basic Design', 'FEA', 'Equipment']

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
                        e.role.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === 'All' || e.dept === deptFilter
    return matchSearch && matchDept
  })

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-800 tracking-tight">Employees</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            79 total · Hull 24 · M&P 39 · FEA 7 · Equipment 5 · Basic Design 4 · Hull Outfitting 17
          </p>
        </div>
        <button className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">+ Add employee</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-slate-200 mb-4">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'List' && (
        <>
          {/* Filters */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or role…"
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-400 w-56 font-mono"
            />
            <div className="flex gap-1 flex-wrap">
              {depts.map(d => (
                <button key={d} onClick={() => setDeptFilter(d)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-mono ${
                    deptFilter === d ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                  }`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="card p-0 overflow-hidden">
            {filtered.map((emp, i) => {
              const sen = seniorityConfig[emp.seniority || '-']
              return (
                <div key={emp.id}
                  onClick={() => navigate(`/engineers/${emp.id}`)}
                  className={`flex items-center gap-3 px-4 py-3 border-b border-slate-100 last:border-0 cursor-pointer hover:bg-blue-50 transition-colors ${emp.termination ? 'bg-red-50/40' : ''}`}>
                  <div className="relative flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xs font-bold text-white font-mono shadow-sm`}>
                      {initials(emp.name)}
                    </div>
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${emp.online ? 'bg-emerald-500' : 'bg-slate-300'}`}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800">{emp.name}</span>
                      {emp.termination && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 border border-red-200 font-mono">term {emp.termination}</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{emp.role} · {emp.office}</div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full font-mono hidden md:block ${deptColors[emp.dept] || 'bg-slate-50 text-slate-500'}`}>
                    {emp.dept}
                  </span>
                  {emp.seniority && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${sen.cls}`}>{sen.label}</span>
                  )}
                  <div className="hidden lg:flex gap-1">
                    {emp.cad.slice(0, 2).map(c => (
                      <span key={c} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">{c}</span>
                    ))}
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-slate-300 flex-shrink-0">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              )
            })}
          </div>
        </>
      )}

      {activeTab === 'Org Chart' && (
        <div className="overflow-x-auto pb-6">
          <div className="min-w-max pt-4">
            <OrgNode node={ORG} navigate={navigate} depth={0} />
          </div>
        </div>
      )}
    </div>
  )
}
