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
    ACTIVE: { bg: "#ecfdf5", text: "#047857", dot: "#10b981" },
    "PENDING APPROVAL": { bg: "#fff7ed", text: "#c2410c", dot: "#f97316" },
    COMPLETED: { bg: "#f1f5f9", text: "#475569", dot: "#94a3b8" },
    UPCOMING: { bg: "#f0f9ff", text: "#0369a1", dot: "#0ea5e9" },
  };
  const s = map[status];
  return (
    <span
      style={{
        background: s.bg,
        color: s.text,
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        borderRadius: "9999px",
        padding: "2px 10px",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.025em"
      }}
    >
      <span style={{ background: s.dot, display: "inline-block", height: "6px", width: "6px", borderRadius: "9999px" }} />
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
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          height: "32px",
          width: "32px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          color: "#9ca3af",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          transition: "all 0.15s ease"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; }}
        aria-label={`Quick actions for drive ${driveId}`}
      >
        <FiMoreVertical size={18} />
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "36px",
          zIndex: 30,
          width: "176px",
          overflow: "hidden",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          background: "white",
          padding: "4px 0",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)"
        }}>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: "10px",
                padding: "8px 16px",
                textAlign: "left",
                fontSize: "13px",
                fontWeight: 500,
                transition: "all 0.15s ease",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: item.danger ? "#dc2626" : "#374151"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = item.danger ? "#fef2f2" : "#f8fafc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
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
      accent: "#f97316",
    },
    {
      label: "UPCOMING",
      value: DRIVES.filter((d) => d.status === "UPCOMING").length,
      icon: <FiClock size={18} />,
      accent: "#f59e0b",
    },
    {
      label: "COMPLETED",
      value: DRIVES.filter((d) => d.status === "COMPLETED").length,
      icon: <FiCheckCircle size={18} />,
      accent: "#10b981",
    },
    {
      label: "TOTAL HIRES",
      value: DRIVES.reduce((sum, d) => sum + d.interviews, 0),
      icon: <FiUsers size={18} />,
      accent: "#0ea5e9",
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
                <button key={item.name} type="button" onClick={() => navigate(item.path)} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: isActive ? 700 : 500, color: isActive ? "white" : "#4b5563", background: isActive ? "#381c0f" : "transparent", border: "none", cursor: "pointer", transition: "all 0.15s ease", textAlign: "left" }} onMouseEnter={(e) => { if(!isActive) { e.currentTarget.style.background = "rgba(255, 237, 213, 0.5)"; e.currentTarget.style.color = "#7c2d12"; } }} onMouseLeave={(e) => { if(!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4b5563"; } }}>
                  <span style={{ color: isActive ? "#ea580c" : "#9ca3af" }}>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div style={{ padding: "16px 12px", borderTop: "1px solid #f3f4f6" }}>
          <button type="button" onClick={() => navigate("/company/profile")} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: location.pathname === "/company/profile" ? 700 : 500, color: location.pathname === "/company/profile" ? "white" : "#4b5563", background: location.pathname === "/company/profile" ? "#381c0f" : "transparent", border: "none", cursor: "pointer", transition: "all 0.15s ease", textAlign: "left" }} onMouseEnter={(e) => { if(location.pathname !== "/company/profile") { e.currentTarget.style.background = "rgba(255, 237, 213, 0.5)"; e.currentTarget.style.color = "#7c2d12"; } }} onMouseLeave={(e) => { if(location.pathname !== "/company/profile") { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4b5563"; } }}>
            <FiLayers size={17} style={{ color: location.pathname === "/company/profile" ? "#ea580c" : "#9ca3af" }} />
            <span>Company Profile</span>
          </button>
        </div>
      </aside>
      <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        <div style={{ padding: "32px 32px 64px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* ═══════ Top Content Header ═══════ */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#381c0f", margin: "0 0 4px", letterSpacing: "-0.5px" }}>
                Placement Drives
              </h1>
              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
                Create, manage and track your campus recruitment drives.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginRight: "8px" }}>
                <button
                  type="button"
                  style={{ position: "relative", width: "40px", height: "40px", borderRadius: "10px", background: "white", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", cursor: "pointer", transition: "all 0.15s ease", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                >
                  <FiBell size={18} />
                  <span style={{ position: "absolute", top: "8px", right: "8px", width: "8px", height: "8px", borderRadius: "50%", background: "#ea580c", border: "2px solid white" }} />
                </button>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 12px 4px 4px", borderRadius: "9999px", background: "white", border: "1px solid #e5e7eb", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                >
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: 700 }}>
                    MS
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#1f2937" }}>Microsoft HR</span>
                </div>
              </div>

              <button
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#ea580c",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(234, 88, 12, 0.25)",
                  transition: "all 0.15s ease",
                }}
              >
                <FiPlus size={16} style={{ strokeWidth: 3 }} />
                <span>Create Placement Drive</span>
              </button>
            </div>
          </div>

          {/* ═══════ KPI Row (Compact Stat Cards) ═══════ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "14px",
            }}
          >
            {kpiData.map((kpi) => (
              <div
                key={kpi.label}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px", color: "#6b7280" }}>
                    {kpi.label}
                  </span>
                  <span style={{ color: kpi.accent }}>{kpi.icon}</span>
                </div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#381c0f", letterSpacing: "-0.5px" }}>
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>

          {/* ═══════ Filter Bar ═══════ */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "12px 20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative", flex: 1 }}>
              <FiSearch
                size={16}
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}
              />
              <input
                type="text"
                placeholder="Search role or drive name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 16px 8px 36px",
                  fontSize: "13px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: "#f8fafc",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Status dropdown */}
            <div style={{ position: "relative" }}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  appearance: "none",
                  padding: "8px 32px 8px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: "white",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="All">Status: All</option>
                <option value="ACTIVE">Active</option>
                <option value="PENDING APPROVAL">Pending</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <FiChevronDown
                size={14}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}
              />
            </div>

            {/* Sort dropdown */}
            <div style={{ position: "relative" }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  appearance: "none",
                  padding: "8px 32px 8px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: "white",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="Latest">Sort: Latest</option>
                <option value="Oldest">Sort: Oldest</option>
                <option value="Package">Sort: Package</option>
              </select>
              <FiChevronDown
                size={14}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}
              />
            </div>
          </div>

          {/* ═══════ Drive Cards ═══════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredDrives.map((drive) => (
              <div
                key={drive.id}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  transition: "all 0.2s ease"
                }}
              >
                {/* Left: Role info */}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                    <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: "#381c0f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {drive.role}
                    </h3>
                    {drive.company && (
                      <span style={{ padding: "2px 8px", fontSize: "10px", fontWeight: 700, color: "#6b7280", background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
                        {drive.company}
                      </span>
                    )}
                    <StatusBadge status={drive.status} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px", marginTop: "10px", fontSize: "12.5px", color: "#6b7280" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <FiDollarSign size={13} style={{ color: "#9ca3af" }} />
                      {drive.packageLPA}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <FiMapPin size={13} style={{ color: "#9ca3af" }} />
                      {drive.location}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <FiCalendar size={13} style={{ color: "#9ca3af" }} />
                      {drive.date}
                    </span>
                  </div>
                </div>

                {/* Right: Stats + Progress */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                  <div style={{ width: "320px" }}>
                    {/* Inline stats */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px" }}>
                      <span style={{ fontWeight: 700, color: "#ea580c" }}>
                        {drive.candidates} <span style={{ fontWeight: 500, color: "#6b7280" }}>Candidates</span>
                      </span>
                      <span style={{ fontWeight: 700, color: "#381c0f" }}>
                        {drive.shortlisted} <span style={{ fontWeight: 500, color: "#6b7280" }}>Shortlisted</span>
                      </span>
                      <span style={{ fontWeight: 700, color: "#475569" }}>
                        {drive.interviews} <span style={{ fontWeight: 500, color: "#6b7280" }}>Interviews</span>
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div style={{ height: "8px", width: "100%", borderRadius: "9999px", background: "#ffedd5", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "9999px",
                          transition: "all 0.5s ease",
                          width: `${drive.progress}%`,
                          background: drive.progress === 100 ? "#381c0f" : "linear-gradient(90deg, #ea580c, #9a3412)",
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
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 20px", background: "white", border: "1px dashed #cbd5e1", borderRadius: "12px", textAlign: "center" }}>
                <FiSearch size={32} style={{ color: "#cbd5e1", marginBottom: "12px" }} />
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#6b7280" }}>No drives found</p>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#9ca3af" }}>
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>

          {/* Footer: Load More */}
          <div style={{ display: "flex", justifyContent: "center", padding: "16px 0 8px" }}>
            <button
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#6b7280",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "color 0.15s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ea580c"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; }}
            >
              Load More
              <FiChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
