import { useState } from "react";
import {
  FiBriefcase,
  FiVolume2,
  FiDownload,
  FiRotateCw,
  FiChevronDown,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiWatch,
  FiTrendingUp,
  FiMoreVertical,
  FiArrowRight,
} from "react-icons/fi";
import "../../styles/interview-queue.css";

/* ── Local Mock Data ── */

const kpiData = [
  {
    label: "WAITING",
    value: "42",
    subtext: "+3 in last 5m",
    hasTrend: false,
    icon: <FiClock size={15} />,
  },
  {
    label: "INTERVIEWING",
    value: "12",
    subtext: "Across 8 rooms",
    hasTrend: false,
    icon: <FiUsers size={15} />,
  },
  {
    label: "COMPLETED TODAY",
    value: "156",
    subtext: "78% of scheduled",
    hasTrend: false,
    icon: <FiCheckCircle size={15} />,
  },
  {
    label: "AVG WAIT TIME",
    value: "18 min",
    subtext: "+2m from avg",
    hasTrend: true,
    icon: <FiWatch size={15} />,
  },
];

interface RoomInfo {
  id: string;
  name: string;
  round: string;
  status: "active" | "idle";
  token?: string;
  candidateName?: string;
  elapsedTime?: string;
  nextTokens: string;
  estWait: string;
  isIdle?: boolean;
}

const roomsData: RoomInfo[] = [
  {
    id: "A",
    name: "Room A",
    round: "Tech R1",
    status: "active",
    token: "#112",
    candidateName: "Alex Johnson",
    elapsedTime: "08:45 elapsed",
    nextTokens: "Next: #113, #114, #115",
    estWait: "Wait: ~15m",
  },
  {
    id: "B",
    name: "Room B",
    round: "Tech R2",
    status: "active",
    token: "#108",
    candidateName: "Sarah Mitchell",
    elapsedTime: "22:10 elapsed",
    nextTokens: "Next: #109, #111",
    estWait: "Wait: ~10m",
  },
  {
    id: "C",
    name: "Room C",
    round: "HR Round",
    status: "idle",
    isIdle: true,
    candidateName: "Waiting for Candidate",
    nextTokens: "Next: #95 (Called)",
    estWait: "Wait: --",
  },
];

interface QueueRow {
  token: string;
  studentName: string;
  department: string;
  round: string;
  room: string;
  status: "Called" | "Waiting" | "Completed";
  statusType: "called" | "waiting" | "completed";
  estWait: string;
}

const queueData: QueueRow[] = [
  {
    token: "#95",
    studentName: "Priya Patel",
    department: "CS Dept",
    round: "HR Round",
    room: "Room C",
    status: "Called",
    statusType: "called",
    estWait: "--",
  },
  {
    token: "#113",
    studentName: "David Kim",
    department: "IT Dept",
    round: "Tech R1",
    room: "Pending",
    status: "Waiting",
    statusType: "waiting",
    estWait: "15 mins",
  },
  {
    token: "#109",
    studentName: "Emily Chen",
    department: "CS Dept",
    round: "Tech R2",
    room: "Pending",
    status: "Waiting",
    statusType: "waiting",
    estWait: "10 mins",
  },
  {
    token: "#92",
    studentName: "Michael Ross",
    department: "EE Dept",
    round: "Tech R1",
    room: "Room D",
    status: "Completed",
    statusType: "completed",
    estWait: "--",
  },
];

/* ── Component ── */

