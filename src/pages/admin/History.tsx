import { useState } from "react";
import {
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiDownload,
  FiChevronDown,
  FiTag,
  FiVolume2,
  FiMail,
  FiRotateCw,
  FiSliders,
  FiLogIn,
  FiFileText,
  FiCpu,
  FiSend,
} from "react-icons/fi";
import "../../styles/history.css";

/* ── Local Mock Data ── */

const kpiData = [
  {
    label: "Activities Today",
    value: "342",
    icon: <FiTag size={15} />,
  },
  {
    label: "Drives Completed",
    value: "12",
    icon: <FiVolume2 size={15} />,
  },
  {
    label: "Emails Sent",
    value: "1,250",
    icon: <FiMail size={15} />,
  },
  {
    label: "Status Updates",
    value: "84",
    icon: <FiRotateCw size={15} />,
  },
];

interface TimelineEvent {
  id: number;
  avatarUrl?: string;
  initials?: string;
  icon?: React.ReactNode;
  text: React.ReactNode;
  time: string;
  badgeText: string;
  badgeType: "orange" | "gray";
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    text: (
      <>
        <strong>Alex Johnson (Admin)</strong> added <strong>TechNova Inc.</strong> to Companies
      </>
    ),
    time: "10:30 AM",
    badgeText: "Company Added",
    badgeType: "orange",
  },
  {
    id: 2,
    icon: <FiMail size={15} />,
    text: (
      <>
        <strong>Cold Email Sent to 156 Students</strong> for Google SDE Intern
      </>
    ),
    time: "09:15 AM",
    badgeText: "Email Sent",
    badgeType: "orange",
  },
  {
    id: 3,
    initials: "SM",
    text: (
      <>
        <strong>Sarah Mitchell (Placement Officer)</strong> updated status for{" "}
        <strong>David Kim</strong> to 'Selected'
      </>
    ),
    time: "Yesterday, 4:00 PM",
    badgeText: "Student Selected",
    badgeType: "orange",
  },
  {
    id: 4,
    icon: <FiSend size={15} />,
    text: (
      <>
        <strong>Placement Drive Published: Amazon SDE I</strong>
      </>
    ),
    time: "Yesterday, 11:30 AM",
    badgeText: "Drive Published",
    badgeType: "orange",
  },
  {
    id: 5,
    icon: <FiFileText size={15} />,
    text: (
      <>
        <strong>Report Generated: Monthly Placement Summary - May</strong>
      </>
    ),
    time: "Oct 24, 2:00 PM",
    badgeText: "Report Generated",
    badgeType: "gray",
  },
];

const systemEvents = [
  {
    id: 1,
    icon: <FiLogIn size={15} />,
    title: "Bulk Login Activity Detected",
    subtext: "15 mins ago • Security",
  },
  {
    id: 2,
    icon: <FiFileText size={15} />,
    title: "Excel Upload: Student Data V2",
    subtext: "1 hour ago • Import",
  },
  {
    id: 3,
    icon: <FiCpu size={15} />,
    title: "Campaign Executed: Tech Roles",
    subtext: "3 hours ago • Automation",
  },
];

const summaryMetrics = [
  { label: "Companies", value: "45" },
  { label: "Students", value: "120" },
  { label: "Drives", value: "15" },
  { label: "CRM", value: "80" },
  { label: "Reports", value: "10" },
];

/* ── Component ── */

