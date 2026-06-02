import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ── Mock data ──────────────────────────────────────────────────────────────────
const ENGINEERS = [
  {
    id: 1,
    name: "Oleksandr Petrenko",
    position: "Lead Engineer",
    department: "Hull Outfitting",
    seniority: "Lead",
    avatar: null,
    initials: "OP",
    email: "o.petrenko@c-job.com.ua",
    phone: "+38 050 123 4567",
    mobile: "+38 067 987 6543",
    location: "Mykolaiv, Ukraine",
    office: "C-Job Nikolayev — Main Office",
    timezone: "UTC+3 (EET)",
    startDate: "2019-03-15",
    birthday: "1985-07-22",
    contractType: "Full-time",
    manager: "Iryna Kovalenko",
    managerTitle: "Head of Engineering",
    team: "Hull Outfitting",
    reportsTo: "Iryna Kovalenko",
    peers: ["Dmytro Savchenko", "Maria Bondarenko", "Serhii Lysenko"],
    directReports: ["Vasyl Melnyk", "Oksana Hrytsenko"],
    skills: ["AutoCAD", "FORAN", "AVEVA Marine", "Structural Analysis", "Classification Societies"],
    cad: ["AutoCAD", "FORAN"],
    languages: ["Ukrainian (Native)", "English (B2)", "Russian (Fluent)"],
    documents: [
      { name: "Employment Contract", type: "PDF", date: "2019-03-15", size: "245 KB", status: "active" },
      { name: "NDA Agreement", type: "PDF", date: "2019-03-15", size: "128 KB", status: "active" },
      { name: "Engineering License", type: "PDF", date: "2023-01-10", size: "512 KB", status: "active" },
      { name: "Safety Certificate", type: "PDF", date: "2024-06-01", size: "320 KB", status: "expiring" },
      { name: "Performance Review 2024", type: "PDF", date: "2025-01-20", size: "180 KB", status: "active" },
    ],
    bio: "Senior structural engineer with 12+ years in shipbuilding. Specializes in hull outfitting and structural integrity analysis for offshore vessels.",
  },
  {
    id: 2,
    name: "Dmytro Savchenko",
    position: "Engineer Cat. I",
    department: "Hull Outfitting",
    seniority: "I",
    avatar: null,
    initials: "DS",
    email: "d.savchenko@c-job.com.ua",
    phone: "+38 050 234 5678",
    mobile: "+38 067 876 5432",
    location: "Mykolaiv, Ukraine",
    office: "C-Job Nikolayev — Main Office",
    timezone: "UTC+3 (EET)",
    startDate: "2021-06-01",
    birthday: "1990-11-14",
    contractType: "Full-time",
    manager: "Oleksandr Petrenko",
    managerTitle: "Lead Engineer",
    team: "Hull Outfitting",
    reportsTo: "Oleksandr Petrenko",
    peers: ["Maria Bondarenko", "Serhii Lysenko"],
    directReports: [],
    skills: ["AutoCAD", "AVEVA Marine", "Welding Inspection", "3D Modeling"],
    cad: ["AutoCAD", "AVEVA Marine"],
    languages: ["Ukrainian (Native)", "English (B1)"],
    documents: [
      { name: "Employment Contract", type: "PDF", date: "2021-06-01", size: "238 KB", status: "active" },
      { name: "NDA Agreement", type: "PDF", date: "2021-06-01", size: "128 KB", status: "active" },
      { name: "Welding Certificate", type: "PDF", date: "2022-09-15", size: "410 KB", status: "active" },
    ],
    bio: "Structural engineer focused on hull plating and frame systems. Strong background in welding quality control.",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const seniorityConfig = {
  Lead: { label: "Lead Engineer", color: "bg-violet-100 text-violet-700 border border-violet-200" },
  I: { label: "Cat. I", color: "bg-blue-100 text-blue-700 border border-blue-200" },
  II: { label: "Cat. II", color: "bg-cyan-100 text-cyan-700 border border-cyan-200" },
  III: { label: "Cat. III", color: "bg-emerald-100 text-emerald-700 border border-emerald-200" },
  "-": { label: "Junior", color: "bg-gray-100 text-gray-600 border border-gray-200" },
};

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function tenure(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  const years = Math.floor((now - start) / (365.25 * 24 * 3600 * 1000));
  const months = Math.floor(((now - start) % (365.25 * 24 * 3600 * 1000)) / (30.44 * 24 * 3600 * 1000));
  if (years === 0) return `${months}mo`;
  return `${years}yr ${months}mo`;
}

const docStatusStyle = {
  active: "bg-green-50 text-green-700 border border-green-200",
  expiring: "bg-amber-50 text-amber-700 border border-amber-200",
  expired: "bg-red-50 text-red-600 border border-red-200",
};

// ── Avatar ─────────────────────────────────────────────────────────────────────
function Avatar({ person, size = "lg" }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-16 h-16 text-xl", xl: "w-20 h-20 text-2xl" };
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0`}>
      {person.initials}
    </div>
  );
}

// ── Tab: Overview ──────────────────────────────────────────────────────────────
function TabOverview({ person }) {
  const sc = seniorityConfig[person.seniority] || seniorityConfig["-"];
  return (
    <div className="space-y-6">
      {/* About */}
      <Section title="About">
        <p className="text-sm text-gray-600 leading-relaxed">{person.bio}</p>
      </Section>

      {/* Key info grid */}
      <Section title="Details">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <InfoRow label="Position" value={person.position} />
          <InfoRow label="Department" value={person.department} />
          <InfoRow label="Seniority">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sc.color}`}>{sc.label}</span>
          </InfoRow>
          <InfoRow label="Contract" value={person.contractType} />
          <InfoRow label="Start Date" value={formatDate(person.startDate)} />
          <InfoRow label="Tenure" value={tenure(person.startDate)} />
          <InfoRow label="Birthday" value={formatDate(person.birthday)} />
          <InfoRow label="Location" value={person.location} />
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills & Competencies">
        <div className="flex flex-wrap gap-2">
          {person.skills.map((s) => (
            <span key={s} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full border border-slate-200">{s}</span>
          ))}
        </div>
      </Section>

      {/* CAD Tools */}
      <Section title="CAD Tools">
        <div className="flex flex-wrap gap-2">
          {person.cad.map((c) => (
            <span key={c} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-200 font-medium">{c}</span>
          ))}
        </div>
      </Section>

      {/* Languages */}
      <Section title="Languages">
        <div className="flex flex-wrap gap-2">
          {person.languages.map((l) => (
            <span key={l} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200">{l}</span>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ── Tab: Contact ───────────────────────────────────────────────────────────────
function TabContact({ person }) {
  return (
    <div className="space-y-6">
      <Section title="Contact Information">
        <div className="space-y-3">
          <ContactRow icon="✉" label="Work Email" value={person.email} href={`mailto:${person.email}`} />
          <ContactRow icon="📞" label="Phone" value={person.phone} />
          <ContactRow icon="📱" label="Mobile" value={person.mobile} />
        </div>
      </Section>

      <Section title="Location & Office">
        <div className="space-y-3">
          <ContactRow icon="📍" label="Location" value={person.location} />
          <ContactRow icon="🏢" label="Office" value={person.office} />
          <ContactRow icon="🕐" label="Timezone" value={person.timezone} />
        </div>
      </Section>
    </div>
  );
}

// ── Tab: Organization ──────────────────────────────────────────────────────────
function TabOrganization({ person, allEngineers, onNavigate }) {
  const manager = allEngineers.find((e) => e.name === person.manager);
  const reports = allEngineers.filter((e) => person.directReports.includes(e.name));

  return (
    <div className="space-y-6">
      {/* Reports to */}
      <Section title="Reports To">
        {manager ? (
          <PersonCard person={manager} subtitle={manager.position} onClick={() => onNavigate(manager.id)} />
        ) : (
          <div className="text-sm text-gray-400 italic">No manager data</div>
        )}
      </Section>

      {/* Team */}
      <Section title={`Team — ${person.team}`}>
        <div className="text-xs text-gray-500 mb-3">{person.peers.length} peer{person.peers.length !== 1 ? "s" : ""}</div>
        <div className="space-y-2">
          {person.peers.map((name) => {
            const peer = allEngineers.find((e) => e.name === name);
            return peer ? (
              <PersonCard key={name} person={peer} subtitle={peer.position} onClick={() => onNavigate(peer.id)} />
            ) : (
              <div key={name} className="text-sm text-gray-500 py-1 px-3 bg-gray-50 rounded-lg">{name}</div>
            );
          })}
        </div>
      </Section>

      {/* Direct reports */}
      {person.directReports.length > 0 && (
        <Section title="Direct Reports">
          <div className="space-y-2">
            {reports.map((r) => (
              <PersonCard key={r.id} person={r} subtitle={r.position} onClick={() => onNavigate(r.id)} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

// ── Tab: Documents ─────────────────────────────────────────────────────────────
function TabDocuments({ person }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? person.documents : person.documents.filter((d) => d.status === filter);

  return (
    <div className="space-y-4">
      {/* Filter pills */}
      <div className="flex gap-2">
        {["all", "active", "expiring", "expired"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs rounded-full border transition-colors capitalize ${
              filter === f
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Documents list */}
      <div className="space-y-2">
        {filtered.map((doc, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center text-red-500 text-xs font-bold flex-shrink-0">
                PDF
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">{doc.name}</div>
                <div className="text-xs text-gray-400">{formatDate(doc.date)} · {doc.size}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${docStatusStyle[doc.status]}`}>
                {doc.status}
              </span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-blue-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-sm text-gray-400 italic text-center py-8">No documents found</div>
        )}
      </div>

      {/* Upload button */}
      <button className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Upload document
      </button>
    </div>
  );
}

// ── Reusable sub-components ────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value, children }) {
  return (
    <div>
      <div className="text-xs text-gray-400 mb-0.5">{label}</div>
      {children || <div className="text-sm text-gray-800 font-medium">{value || "—"}</div>}
    </div>
  );
}

function ContactRow({ icon, label, value, href }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
      <span className="text-base w-5 text-center">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-400">{label}</div>
        {href ? (
          <a href={href} className="text-sm text-blue-600 hover:underline truncate block">{value}</a>
        ) : (
          <div className="text-sm text-gray-800 font-medium">{value}</div>
        )}
      </div>
    </div>
  );
}

function PersonCard({ person, subtitle, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-transparent cursor-pointer transition-all group"
    >
      <Avatar person={person} size="md" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-800 group-hover:text-blue-700">{person.name}</div>
        <div className="text-xs text-gray-400 truncate">{subtitle}</div>
      </div>
      <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

// ── Main Profile Component ─────────────────────────────────────────────────────
const TABS = ["Overview", "Contact", "Organization", "Documents"];

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  const personId = id ? parseInt(id) : 1;
  const person = ENGINEERS.find((e) => e.id === personId) || ENGINEERS[0];
  const sc = seniorityConfig[person.seniority] || seniorityConfig["-"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header card ── */}
      <div className="bg-white border-b border-gray-200">
        {/* Cover / top strip */}
        <div className="h-24 bg-gradient-to-r from-slate-700 via-slate-600 to-indigo-700 relative">
          <button
            onClick={() => navigate("/engineers")}
            className="absolute top-4 left-6 flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Engineers
          </button>
        </div>

        {/* Profile info row */}
        <div className="px-6 pb-0">
          <div className="flex items-end gap-4 -mt-8 mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-semibold border-4 border-white shadow-md flex-shrink-0">
              {person.initials}
            </div>
            <div className="pb-2 flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-semibold text-gray-900">{person.name}</h1>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sc.color}`}>{sc.label}</span>
              </div>
              <div className="text-sm text-gray-500 mt-0.5">{person.position} · {person.department}</div>
            </div>

            {/* Quick actions */}
            <div className="flex gap-2 pb-2 flex-shrink-0">
              <a
                href={`mailto:${person.email}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 text-sm rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-b border-gray-200 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
                {tab === "Documents" && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full">
                    {person.documents.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="max-w-3xl mx-auto px-6 py-6">
        {activeTab === "Overview" && <TabOverview person={person} />}
        {activeTab === "Contact" && <TabContact person={person} />}
        {activeTab === "Organization" && (
          <TabOrganization
            person={person}
            allEngineers={ENGINEERS}
            onNavigate={(id) => navigate(`/engineers/${id}`)}
          />
        )}
        {activeTab === "Documents" && <TabDocuments person={person} />}
      </div>
    </div>
  );
}
