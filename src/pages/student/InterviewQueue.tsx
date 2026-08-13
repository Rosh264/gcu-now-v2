import { useState } from "react";
import {
  FiSearch,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiMonitor,
  FiBell,
  FiRefreshCw,
  FiFilter,
  FiChevronRight,
  FiUsers,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiNavigation,
} from "react-icons/fi";

/* ─── Types ─── */
interface InterviewItem {
  id: number;
  company: string;
  round: string;
  room: string;
  token: string;
  ahead: number;
  time: string;
  status: "YOUR TURN" | "WAITING" | "COMPLETED";
  mode: "OFFLINE" | "ONLINE";
  avatarBg: string;
  avatarColor: string;
  avatarText: string;
  role: string;
  date: string;
}

/* ─── Mock Data ─── */
const mockInterviews: InterviewItem[] = [
  {
    id: 1,
    company: "Infosys",
    round: "Technical Round",
    room: "Block A - 205",
    token: "#07",
    ahead: 0,
    time: "2:00 PM",
    status: "YOUR TURN",
    mode: "OFFLINE",
    avatarBg: "#e0e7ff",
    avatarColor: "#4338ca",
    avatarText: "I",
    role: "Systems Engineer",
    date: "Oct 25, 2026",
  },
  {
    id: 2,
    company: "Microsoft",
    round: "Technical Round",
    room: "Block A - 102",
    token: "#18",
    ahead: 4,
    time: "10:00 AM",
    status: "WAITING",
    mode: "OFFLINE",
    avatarBg: "#dbeafe",
    avatarColor: "#1d4ed8",
    avatarText: "M",
    role: "Software Development Engineer",
    date: "Oct 25, 2026",
  },
  {
    id: 3,
    company: "Amazon",
    round: "HR Round",
    room: "Block B - 204",
    token: "#31",
    ahead: 6,
    time: "11:30 AM",
    status: "WAITING",
    mode: "OFFLINE",
    avatarBg: "#fef3c7",
    avatarColor: "#92400e",
    avatarText: "A",
    role: "Cloud Engineer",
    date: "Oct 25, 2026",
  },
];

const completedInterviews: InterviewItem[] = [
  {
    id: 4,
    company: "TCS",
    round: "Aptitude Round",
    room: "Block C - 301",
    token: "#05",
    ahead: 0,
    time: "9:00 AM",
    status: "COMPLETED",
    mode: "OFFLINE",
    avatarBg: "#f3f4f6",
    avatarColor: "#374151",
    avatarText: "T",
    role: "Developer",
    date: "Oct 24, 2026",
  },
];

const instructions = [
  "Keep a digital copy of your latest resume ready to share.",
  "Join the meeting link or report outside the interview room 10 minutes early.",
  "Ensure your student ID card is visible and silence mobile devices.",
];