export default function History() {
  const [selectedPill, setSelectedPill] = useState<string>("Students");

  return (
    <div className="history-page-container">
      {/* ─── Header ─── */}
      <div className="ha-header">
        <div>
          <h1>History &amp; Activity</h1>
          <p>Complete audit trail and activity center.</p>
        </div>
        <div className="ha-header-actions">
          <button className="ha-dropdown-btn">
            <FiCalendar size={14} />
            <span>Date Range</span>
            <FiChevronDown size={13} />
          </button>
          <button className="ha-dropdown-btn">
            <FiUser size={14} />
            <span>User</span>
            <FiChevronDown size={13} />
          </button>
          <button className="ha-dropdown-btn">
            <FiBriefcase size={14} />
            <span>Company</span>
            <FiChevronDown size={13} />
          </button>
          <button className="ha-btn-outline">
            <FiDownload size={14} />
            <span>Export Activity Log</span>
          </button>
        </div>
      </div>

      {/* ─── KPI Row (Compressed) ─── */}
      <div className="ha-kpi-row">
        {kpiData.map((kpi) => (
          <div className="ha-stat-card" key={kpi.label}>
            <div className="ha-stat-top">
              <span className="ha-stat-label">{kpi.label}</span>
              <div className="ha-stat-icon">{kpi.icon}</div>
            </div>
            <div className="ha-stat-value">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* ─── Main Grid (70% / 30%) ─── */}
      <div className="ha-grid">
        {/* ── Left Column: Activity Timeline ── */}
        <div className="ha-left">
          <div className="ha-timeline-card">
            <div className="ha-timeline-header">
              <h3>Activity Timeline</h3>
            </div>

            <div className="ha-timeline-list">
              {timelineEvents.map((evt, idx) => (
                <div className="ha-timeline-item" key={evt.id}>
                  {/* Vertical Connector Track */}
                  <div className="ha-timeline-track">
                    <div className="ha-timeline-dot" />
                    {idx < timelineEvents.length - 1 && (
                      <div className="ha-timeline-line" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="ha-timeline-content">
                    <div className="ha-timeline-avatar-wrap">
                      {evt.avatarUrl ? (
                        <img
                          src={evt.avatarUrl}
                          alt="User"
                          className="ha-timeline-avatar-img"
                        />
                      ) : evt.initials ? (
                        <span style={{ fontWeight: 700, fontSize: "11px" }}>
                          {evt.initials}
                        </span>
                      ) : (
                        evt.icon
                      )}
                    </div>

                    <div className="ha-timeline-body">
                      <p className="ha-timeline-text">{evt.text}</p>
                      <div className="ha-timeline-meta">
                        <span className="ha-timeline-time">{evt.time}</span>
                        <span className={`ha-badge ha-badge-${evt.badgeType}`}>
                          {evt.badgeText}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="ha-load-more-btn">Load More Activity</button>
          </div>
        </div>

        {/* ── Right Column: Quick Filters & System Events ── */}
        <div className="ha-right">
          {/* Quick Filters Card */}
          <div className="ha-filter-card">
            <div className="ha-filter-header">
              <FiSliders size={14} color="#6b7280" />
              <h3>Quick Filters</h3>
            </div>

            <div className="ha-filter-group">
              <label className="ha-filter-label">Action Type</label>
              <div className="ha-filter-select-wrap">
                <select className="ha-filter-select" defaultValue="All Actions">
                  <option value="All Actions">All Actions</option>
                  <option value="Company Added">Company Added</option>
                  <option value="Email Sent">Email Sent</option>
                  <option value="Drive Published">Drive Published</option>
                  <option value="Student Selected">Student Selected</option>
                </select>
                <FiChevronDown size={13} className="ha-select-arrow" />
              </div>
            </div>

            <div className="ha-filter-group">
              <label className="ha-filter-label">Drive</label>
              <div className="ha-filter-select-wrap">
                <select className="ha-filter-select" defaultValue="All Drives">
                  <option value="All Drives">All Drives</option>
                  <option value="Fall Drive 24">Fall Drive '24</option>
                  <option value="Google SDE">Google SDE Intern</option>
                  <option value="Amazon SDE">Amazon SDE I</option>
                </select>
                <FiChevronDown size={13} className="ha-select-arrow" />
              </div>
            </div>

            {selectedPill && (
              <div className="ha-active-pills">
                <span
                  className="ha-filter-pill"
                  onClick={() => setSelectedPill("")}
                  title="Remove filter"
                >
                  {selectedPill} <span className="ha-pill-close">✕</span>
                </span>
              </div>
            )}
          </div>

          {/* Recent System Events Card */}
          <div className="ha-system-events-card">
            <h3>Recent System Events</h3>
            <div className="ha-sys-list">
              {systemEvents.map((sys) => (
                <div className="ha-sys-item" key={sys.id}>
                  <div className="ha-sys-icon-box">{sys.icon}</div>
                  <div className="ha-sys-info">
                    <h4>{sys.title}</h4>
                    <p>{sys.subtext}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Row: Activity Summary (30 Days) ─── */}
      <div className="ha-summary-section">
        <h3>Activity Summary (30 Days)</h3>
        <div className="ha-summary-card">
          <div className="ha-summary-tiles">
            {summaryMetrics.map((item) => (
              <div className="ha-summary-tile" key={item.label}>
                <span className="ha-tile-label">{item.label}</span>
                <span className="ha-tile-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