export default function InterviewQueue() {
  const [activeTab, setActiveTab] = useState<string>("All");

  return (
    <div className="interview-queue-container">
      {/* ─── Header ─── */}
      <div className="iq-header">
        <div>
          <h1>Interview Queue</h1>
          <p>Live operations and candidate routing</p>
        </div>
        <div className="iq-header-actions">
          <button className="iq-dropdown-btn">
            <FiBriefcase size={14} />
            <span>TechCorp Inc</span>
            <FiChevronDown size={13} />
          </button>
          <button className="iq-dropdown-btn">
            <FiVolume2 size={14} />
            <span>Fall Drive '24</span>
            <FiChevronDown size={13} />
          </button>
          <button className="iq-btn-outline">
            <FiDownload size={14} />
            <span>Export</span>
          </button>
          <button className="iq-btn-outline">
            <FiRotateCw size={14} />
            <span>Refresh Queue</span>
          </button>
        </div>
      </div>

      {/* ─── KPI Row (Compressed) ─── */}
      <div className="iq-kpi-row">
        {kpiData.map((kpi) => (
          <div className="iq-stat-card" key={kpi.label}>
            <div className="iq-stat-top">
              <span className="iq-stat-label">{kpi.label}</span>
              <div className="iq-stat-icon">{kpi.icon}</div>
            </div>
            <div className="iq-stat-value">{kpi.value}</div>
            <div className="iq-stat-bottom">
              {kpi.hasTrend && (
                <span className="iq-stat-trend">
                  <FiTrendingUp size={11} />
                </span>
              )}
              <span>{kpi.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Room Cards Grid ─── */}
      <div className="iq-rooms-grid">
        {roomsData.map((room) => (
          <div className="iq-room-card" key={room.id}>
            <div className="iq-room-header">
              <div className="iq-room-title">
                <span
                  className={`iq-status-dot ${
                    room.status === "active" ? "active" : "idle"
                  }`}
                />
                <span>{room.name}</span>
              </div>
              <span className="iq-round-tag">{room.round}</span>
            </div>

            {/* Compact Current Candidate Banner */}
            <div
              className={`iq-candidate-banner ${room.isIdle ? "idle" : ""}`}
            >
              <span
                className={`iq-banner-label ${room.isIdle ? "idle" : ""}`}
              >
                {room.isIdle ? "PREPARING ROOM" : "CURRENT CANDIDATE"}
              </span>
              <span className="iq-banner-token">
                {room.isIdle ? "--" : room.token}
              </span>
              <span
                className={`iq-banner-name ${room.isIdle ? "idle" : ""}`}
              >
                {room.candidateName}
              </span>
              {room.elapsedTime && (
                <span className="iq-banner-elapsed">
                  <FiClock size={11} />
                  {room.elapsedTime}
                </span>
              )}
            </div>

            <div className="iq-room-footer">
              <span>
                <strong>{room.nextTokens}</strong>
              </span>
              <span>{room.estWait}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Master Queue Table Card ─── */}
      <div className="iq-table-card">
        <div className="iq-table-header">
          <h3>Master Queue</h3>
          <div className="iq-table-tabs">
            {["All", "Tech R1", "HR Round"].map((tab) => (
              <button
                key={tab}
                className={`iq-tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <table className="iq-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Student</th>
              <th>Round</th>
              <th>Room</th>
              <th>Status</th>
              <th>Est. Wait</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queueData.map((row) => (
              <tr
                key={row.token}
                className={row.statusType === "called" ? "iq-row-called" : ""}
              >
                <td className="iq-token-cell">{row.token}</td>
                <td>
                  <span className="iq-student-name">{row.studentName}</span>
                  <span className="iq-student-dept">{row.department}</span>
                </td>
                <td>{row.round}</td>
                <td>{row.room}</td>
                <td>
                  <span
                    className={`iq-status-badge iq-status-${row.statusType}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td>{row.estWait}</td>
                <td style={{ textAlign: "center" }}>
                  <button className="iq-action-btn" title="Actions">
                    <FiMoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── Fixed Bottom Bar ─── */}
      <div className="iq-fixed-bottom-bar">
        <div className="iq-ticker">
          <span className="iq-ticker-icon">
            <FiVolume2 size={16} />
          </span>
          <span>
            Just now: Token #95 (Priya Patel) called to Room C.
            <span className="iq-ticker-dot">•</span>
            2m ago: Room A completed Token #111.
          </span>
        </div>

        <div className="iq-bottom-actions">
          <button className="iq-btn-bottom-outline">Skip/Hold</button>
          <button className="iq-btn-bottom-outline">Reassign</button>
          <button className="iq-btn-primary-dark">
            <span>Call Next Candidate</span>
            <FiArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
