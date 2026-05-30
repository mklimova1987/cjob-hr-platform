import { Link, useLocation } from 'react-router-dom'

const CRUMBS = {
  '/':          ['Dashboard'],
  '/engineers': ['Dashboard', 'Engineers'],
  '/hull':      ['Dashboard', 'Hull Outfitting'],
  '/kpi':       ['Dashboard', 'Performance'],
  '/matrix':    ['Dashboard', 'Skills Matrix'],
  '/pdp':       ['Dashboard', 'Development Plan'],
  '/legal':     ['Dashboard', 'HR Legal'],
  '/timesheet': ['Dashboard', 'Timesheet'],
}

export default function TopBar() {
  const { pathname } = useLocation()
  const crumbs = CRUMBS[pathname] || ['Dashboard']

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 bg-white border-b border-slate-200 shadow-sm flex-shrink-0">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <svg viewBox="0 0 34 28" fill="none" className="w-8 h-7">
            <path d="M17 2L3 9v10l14 7 14-7V9L17 2z" stroke="#dc2626" strokeWidth="2"/>
            <path d="M7 11l10 5 10-5" stroke="#1a56db" strokeWidth="1.5"/>
            <path d="M7 15l10 5 10-5" stroke="#1a56db" strokeWidth="1.2" opacity=".7"/>
          </svg>
          <div>
            <div className="text-sm font-semibold text-slate-800 leading-tight">C-Job Nikolayev</div>
            <div className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">HR Platform</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          {crumbs.map((label, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-slate-300">/</span>}
              <span className={i === crumbs.length - 1 ? 'text-slate-600 font-medium' : 'text-slate-400'}>
                {label}
              </span>
            </span>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center text-[10px] font-bold text-white font-mono cursor-pointer">
          HR
        </div>
      </div>
    </header>
  )
}