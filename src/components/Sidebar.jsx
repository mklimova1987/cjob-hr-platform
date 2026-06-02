import { NavLink } from 'react-router-dom'

const NAV = [
  {
    label: 'Overview',
    items: [
      { to: '/',          label: 'Dashboard' },
      { to: '/engineers', label: 'Employees' },
    ],
  },
  {
    label: 'Modules',
    items: [
      { to: '/talent',    label: 'Talent Management' },
      { to: '/kpi',       label: 'Performance & KPI', badge: '3' },
      { to: '/legal',     label: 'HR Legal & Compliance' },
      { to: '/capacity',  label: 'Time & Capacity' },
      { to: '/projects',  label: 'Projects & Coordination' },
      { to: '/reports',   label: 'Reporting & Analytics' },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className="w-52 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto py-3 px-2.5">
      {NAV.map(group => (
        <div key={group.label}>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2.5 pt-3 pb-1 font-mono">
            {group.label}
          </div>
          {group.items.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs cursor-pointer transition-all
                ${isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600 pl-2'
                  : 'text-slate-500 hover:bg-blue-50 hover:text-blue-700'
                }`
              }
            >
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white font-mono">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      ))}
    </aside>
  )
}
