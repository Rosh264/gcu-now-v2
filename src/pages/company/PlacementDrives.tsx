import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiBell,
  FiPlus,
  FiSearch,
  FiChevronDown,
  FiMoreVertical,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiEye,
  FiGrid,
  FiSend,
  FiLayers,
  FiBriefcase,
} from "react-icons/fi";

/* --- Static mock data --------------------------------------------------- */
interface Drive {
  id: number;
  role: string;
  company?: string;
  status: "ACTIVE" | "PENDING APPROVAL" | "COMPLETED" | "UPCOMING";
  packageLPA: string;
  location: string;
  date: string;
  candidates: number;
  shortlisted: number;
  interviews: number;
  progress: number;
}

const DRIVES: Drive[] = [
  {
    id: 1,
    role: "Software Development Engineer (SDE)",
    company: "Microsoft",
    status: "ACTIVE",
    packageLPA: "12 LPA",
    location: "Bangalore",
    date: "Oct 15",
    candidates: 84,
    shortlisted: 32,
    interviews: 18,
    progress: 72,
  },
  {
    id: 2,
    role: "Data Analyst",
    status: "ACTIVE",
    packageLPA: "10 LPA",
    location: "Bangalore",
    date: "Oct 20",
    candidates: 42,
    shortlisted: 15,
    interviews: 8,
    progress: 55,
  },
  {
    id: 3,
    role: "Cloud Engineer",
    status: "PENDING APPROVAL",
    packageLPA: "15 LPA",
    location: "Hyderabad",
    date: "Pending",
    candidates: 36,
    shortlisted: 11,
    interviews: 6,
    progress: 38,
  },
  {
    id: 4,
    role: "Product Manager",
    status: "UPCOMING",
    packageLPA: "18 LPA",
    location: "Mumbai",
    date: "Nov 5",
    candidates: 0,
    shortlisted: 0,
    interviews: 0,
    progress: 0,
  },
  {
    id: 5,
    role: "DevOps Engineer",
    status: "COMPLETED",
    packageLPA: "14 LPA",
    location: "Pune",
    date: "Sep 28",
    candidates: 96,
    shortlisted: 40,
    interviews: 22,
    progress: 100,
  },
];

