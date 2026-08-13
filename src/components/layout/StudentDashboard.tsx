import { FiBell, FiDownload, FiUser } from "react-icons/fi";
import "../../styles/student-portal.css";

export default function StudentDashboard() {
  const kpiData = [
    {
      label: "ELIGIBLE DRIVES",
      value: "12",
      badgeText: "+3 New",
      badgeClass: "std-pill-orange",
    },
    {
      label: "APPLICATIONS",
      value: "5",
      badgeText: "2 Under Review",
      badgeClass: "std-pill-gray",
    },
    {
      label: "UPCOMING INTERVIEWS",
      value: "2",
      badgeText: "1 Tomorrow",
      badgeClass: "std-pill-red",
    },
    {
      label: "PLACEMENT STATUS",
      value: "3",
      badgeText: "Shortlisted",
      badgeClass: "std-pill-green",
    },
  ];

  const recommendedDrives = [
    {
      id: 1,
      company: "Microsoft",
      role: "Software Development Engineer • 12 LPA",
      isPrimaryAction: true,
      actionText: "Apply Now",
    },
    {
      id: 2,
      company: "Amazon",
      role: "Cloud Engineer • 15 LPA",
      isPrimaryAction: false,
      actionText: "View Details",
    },
    {
      id: 3,
      company: "Infosys",
      role: "Systems Engineer • 6.5 LPA",
      isPrimaryAction: true,
      actionText: "Apply Now",
    },
  ];

  const upcomingInterviews = [
    {
      company: "Microsoft",
      dateTime: "Nov 12 • 10:00 AM",
      location: "Room B-102",
      status: "Scheduled",
    },
    {
      company: "Amazon",
      dateTime: "Nov 15 • 2:30 PM",
      location: "Room A-204",
      status: "Scheduled",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Applied to Microsoft",
      time: "2 hours ago",
      isHollow: false,
    },
    {
      id: 2,
      title: "Shortlisted for Amazon",
      time: "Yesterday",
      isHollow: false,
    },
    {
      id: 3,
      title: "Resume updated",
      time: "2 days ago",
      isHollow: true,
    },
  ];

  return (
    <div className="std-dashboard-container">
      {/* ─── Header Row ─── */}
      <div className="std-header-row">
        <div>
          <h1>Good morning, Alex</h1>
          <p>Here's your placement activity at a glance.</p>
        </div>
        <div className="std-header-actions">
          <button className="std-bell-btn" title="Notifications">
            <FiBell size={16} />
            <span className="std-bell-dot" />
          </button>
          <button className="std-btn-outline">
            <FiDownload size={14} />
            <span>Download Resume</span>
          </button>
          <button className="std-btn-primary">
            <FiUser size={14} />
            <span>Update Profile</span>
          </button>
        </div>
      </div>

      {/* ─── KPI Row (4 Cards) ─── */}
      <div className="std-kpi-row">
        {kpiData.map((kpi) => (
          <div className="std-stat-card" key={kpi.label}>
            <span className="std-stat-label">{kpi.label}</span>
            <div className="std-stat-body">
              <span className="std-stat-value">{kpi.value}</span>
              <span className={`std-pill ${kpi.badgeClass}`}>
                {kpi.badgeText}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Main Grid (70% / 30%) ─── */}
      <div className="std-main-grid">
        {/* ── Left Column ── */}
        <div className="std-left-col">
          {/* Recommended Drives */}
          <div className="std-card">
            <div className="std-card-header">
              <h3 className="std-card-title">Recommended Drives</h3>
              <span className="std-view-all">View All →</span>
            </div>
            <div className="std-drives-list">
              {recommendedDrives.map((drive) => (
                <div className="std-drive-item" key={drive.id}>
                  <div className="std-drive-left">
                    <div className="std-drive-top">
                      <span className="std-drive-company">{drive.company}</span>
                      <span className="std-eligible-badge">ELIGIBLE</span>
                    </div>
                    <span className="std-drive-sub">{drive.role}</span>
                  </div>
                  <div>
                    {drive.isPrimaryAction ? (
                      <button className="std-btn-apply">{drive.actionText}</button>
                    ) : (
                      <button className="std-btn-details">{drive.actionText}</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="std-card">
            <div className="std-card-header">
              <h3 className="std-card-title">Upcoming Interviews</h3>
            </div>
            <table className="std-table">
              <thead>
                <tr>
                  <th>COMPANY</th>
                  <th>DATE &amp; TIME</th>
                  <th>LOCATION</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {upcomingInterviews.map((item) => (
                  <tr key={item.company}>
                    <td style={{ fontWeight: 600 }}>{item.company}</td>
                    <td style={{ color: "#4b5563" }}>{item.dateTime}</td>
                    <td style={{ color: "#4b5563" }}>{item.location}</td>
                    <td>
                      <span className="std-pill std-pill-orange">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="std-right-col">
          {/* Recent Activity */}
          <div className="std-card">
            <div className="std-card-header">
              <h3 className="std-card-title">Recent Activity</h3>
            </div>
            <div className="std-activity-list">
              {recentActivity.map((act) => (
                <div className="std-activity-item" key={act.id}>
                  <div
                    className={`std-activity-dot ${act.isHollow ? "hollow" : ""}`}
                  />
                  <div className="std-activity-content">
                    <p className="std-activity-title">{act.title}</p>
                    <span className="std-activity-time">{act.time}</span>
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