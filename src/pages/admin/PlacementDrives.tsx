import { useState } from "react";
import {
  FiCalendar,
  FiDownload,
  FiPlus,
  FiSearch,
  FiChevronDown,
  FiFilter,
  FiMoreVertical,
  FiSettings,
  FiCopy,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiSend,
  FiTarget,
  FiBarChart2,
} from "react-icons/fi";
import "../../styles/placement-drives.css";

/* ── Local mock data ── */

const kpiCards = [
  { label: "Active Drives", value: "18", icon: <FiSettings size={18} /> },
  { label: "Upcoming Drives", value: "12", icon: <FiTarget size={18} /> },
  { label: "Completed Drives", value: "142", icon: <FiCheckCircle size={18} /> },
  { label: "Students Registered", value: "1,248", icon: <FiBarChart2 size={18} /> },
];

interface DriveRow {
  id: number;
  company: string;
  logo: string;
  campusDrive: boolean;
  jobRole: string;
  package: string;
  depts: { label: string; className: string }[];
  date: string;
  status: string;
  statusClass: string;
}

const driveData: DriveRow[] = [
  {
    id: 1,
    company: "Microsoft",
    logo: "M",
    campusDrive: true,
    jobRole: "SDE 1",
    package: "12 LPA",
    depts: [
      { label: "CSE", className: "cse" },
      { label: "ISE", className: "ise" },
    ],
    date: "Oct 24, 2023",
    status: "Upcoming",
    statusClass: "pd-status-upcoming",
  },
  {
    id: 2,
    company: "Amazon",
    logo: "A",
    campusDrive: false,
    jobRole: "Cloud Engineer",
    package: "15 LPA",
    depts: [{ label: "ALL", className: "all" }],
    date: "Oct 20, 2023",
    status: "Ongoing",
    statusClass: "pd-status-ongoing",
  },
  {
    id: 3,
    company: "Wipro",
    logo: "W",
    campusDrive: false,
    jobRole: "Analyst",
    package: "6 LPA",
    depts: [
      { label: "ECE", className: "ece" },
      { label: "ME", className: "me" },
    ],
    date: "Sep 15, 2023",
    status: "Completed",
    statusClass: "pd-status-completed",
  },
  {
    id: 4,
    company: "Cisco",
    logo: "CS",
    campusDrive: false,
    jobRole: "Network Eng",
    package: "14 LPA",
    depts: [{ label: "ECE", className: "ece" }],
    date: "Nov 02, 2023",
    status: "Upcoming",
    statusClass: "pd-status-upcoming",
  },
];

const scheduleSteps = [
  { title: "Registration Opens", meta: "Oct 15, 09:00 AM", done: true },
  { title: "Registration Closes", meta: "Oct 20, 11:59 PM", done: true },
  { title: "Pre-Placement Talk (PPT)", meta: "Oct 24, 09:00 AM – Aud. 1", done: false },
  { title: "Aptitude Test", meta: "Oct 24, 11:00 AM – Labs", done: false },
  { title: "Technical Interview", meta: "Oct 25, 09:30 AM", done: false },
];

/* ── Component ── */

