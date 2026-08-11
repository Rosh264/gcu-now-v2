import { useState } from "react";
import {
  FiRotateCw,
  FiUpload,
  FiDownload,
  FiUsers,
  FiShield,
  FiMail,
  FiAward,
  FiTrendingUp,
  FiSearch,
  FiChevronDown,
  FiFilter,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiEdit2,
  FiCalendar,
  FiSend,
  FiX,
  FiVideo,
} from "react-icons/fi";
import "../../styles/students.css";

/* ── Local Mock Data ── */

interface AppliedCompany {
  name: string;
  role: string;
  status: string;
  statusType: "shortlisted" | "rejected" | "applied" | "aptitude";
}

interface UpcomingInterview {
  company: string;
  round: string;
  date: string;
}

interface Candidate {
  id: number;
  name: string;
  usn: string;
  avatarUrl?: string;
  initials?: string;
  dept: string;
  sem: string;
  cgpa: string;
  resumeStatus: "verified" | "needs-update";
  appliedCount: number;
  nextInterviewTime: string;
  nextInterviewCompany: string;
  status: "Unplaced" | "Placed";
  upcomingInterview?: UpcomingInterview | null;
  appliedCompanies: AppliedCompany[];
}

const kpiData = [
  {
    label: "TOTAL REGISTERED",
    value: "1,248",
    subtext: "+5.2% from last year",
    hasTrend: true,
    icon: <FiUsers size={13} />,
    iconStyle: "gray",
  },
  {
    label: "ELIGIBLE",
    value: "1,102",
    subtext: "88.3% of total",
    hasTrend: false,
    icon: <FiShield size={13} />,
    iconStyle: "orange",
  },
  {
    label: "APPLIED",
    value: "856",
    subtext: "Active applications",
    hasTrend: false,
    icon: <FiMail size={13} />,
    iconStyle: "gray",
  },
  {
    label: "PLACED",
    value: "142",
    subtext: "+12 recent",
    hasTrend: true,
    icon: <FiAward size={13} />,
    iconStyle: "orange",
  },
];

