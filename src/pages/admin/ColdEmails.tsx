import {
  FiUploadCloud,
  FiBookmark,
  FiPlus,
  FiSearch,
  FiFilter,
  FiArrowUp,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiPauseCircle,
  FiAlertCircle,
  FiCheckSquare,
  FiPlay,
  FiCopy,
  FiDownload,
  FiSend,
  FiClock,
  FiUser,
  FiLayers,
  FiMail,
  FiTrendingUp,
  FiTarget,
  FiMessageSquare,
} from "react-icons/fi";
import "../../styles/cold-emails.css";

/* local mock data */

const kpiCards = [
  {
    label: "Total Campaigns",
    value: "24",
    badge: "+3 this week",
    badgeType: "green" as const,
    subtext: null,
    icon: <FiSend size={38} />,
  },
  {
    label: "Emails Sent",
    value: "1,492",
    badge: null,
    badgeType: null,
    subtext: null,
    icon: <FiMail size={38} />,
  },
  {
    label: "Follow-ups Pending",
    value: "87",
    badge: "Requires action",
    badgeType: "red" as const,
    subtext: null,
    icon: <FiClock size={38} />,
  },
  {
    label: "Companies Responded",
    value: "315",
    badge: null,
    badgeType: null,
    subtext: "21.1% Avg Rate",
    icon: <FiMessageSquare size={38} />,
  },
];

const campaignData = [
  {
    id: 1,
    name: "Q3 Tech Sector Outreach",
    updated: "Updated 2 hrs ago",
    targeted: 150,
    sent: 150,
    openRate: "42%",
    replyRate: "18%",
    status: "Active",
    statusClass: "ce-status-active",
  },
  {
    id: 2,
    name: "Finance Directors UK",
    updated: "Updated yesterday",
    targeted: 320,
    sent: 200,
    openRate: "35%",
    replyRate: "12%",
    status: "Sending",
    statusClass: "ce-status-sending",
  },
  {
    id: 3,
    name: "Startup Founders - Series A",
    updated: "Updated 3 days ago",
    targeted: 85,
    sent: 85,
    openRate: "58%",
    replyRate: "24%",
    status: "Completed",
    statusClass: "ce-status-completed",
  },
  {
    id: 4,
    name: "Agency Partners 2024",
    updated: "Updated 1 week ago",
    targeted: 450,
    sent: 0,
    openRate: "--",
    replyRate: "--",
    status: "Draft",
    statusClass: "ce-status-draft",
  },
];

const activityStream = [
  {
    id: 1,
    dotColor: "green",
    titleText: "Meeting Booked",
    linkText: "TechNova Inc.",
    subtitle: "Generated from: Q3 Tech Sector Outreach (Step 2)",
    quote: null,
    time: "10 mins ago",
  },
  {
    id: 2,
    dotColor: "orange",
    titleText: "Company Replied",
    linkText: "Nexus Solutions",
    subtitle: null,
    quote:
      '"Thanks for reaching out, we are currently looking for new developers..."',
    time: "45 mins ago",
  },
  {
    id: 3,
    dotColor: "gray",
    titleText: "Automated Follow-up (Step 3) Scheduled for 12 Contacts",
    linkText: null,
    subtitle: "Campaign: Finance Directors UK",
    quote: null,
    time: "2 hrs ago",
  },
];