export default function PlacementDrives() {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="placement-drives-container">
      {/* ─── Header ─── */}
      <div className="pd-header">
        <h1>Placement Drives</h1>
        <div className="pd-header-actions">
          <button className="pd-btn pd-btn-outline">
            <FiCalendar size={14} />
            <span>Calendar View</span>
          </button>
          <button className="pd-btn pd-btn-outline">
            <FiDownload size={14} />
            <span>Export</span>
          </button>
          <button className="pd-btn pd-btn-primary">
            <FiPlus size={14} />
            <span>Create Drive</span>
          </button>
        </div>
      </div>

      {/* ─── KPI Row ─── */}
      <div className="pd-kpi-row">
        {kpiCards.map((card) => (
          <div className="pd-stat-card" key={card.label}>
            <div className="pd-stat-label">
              <span>{card.label}</span>
              <span className="pd-stat-label-icon">{card.icon}</span>
            </div>
            <span className="pd-stat-value">{card.value}</span>
          </div>
        ))}
      </div>

      {/* ─── Main 2-Column Grid ─── */}
      <div className="pd-grid">
        {/* ── Left: Table ── */}
        <div className="pd-left">
          <div className="pd-table-card">
            {/* Toolbar */}
            <div className="pd-toolbar">
              <div className="pd-search-wrapper">
                <FiSearch size={14} className="pd-search-icon" />
                <input type="text" placeholder="Search companies or roles..." />
              </div>
              <div className="pd-toolbar-controls">
                <button className="pd-dropdown">
                  All Departments
                  <FiChevronDown size={13} />
                </button>
                <button className="pd-dropdown">
                  Status
                  <FiChevronDown size={13} />
                </button>
                <button className="pd-icon-btn">
                  <FiCalendar size={14} />
                </button>
                <button className="pd-icon-btn">
                  <FiFilter size={14} />
                </button>
              </div>
            </div>

            {/* Table */}
            <table className="pd-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Role</th>
                  <th>Package</th>
                  <th>Depts</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {driveData.map((d) => (
                  <tr
                    key={d.id}
                    className={selectedId === d.id ? "pd-selected" : ""}
                    onClick={() => setSelectedId(d.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <div className="pd-company-cell">
                        <div className="pd-company-logo">{d.logo}</div>
                        <span className="pd-company-name">
                          {d.company}
                          {d.campusDrive && (
                            <span className="pd-campus-badge">
                              Campus Drive
                            </span>
                          )}
                        </span>
                      </div>
                    </td>
                    <td>{d.jobRole}</td>
                    <td>{d.package}</td>
                    <td>
                      <div className="pd-dept-pills">
                        {d.depts.map((dept) => (
                          <span
                            key={dept.label}
                            className={`pd-dept-pill ${dept.className}`}
                          >
                            {dept.label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>{d.date}</td>
                    <td>
                      <span className={`pd-status ${d.statusClass}`}>
                        {d.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="pd-actions-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiMoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="pd-right">
          {/* Drive Detail Card */}
          <div className="pd-detail-card">
            <div className="pd-detail-top">
              <div className="pd-detail-company-row">
                <div className="pd-detail-logo">M</div>
                <h3 className="pd-detail-company-name">Microsoft</h3>
              </div>
              <span className="pd-upcoming-badge">Upcoming</span>
            </div>

            <div className="pd-detail-sub">
              <span className="pd-detail-campus-tag">Campus Drive</span>
              <span className="pd-detail-role">SDE 1</span>
            </div>

            {/* Info Grid */}
            <div className="pd-info-grid">
              <div className="pd-info-item">
                <label>Package</label>
                <span>12 LPA</span>
              </div>
              <div className="pd-info-item">
                <label>Interview Date</label>
                <span>Oct 24, 2023</span>
              </div>
              <div className="pd-info-item">
                <label>Room</label>
                <span>Block A - 102</span>
              </div>
              <div className="pd-info-item">
                <label>Deadline</label>
                <span className="pd-danger">Oct 20, 2023</span>
              </div>
            </div>

            {/* Progress bar with CSS animation */}
            <div className="pd-applicants-section">
              <div className="pd-applicants-header">
                <span className="pd-applicants-label">Current Applicants</span>
                <span className="pd-applicants-count">342 / 500 cap</span>
              </div>
              <div className="pd-progress-track">
                <div
                  className="pd-progress-fill"
                  style={
                    { "--pd-progress-target": "68.4%" } as React.CSSProperties
                  }
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pd-detail-actions">
              <button className="pd-publish-btn">
                <FiSend size={13} />
                Publish
              </button>
              <div className="pd-detail-btn-row">
                <button className="pd-outline-action">
                  <FiCopy size={13} />
                  Duplicate
                </button>
                <button className="pd-outline-action">
                  <FiUsers size={13} />
                  View Applicants
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="pd-schedule-card">
            <div className="pd-schedule-header">
              <span className="pd-schedule-header-icon">
                <FiClock size={15} />
              </span>
              <h3>Upcoming Schedule</h3>
            </div>

            <div className="pd-timeline">
              {scheduleSteps.map((step, idx) => (
                <div className="pd-timeline-step" key={step.title}>
                  <div className="pd-timeline-track">
                    <div
                      className={`pd-timeline-dot ${
                        step.done ? "completed" : "future"
                      }`}
                    />
                    {idx < scheduleSteps.length - 1 && (
                      <div className="pd-timeline-line" />
                    )}
                  </div>
                  <div className="pd-timeline-content">
                    <p className="pd-timeline-title">{step.title}</p>
                    <p className="pd-timeline-meta">{step.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