const candidatesList: Candidate[] = [
  {
    id: 1,
    name: "Alex Johnson",
    usn: "1GC20CS001",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    dept: "Computer Science",
    sem: "Semester 7",
    cgpa: "8.45",
    resumeStatus: "verified",
    appliedCount: 4,
    nextInterviewTime: "Oct 24, 10:00 AM",
    nextInterviewCompany: "Google - Technical",
    status: "Unplaced",
    upcomingInterview: {
      company: "Google",
      round: "Technical Round 1",
      date: "Oct 24, 10:00 AM",
    },
    appliedCompanies: [
      {
        name: "Google",
        role: "Software Engineer",
        status: "Shortlisted",
        statusType: "shortlisted",
      },
      {
        name: "Microsoft",
        role: "SDE Intern",
        status: "Rejected",
        statusType: "rejected",
      },
      {
        name: "Amazon",
        role: "SDE I",
        status: "Applied",
        statusType: "applied",
      },
      {
        name: "TCS",
        role: "Ninja",
        status: "Aptitude",
        statusType: "aptitude",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    usn: "1GC20IS045",
    initials: "SM",
    dept: "Info Science",
    sem: "Semester 7",
    cgpa: "9.12",
    resumeStatus: "needs-update",
    appliedCount: 2,
    nextInterviewTime: "-",
    nextInterviewCompany: "",
    status: "Placed",
    upcomingInterview: null,
    appliedCompanies: [
      {
        name: "Microsoft",
        role: "SDE Role",
        status: "Selected",
        statusType: "shortlisted",
      },
      {
        name: "Infosys",
        role: "Systems Engineer",
        status: "Applied",
        statusType: "applied",
      },
    ],
  },
  {
    id: 3,
    name: "Priya Patel",
    usn: "1GC20EC112",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
    dept: "Electronics",
    sem: "Semester 7",
    cgpa: "8.80",
    resumeStatus: "verified",
    appliedCount: 6,
    nextInterviewTime: "Oct 26, 2:30 PM",
    nextInterviewCompany: "TCS - HR Round",
    status: "Unplaced",
    upcomingInterview: {
      company: "TCS",
      round: "HR Ninja Round",
      date: "Oct 26, 2:30 PM",
    },
    appliedCompanies: [
      {
        name: "TCS",
        role: "HR Ninja Round",
        status: "Shortlisted",
        statusType: "shortlisted",
      },
      {
        name: "Wipro",
        role: "Analyst",
        status: "Applied",
        statusType: "applied",
      },
      {
        name: "Capgemini",
        role: "Analyst",
        status: "Aptitude",
        statusType: "aptitude",
      },
    ],
  },
];

const activityList = [
  {
    id: 1,
    icon: <FiCheckCircle />,
    iconType: "orange" as const,
    content: (
      <>
        <strong>Sarah Mitchell</strong> was selected for{" "}
        <span className="sp-highlight-orange">Microsoft - SDE Role</span>.
      </>
    ),
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: <FiCalendar />,
    iconType: "gray" as const,
    content: (
      <>
        <strong>Alex Johnson</strong> was shortlisted for{" "}
        <span className="sp-highlight-orange">Google Technical Interview</span>.
      </>
    ),
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: <FiSend />,
    iconType: "gray" as const,
    content: (
      <>
        <strong>42 students</strong> applied for the{" "}
        <span className="sp-highlight-orange">TCS Ninja Drive</span>.
      </>
    ),
    time: "Yesterday",
  },
];

/* ── Component ── */

export default function Students() {
  const [selectedStudent, setSelectedStudent] = useState<Candidate | null>(
    null
  );

  return (
    <div className="students-page-container">
      {/* ─── Header ─── */}
      <div className="sp-header">
        <div>
          <h1>Placement Candidates</h1>
          <p>Manage and track student placement journeys.</p>
        </div>
        <div className="sp-header-actions">
          <button className="sp-sync-btn">
            <FiRotateCw size={14} />
            <span>Sync Students</span>
          </button>
          <button className="sp-btn-outline">
            <FiUpload size={14} />
            <span>Import Students</span>
          </button>
          <button className="sp-btn-outline">
            <FiDownload size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* ─── KPI Row (Compressed) ─── */}
      <div className="sp-kpi-row">
        {kpiData.map((kpi) => (
          <div className="sp-stat-card" key={kpi.label}>
            <div className="sp-stat-top">
              <span className="sp-stat-label">{kpi.label}</span>
              <div
                className={`sp-stat-icon-wrapper ${
                  kpi.iconStyle === "orange" ? "orange-tint" : ""
                }`}
              >
                {kpi.icon}
              </div>
            </div>
            <div className="sp-stat-value">{kpi.value}</div>
            <div className="sp-stat-bottom">
              {kpi.hasTrend && (
                <span className="sp-stat-badge-orange">
                  <FiTrendingUp size={11} />
                </span>
              )}
              <span>{kpi.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Filter Bar ─── */}
      <div className="sp-filter-bar">
        <div className="sp-search-box">
          <FiSearch size={14} className="sp-search-icon" />
          <input type="text" placeholder="Search by Name or USN..." />
        </div>

        <button className="sp-filter-dropdown">
          <span>Department</span>
          <FiChevronDown size={13} />
        </button>

        <button className="sp-filter-dropdown">
          <span>Year</span>
          <FiChevronDown size={13} />
        </button>

        <button className="sp-filter-dropdown">
          <span>Active Drive</span>
          <FiChevronDown size={13} />
        </button>

        <button className="sp-filter-dropdown">
          <span>Placement Status</span>
          <FiChevronDown size={13} />
        </button>

        <button className="sp-filters-btn">
          <FiFilter size={13} />
          <span>Filters</span>
        </button>
      </div>

      {/* ─── Main Grid (Full-width when closed, 70/30 when open) ─── */}
      <div className={`sp-grid ${selectedStudent ? "with-profile" : ""}`}>
        {/* ── Left Column: Table & Activity ── */}
        <div className="sp-left">
          {/* Table */}
          <div className="sp-table-card">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Dept &amp; Sem</th>
                  <th>Resume</th>
                  <th style={{ textAlign: "center" }}>Applied Drives</th>
                  <th>Next Interview</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidatesList.map((c) => (
                  <tr
                    key={c.id}
                    className={
                      selectedStudent?.id === c.id ? "sp-row-selected" : ""
                    }
                    onClick={() => setSelectedStudent(c)}
                  >
                    <td>
                      <div className="sp-candidate-cell">
                        {c.avatarUrl ? (
                          <img
                            src={c.avatarUrl}
                            alt={c.name}
                            className="sp-avatar-img"
                          />
                        ) : (
                          <div className="sp-avatar-initials">
                            {c.initials}
                          </div>
                        )}
                        <div>
                          <span className="sp-candidate-name">{c.name}</span>
                          <span className="sp-candidate-usn">{c.usn}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="sp-dept-title">{c.dept}</span>
                      <span className="sp-dept-sem">{c.sem}</span>
                    </td>
                    <td>
                      {c.resumeStatus === "verified" ? (
                        <span className="sp-resume-badge verified">
                          <FiCheckCircle size={11} />
                          Verified
                        </span>
                      ) : (
                        <span className="sp-resume-badge needs-update">
                          <FiAlertCircle size={11} />
                          Needs Update
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontWeight: 600,
                        color: "#374151",
                      }}
                    >
                      {c.appliedCount}
                    </td>
                    <td>
                      {c.nextInterviewTime !== "-" ? (
                        <div>
                          <span className="sp-interview-time">
                            {c.nextInterviewTime}
                          </span>
                          <span className="sp-interview-company">
                            {c.nextInterviewCompany}
                          </span>
                        </div>
                      ) : (
                        <span style={{ color: "#9ca3af" }}>-</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`sp-status-badge ${
                          c.status === "Placed"
                            ? "sp-status-placed"
                            : "sp-status-unplaced"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <div className="sp-row-actions">
                        <button
                          className="sp-action-icon-btn"
                          title="View Profile"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudent(c);
                          }}
                        >
                          <FiEye size={15} />
                        </button>
                        <button
                          className="sp-action-icon-btn"
                          title="Edit"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiEdit2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Activity */}
          <div className="sp-activity-card">
            <h3>Recent Activity</h3>
            <div className="sp-activity-list">
              {activityList.map((act) => (
                <div className="sp-activity-item" key={act.id}>
                  <div className={`sp-activity-icon ${act.iconType}`}>
                    {act.icon}
                  </div>
                  <div className="sp-activity-content">
                    <p className="sp-activity-text">{act.content}</p>
                    <span className="sp-activity-time">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column: Candidate Profile Panel (Conditional) ── */}
        {selectedStudent && (
          <div className="sp-right">
            <div className="sp-profile-panel">
              <div className="sp-profile-top">
                <h3>Candidate Profile</h3>
                <button
                  className="sp-profile-close-btn"
                  onClick={() => setSelectedStudent(null)}
                  title="Close Profile"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Profile Header Center */}
              <div className="sp-profile-header-center">
                {selectedStudent.avatarUrl ? (
                  <img
                    src={selectedStudent.avatarUrl}
                    alt={selectedStudent.name}
                    className="sp-profile-avatar-lg"
                  />
                ) : (
                  <div
                    className="sp-profile-avatar-lg"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f3f4f6",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#4b5563",
                    }}
                  >
                    {selectedStudent.initials}
                  </div>
                )}
                <h4 className="sp-profile-name">{selectedStudent.name}</h4>
                <span className="sp-profile-usn">{selectedStudent.usn}</span>
                <span
                  className={`sp-status-badge ${
                    selectedStudent.status === "Placed"
                      ? "sp-status-placed"
                      : "sp-status-unplaced"
                  }`}
                >
                  {selectedStudent.status}
                </span>
              </div>

              {/* Department */}
              <div className="sp-profile-section">
                <span className="sp-profile-label">Department</span>
                <span className="sp-profile-value">
                  {selectedStudent.dept} (
                  {selectedStudent.sem.replace("Semester ", "Sem ")})
                </span>
              </div>

              {/* CGPA */}
              <div className="sp-profile-section">
                <span className="sp-profile-label">CGPA</span>
                <span className="sp-cgpa-value">{selectedStudent.cgpa}</span>
              </div>

              {/* Resume */}
              <div className="sp-profile-section">
                <span className="sp-profile-label">Resume</span>
                <button className="sp-download-resume-btn">
                  <FiDownload size={14} />
                  <span>Download PDF</span>
                </button>
              </div>

              {/* Upcoming Interview Card */}
              {selectedStudent.upcomingInterview && (
                <div className="sp-profile-section">
                  <span className="sp-profile-label">Upcoming Interview</span>
                  <div className="sp-upcoming-interview-card">
                    <div className="sp-upcoming-card-header">
                      <h5 className="sp-upcoming-company">
                        {selectedStudent.upcomingInterview.company}
                      </h5>
                      <FiVideo size={16} className="sp-video-icon" />
                    </div>
                    <p className="sp-upcoming-round">
                      {selectedStudent.upcomingInterview.round}
                    </p>
                    <span className="sp-upcoming-time">
                      <FiCalendar size={12} />
                      {selectedStudent.upcomingInterview.date}
                    </span>
                  </div>
                </div>
              )}

              {/* Applied Companies List */}
              <div className="sp-profile-section">
                <span className="sp-profile-label">
                  Applied Companies (
                  {selectedStudent.appliedCompanies.length})
                </span>
                <div className="sp-applied-list">
                  {selectedStudent.appliedCompanies.map((comp) => (
                    <div className="sp-applied-item" key={comp.name}>
                      <div className="sp-applied-info">
                        <h4>{comp.name}</h4>
                        <p>{comp.role}</p>
                      </div>
                      <span
                        className={`sp-applied-tag ${comp.statusType}`}
                      >
                        {comp.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