export default function ColdEmails() {
  return (
    <div className="cold-email-container">
      {/* Header */}
      <div className="ce-header">
        <div>
          <h1>Cold Email Management</h1>
          <p>Manage, track, and automate your outbound outreach campaigns.</p>
        </div>
        <div className="ce-header-actions">
          <button className="ce-btn ce-btn-outline">
            <FiUploadCloud size={14} />
            <span>Import Companies</span>
          </button>
          <button className="ce-btn ce-btn-outline">
            <FiBookmark size={14} />
            <span>Saved Templates</span>
          </button>
          <button className="ce-btn ce-btn-primary">
            <FiPlus size={14} />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="ce-kpi-row">
        {kpiCards.map((card) => (
          <div className="ce-stat-card" key={card.label}>
            <div className="ce-stat-top">
              <span className="ce-stat-label">{card.label}</span>
            </div>
            <div className="ce-stat-bg-icon">{card.icon}</div>
            <div className="ce-stat-bottom">
              <span className="ce-stat-value">{card.value}</span>
              {card.badge && (
                <span className={`ce-stat-badge ${card.badgeType}`}>
                  {card.badgeType === "green" && <FiTrendingUp size={11} />}
                  {card.badge}
                </span>
              )}
              {card.subtext && (
                <span className="ce-stat-subtext">{card.subtext}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main 2-Column Grid */}
      <div className="ce-grid">
        {/* Left Column */}
        <div className="ce-left">
          <div className="ce-table-card">
            <div className="ce-table-toolbar">
              <div className="ce-search-wrapper">
                <FiSearch size={14} className="ce-search-icon" />
                <input type="text" placeholder="Filter campaigns..." />
              </div>
              <div className="ce-toolbar-btns">
                <button className="ce-filter-btn">
                  <FiFilter size={13} />
                  Filters
                </button>
                <button className="ce-filter-btn">
                  <FiArrowUp size={13} />
                  Sort
                </button>
              </div>
            </div>

            <table className="ce-campaign-table">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Targeted</th>
                  <th>Sent</th>
                  <th>Metrics (Open/Reply)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaignData.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <span className="ce-campaign-name">{c.name}</span>
                      <span className="ce-campaign-sub">{c.updated}</span>
                    </td>
                    <td>{c.targeted}</td>
                    <td>{c.sent}</td>
                    <td>
                      <span className="ce-metrics-open">{c.openRate}</span>
                      <span className="ce-metrics-sep">/</span>
                      <span className="ce-metrics-reply">{c.replyRate}</span>
                    </td>
                    <td>
                      <span className={`ce-status ${c.statusClass}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <button className="ce-actions-btn">
                        <FiMoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="ce-pagination">
              <span className="ce-pagination-info">
                Showing 1 to 4 of 24 entries
              </span>
              <div className="ce-pagination-controls">
                <button className="ce-page-btn disabled">
                  <FiChevronLeft size={14} />
                </button>
                <button className="ce-page-btn active">1</button>
                <button className="ce-page-btn">2</button>
                <button className="ce-page-btn">3</button>
                <button className="ce-page-btn">...</button>
                <button className="ce-page-btn">
                  <FiChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="ce-right">
          {/* Active Campaign Card */}
          <div className="ce-active-campaign">
            <div className="ce-active-header">
              <div>
                <span className="ce-active-badge">Active</span>
                <h3 className="ce-active-title">Q3 Tech Sector Outreach</h3>
              </div>
              <button className="ce-edit-btn">
                <FiEdit2 size={14} />
              </button>
            </div>

            <div className="ce-progress-section">
              <div className="ce-progress-header">
                <span className="ce-progress-label">Campaign Progress</span>
                <span className="ce-progress-value">
                  100% Sent (150/150)
                </span>
              </div>
              <div className="ce-progress-track">
                <div
                  className="ce-progress-fill"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="ce-detail-list">
              <div className="ce-detail-item">
                <span className="ce-detail-icon">
                  <FiTarget size={14} />
                </span>
                <span className="ce-detail-label">Template</span>
                <span className="ce-detail-value">Tech Intro V2 - A/B</span>
              </div>
              <div className="ce-detail-item">
                <span className="ce-detail-icon">
                  <FiClock size={14} />
                </span>
                <span className="ce-detail-label">Next Follow-up</span>
                <span className="ce-detail-value">Today, 14:00</span>
              </div>
              <div className="ce-detail-item">
                <span className="ce-detail-icon">
                  <FiUser size={14} />
                </span>
                <span className="ce-detail-label">Assigned To</span>
                <span className="ce-detail-value">
                  <span className="ce-detail-avatar">SJ</span>
                  Sarah J.
                </span>
              </div>
              <div className="ce-detail-item">
                <span className="ce-detail-icon">
                  <FiLayers size={14} />
                </span>
                <span className="ce-detail-label">Sequence</span>
                <span className="ce-detail-value">3 Steps (Wait 3d)</span>
              </div>
            </div>

            <button className="ce-pause-btn">
              <FiPauseCircle size={14} />
              Pause Campaign
            </button>
          </div>

          {/* Required Actions */}
          <div className="ce-required-actions">
            <div className="ce-required-header">
              <FiCheckSquare size={15} />
              <span>Required Actions</span>
            </div>
            <div className="ce-alert-box">
              <FiAlertCircle size={16} className="ce-alert-icon" />
              <div>
                <span className="ce-alert-title">3 Bounces detected</span>
                <span className="ce-alert-desc">
                  Review undelivered emails in Q3 Tech Sector.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Stream */}
      <div className="ce-activity-card">
        <div className="ce-activity-header">
          <h3>Recent Activity Stream</h3>
          <button className="ce-view-all">View All</button>
        </div>

        <div className="ce-timeline">
          {activityStream.map((evt) => (
            <div className="ce-timeline-item" key={evt.id}>
              <div className={`ce-timeline-dot ${evt.dotColor}`} />
              <div className="ce-timeline-content">
                <div className="ce-timeline-body">
                  <p className="ce-timeline-title">
                    {evt.titleText}
                    {evt.linkText && (
                      <>
                        {evt.titleText.includes("Replied") ? " - " : " with "}
                        <span className="ce-link">{evt.linkText}</span>
                      </>
                    )}
                  </p>
                  {evt.subtitle && (
                    <p className="ce-timeline-sub">{evt.subtitle}</p>
                  )}
                  {evt.quote && (
                    <p className="ce-timeline-quote">{evt.quote}</p>
                  )}
                </div>
                <span className="ce-timeline-time">{evt.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="ce-floating-bar">
        <button className="ce-float-btn">
          <span className="ce-float-icon">
            <FiPlay size={13} />
          </span>
          Test Email
        </button>
        <button className="ce-float-btn">
          <span className="ce-float-icon">
            <FiCopy size={13} />
          </span>
          Duplicate
        </button>
        <button className="ce-float-btn">
          <span className="ce-float-icon">
            <FiDownload size={13} />
          </span>
          Export
        </button>
      </div>
    </div>
  );
}
