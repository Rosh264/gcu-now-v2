import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiSend,
  FiUsers,
  FiCalendar,
  FiLayers,
  FiBriefcase,
} from "react-icons/fi";

const NAV_ITEMS = [
  { name: "Dashboard", icon: "grid", path: "/company/dashboard" },
  { name: "Placement Drives", icon: "send", path: "/company/drives" },
  { name: "Candidates", icon: "users", path: "/company/candidates" },
  { name: "Interviews", icon: "calendar", path: "/company/interviews" },
];

function NavIcon({ icon, size = 17 }: { icon: string; size?: number }) {
  switch (icon) {
    case "grid": return <FiGrid size={size} />;
    case "send": return <FiSend size={size} />;
    case "users": return <FiUsers size={size} />;
    case "calendar": return <FiCalendar size={size} />;
    default: return null;
  }
}

export default function CompanyLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8f9fb",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ════════ LEFT SIDEBAR ════════ */}
      <aside
        style={{
          width: "240px",
          background: "white",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Top: Branding + Nav */}
        <div>
          {/* Logo */}
          <div
            style={{
              padding: "22px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                background: "#381c0f",
                color: "#ea580c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "18px",
                boxShadow: "0 2px 4px rgba(56, 28, 15, 0.2)",
              }}
            >
              <FiBriefcase size={20} />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#111827", letterSpacing: "-0.3px" }}>
                GCU NOW
              </div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#ea580c",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}
              >
                HR PORTAL
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => navigate(item.path)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "white" : "#4b5563",
                    background: isActive ? "#381c0f" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    textAlign: "left",
                  }}
                  className={!isActive ? "hover:bg-orange-50/50 hover:text-orange-900" : ""}
                >
                  <span style={{ color: isActive ? "#ea580c" : "#9ca3af" }}>
                    <NavIcon icon={item.icon} />
                  </span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Company Profile */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid #f3f4f6" }}>
          <button
            type="button"
            onClick={() => navigate("/company/profile")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: currentPath === "/company/profile" ? 700 : 500,
              color: currentPath === "/company/profile" ? "white" : "#4b5563",
              background: currentPath === "/company/profile" ? "#381c0f" : "transparent",
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s ease",
              textAlign: "left",
            }}
            className={currentPath !== "/company/profile" ? "hover:bg-orange-50/50 hover:text-orange-900" : ""}
          >
            <FiLayers size={17} style={{ color: currentPath === "/company/profile" ? "#ea580c" : "#9ca3af" }} />
            <span>Company Profile</span>
          </button>
        </div>
      </aside>

      {/* ════════ MAIN CONTENT ════════ */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