/* --- Status badge helper ------------------------------------------------ */
function StatusBadge({ status }: { status: Drive["status"] }) {
  const map: Record<Drive["status"], { bg: string; text: string; dot: string }> = {
    ACTIVE: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    "PENDING APPROVAL": { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
    COMPLETED: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
    UPCOMING: { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-500" },
  };
  const s = map[status];
  return (
    <span
      className={`${s.bg} ${s.text} inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide`}
    >
      <span className={`${s.dot} inline-block h-1.5 w-1.5 rounded-full`} />
      {status}
    </span>
  );
}

/* --- Quick-action dropdown ---------------------------------------------- */
function QuickActionMenu({ driveId }: { driveId: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const items = [
    { icon: <FiEye size={14} />, label: "View Details" },
    { icon: <FiEdit2 size={14} />, label: "Edit Drive" },
    { icon: <FiCopy size={14} />, label: "Duplicate" },
    { icon: <FiTrash2 size={14} />, label: "Delete", danger: true },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        aria-label={`Quick actions for drive ${driveId}`}
      >
        <FiMoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-30 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setOpen(false)}
              className={`flex w-full items-center gap-2.5 px-4 py-2 text-left text-[13px] font-medium transition-colors ${item.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-slate-700 hover:bg-slate-50"
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   MAIN PAGE COMPONENT
   ========================================================================= */
export default function CompanyPlacementDrives() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/company/dashboard", icon: <FiGrid size={17} /> },
    { name: "Placement Drives", path: "/company/drives", icon: <FiSend size={17} /> },
    { name: "Candidates", path: "/company/candidates", icon: <FiUsers size={17} /> },
    { name: "Interviews", path: "/company/interviews", icon: <FiCalendar size={17} /> },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");

  /* -- Filter logic ------------------------------------------------------ */
  const filteredDrives = DRIVES.filter((d) => {
    const matchesSearch =
      d.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.company || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  /* -- KPI computation --------------------------------------------------- */
  const kpiData = [
    {
      label: "ACTIVE DRIVES",
      value: DRIVES.filter((d) => d.status === "ACTIVE").length,
      icon: <FiTrendingUp size={18} />,
      accent: "text-orange-500",
    },
    {
      label: "UPCOMING",
      value: DRIVES.filter((d) => d.status === "UPCOMING").length,
      icon: <FiClock size={18} />,
      accent: "text-amber-500",
    },
    {
      label: "COMPLETED",
      value: DRIVES.filter((d) => d.status === "COMPLETED").length,
      icon: <FiCheckCircle size={18} />,
      accent: "text-emerald-500",
    },
    {
      label: "TOTAL HIRES",
      value: DRIVES.reduce((sum, d) => sum + d.interviews, 0),
      icon: <FiUsers size={18} />,
      accent: "text-sky-500",
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fb", fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <aside style={{ width: "240px", background: "white", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0, position: "sticky", top: 0, height: "100vh", zIndex: 40 }}>
        <div>
          <div style={{ padding: "22px 20px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "#381c0f", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "18px", boxShadow: "0 2px 4px rgba(56, 28, 15, 0.2)" }}>
              <FiBriefcase size={20} />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#111827", letterSpacing: "-0.3px" }}>GCU NOW</div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#ea580c", letterSpacing: "0.8px", textTransform: "uppercase" }}>HR PORTAL</div>
            </div>
          </div>
          <nav style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button key={item.name} type="button" onClick={() => navigate(item.path)} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: isActive ? 700 : 500, color: isActive ? "white" : "#4b5563", background: isActive ? "#381c0f" : "transparent", border: "none", cursor: "pointer", transition: "all 0.15s ease", textAlign: "left" }} className={!isActive ? "hover:bg-orange-50/50 hover:text-orange-900" : ""}>
                  <span style={{ color: isActive ? "#ea580c" : "#9ca3af" }}>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div style={{ padding: "16px 12px", borderTop: "1px solid #f3f4f6" }}>
          <button type="button" onClick={() => navigate("/company/profile")} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: location.pathname === "/company/profile" ? 700 : 500, color: location.pathname === "/company/profile" ? "white" : "#4b5563", background: location.pathname === "/company/profile" ? "#381c0f" : "transparent", border: "none", cursor: "pointer", transition: "all 0.15s ease", textAlign: "left" }} className={location.pathname !== "/company/profile" ? "hover:bg-orange-50/50 hover:text-orange-900" : ""}>
            <FiLayers size={17} style={{ color: location.pathname === "/company/profile" ? "#ea580c" : "#9ca3af" }} />
            <span>Company Profile</span>
          </button>
        </div>
      </aside>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div className="mx-auto w-full max-w-7xl flex flex-col gap-6 p-8 font-['Inter',system-ui,sans-serif]">
          {/* Page Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            {/* Title */}
            <div>
              <h1 className="text-[26px] font-extrabold tracking-tight text-[#381c0f]">
                Placement Drives
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Create, manage and track your campus recruitment drives.
              </p>
            </div>

            {/* Top-right controls */}
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:bg-slate-50 hover:text-slate-700"
                title="Notifications"
              >
                <FiBell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-orange-500" />
              </button>

              {/* HR Avatar Pill */}
              <div
                className="flex cursor-pointer items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                title="HR Account"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
                  MS
                </div>
                <span className="text-[13px] font-bold text-slate-800">Microsoft HR</span>
              </div>

              {/* + Create Placement Drive */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_2px_6px_rgba(234,88,12,0.3)] transition-all hover:bg-orange-700 active:scale-[0.98]"
              >
                <FiPlus size={16} strokeWidth={3} />
                <span>Create Placement Drive</span>
              </button>
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {kpiData.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wide text-slate-500">
                    {kpi.label}
                  </span>
                  <span className={kpi.accent}>{kpi.icon}</span>
                </div>
                <div className="mt-2 text-3xl font-extrabold tracking-tight text-[#381c0f]">
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search role or drive name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-[13px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Status dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-[13px] font-semibold text-slate-700 outline-none transition-colors hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              >
                <option value="All">Status: All</option>
                <option value="ACTIVE">Active</option>
                <option value="PENDING APPROVAL">Pending</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <FiChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-[13px] font-semibold text-slate-700 outline-none transition-colors hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              >
                <option value="Latest">Sort: Latest</option>
                <option value="Oldest">Sort: Oldest</option>
                <option value="Package">Sort: Package</option>
              </select>
              <FiChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* Drive Cards */}
          <div className="flex flex-col gap-3">
            {filteredDrives.map((drive) => (
              <div
                key={drive.id}
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all hover:shadow-md"
              >
                {/* Left: Role info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="truncate text-[15px] font-bold text-[#381c0f]">
                      {drive.role}
                    </h3>
                    {drive.company && (
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                        {drive.company}
                      </span>
                    )}
                    <StatusBadge status={drive.status} />
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-4 text-[12.5px] text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <FiDollarSign size={13} className="text-slate-400" />
                      {drive.packageLPA}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiMapPin size={13} className="text-slate-400" />
                      {drive.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiCalendar size={13} className="text-slate-400" />
                      {drive.date}
                    </span>
                  </div>
                </div>

                {/* Right: Stats + Progress */}
                <div className="flex shrink-0 items-center gap-4">
                  <div className="w-80">
                    {/* Inline stats */}
                    <div className="mb-2 flex items-center justify-between text-[12px]">
                      <span className="font-semibold text-orange-600">
                        {drive.candidates}{" "}
                        <span className="font-normal text-slate-500">Candidates</span>
                      </span>
                      <span className="font-semibold text-[#381c0f]">
                        {drive.shortlisted}{" "}
                        <span className="font-normal text-slate-500">Shortlisted</span>
                      </span>
                      <span className="font-semibold text-slate-600">
                        {drive.interviews}{" "}
                        <span className="font-normal text-slate-500">Interviews</span>
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-orange-100">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${drive.progress}%`,
                          background:
                            drive.progress === 100
                              ? "#381c0f"
                              : "linear-gradient(90deg, #ea580c, #9a3412)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Quick-action menu */}
                  <QuickActionMenu driveId={drive.id} />
                </div>
              </div>
            ))}

            {/* Empty state */}
            {filteredDrives.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
                <FiSearch size={32} className="mb-3 text-slate-300" />
                <p className="text-sm font-semibold text-slate-500">No drives found</p>
                <p className="mt-1 text-xs text-slate-400">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>

          {/* Footer: Load More */}
          <div className="flex justify-center pb-4 pt-2">
            <button
              type="button"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-orange-600"
            >
              Load More
              <FiChevronDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}