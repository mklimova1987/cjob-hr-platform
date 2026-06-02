import { useState } from "react";

// ── Department Data ────────────────────────────────────────────────────────────
const DEPT_CONFIG = {
  "Hull Outfitting": {
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    engineers: [
      { id: 1,  name: "Petrenko O.",   position: "Lead Engineer",    seniority: "Lead", location: "Mykolaiv", status: "active" },
      { id: 2,  name: "Savchenko D.",  position: "Engineer Cat. I",  seniority: "I",    location: "Mykolaiv", status: "active" },
      { id: 3,  name: "Bondarenko M.", position: "Engineer Cat. I",  seniority: "I",    location: "Gdańsk",   status: "active" },
      { id: 4,  name: "Lysenko S.",    position: "Engineer Cat. II", seniority: "II",   location: "Mykolaiv", status: "active" },
      { id: 5,  name: "Melnyk V.",     position: "Engineer Cat. II", seniority: "II",   location: "Mykolaiv", status: "active" },
      { id: 6,  name: "Hrytsenko O.",  position: "Engineer Cat. II", seniority: "II",   location: "Gdańsk",   status: "active" },
      { id: 7,  name: "Kovalchuk I.",  position: "Engineer Cat. III",seniority: "III",  location: "Mykolaiv", status: "active" },
      { id: 8,  name: "Tkachenko P.",  position: "Engineer Cat. III",seniority: "III",  location: "Mykolaiv", status: "active" },
      { id: 9,  name: "Moroz A.",      position: "Engineer Cat. III",seniority: "III",  location: "Gdańsk",   status: "active" },
      { id: 10, name: "Shevchenko L.", position: "Engineer Cat. III",seniority: "III",  location: "Mykolaiv", status: "active" },
      { id: 11, name: "Boyko R.",      position: "Junior Engineer",  seniority: "-",    location: "Mykolaiv", status: "active" },
      { id: 12, name: "Sydorenko T.",  position: "Junior Engineer",  seniority: "-",    location: "Mykolaiv", status: "termination", termDate: "01.06.2026" },
      { id: 13, name: "Karpenko N.",   position: "Junior Engineer",  seniority: "-",    location: "Gdańsk",   status: "active" },
      { id: 14, name: "Zinchenko M.",  position: "Engineer Cat. III",seniority: "III",  location: "Mykolaiv", status: "active" },
      { id: 15, name: "Polishchuk V.", position: "Engineer Cat. II", seniority: "II",   location: "Gdańsk",   status: "active" },
    ],
    skills: [
      { id: "autocad", label: "AutoCAD",       group: "CAD" },
      { id: "foran",   label: "FORAN",         group: "CAD" },
      { id: "aveva",   label: "AVEVA Marine",  group: "CAD" },
      { id: "struct",  label: "Structural",    group: "Engineering" },
      { id: "outfit",  label: "Outfitting",    group: "Engineering" },
      { id: "weld",    label: "Welding",       group: "Engineering" },
      { id: "class",   label: "Classification",group: "Engineering" },
      { id: "proj",    label: "Project Mgmt",  group: "Soft" },
    ],
    matrix: {
      1:  { autocad:3, foran:3, aveva:2, struct:3, outfit:3, weld:2, class:3, proj:3 },
      2:  { autocad:3, foran:2, aveva:2, struct:3, outfit:2, weld:3, class:2, proj:1 },
      3:  { autocad:2, foran:1, aveva:3, struct:2, outfit:3, weld:1, class:2, proj:2 },
      4:  { autocad:3, foran:2, aveva:1, struct:3, outfit:2, weld:2, class:2, proj:1 },
      5:  { autocad:2, foran:1, aveva:2, struct:2, outfit:3, weld:2, class:1, proj:1 },
      6:  { autocad:2, foran:0, aveva:2, struct:2, outfit:2, weld:1, class:2, proj:2 },
      7:  { autocad:2, foran:1, aveva:1, struct:2, outfit:2, weld:1, class:1, proj:0 },
      8:  { autocad:2, foran:1, aveva:1, struct:2, outfit:1, weld:2, class:1, proj:0 },
      9:  { autocad:1, foran:0, aveva:2, struct:1, outfit:2, weld:0, class:1, proj:1 },
      10: { autocad:2, foran:1, aveva:0, struct:2, outfit:1, weld:2, class:1, proj:0 },
      11: { autocad:1, foran:0, aveva:1, struct:1, outfit:1, weld:1, class:0, proj:0 },
      12: { autocad:1, foran:0, aveva:0, struct:1, outfit:1, weld:0, class:0, proj:0 },
      13: { autocad:1, foran:0, aveva:1, struct:0, outfit:1, weld:0, class:0, proj:0 },
      14: { autocad:2, foran:1, aveva:1, struct:2, outfit:1, weld:1, class:1, proj:0 },
      15: { autocad:2, foran:0, aveva:2, struct:1, outfit:2, weld:0, class:2, proj:1 },
    },
    gaps: [
      "FORAN: 7 engineers at level 0–1 → training needed",
      "Classification: 5 engineers need upskilling",
      "Project Mgmt: only Lead + Cat.I covered",
    ],
  },
  "Hull": {
    color: "bg-blue-50 text-blue-700 border-blue-200",
    engineers: [
      { id: 101, name: "Kovalenko O.",  position: "Lead Engineer",    seniority: "Lead", location: "Gdańsk",   status: "active" },
      { id: 102, name: "Petrenko M.",   position: "Engineer Cat. II", seniority: "II",   location: "Gdańsk",   status: "active" },
      { id: 103, name: "Kravchenko D.", position: "Engineer Cat. III",seniority: "III",  location: "Gdańsk",   status: "active" },
      { id: 104, name: "Ivanov S.",     position: "Engineer Cat. II", seniority: "II",   location: "Mykolaiv", status: "active" },
      { id: 105, name: "Ponomarenko Y.",position: "Engineer Cat. III",seniority: "III",  location: "Mykolaiv", status: "active" },
    ],
    skills: [
      { id: "cadmatic", label: "Cadmatic",    group: "CAD" },
      { id: "aveva",    label: "AVEVA Marine",group: "CAD" },
      { id: "foran",    label: "FORAN",       group: "CAD" },
      { id: "struct",   label: "Structural",  group: "Engineering" },
      { id: "shell",    label: "Shell Plating",group: "Engineering" },
      { id: "weld",     label: "Welding",     group: "Engineering" },
      { id: "class",    label: "Classification",group: "Engineering" },
    ],
    matrix: {
      101: { cadmatic:3, aveva:2, foran:2, struct:3, shell:3, weld:2, class:3 },
      102: { cadmatic:3, aveva:2, foran:1, struct:3, shell:2, weld:2, class:2 },
      103: { cadmatic:2, aveva:1, foran:1, struct:2, shell:2, weld:1, class:1 },
      104: { cadmatic:2, aveva:2, foran:2, struct:2, shell:3, weld:3, class:2 },
      105: { cadmatic:1, aveva:1, foran:0, struct:2, shell:2, weld:1, class:1 },
    },
    gaps: [
      "FORAN: 2 engineers at level 0 → training needed",
      "Classification: junior engineers need upskilling",
    ],
  },
  "M&P": {
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    engineers: [
      { id: 201, name: "Sydorenko A.",   position: "Engineer Cat. I",  seniority: "I",   location: "Mykolaiv", status: "active" },
      { id: 202, name: "Bondarenko Y.",  position: "Engineer Cat. II", seniority: "II",  location: "Mykolaiv", status: "active" },
      { id: 203, name: "Moroz A.",       position: "Engineer Cat. III",seniority: "III", location: "Gdańsk",   status: "active" },
      { id: 204, name: "Karpenko N.",    position: "Electrical Eng.",  seniority: "III", location: "Gdańsk",   status: "active" },
      { id: 205, name: "Zinchenko M.",   position: "HVAC Engineer",    seniority: "III", location: "Mykolaiv", status: "active" },
    ],
    skills: [
      { id: "nx",      label: "Siemens NX",  group: "CAD" },
      { id: "aveva",   label: "AVEVA Marine",group: "CAD" },
      { id: "autocad", label: "AutoCAD",     group: "CAD" },
      { id: "pipe",    label: "Piping",      group: "Engineering" },
      { id: "hvac",    label: "HVAC",        group: "Engineering" },
      { id: "elec",    label: "Electrical",  group: "Engineering" },
      { id: "marine",  label: "Marine Sys.", group: "Engineering" },
    ],
    matrix: {
      201: { nx:3, aveva:2, autocad:2, pipe:3, hvac:2, elec:1, marine:3 },
      202: { nx:3, aveva:2, autocad:2, pipe:3, hvac:1, elec:1, marine:2 },
      203: { nx:2, aveva:1, autocad:2, pipe:2, hvac:2, elec:0, marine:2 },
      204: { nx:1, aveva:1, autocad:2, pipe:0, hvac:0, elec:3, marine:1 },
      205: { nx:2, aveva:0, autocad:1, pipe:1, hvac:3, elec:0, marine:1 },
    },
    gaps: [
      "Electrical: only 1 engineer covers electrical systems",
      "AVEVA: 2 engineers at level 0–1",
    ],
  },
  "Basic Design": {
    color: "bg-amber-50 text-amber-700 border-amber-200",
    engineers: [
      { id: 301, name: "Tkachenko O.",   position: "Engineer Cat. I",  seniority: "I",  location: "Gdańsk",   status: "active" },
      { id: 302, name: "Polishchuk V.",  position: "Engineer Cat. II", seniority: "II", location: "Gdańsk",   status: "active" },
      { id: 303, name: "Hryhorets K.",   position: "Engineer Cat. III",seniority: "III",location: "Gdańsk",   status: "active" },
      { id: 304, name: "Vasylenko I.",   position: "Junior Engineer",  seniority: "-",  location: "Mykolaiv", status: "active" },
    ],
    skills: [
      { id: "napa",    label: "NAPA",        group: "CAD" },
      { id: "cadmatic",label: "Cadmatic",    group: "CAD" },
      { id: "autocad", label: "AutoCAD",     group: "CAD" },
      { id: "concept", label: "Concept Des.",group: "Engineering" },
      { id: "basic",   label: "Basic Design",group: "Engineering" },
      { id: "naval",   label: "Naval Arch.", group: "Engineering" },
      { id: "cfd",     label: "CFD Analysis",group: "Engineering" },
    ],
    matrix: {
      301: { napa:3, cadmatic:2, autocad:2, concept:3, basic:3, naval:3, cfd:2 },
      302: { napa:3, cadmatic:1, autocad:2, concept:2, basic:3, naval:2, cfd:1 },
      303: { napa:2, cadmatic:1, autocad:2, concept:2, basic:2, naval:1, cfd:0 },
      304: { napa:1, cadmatic:0, autocad:1, concept:1, basic:1, naval:1, cfd:0 },
    },
    gaps: [
      "CFD Analysis: only 1 engineer at working level",
      "Cadmatic: 2 engineers at level 0–1",
    ],
  },
  "FEA": {
    color: "bg-purple-50 text-purple-700 border-purple-200",
    engineers: [
      { id: 401, name: "Marchenko V.",  position: "Engineer Cat. III",seniority: "III", location: "Mykolaiv", status: "active" },
      { id: 402, name: "Hrytsenko O.", position: "Engineer Cat. II", seniority: "II",  location: "Mykolaiv", status: "active" },
      { id: 403, name: "Kovalets P.",  position: "Engineer Cat. I",  seniority: "I",   location: "Gdańsk",   status: "active" },
      { id: 404, name: "Rudenko S.",   position: "Engineer Cat. III",seniority: "III", location: "Mykolaiv", status: "active" },
      { id: 405, name: "Bilous M.",    position: "Junior Engineer",  seniority: "-",   location: "Gdańsk",   status: "active" },
      { id: 406, name: "Semenko V.",   position: "Engineer Cat. II", seniority: "II",  location: "Mykolaiv", status: "active" },
      { id: 407, name: "Lysak T.",     position: "Engineer Cat. III",seniority: "III", location: "Gdańsk",   status: "active" },
    ],
    skills: [
      { id: "ansys",  label: "ANSYS",       group: "CAD" },
      { id: "femap",  label: "Femap",       group: "CAD" },
      { id: "nastran",label: "Nastran",     group: "CAD" },
      { id: "fea",    label: "FEA",         group: "Engineering" },
      { id: "struct", label: "Structural",  group: "Engineering" },
      { id: "fatigue",label: "Fatigue",     group: "Engineering" },
      { id: "scripting",label: "Scripting", group: "Engineering" },
    ],
    matrix: {
      401: { ansys:2, femap:3, nastran:1, fea:3, struct:2, fatigue:2, scripting:1 },
      402: { ansys:3, femap:2, nastran:2, fea:3, struct:3, fatigue:3, scripting:2 },
      403: { ansys:3, femap:3, nastran:3, fea:3, struct:3, fatigue:3, scripting:3 },
      404: { ansys:2, femap:2, nastran:1, fea:2, struct:2, fatigue:1, scripting:0 },
      405: { ansys:1, femap:1, nastran:0, fea:1, struct:1, fatigue:0, scripting:0 },
      406: { ansys:3, femap:2, nastran:2, fea:3, struct:2, fatigue:2, scripting:1 },
      407: { ansys:2, femap:1, nastran:1, fea:2, struct:2, fatigue:1, scripting:0 },
    },
    gaps: [
      "Nastran: 3 engineers at level 0–1",
      "Scripting: only Cat.I covered at expert level",
    ],
  },
  "Equipment": {
    color: "bg-red-50 text-red-700 border-red-200",
    engineers: [
      { id: 501, name: "Shevchenko I.", position: "Engineer Cat. II", seniority: "II", location: "Mykolaiv", status: "active" },
      { id: 502, name: "Boyko R.",      position: "Junior Engineer",  seniority: "-",  location: "Mykolaiv", status: "active" },
      { id: 503, name: "Perets V.",     position: "Engineer Cat. III",seniority: "III",location: "Mykolaiv", status: "active" },
      { id: 504, name: "Kuts O.",       position: "Engineer Cat. I",  seniority: "I",  location: "Gdańsk",   status: "active" },
      { id: 505, name: "Savych M.",     position: "Engineer Cat. III",seniority: "III",location: "Mykolaiv", status: "active" },
    ],
    skills: [
      { id: "sw",     label: "SolidWorks",  group: "CAD" },
      { id: "autocad",label: "AutoCAD",     group: "CAD" },
      { id: "aveva",  label: "AVEVA",       group: "CAD" },
      { id: "ramps",  label: "Ramps",       group: "Engineering" },
      { id: "doors",  label: "Doors/Hatches",group: "Engineering" },
      { id: "elev",   label: "Elevators",   group: "Engineering" },
      { id: "equip",  label: "Equipment",   group: "Engineering" },
    ],
    matrix: {
      501: { sw:3, autocad:2, aveva:1, ramps:3, doors:2, elev:2, equip:3 },
      502: { sw:1, autocad:1, aveva:0, ramps:1, doors:1, elev:0, equip:1 },
      503: { sw:2, autocad:2, aveva:1, ramps:2, doors:2, elev:1, equip:2 },
      504: { sw:3, autocad:3, aveva:2, ramps:3, doors:3, elev:3, equip:3 },
      505: { sw:2, autocad:1, aveva:0, ramps:1, doors:2, elev:1, equip:2 },
    },
    gaps: [
      "AVEVA: 3 engineers at level 0",
      "Elevators: only Cat.I at expert level",
    ],
  },
};

