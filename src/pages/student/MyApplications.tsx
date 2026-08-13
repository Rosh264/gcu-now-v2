import { useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiSliders,
  FiDownload,
  FiCalendar,
  FiVideo,
  FiMapPin,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "../../styles/student-portal.css";

interface Application {
  id: number;
  company: string;
  role: string;
  package: string;
  appliedDate: string;
  status: "SHORTLISTED" | "UNDER REVIEW" | "INTERVIEW SCHEDULED";
  nextStep: string;
  avatarText: string;
  avatarClass: "blue" | "orange" | "gray";
}

const mockApplications: Application[] = [
  {
    id: 1,
    company: "Microsoft",
    role: "SDE",
    package: "12 LPA",
    appliedDate: "Oct 12",
    status: "SHORTLISTED",
    nextStep: "Technical Interview",
    avatarText: "M",
    avatarClass: "blue",
  },
  {
    id: 2,
    company: "Amazon",
    role: "Cloud Engineer",
    package: "15 LPA",
    appliedDate: "Oct 10",
    status: "UNDER REVIEW",
    nextStep: "Awaiting recruiter response",
    avatarText: "A",
    avatarClass: "blue",
  },
  {
    id: 3,
    company: "Infosys",
    role: "Systems Engineer",
    package: "6.5 LPA",
    appliedDate: "Oct 08",
    status: "INTERVIEW SCHEDULED",
    nextStep: "Oct 25, 10:00 AM",
    avatarText: "I",
    avatarClass: "blue",
  },
  {
    id: 4,
    company: "Deloitte",
    role: "Analyst",
    package: "9 LPA",
    appliedDate: "Oct 05",
    status: "UNDER REVIEW",
    nextStep: "Application review",
    avatarText: "D",
    avatarClass: "blue",
  },
  {
    id: 5,
    company: "Wipro",
    role: "Project Engineer",
    package: "5 LPA",
    appliedDate: "Sep 28",
    status: "UNDER REVIEW",
    nextStep: "Awaiting shortlist",
    avatarText: "W",
    avatarClass: "blue",
  },
];

const mockUpcomingInterviews = [
  {
    id: 1,
    company: "Microsoft",
    round: "Technical Interview",
    dateTime: "Oct 25, 10:00 AM",
    mode: "Online",
    isOnline: true,
  },
  {
    id: 2,
    company: "Amazon",
    round: "HR Interview",
    dateTime: "Oct 28, 2:00 PM",
    mode: "Campus",
    isOnline: false,
  },
];

export default function MyApplications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "SHORTLISTED":
        return <span className="app-status-badge app-status-shortlisted">SHORTLISTED</span>;
      case "UNDER REVIEW":
        return <span className="app-status-badge app-status-review">UNDER REVIEW</span>;
      case "INTERVIEW SCHEDULED":
        return (
          <span className="app-status-badge app-status-scheduled">
            INTERVIEW SCHEDULED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-page-container">
      {/* ─── Header Row ─── */}
      <div className="app-header-row">
        <div>
          <h1>My Applications</h1>
          <p>Track your placement applications and their current status.</p>
        </div>
        <button className="app-btn-export">
          <FiDownload size={14} />
          <span>Export</span>
        </button>
      </div>

      {/* ─── 4 Compact Minimal KPI Stat Cards ─── */}
      <div className="app-kpi-row">
        <div className="app-stat-card">
          <span className="app-stat-label">TOTAL APPLICATIONS</span>
          <div className="app-stat-body">
            <span className="app-stat-value">5</span>
          </div>
        </div>

        <div className="app-stat-card">
          <span className="app-stat-label">UNDER REVIEW</span>
          <div className="app-stat-body">
            <span className="app-stat-value">2</span>
          </div>
        </div>

        <div className="app-stat-card">
          <span className="app-stat-label">SHORTLISTED</span>
          <div className="app-stat-body">
            <span className="app-stat-value">1</span>
          </div>
        </div>

        <div className="app-stat-card">
          <span className="app-stat-label">INTERVIEWS SCHEDULED</span>
          <div className="app-stat-body">
            <span className="app-stat-value">2</span>
            <span className="app-action-badge">Action Needed</span>
          </div>
        </div>
      </div>

      {/* ─── Main 70/30 Split Grid ─── */}
      <div className="app-main-grid">
        {/* ── Left Side: Filter Bar + Table ── */}
        <div className="app-left-col">
          {/* Filter Bar */}
          <div className="app-filter-bar">
            {/* Search Input */}
            <div className="app-search-wrap">
              <FiSearch size={15} className="app-search-icon" />
              <input
                type="text"
                placeholder="Search companies or roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="app-search-input"
              />
            </div>

            {/* Dropdowns & Sort */}
            <div className="app-dropdowns-row">
              {/* Status */}
              <div className="app-select-wrap">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="app-select"
                >
                  <option value="All">Status</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="UNDER REVIEW">Under Review</option>
                  <option value="INTERVIEW SCHEDULED">Interview Scheduled</option>
                </select>
                <FiChevronDown size={12} className="app-select-arrow" />
              </div>

              {/* Department */}
              <div className="app-select-wrap">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="app-select"
                >
                  <option value="All">Department</option>
                  <option value="CSE">CSE</option>
                  <option value="ISE">ISE</option>
                  <option value="ECE">ECE</option>
                </select>
                <FiChevronDown size={12} className="app-select-arrow" />
              </div>

              {/* Sort Button */}
              <button className="app-btn-sort">
                <FiSliders size={12} />
                <span>Sort</span>
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="app-table-card">
            <table className="app-table">
              <thead>
                <tr>
                  <th>COMPANY &amp; ROLE</th>
                  <th>PACKAGE</th>
                  <th>APPLIED</th>
                  <th>STATUS</th>
                  <th>NEXT STEP</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id}>
                    {/* Company & Role with Avatar */}
                    <td>
                      <div className="app-company-cell">
                        <div className={`app-avatar ${app.avatarClass}`}>
                          {app.avatarText}
                        </div>
                        <div className="app-company-info">
                          <span className="app-company-name">{app.company}</span>
                          <span className="app-role-name">{app.role}</span>
                        </div>
                      </div>
                    </td>

                    {/* Package */}
                    <td style={{ fontWeight: 600 }}>{app.package}</td>

                    {/* Applied Date */}
                    <td style={{ color: "#6b7280" }}>{app.appliedDate}</td>

                    {/* Status */}
                    <td>{getStatusBadge(app.status)}</td>

                    {/* Next Step */}
                    <td style={{ color: "#4b5563", fontSize: "12px" }}>
                      {app.nextStep}
                    </td>

                    {/* Action */}
                    <td style={{ verticalAlign: "middle" }}>
                      <span className="app-link-action">
                        View
                        <br />
                        Application
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right Side: Upcoming Interviews Card ── */}
        <div className="app-right-col">
          <div className="app-interviews-card">
            <h3 className="app-interviews-title">Upcoming Interviews</h3>

            {mockUpcomingInterviews.map((interview) => (
              <div className="app-interview-item" key={interview.id}>
                <span className="app-interview-company">{interview.company}</span>
                <span className="app-interview-round">{interview.round}</span>
                <div className="app-interview-meta">
                  <span className="app-interview-meta-row">
                    <FiCalendar size={12} style={{ color: "#9ca3af" }} />
                    <span>{interview.dateTime}</span>
                  </span>
                  <span className="app-interview-meta-row">
                    {interview.isOnline ? (
                      <>
                        <FiVideo size={12} style={{ color: "#9ca3af" }} />
                        <span>{interview.mode}</span>
                      </>
                    ) : (
                      <>
                        <FiMapPin size={12} style={{ color: "#9ca3af" }} />
                        <span>{interview.mode}</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            ))}

            <Link to="/student/interviews" className="app-full-schedule-link">
              View Full Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