export default function StudentInterviewQueue() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<number>(2); // Microsoft selected by default

  const interviews = activeTab === "upcoming" ? mockInterviews : completedInterviews;

  const filteredInterviews = interviews.filter(
    (i) =>
      i.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.round.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selected =
    [...mockInterviews, ...completedInterviews].find((i) => i.id === selectedCompanyId) ||
    mockInterviews[1];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "1240px",
        margin: "0 auto",
        paddingBottom: "56px",
      }}
    >
      {/* ═══════ Header Row ═══════ */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#381c0f",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Interview Queue
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "6px", lineHeight: 1.4 }}>
            Track your interview schedules, live queue positions, and campus room locations.
          </p>
        </div>
        <button
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#6b7280",
            transition: "all 0.15s ease",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
          title="Notifications"
        >
          <FiBell size={17} />
        </button>
      </div>

      {/* ═══════ 4 KPI Stat Cards (Generously Spaced & Taller) ═══════ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {[
          { label: "TODAY", value: "3", color: "#ea580c", sub: "Interviews scheduled" },
          { label: "IN PROGRESS", value: "1", color: "#d97706", sub: "Active right now" },
          { label: "WAITING", value: "2", color: "#9a3412", sub: "In queue" },
          { label: "COMPLETED", value: "4", color: "#15803d", sub: "Past rounds cleared" },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "92px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              cursor: "default",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#6b7280",
                letterSpacing: "0.5px",
                textTransform: "uppercase" as const,
              }}
            >
              {card.label}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginTop: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: card.color,
                  lineHeight: 1,
                  letterSpacing: "-0.5px",
                }}
              >
                {card.value}
              </span>
              <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500 }}>
                {card.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════ Next Interview Alert Banner (Spacious & Prominent) ═══════ */}
      <div
        style={{
          background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
          border: "1px solid #fed7aa",
          borderRadius: "10px",
          padding: "16px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "#ea580c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 4px rgba(234, 88, 12, 0.2)",
            }}
          >
            <FiAlertCircle size={18} style={{ color: "white" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#9a3412",
                letterSpacing: "0.6px",
                textTransform: "uppercase" as const,
              }}
            >
              NEXT INTERVIEW
            </span>
            <span style={{ color: "#fdba74" }}>•</span>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>
              Microsoft
            </span>
            <span style={{ color: "#fdba74" }}>|</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#78350f" }}>
              10:00 AM
            </span>
            <span style={{ color: "#fdba74" }}>|</span>
            <span style={{ fontSize: "14px", color: "#78350f" }}>
              Block A - 102
            </span>
          </div>
        </div>
        <button
          onClick={() => setSelectedCompanyId(2)}
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#ea580c",
            background: "white",
            border: "1px solid #fed7aa",
            borderRadius: "6px",
            padding: "6px 14px",
            cursor: "pointer",
            letterSpacing: "0.4px",
            textTransform: "uppercase" as const,
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
            transition: "all 0.15s ease",
            flexShrink: 0,
          }}
        >
          <span>DETAILS</span>
          <FiArrowRight size={12} />
        </button>
      </div>

      {/* ═══════ Main 2-Column Grid (65% Schedule / 35% Details Panel) ═══════ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "64fr 36fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* ─── Left Column: Today's Schedule (~65%) ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Schedule Header & Filter Card */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "18px 22px 0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            {/* Title Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", margin: 0 }}>
                  Today's Schedule
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#22c55e",
                    }}
                  />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#4b5563" }}>
                    Live Queue
                  </span>
                  <span style={{ fontSize: "11px", color: "#9ca3af" }}>| Updated 1 min ago</span>
                </div>
              </div>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#fff7ed",
                  border: "1px solid #fed7aa",
                  borderRadius: "6px",
                  padding: "5px 12px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#ea580c",
                  cursor: "pointer",
                  letterSpacing: "0.4px",
                  textTransform: "uppercase" as const,
                  transition: "all 0.15s ease",
                }}
              >
                <FiRefreshCw size={12} />
                <span>UPDATE QUEUE</span>
              </button>
            </div>

            {/* Tabs + Search & Filter Bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #f3f4f6",
                paddingTop: "12px",
                paddingBottom: "14px",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {/* Tabs */}
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  onClick={() => setActiveTab("upcoming")}
                  style={{
                    padding: "8px 18px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: activeTab === "upcoming" ? "#381c0f" : "#6b7280",
                    border: "none",
                    borderBottom:
                      activeTab === "upcoming"
                        ? "2.5px solid #ea580c"
                        : "2.5px solid transparent",
                    background: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  style={{
                    padding: "8px 18px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: activeTab === "completed" ? "#381c0f" : "#6b7280",
                    border: "none",
                    borderBottom:
                      activeTab === "completed"
                        ? "2.5px solid #ea580c"
                        : "2.5px solid transparent",
                    background: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Completed
                </button>
              </div>

              {/* Search + Filter */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ position: "relative" }}>
                  <FiSearch
                    size={14}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search company or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "210px",
                      padding: "7px 12px 7px 32px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "13px",
                      color: "#111827",
                      outline: "none",
                      background: "white",
                      transition: "border-color 0.15s ease",
                    }}
                  />
                </div>
                <button
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#6b7280",
                    transition: "all 0.15s ease",
                  }}
                  title="Filter options"
                >
                  <FiFilter size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Interview Cards List (Spacious, Clear & Clickable) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredInterviews.map((item) => {
              const isSelected = item.id === selectedCompanyId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCompanyId(item.id)}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    padding: "18px 22px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    background: isSelected ? "#fffaf5" : "white",
                    border: isSelected
                      ? "2px solid #ea580c"
                      : "1px solid #e5e7eb",
                    boxShadow: isSelected
                      ? "0 4px 12px rgba(234, 88, 12, 0.08)"
                      : "0 1px 3px rgba(0,0,0,0.02)",
                    boxSizing: "border-box",
                  }}
                  className={!isSelected ? "hover:bg-orange-50/50" : ""}
                >
                  {/* Company Avatar */}
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "10px",
                      background: item.avatarBg,
                      color: item.avatarColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "17px",
                      flexShrink: 0,
                      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                    }}
                  >
                    {item.avatarText}
                  </div>

                  {/* Card Content Area */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Top Row: Company Name + Status & Mode Badges */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "4px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>
                        {item.company}
                      </span>

                      {/* Status Badges */}
                      {item.status === "YOUR TURN" && (
                        <span
                          style={{
                            background: "#ea580c",
                            color: "white",
                            fontSize: "10px",
                            fontWeight: 800,
                            padding: "3px 8px",
                            borderRadius: "4px",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase" as const,
                          }}
                        >
                          YOUR TURN
                        </span>
                      )}
                      {item.status === "WAITING" && (
                        <span
                          style={{
                            background: "#fff7ed",
                            color: "#c2410c",
                            border: "1px solid #fed7aa",
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: "4px",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase" as const,
                          }}
                        >
                          WAITING
                        </span>
                      )}
                      {item.status === "COMPLETED" && (
                        <span
                          style={{
                            background: "#dcfce7",
                            color: "#15803d",
                            border: "1px solid #bbf7d0",
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: "4px",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase" as const,
                          }}
                        >
                          COMPLETED
                        </span>
                      )}

                      {/* Mode Badge */}
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          border:
                            item.mode === "ONLINE"
                              ? "1px solid #bbf7d0"
                              : "1px solid #e5e7eb",
                          background: item.mode === "ONLINE" ? "#ecfdf5" : "#f3f4f6",
                          color: item.mode === "ONLINE" ? "#065f46" : "#4b5563",
                          letterSpacing: "0.5px",
                          textTransform: "uppercase" as const,
                        }}
                      >
                        {item.mode}
                      </span>
                    </div>

                    {/* Round & Role subtitle */}
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#4b5563",
                        margin: "0 0 8px",
                        fontWeight: 500,
                      }}
                    >
                      {item.role} • <span style={{ color: "#6b7280" }}>{item.round}</span>
                    </p>

                    {/* Meta details row (Room, Token, Ahead count, Scheduled Time) */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        flexWrap: "wrap",
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <FiMapPin size={13} style={{ color: "#9ca3af" }} />
                        <span>{item.room}</span>
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <FiClock size={13} style={{ color: "#9ca3af" }} />
                        <span>Token: <strong style={{ color: "#111827" }}>{item.token}</strong></span>
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <FiUsers size={13} style={{ color: "#9ca3af" }} />
                        <span>Ahead: <strong style={{ color: item.ahead === 0 ? "#ea580c" : "#111827" }}>{item.ahead}</strong></span>
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <FiClock size={13} style={{ color: "#9ca3af" }} />
                        <span>{item.time}</span>
                      </span>
                    </div>
                  </div>

                  {/* Selected Indicator Chevron */}
                  <div style={{ flexShrink: 0, paddingLeft: "8px" }}>
                    <FiChevronRight
                      size={18}
                      style={{
                        color: isSelected ? "#ea580c" : "#d1d5db",
                        transition: "color 0.15s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {filteredInterviews.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 20px",
                  color: "#9ca3af",
                  fontSize: "14px",
                  background: "white",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                }}
              >
                No interviews found matching "{searchTerm}".
              </div>
            )}
          </div>
        </div>

        {/* ─── Right Column: Interview Details Panel (~35%) ─── */}
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "sticky" as const,
            top: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          {/* Company Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  background: selected.avatarBg,
                  color: selected.avatarColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "18px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                {selected.avatarText}
              </div>
              <div>
                <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>
                  {selected.company}
                </h3>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, fontWeight: 500 }}>
                  {selected.role}
                </p>
              </div>
            </div>
            <span
              style={{
                background: "#ea580c",
                color: "white",
                fontSize: "10px",
                fontWeight: 800,
                padding: "3px 10px",
                borderRadius: "5px",
                letterSpacing: "0.5px",
                textTransform: "uppercase" as const,
              }}
            >
              TODAY
            </span>
          </div>

          <p style={{ fontSize: "13px", color: "#374151", margin: 0, fontWeight: 600, background: "#f9fafb", padding: "8px 12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
            {selected.round}
          </p>

          {/* Details 2x2 Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              background: "#fafafa",
              padding: "14px 16px",
              borderRadius: "8px",
              border: "1px solid #f3f4f6",
            }}
          >
            {[
              { icon: <FiCalendar size={14} />, label: "Date", value: selected.date },
              { icon: <FiClock size={14} />, label: "Time", value: selected.time },
              {
                icon: <FiMonitor size={14} />,
                label: "Mode",
                value: selected.mode === "OFFLINE" ? "Offline" : "Online",
              },
              { icon: <FiMapPin size={14} />, label: "Room", value: selected.room },
            ].map((detail) => (
              <div key={detail.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#9ca3af" }}>{detail.icon}</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                    {detail.label}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                    {detail.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ─── Queue Status Box (Comfortably Spaced) ─── */}
          <div
            style={{
              background: "#fffaf5",
              border: "1px solid #fed7aa",
              borderRadius: "10px",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                Queue Status
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b7280",
                    background: "white",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <FiRefreshCw size={10} /> Update
                </button>
                <button
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b7280",
                    background: "white",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <FiBell size={10} /> Reminder
                </button>
              </div>
            </div>

            {/* 4 Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#9a3412",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase" as const,
                  }}
                >
                  YOUR TOKEN
                </span>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#ea580c",
                    margin: "4px 0 0",
                    lineHeight: 1,
                  }}
                >
                  {selected.token}
                </p>
              </div>
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#9a3412",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase" as const,
                  }}
                >
                  CURRENT QUEUE
                </span>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#381c0f",
                    margin: "4px 0 0",
                    lineHeight: 1,
                  }}
                >
                  #12
                </p>
              </div>
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#9a3412",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase" as const,
                  }}
                >
                  AHEAD
                </span>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#381c0f",
                    margin: "4px 0 0",
                    lineHeight: 1,
                  }}
                >
                  {selected.ahead}
                </p>
              </div>
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#9a3412",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase" as const,
                  }}
                >
                  EST. WAIT
                </span>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#381c0f",
                    margin: "4px 0 0",
                    lineHeight: 1,
                  }}
                >
                  ~{selected.ahead * 5} min
                </p>
              </div>
            </div>

            {/* Step Progress Indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                flexWrap: "wrap" as const,
                padding: "8px 0 2px",
              }}
            >
              {(() => {
                const tokenNum = parseInt(selected.token.replace("#", ""));
                const currentQueue = 12;
                const steps = [];
                for (let i = currentQueue; i <= tokenNum; i++) {
                  const isYou = i === tokenNum;
                  const isCurrent = i === currentQueue;
                  steps.push(
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: isYou ? "white" : isCurrent ? "#ea580c" : "#6b7280",
                          background: isYou ? "#ea580c" : "white",
                          border: isYou
                            ? "1px solid #ea580c"
                            : isCurrent
                            ? "1.5px solid #ea580c"
                            : "1px solid #d1d5db",
                          borderRadius: "4px",
                          padding: "3px 8px",
                          whiteSpace: "nowrap" as const,
                        }}
                      >
                        {isYou ? `YOU ${selected.token}` : `#${i}`}
                      </span>
                      {i < tokenNum && (
                        <FiArrowRight size={10} style={{ color: "#d1d5db", flexShrink: 0 }} />
                      )}
                    </div>
                  );
                }
                return steps;
              })()}
            </div>

            {/* Footer meta */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #fed7aa",
                paddingTop: "10px",
              }}
            >
              <span style={{ fontSize: "11px", color: "#9a3412" }}>Last updated 1 min ago</span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#ea580c",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FiBell size={11} /> Reminder set
              </span>
            </div>
          </div>

          {/* ─── Next Action Callout Card ─── */}
          <div
            style={{
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: "8px",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "#ea580c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 4px rgba(234, 88, 12, 0.2)",
              }}
            >
              <FiNavigation size={18} style={{ color: "white" }} />
            </div>
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#c2410c",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase" as const,
                }}
              >
                NEXT ACTION
              </span>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#381c0f",
                  margin: "2px 0 0",
                }}
              >
                Wait near {selected.room}
              </p>
            </div>
          </div>

          {/* ─── Action Buttons ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                background: "#381c0f",
                border: "1px solid #381c0f",
                color: "white",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.15s ease",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <FiMapPin size={15} />
              <span>View Room Details</span>
            </button>
            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                background: "white",
                border: "1px solid #d1d5db",
                color: "#374151",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.15s ease",
              }}
            >
              View Application Details
            </button>
          </div>

          {/* ─── Instructions Checklist ─── */}
          <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "14px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <FiAlertCircle size={14} style={{ color: "#ea580c" }} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                Instructions
              </span>
            </div>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {instructions.map((text, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "12px",
                    color: "#4b5563",
                    lineHeight: 1.5,
                  }}
                >
                  <FiCheckCircle
                    size={13}
                    style={{ color: "#16a34a", marginTop: "2px", flexShrink: 0 }}
                  />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