const DEPTS = Object.keys(DEPT_CONFIG);

const PDPS = [
  { id: 1, dept: "Hull Outfitting", engineer: "Savchenko D.",  goal: "Cat. III → Cat. II", deadline: "2026-09-01", status: "on-track",  progress: 65 },
  { id: 2, dept: "Hull Outfitting", engineer: "Kovalchuk I.",  goal: "Cat. III → Cat. II", deadline: "2026-12-01", status: "on-track",  progress: 40 },
  { id: 3, dept: "Hull Outfitting", engineer: "Boyko R.",      goal: "Junior → Cat. III",  deadline: "2027-03-01", status: "at-risk",   progress: 20 },
  { id: 4, dept: "Hull",            engineer: "Kravchenko D.", goal: "Cat. III → Cat. II", deadline: "2026-10-01", status: "on-track",  progress: 55 },
  { id: 5, dept: "M&P",             engineer: "Moroz A.",      goal: "AVEVA L1 → L2",      deadline: "2026-08-01", status: "completed", progress: 100 },
  { id: 6, dept: "FEA",             engineer: "Marchenko V.",  goal: "Cat. III → Cat. II", deadline: "2027-01-01", status: "on-track",  progress: 30 },
  { id: 7, dept: "Equipment",       engineer: "Boyko R.",      goal: "Junior → Cat. III",  deadline: "2027-03-01", status: "at-risk",   progress: 15 },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const seniorityStyle = {
  Lead: "bg-violet-100 text-violet-700 border border-violet-200",
  I:    "bg-blue-100 text-blue-700 border border-blue-200",
  II:   "bg-cyan-100 text-cyan-700 border border-cyan-200",
  III:  "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "-":  "bg-gray-100 text-gray-500 border border-gray-200",
};
const seniorityLabel = { Lead: "Lead", I: "Cat. I", II: "Cat. II", III: "Cat. III", "-": "Junior" };
const levelColor = { 0: "bg-gray-100", 1: "bg-amber-100 text-amber-700", 2: "bg-blue-100 text-blue-700", 3: "bg-emerald-100 text-emerald-700" };
const levelLabel = { 0: "—", 1: "◐", 2: "●", 3: "★" };
const levelFull  = { 0: "No skill", 1: "Basic", 2: "Working", 3: "Expert" };
const pdpStatusStyle = {
  "on-track":  "bg-blue-50 text-blue-700 border border-blue-200",
  "at-risk":   "bg-amber-50 text-amber-700 border border-amber-200",
  "completed": "bg-green-50 text-green-700 border border-green-200",
};

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Matrix Component ───────────────────────────────────────────────────────────
function DeptMatrix({ deptKey }) {
  const [hover, setHover] = useState(null);
  const dept = DEPT_CONFIG[deptKey];
  const groups = [...new Set(dept.skills.map(s => s.group))];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-xs text-gray-400 font-mono">Level:</span>
        {[0,1,2,3].map(l => (
          <span key={l} className={`text-xs px-2 py-0.5 rounded font-mono ${levelColor[l]}`}>
            {levelLabel[l]} {levelFull[l]}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-3 py-2.5 font-semibold text-gray-600 sticky left-0 bg-gray-50 min-w-[140px]">Engineer</th>
              <th className="text-left px-2 py-2.5 font-semibold text-gray-600 min-w-[70px]">Seniority</th>
              {groups.map(g => (
                <th key={g} colSpan={dept.skills.filter(s => s.group === g).length}
                  className="text-center px-2 py-1.5 font-semibold text-gray-500 border-l border-gray-200 uppercase tracking-wider text-[10px]">
                  {g}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="sticky left-0 bg-gray-50" />
              <th />
              {dept.skills.map(s => (
                <th key={s.id} className="text-center px-1 py-1.5 font-medium text-gray-500 border-l border-gray-100 min-w-[52px]">
                  <div className="text-[10px] leading-tight">{s.label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dept.engineers.map((eng, i) => {
              const row = dept.matrix[eng.id] || {};
              const isTerm = eng.status === "termination";
              return (
                <tr key={eng.id} className={`border-b border-gray-100 transition-colors ${isTerm ? "bg-red-50/50" : i % 2 === 0 ? "bg-white" : "bg-gray-50/30"} hover:bg-blue-50/30`}>
                  <td className={`px-3 py-2 sticky left-0 font-medium ${isTerm ? "bg-red-50/50 text-red-700" : "bg-inherit text-gray-800"}`}>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {eng.name}
                      {isTerm && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-mono border border-red-200">term {eng.termDate}</span>}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">{eng.location}</div>
                  </td>
                  <td className="px-2 py-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${seniorityStyle[eng.seniority]}`}>
                      {seniorityLabel[eng.seniority]}
                    </span>
                  </td>
                  {dept.skills.map(s => {
                    const lvl = row[s.id] ?? 0;
                    const key = `${eng.id}-${s.id}`;
                    return (
                      <td key={s.id} className="text-center px-1 py-2 border-l border-gray-100 relative"
                        onMouseEnter={() => setHover(key)} onMouseLeave={() => setHover(null)}>
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm cursor-default transition-all ${levelColor[lvl]} ${hover === key ? "scale-110 shadow-sm" : ""}`}>
                          {levelLabel[lvl]}
                        </span>
                        {hover === key && (
                          <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-[10px] rounded whitespace-nowrap pointer-events-none">
                            {eng.name} · {s.label}: {levelFull[lvl]}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {dept.gaps.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="text-xs font-semibold text-amber-800 mb-2">⚠️ Gap Analysis — {deptKey}</div>
          <div className="space-y-1">
            {dept.gaps.map((g, i) => <div key={i} className="text-xs text-amber-700">• {g}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tab: Competence Matrix ─────────────────────────────────────────────────────
function TabMatrix() {
  const [activeDept, setActiveDept] = useState("Hull Outfitting");
  const cfg = DEPT_CONFIG[activeDept];

  return (
    <div className="space-y-4">
      {/* Dept switcher */}
      <div className="flex gap-1.5 flex-wrap">
        {DEPTS.map(d => (
          <button key={d} onClick={() => setActiveDept(d)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
              activeDept === d
                ? cfg.color + " scale-105 shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            }`}>
            {d}
            <span className="ml-1 text-[10px] opacity-70">({DEPT_CONFIG[d].engineers.length})</span>
          </button>
        ))}
      </div>
      <DeptMatrix deptKey={activeDept} />
    </div>
  );
}

// ── Tab: PDP ───────────────────────────────────────────────────────────────────
function TabPDP() {
  const [deptFilter, setDeptFilter] = useState("All");
  const filtered = deptFilter === "All" ? PDPS : PDPS.filter(p => p.dept === deptFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1.5 flex-wrap">
          {["All", ...DEPTS].map(d => (
            <button key={d} onClick={() => setDeptFilter(d)}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                deptFilter === d ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
              }`}>{d}</button>
          ))}
        </div>
        <button className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">+ New PDP</button>
      </div>
      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-all">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{p.engineer}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${DEPT_CONFIG[p.dept]?.color}`}>{p.dept}</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">Goal: {p.goal}</div>
                <div className="text-xs text-gray-400 mt-0.5">Deadline: {formatDate(p.deadline)}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${pdpStatusStyle[p.status]}`}>{p.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${p.progress === 100 ? "bg-emerald-500" : p.status === "at-risk" ? "bg-amber-400" : "bg-blue-500"}`}
                  style={{ width: `${p.progress}%` }} />
              </div>
              <span className="text-xs font-mono text-gray-500 w-8 text-right">{p.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: CV Generation ─────────────────────────────────────────────────────────
function TabCV() {
  const [selected, setSelected] = useState(null);
  const [deptFilter, setDeptFilter] = useState("Hull Outfitting");
  const allEngineers = DEPT_CONFIG[deptFilter].engineers.filter(e => e.status === "active");

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5 flex-wrap">
        {DEPTS.map(d => (
          <button key={d} onClick={() => { setDeptFilter(d); setSelected(null); }}
            className={`text-xs px-3 py-1 rounded-full border transition-all ${
              deptFilter === d ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
            }`}>{d}</button>
        ))}
      </div>
      <div className="text-xs text-gray-400">Select engineer to generate CV from Skills Matrix + Profile data</div>
      <div className="grid grid-cols-2 gap-2">
        {allEngineers.map(eng => (
          <button key={eng.id} onClick={() => setSelected(selected === eng.id ? null : eng.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${selected === eng.id ? "bg-blue-50 border-blue-300" : "bg-white border-gray-100 hover:border-blue-200"}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
              {eng.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <div className="text-xs font-medium text-gray-800">{eng.name}</div>
              <div className="text-[10px] text-gray-400">{eng.position}</div>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
          <div className="text-sm font-semibold text-blue-800">
            CV Preview — {allEngineers.find(e => e.id === selected)?.name}
          </div>
          <div className="text-xs text-blue-600 space-y-1">
            <div>✓ Personal data from Profile</div>
            <div>✓ Skills from {deptFilter} Competence Matrix</div>
            <div>✓ Seniority: {seniorityLabel[allEngineers.find(e => e.id === selected)?.seniority]}</div>
            <div>✓ Projects from Projects & Coordination</div>
          </div>
          <button className="w-full py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Generate PDF CV
          </button>
        </div>
      )}
    </div>
  );
}

// ── Tab: Overview ──────────────────────────────────────────────────────────────
function TabOverview() {
  const allEng = Object.values(DEPT_CONFIG).flatMap(d => d.engineers);
  const active = allEng.filter(e => e.status === "active").length;
  const termination = allEng.filter(e => e.status === "termination").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="text-xs text-blue-500 font-mono uppercase tracking-wider mb-1">Total Engineers</div>
          <div className="text-3xl font-light text-blue-700">{active}</div>
          <div className="text-xs text-blue-400 mt-1">active across all depts</div>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="text-xs text-red-500 font-mono uppercase tracking-wider mb-1">Termination</div>
          <div className="text-3xl font-light text-red-700">{termination}</div>
          <div className="text-xs text-red-400 mt-1">01.06.2026</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <div className="text-xs text-emerald-500 font-mono uppercase tracking-wider mb-1">Active PDPs</div>
          <div className="text-3xl font-light text-emerald-700">{PDPS.filter(p => p.status !== "completed").length}</div>
          <div className="text-xs text-emerald-400 mt-1">in progress</div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <div className="text-xs text-amber-500 font-mono uppercase tracking-wider mb-1">Departments</div>
          <div className="text-3xl font-light text-amber-700">{DEPTS.length}</div>
          <div className="text-xs text-amber-400 mt-1">with competence matrix</div>
        </div>
      </div>

      {/* Per-dept summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Department Summary</div>
        <div className="space-y-2">
          {DEPTS.map(d => {
            const cfg = DEPT_CONFIG[d];
            const count = cfg.engineers.filter(e => e.status === "active").length;
            const term = cfg.engineers.filter(e => e.status === "termination").length;
            return (
              <div key={d} className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium w-32 text-center ${cfg.color}`}>{d}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(count / 40) * 100}%` }} />
                </div>
                <span className="text-xs font-mono text-gray-500 w-16 text-right">
                  {count} eng{term > 0 && <span className="text-red-500"> · {term}↓</span>}
                </span>
                <span className="text-xs text-gray-400">{cfg.gaps.length} gaps</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
const TABS = ["Overview", "Competence Matrix", "PDP", "CV Generation"];

export default function Talent() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="p-6 max-w-full mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Talent Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Competence Matrix 2026 · All Departments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
          + Add Engineer
        </button>
      </div>

      <div className="flex gap-0 border-b border-gray-200">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}>
            {tab}
            {tab === "PDP" && <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">{PDPS.length}</span>}
          </button>
        ))}
      </div>

      {activeTab === "Overview"          && <TabOverview />}
      {activeTab === "Competence Matrix" && <TabMatrix />}
      {activeTab === "PDP"               && <TabPDP />}
      {activeTab === "CV Generation"     && <TabCV />}
    </div>
  );
}
