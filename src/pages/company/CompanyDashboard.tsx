import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiSend,
  FiUsers,
  FiCalendar,
  FiLayers,
  FiBriefcase,
  FiBell,
  FiPlus,
  FiMoreVertical,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiArrowUpRight,
  FiVideo,
  FiMapPin,
  FiSearch,
  FiX,
  FiCheck,
  FiExternalLink,
  FiTrendingUp,
} from "react-icons/fi";

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Modals state
  const [isCreateDriveOpen, setIsCreateDriveOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Drive form state
  const [newDriveRole, setNewDriveRole] = useState("");
  const [newDrivePackage, setNewDrivePackage] = useState("");
  const [newDriveLocation, setNewDriveLocation] = useState("Bangalore");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCreateDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreateDriveOpen(false);
    triggerToast(`New Placement Drive for "${newDriveRole || "Software Engineer"}" created successfully!`);
    setNewDriveRole("");
    setNewDrivePackage("");
  };

  const navItems = [
    { name: "Dashboard", path: "/company/dashboard", icon: <FiGrid size={17} /> },
    { name: "Placement Drives", path: "/company/drives", icon: <FiSend size={17} /> },
    { name: "Candidates", path: "/company/candidates", icon: <FiUsers size={17} /> },
    { name: "Interviews", path: "/company/interviews", icon: <FiCalendar size={17} /> },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8f9fb",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 100,
            background: "#111827",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 10px 20px -3px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#10b981",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiCheck size={14} />
          </div>
          <span style={{ fontSize: "13px", fontWeight: 600 }}>{toastMessage}</span>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          LEFT SIDEBAR (HR Portal)
          ════════════════════════════════════════════════════════════════ */}
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
          zIndex: 40,
        }}
      >
        {/* Top Branding & Navigation */}
        <div>
          {/* Logo & Portal Badge */}
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
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === "/company/dashboard" && (location.pathname === "/company" || location.pathname === "/company/"));
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
                  <span style={{ color: isActive ? "#ea580c" : "#9ca3af" }}>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Company Profile Link */}
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
              fontWeight: location.pathname === "/company/profile" ? 700 : 500,
              color: location.pathname === "/company/profile" ? "white" : "#4b5563",
              background: location.pathname === "/company/profile" ? "#381c0f" : "transparent",
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s ease",
              textAlign: "left",
            }}
            className={location.pathname !== "/company/profile" ? "hover:bg-orange-50/50 hover:text-orange-900" : ""}
          >
            <FiLayers size={17} style={{ color: location.pathname === "/company/profile" ? "#ea580c" : "#9ca3af" }} />
            <span>Company Profile</span>
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {location.pathname === "/company/candidates" ? (
          <div style={{ padding: "32px 36px 60px", maxWidth: "1400px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#381c0f", margin: 0 }}>
              Candidates
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
              View and manage applicant profiles, resumes, and recruitment stage progress.
            </p>
            <div style={{ marginTop: "24px", padding: "40px", background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center" }}>
              <FiUsers size={36} color="#ea580c" style={{ margin: "0 auto 12px" }} />
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>Candidate Pipeline Directory</h3>
              <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>126 active applicants across 3 recruitment drives.</p>
            </div>
          </div>
        ) : location.pathname === "/company/interviews" ? (
          <div style={{ padding: "32px 36px 60px", maxWidth: "1400px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#381c0f", margin: 0 }}>
              Interviews
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
              Manage live interview queues, schedules, and evaluator feedback scores.
            </p>
            <div style={{ marginTop: "24px", padding: "40px", background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center" }}>
              <FiCalendar size={36} color="#ea580c" style={{ margin: "0 auto 12px" }} />
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>Interview Queue & Schedules</h3>
              <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>18 upcoming interviews scheduled for this week.</p>
            </div>
          </div>
        ) : location.pathname === "/company/profile" ? (
          <div style={{ padding: "32px 36px 60px", maxWidth: "1400px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#381c0f", margin: 0 }}>
              Company Profile
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
              Manage corporate details, team recruiters, and campus branding parameters.
            </p>
            <div style={{ marginTop: "24px", padding: "40px", background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center" }}>
              <FiLayers size={36} color="#ea580c" style={{ margin: "0 auto 12px" }} />
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>Microsoft HR Campus Profile</h3>
              <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Verified Campus Recruiter Account • GCU Placement Partner</p>
            </div>
          </div>
        ) : (
          /* Dashboard Main Content */
          <div
            style={{
              padding: "32px 36px 60px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              maxWidth: "1400px",
            }}
          >
            {/* ═══════ Title Area + Top Right Avatar & Bell (Search Bar Nuked) ═══════ */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    color: "#381c0f",
                    margin: 0,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Good morning, Microsoft HR
                </h1>
                <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px", lineHeight: 1.4 }}>
                  Manage your campus recruitment drives, candidates and interviews from one place.
                </p>
              </div>

              {/* Top Right Header Controls: Notification Bell, Profile Avatar, and + Create Drive Button */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                {/* Notification Bell with Badge */}
                <button
                  type="button"
                  onClick={() => triggerToast("You have 4 new interview notifications")}
                  style={{
                    position: "relative",
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: "white",
                    border: "1px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4b5563",
                    cursor: "pointer",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                  }}
                  title="Notifications"
                >
                  <FiBell size={18} />
                  <span
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#ea580c",
                      border: "2px solid white",
                    }}
                  />
                </button>

                {/* HR Profile Avatar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "4px 8px 4px 4px",
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "24px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                    cursor: "pointer",
                  }}
                  title="Microsoft HR Portal Account"
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#ea580c",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "12px",
                    }}
                  >
                    MS
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827", paddingRight: "6px" }}>
                    Microsoft HR
                  </span>
                </div>

                {/* + Create Placement Drive Button */}
                <button
                  type="button"
                  onClick={() => setIsCreateDriveOpen(true)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    background: "#ea580c",
                    color: "white",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 2px 4px rgba(234, 88, 12, 0.25)",
                    transition: "all 0.15s ease",
                  }}
                  className="hover:bg-orange-700"
                >
                  <FiPlus size={16} style={{ strokeWidth: 3 }} />
                  <span>Create Placement Drive</span>
                </button>
              </div>
            </div>

            {/* ═══════ KPI Row (5 Compact Stat Cards) ═══════ */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "14px",
              }}
            >
              {/* Card 1: Active Drives */}
              <div
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px" }}>
                    ACTIVE DRIVES
                  </span>
                  <span style={{ color: "#ea580c", fontSize: "14px" }}>📢</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "8px" }}>
                  <span style={{ fontSize: "28px", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                    3
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#6b7280",
                      background: "#f3f4f6",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    +1 this week
                  </span>
                </div>
              </div>

              {/* Card 2: Total Candidates */}
              <div
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px" }}>
                    TOTAL CANDIDATES
                  </span>
                  <FiUsers size={14} color="#9ca3af" />
                </div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "8px" }}>
                  <span style={{ fontSize: "28px", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                    126
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#047857",
                      background: "#ecfdf5",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <FiTrendingUp size={11} /> +12%
                  </span>
                </div>
              </div>

              {/* Card 3: Shortlisted */}
              <div
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px" }}>
                    SHORTLISTED
                  </span>
                  <span style={{ color: "#9ca3af", fontSize: "13px" }}>📝</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "8px" }}>
                  <span style={{ fontSize: "28px", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                    32
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280" }}>
                    25% conversion
                  </span>
                </div>
              </div>

              {/* Card 4: Interviews */}
              <div
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px" }}>
                    INTERVIEWS
                  </span>
                  <FiCalendar size={14} color="#9ca3af" />
                </div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "8px" }}>
                  <span style={{ fontSize: "28px", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                    18
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#ea580c",
                      background: "#fffaf5",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      border: "1px solid #fed7aa",
                    }}
                  >
                    4 today
                  </span>
                </div>
              </div>

              {/* Card 5: Offers */}
              <div
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px" }}>
                    OFFERS
                  </span>
                  <span style={{ color: "#ea580c", fontSize: "14px" }}>🎖️</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "8px" }}>
                  <span style={{ fontSize: "28px", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                    5
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#ea580c",
                      background: "#fffaf5",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      border: "1px solid #fed7aa",
                    }}
                  >
                    +2
                  </span>
                </div>
              </div>
            </div>

            {/* ═══════ Alert Banner: "Needs Your Attention" ═══════ */}
            <div
              style={{
                background: "white",
                border: "1px solid #fed7aa",
                borderRadius: "12px",
                padding: "16px 20px",
                boxShadow: "0 1px 3px rgba(234, 88, 12, 0.04)",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <FiAlertTriangle size={16} color="#ea580c" />
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#381c0f" }}>
                  Needs Your Attention
                </span>
              </div>

              {/* 4 Inline Alert Items */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                {/* Item 1 */}
                <div
                  style={{
                    background: "#fafafa",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#111827", fontWeight: 600 }}>
                    <span>👥</span>
                    <span>12 candidates</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast("Opening Candidate Review list...")}
                    style={{ background: "none", border: "none", color: "#ea580c", fontWeight: 700, fontSize: "12px", cursor: "pointer", padding: 0 }}
                    className="hover:underline"
                  >
                    Review
                  </button>
                </div>

                {/* Item 2 */}
                <div
                  style={{
                    background: "#fafafa",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#111827", fontWeight: 600 }}>
                    <span>📅</span>
                    <span>4 interviews today</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast("Navigating to today's interview queue...")}
                    style={{ background: "none", border: "none", color: "#ea580c", fontWeight: 700, fontSize: "12px", cursor: "pointer", padding: 0 }}
                    className="hover:underline"
                  >
                    View
                  </button>
                </div>

                {/* Item 3 */}
                <div
                  style={{
                    background: "#fafafa",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#111827", fontWeight: 600 }}>
                    <span>⏳</span>
                    <span>2 awaiting decision</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast("Opening Pending Decision list...")}
                    style={{ background: "none", border: "none", color: "#ea580c", fontWeight: 700, fontSize: "12px", cursor: "pointer", padding: 0 }}
                    className="hover:underline"
                  >
                    Review
                  </button>
                </div>

                {/* Item 4 */}
                <div
                  style={{
                    background: "#fafafa",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#111827", fontWeight: 600 }}>
                    <span>📋</span>
                    <span>1 pending approval</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast("Opening Placement Cell Approval request...")}
                    style={{ background: "none", border: "none", color: "#ea580c", fontWeight: 700, fontSize: "12px", cursor: "pointer", padding: 0 }}
                    className="hover:underline"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>

            {/* ═══════ Main Grid (65% Left / 35% Right) ═══════ */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "65fr 35fr",
                gap: "24px",
                alignItems: "start",
              }}
            >
              {/* ────────────────────────────────────────────────────────
              LEFT COLUMN (65%): Drives, Pipeline, Overview
              ──────────────────────────────────────────────────────── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* ── 1. Active Placement Drives ── */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#381c0f", margin: 0 }}>
                      Active Placement Drives
                    </h2>
                    <button
                      type="button"
                      onClick={() => navigate("/company/drives")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ea580c",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        padding: 0,
                      }}
                      className="hover:underline"
                    >
                      View All Drives
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {/* Drive Card 1: SDE */}
                    <div
                      style={{
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "20px 22px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>
                              Software Development Engineer (SDE)
                            </h3>
                            <span
                              style={{
                                background: "#ecfdf5",
                                color: "#047857",
                                border: "1px solid #a7f3d0",
                                fontSize: "10px",
                                fontWeight: 800,
                                padding: "2px 6px",
                                borderRadius: "4px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              ACTIVE
                            </span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "6px", fontSize: "12px", color: "#6b7280" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              💼 12 LPA
                            </span>
                            <span>•</span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              📍 Bangalore
                            </span>
                            <span>•</span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              📅 Oct 15
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            border: "1px solid #e5e7eb",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#6b7280",
                            cursor: "pointer",
                          }}
                        >
                          <FiMoreVertical size={14} />
                        </button>
                      </div>

                      {/* Progress Bar */}
                      <div style={{ marginTop: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 600, color: "#6b7280", marginBottom: "6px" }}>
                          <span>Progress</span>
                          <span>45% Complete</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", background: "#f3f4f6", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ width: "45%", height: "100%", background: "#ea580c", borderRadius: "3px" }} />
                        </div>
                      </div>

                      {/* Bottom Stats */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderTop: "1px solid #f3f4f6",
                          marginTop: "16px",
                          paddingTop: "14px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                          <div>
                            <span style={{ fontSize: "18px", fontWeight: 800, color: "#111827", display: "block" }}>
                              84
                            </span>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>
                              Candidates
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: "18px", fontWeight: 800, color: "#111827", display: "block" }}>
                              32
                            </span>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>
                              Shortlisted
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: "18px", fontWeight: 800, color: "#111827", display: "block" }}>
                              18
                            </span>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>
                              Interviews
                            </span>
                          </div>
                        </div>

                        <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                          Last updated 2h ago
                        </span>
                      </div>
                    </div>

                    {/* Drive Card 2: Data Analyst */}
                    <div
                      style={{
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "20px 22px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>
                              Data Analyst
                            </h3>
                            <span
                              style={{
                                background: "#ecfdf5",
                                color: "#047857",
                                border: "1px solid #a7f3d0",
                                fontSize: "10px",
                                fontWeight: 800,
                                padding: "2px 6px",
                                borderRadius: "4px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              ACTIVE
                            </span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "6px", fontSize: "12px", color: "#6b7280" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              💼 10 LPA
                            </span>
                            <span>•</span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              📍 Bangalore
                            </span>
                            <span>•</span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              📅 Oct 20
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            border: "1px solid #e5e7eb",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#6b7280",
                            cursor: "pointer",
                          }}
                        >
                          <FiMoreVertical size={14} />
                        </button>
                      </div>

                      {/* Progress Bar */}
                      <div style={{ marginTop: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 600, color: "#6b7280", marginBottom: "6px" }}>
                          <span>Progress</span>
                          <span>25% Complete</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", background: "#f3f4f6", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ width: "25%", height: "100%", background: "#ea580c", borderRadius: "3px" }} />
                        </div>
                      </div>

                      {/* Bottom Stats */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderTop: "1px solid #f3f4f6",
                          marginTop: "16px",
                          paddingTop: "14px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                          <div>
                            <span style={{ fontSize: "18px", fontWeight: 800, color: "#111827", display: "block" }}>
                              42
                            </span>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>
                              Candidates
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: "18px", fontWeight: 800, color: "#111827", display: "block" }}>
                              15
                            </span>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>
                              Shortlisted
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: "18px", fontWeight: 800, color: "#111827", display: "block" }}>
                              8
                            </span>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>
                              Interviews
                            </span>
                          </div>
                        </div>

                        <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                          Last updated 5h ago
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── 2. Aggregate Recruitment Pipeline ── */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "22px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                >
                  <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#381c0f", margin: "0 0 16px" }}>
                    Aggregate Recruitment Pipeline
                  </h3>

                  {/* Visual Funnel / Pipeline Steps */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr)",
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    {/* Step 1: Applications */}
                    <div style={{ padding: "14px 10px", textAlign: "center", borderRight: "1px solid #e5e7eb" }}>
                      <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, display: "block" }}>
                        Applications
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#111827", display: "block", marginTop: "2px" }}>
                        126
                      </span>
                      <span style={{ fontSize: "10px", color: "#9ca3af", marginTop: "4px", display: "block" }}>
                        58%
                      </span>
                    </div>

                    {/* Step 2: Screening */}
                    <div style={{ padding: "14px 10px", textAlign: "center", borderRight: "1px solid #e5e7eb" }}>
                      <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, display: "block" }}>
                        Screening
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#111827", display: "block", marginTop: "2px" }}>
                        74
                      </span>
                      <span style={{ fontSize: "10px", color: "#9ca3af", marginTop: "4px", display: "block" }}>
                        43%
                      </span>
                    </div>

                    {/* Step 3: Shortlisted */}
                    <div style={{ padding: "14px 10px", textAlign: "center", borderRight: "1px solid #e5e7eb" }}>
                      <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, display: "block" }}>
                        Shortlisted
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#111827", display: "block", marginTop: "2px" }}>
                        32
                      </span>
                      <span style={{ fontSize: "10px", color: "#9ca3af", marginTop: "4px", display: "block" }}>
                        56%
                      </span>
                    </div>

                    {/* Step 4: Interviewing (HIGHLIGHTED IN SOLID DARK BROWN) */}
                    <div
                      style={{
                        padding: "14px 10px",
                        textAlign: "center",
                        background: "#381c0f",
                        color: "white",
                        position: "relative",
                      }}
                    >
                      <span style={{ fontSize: "11px", color: "#fed7aa", fontWeight: 700, display: "block" }}>
                        Interviewing
                      </span>
                      <span style={{ fontSize: "22px", fontWeight: 900, color: "white", display: "block", marginTop: "2px" }}>
                        18
                      </span>
                      <span style={{ fontSize: "10px", color: "#fed7aa", marginTop: "4px", display: "block" }}>
                        44%
                      </span>
                    </div>

                    {/* Step 5: Selected */}
                    <div style={{ padding: "14px 10px", textAlign: "center", borderRight: "1px solid #e5e7eb" }}>
                      <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, display: "block" }}>
                        Selected
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#111827", display: "block", marginTop: "2px" }}>
                        8
                      </span>
                      <span style={{ fontSize: "10px", color: "#9ca3af", marginTop: "4px", display: "block" }}>
                        62%
                      </span>
                    </div>

                    {/* Step 6: Offers Made */}
                    <div style={{ padding: "14px 10px", textAlign: "center" }}>
                      <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, display: "block" }}>
                        Offers Made
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#ea580c", display: "block", marginTop: "2px" }}>
                        5
                      </span>
                      <span style={{ fontSize: "10px", color: "#9ca3af", marginTop: "4px", display: "block" }}>
                        Final
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── 3. Recruitment Overview ── */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "22px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                >
                  <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#381c0f", margin: "0 0 16px" }}>
                    Recruitment Overview
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                    {/* Metric 1: Selection Rate */}
                    <div>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        SELECTION RATE
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#111827", display: "block", margin: "4px 0 8px" }}>
                        6.3%
                      </span>
                      <div style={{ width: "100%", height: "4px", background: "#f3f4f6", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ width: "25%", height: "100%", background: "#111827" }} />
                      </div>
                    </div>

                    {/* Metric 2: Interview Conv. */}
                    <div>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        INTERVIEW CONV.
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#111827", display: "block", margin: "4px 0 8px" }}>
                        44.4%
                      </span>
                      <div style={{ width: "100%", height: "4px", background: "#f3f4f6", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ width: "44%", height: "100%", background: "#ea580c" }} />
                      </div>
                    </div>

                    {/* Metric 3: Offer Acceptance */}
                    <div>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        OFFER ACCEPTANCE
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#047857", display: "block", margin: "4px 0 8px" }}>
                        80.0%
                      </span>
                      <div style={{ width: "100%", height: "4px", background: "#f3f4f6", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ width: "80%", height: "100%", background: "#047857" }} />
                      </div>
                    </div>

                    {/* Metric 4: Avg Time to Hire */}
                    <div>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        AVG TIME TO HIRE
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#111827", display: "block", margin: "4px 0 2px" }}>
                        18 Days
                      </span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#047857", display: "block" }}>
                        -2 days vs avg
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ────────────────────────────────────────────────────────
              RIGHT COLUMN (35%): Quick Actions, Today's Interviews, Schedule, Activity
              ──────────────────────────────────────────────────────── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* ── 1. Quick Actions (2x2 Grid) ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setIsCreateDriveOpen(true)}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      background: "#381c0f",
                      color: "white",
                      border: "1px solid #381c0f",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      boxShadow: "0 1px 3px rgba(56, 28, 15, 0.2)",
                      transition: "all 0.15s ease",
                    }}
                    className="hover:bg-[#522b17]"
                  >
                    <FiPlus size={14} style={{ strokeWidth: 3 }} />
                    <span>Create Drive</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerToast("Opening Candidates Review dashboard...")}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      background: "white",
                      color: "#111827",
                      border: "1px solid #d1d5db",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "all 0.15s ease",
                    }}
                    className="hover:bg-gray-50"
                  >
                    <FiUsers size={14} color="#6b7280" />
                    <span>Review Candidates</span>
                  </button>

                  {/* Schedule Interviews (Typo Fixed from 'Schedule Ints') */}
                  <button
                    type="button"
                    onClick={() => setIsScheduleModalOpen(true)}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      background: "white",
                      color: "#111827",
                      border: "1px solid #d1d5db",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "all 0.15s ease",
                    }}
                    className="hover:bg-gray-50"
                  >
                    <FiCalendar size={14} color="#6b7280" />
                    <span>Schedule Interviews</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerToast("Opening Shortlisted Candidates list...")}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      background: "white",
                      color: "#111827",
                      border: "1px solid #d1d5db",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "all 0.15s ease",
                    }}
                    className="hover:bg-gray-50"
                  >
                    <FiCheckCircle size={14} color="#6b7280" />
                    <span>View Shortlisted</span>
                  </button>
                </div>

                {/* ── 2. Today's Active Interviews ── */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#381c0f", margin: 0 }}>
                      Today's Active Interviews
                    </h3>
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "#ea580c",
                        color: "white",
                        fontSize: "11px",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      4
                    </span>
                  </div>

                  <div
                    style={{
                      background: "#fafafa",
                      border: "1px solid #e5e7eb",
                      borderRadius: "10px",
                      padding: "16px",
                      marginBottom: "14px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827", display: "block" }}>
                          Tech Round - SDE
                        </span>
                        <span style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px", display: "block" }}>
                          Starts in 30 mins
                        </span>
                      </div>

                      {/* Avatar Stack */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#ea580c", color: "white", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>
                          RS
                        </div>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#381c0f", color: "white", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white", marginLeft: "-6px" }}>
                          AK
                        </div>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#6b7280", color: "white", fontSize: "9px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white", marginLeft: "-6px" }}>
                          +2
                        </div>
                      </div>
                    </div>

                    {/* Solid Orange 'Open Interview' Button */}
                    <button
                      type="button"
                      onClick={() => triggerToast("Launching Live Virtual Interview Room...")}
                      style={{
                        width: "100%",
                        marginTop: "14px",
                        padding: "10px",
                        borderRadius: "8px",
                        background: "#ea580c",
                        color: "white",
                        border: "none",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        boxShadow: "0 2px 4px rgba(234, 88, 12, 0.25)",
                        transition: "all 0.15s ease",
                      }}
                      className="hover:bg-orange-700"
                    >
                      <FiVideo size={14} />
                      <span>Open Interview</span>
                    </button>
                  </div>
                </div>

                {/* ── 3. Upcoming Schedule ── */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#381c0f", margin: 0 }}>
                      Upcoming Schedule
                    </h3>
                    <button
                      type="button"
                      onClick={() => triggerToast("Opening full interview schedule calendar...")}
                      style={{ background: "none", border: "none", color: "#ea580c", fontSize: "12px", fontWeight: 700, cursor: "pointer", padding: 0 }}
                      className="hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {/* Item 1 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 14px",
                        background: "#fafafa",
                        border: "1px solid #f3f4f6",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          background: "#fffaf5",
                          border: "1px solid #fed7aa",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          textAlign: "center",
                          minWidth: "48px",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: "9px", fontWeight: 800, color: "#ea580c", textTransform: "uppercase", display: "block" }}>
                          TODAY
                        </span>
                        <span style={{ fontSize: "12px", fontWeight: 800, color: "#111827", display: "block" }}>
                          2 PM
                        </span>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                          Tech Round
                        </div>
                        <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>
                          SDE Role • 4 Candidates
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px", fontSize: "11px" }}>
                          <span style={{ color: "#6b7280" }}>🌐 Online</span>
                          <a
                            href="#join"
                            onClick={(e) => {
                              e.preventDefault();
                              triggerToast("Opening meeting join link...");
                            }}
                            style={{ color: "#ea580c", fontWeight: 700, textDecoration: "none" }}
                            className="hover:underline"
                          >
                            🔗 Join Link
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 14px",
                        background: "#fafafa",
                        border: "1px solid #f3f4f6",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          background: "#f3f4f6",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          textAlign: "center",
                          minWidth: "48px",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: "9px", fontWeight: 800, color: "#6b7280", textTransform: "uppercase", display: "block" }}>
                          TMW
                        </span>
                        <span style={{ fontSize: "12px", fontWeight: 800, color: "#111827", display: "block" }}>
                          11 AM
                        </span>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                          HR Round
                        </div>
                        <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>
                          Cloud Eng • 2 Candidates
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px", fontSize: "11px", color: "#6b7280" }}>
                          <span>🏢 Offline</span>
                          <span>📍 Room 4B</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── 4. Recent Activity (Vertical Timeline) ── */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#381c0f", margin: 0 }}>
                      Recent Activity
                    </h3>
                    <button
                      type="button"
                      onClick={() => triggerToast("Opening full activity history log...")}
                      style={{ background: "none", border: "none", color: "#ea580c", fontSize: "12px", fontWeight: 700, cursor: "pointer", padding: 0 }}
                      className="hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {/* Activity 1 */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "12px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", marginTop: "6px", flexShrink: 0 }} />
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: "#ea580c",
                          color: "white",
                          fontSize: "10px",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        RS
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 700, color: "#111827" }}>Roshan Sharma</span>
                        <p style={{ margin: "2px 0 0", color: "#6b7280", fontSize: "11px" }}>
                          Moved to Tech Round for SDE Role
                        </p>
                      </div>
                      <span style={{ fontSize: "11px", color: "#9ca3af" }}>2h ago</span>
                    </div>

                    {/* Activity 2 */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "12px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3b82f6", marginTop: "6px", flexShrink: 0 }} />
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: "#381c0f",
                          color: "white",
                          fontSize: "10px",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        RK
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 700, color: "#111827" }}>Rahul Kumar</span>
                        <p style={{ margin: "2px 0 0", color: "#6b7280", fontSize: "11px" }}>
                          Applied for Data Analyst
                        </p>
                      </div>
                      <span style={{ fontSize: "11px", color: "#9ca3af" }}>4h ago</span>
                    </div>

                    {/* Activity 3 */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "12px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ea580c", marginTop: "6px", flexShrink: 0 }} />
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: "#f59e0b",
                          color: "white",
                          fontSize: "10px",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        AR
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 700, color: "#111827" }}>Ananya Rao</span>
                        <p style={{ margin: "2px 0 0", color: "#6b7280", fontSize: "11px" }}>
                          Accepted Offer for Cloud Engineer
                        </p>
                      </div>
                      <span style={{ fontSize: "11px", color: "#9ca3af" }}>1d ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
          MODAL: CREATE PLACEMENT DRIVE
          ════════════════════════════════════════════════════════════════ */}
        {isCreateDriveOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                maxWidth: "500px",
                width: "100%",
                padding: "26px",
                position: "relative",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
                border: "1px solid #e5e7eb",
              }}
            >
              <button
                onClick={() => setIsCreateDriveOpen(false)}
                style={{ position: "absolute", top: "18px", right: "18px", width: "30px", height: "30px", borderRadius: "50%", background: "#f3f4f6", border: "none", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <FiX size={15} />
              </button>

              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#381c0f", margin: "0 0 6px" }}>
                Create Placement Drive
              </h3>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 18px" }}>
                Post a new on-campus recruitment drive for GCU students.
              </p>

              <form onSubmit={handleCreateDriveSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#4b5563", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                    Role / Job Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Associate Software Engineer"
                    value={newDriveRole}
                    onChange={(e) => setNewDriveRole(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", fontSize: "13px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#4b5563", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      Package (CTC)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 14 LPA"
                      value={newDrivePackage}
                      onChange={(e) => setNewDrivePackage(e.target.value)}
                      style={{ width: "100%", padding: "9px 12px", fontSize: "13px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#4b5563", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={newDriveLocation}
                      onChange={(e) => setNewDriveLocation(e.target.value)}
                      style={{ width: "100%", padding: "9px 12px", fontSize: "13px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#4b5563", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                    Target Batches
                  </label>
                  <select
                    style={{ width: "100%", padding: "9px 12px", fontSize: "13px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none" }}
                  >
                    <option value="2026 Batch (Final Year)">2026 Batch (Final Year)</option>
                    <option value="2027 Batch (Pre-Final Year)">2027 Batch (Pre-Final Year)</option>
                  </select>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setIsCreateDriveOpen(false)}
                    style={{ padding: "9px 16px", fontSize: "12px", fontWeight: 600, color: "#4b5563", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: "9px 20px", fontSize: "12px", fontWeight: 700, color: "white", background: "#ea580c", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    Publish Drive
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
          MODAL: SCHEDULE INTERVIEWS
          ════════════════════════════════════════════════════════════════ */}
        {isScheduleModalOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                maxWidth: "480px",
                width: "100%",
                padding: "26px",
                position: "relative",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
                border: "1px solid #e5e7eb",
              }}
            >
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                style={{ position: "absolute", top: "18px", right: "18px", width: "30px", height: "30px", borderRadius: "50%", background: "#f3f4f6", border: "none", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <FiX size={15} />
              </button>

              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#381c0f", margin: "0 0 6px" }}>
                Schedule Interviews
              </h3>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 18px" }}>
                Assign interview time slots and notify shortlisted candidates.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#4b5563", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                    Select Drive
                  </label>
                  <select style={{ width: "100%", padding: "9px 12px", fontSize: "13px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none" }}>
                    <option>Software Development Engineer (SDE) - 32 Shortlisted</option>
                    <option>Data Analyst - 15 Shortlisted</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#4b5563", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                    Round Type
                  </label>
                  <select style={{ width: "100%", padding: "9px 12px", fontSize: "13px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none" }}>
                    <option>Technical Round (Virtual)</option>
                    <option>HR & Cultural Fit Round</option>
                    <option>System Design Round</option>
                  </select>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setIsScheduleModalOpen(false)}
                    style={{ padding: "9px 16px", fontSize: "12px", fontWeight: 600, color: "#4b5563", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsScheduleModalOpen(false);
                      triggerToast("Interview invitations dispatched to 32 candidates!");
                    }}
                    style={{ padding: "9px 20px", fontSize: "12px", fontWeight: 700, color: "white", background: "#381c0f", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    Send Schedule Invites
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}