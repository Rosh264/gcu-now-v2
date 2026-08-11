import {
  FiCalendar,
  FiFileText,
  FiGrid,
  FiChevronDown,
  FiBriefcase,
  FiVolume2,
  FiAward,
  FiTrendingUp,
  FiPlusCircle,
  FiShare2,
} from "react-icons/fi";
import "../../styles/reports.css";

/* ── Local Mock Data ── */

const kpiData = [
  {
    label: "COMPANIES VISITED",
    value: "156",
    subtext: "+12% vs last year",
    isTrend: true,
    icon: <FiBriefcase size={12} />,
    iconWrapClass: "",
    isFeatured: false,
  },
  {
    label: "PLACEMENT DRIVES",
    value: "42",
    subtext: "+5 this month",
    isTrend: true,
    icon: <FiVolume2 size={12} />,
    iconWrapClass: "",
    isFeatured: false,
  },
  {
    label: "STUDENTS PLACED",
    value: "892",
    subtext: "+18% vs last year",
    isTrend: true,
    icon: <FiAward size={12} />,
    iconWrapClass: "green-tint",
    isFeatured: false,
  },
  {
    label: "OVERALL PLACEMENT",
    value: "78%",
    subtext: "Target: 85% by year end",
    isTrend: false,
    icon: "%",
    iconWrapClass: "dark-tint",
    isFeatured: true,
  },
];

const monthlyTrendData = [
  { month: "Jan", barClass: "jan" },
  { month: "Feb", barClass: "feb" },
  { month: "Mar", barClass: "mar" },
  { month: "Apr", barClass: "apr" },
  { month: "May", barClass: "may" },
  { month: "Jun", barClass: "jun" },
];

const hiringDistribution = [
  { category: "IT/Tech", percentage: "55%", dotClass: "tech" },
  { category: "Finance", percentage: "25%", dotClass: "finance" },
  { category: "Consulting", percentage: "20%", dotClass: "consulting" },
];

const performanceData = [
  {
    company: "TechNova Inc.",
    applicants: 450,
    selected: 42,
    rate: "9.3%",
    rateClass: "green",
    avgPkg: "12 LPA",
  },
  {
    company: "Global Finance Solutions",
    applicants: 320,
    selected: 28,
    rate: "8.7%",
    rateClass: "green",
    avgPkg: "9.5 LPA",
  },
  {
    company: "Apex Consulting",
    applicants: 280,
    selected: 15,
    rate: "5.3%",
    rateClass: "amber",
    avgPkg: "15 LPA",
  },
  {
    company: "DataCore Systems",
    applicants: 510,
    selected: 65,
    rate: "12.7%",
    rateClass: "green",
    avgPkg: "8 LPA",
  },
];

const departmentAnalytics = [
  {
    dept: "Computer Science",
    placedStat: "85% Placed (340/400)",
    percentage: 85,
    fillClass: "dark-brown",
  },
  {
    dept: "Electronics & Comm.",
    placedStat: "72% Placed (216/300)",
    percentage: 72,
    fillClass: "orange",
  },
  {
    dept: "Mechanical Eng.",
    placedStat: "65% Placed (130/200)",
    percentage: 65,
    fillClass: "dark-brown",
  },
  {
    dept: "Civil Eng.",
    placedStat: "58% Placed (87/150)",
    percentage: 58,
    fillClass: "orange",
  },
];

const recentReports = [
  {
    id: 1,
    title: "Q3 Placement Summary.pdf",
    time: "Generated yesterday, 2:45 PM",
    type: "pdf" as const,
  },
  {
    id: 2,
    title: "Dept_Wise_Analytics_2023.xlsx",
    time: "Generated Oct 12, 10:15 AM",
    type: "excel" as const,
  },
];

/* ── Component ── */

export default function Reports() {
  return (
    <div className="reports-page-container">
      {/* ─── Header ─── */}
      <div className="rp-header">
        <div>
          <h1>Reports &amp; Analytics</h1>
          <p>Comprehensive insights into placement performance.</p>
        </div>
        <div className="rp-header-actions">
          <button className="rp-dropdown-btn">
            <FiCalendar size={14} />
            <span>Last 30 Days</span>
            <FiChevronDown size={13} />
          </button>
          <button className="rp-btn-outline">
            <FiFileText size={14} />
            <span>Export PDF</span>
          </button>
          <button className="rp-btn-outline">
            <FiGrid size={14} />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* ─── KPI Row (Compressed) ─── */}
      <div className="rp-kpi-row">
        {kpiData.map((kpi) => (
          <div
            className={`rp-stat-card ${kpi.isFeatured ? "featured" : ""}`}
            key={kpi.label}
          >
            <div className="rp-stat-top">
              <span className="rp-stat-label">{kpi.label}</span>
              <div className={`rp-stat-icon-wrap ${kpi.iconWrapClass}`}>
                {kpi.icon}
              </div>
            </div>
            <div className="rp-stat-value">{kpi.value}</div>
            <div className="rp-stat-bottom">
              {kpi.isTrend ? (
                <span className="rp-trend-green">
                  <FiTrendingUp size={11} />
                  {kpi.subtext}
                </span>
              ) : (
                <span className="rp-stat-target">{kpi.subtext}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ─── Charts Row (65% / 35%) ─── */}
      <div className="rp-grid-65-35">
        {/* Left: Monthly Placement Trend */}
        <div className="rp-card">
          <div className="rp-card-header">
            <h3>Monthly Placement Trend</h3>
          </div>
          <div className="rp-chart-canvas">
            {monthlyTrendData.map((item) => (
              <div className="rp-bar-col" key={item.month}>
                <span className="rp-bar-col-top">{item.month}</span>
                <div className={`rp-bar ${item.barClass}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hiring Distribution (Pure CSS Conic Gradient Doughnut) */}
        <div className="rp-card">
          <div className="rp-card-header">
            <h3>Hiring Distribution</h3>
          </div>
          <div className="rp-doughnut-container">
            <div className="rp-doughnut">
              <div className="rp-doughnut-hole">
                <span className="rp-doughnut-total">156</span>
                <span className="rp-doughnut-sub">Total</span>
              </div>
            </div>

            <div className="rp-legend-list">
              {hiringDistribution.map((leg) => (
                <div className="rp-legend-item" key={leg.category}>
                  <div className="rp-legend-left">
                    <span className={`rp-legend-dot ${leg.dotClass}`} />
                    <span>{leg.category}</span>
                  </div>
                  <span className="rp-legend-pct">{leg.percentage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Data Row (60% / 40%) ─── */}
      <div className="rp-grid-60-40">
        {/* Left: Placement Performance Table */}
        <div className="rp-card">
          <div className="rp-card-header">
            <h3>Placement Performance</h3>
            <span className="rp-view-all-link">View All</span>
          </div>
          <table className="rp-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Applicants</th>
                <th>Selected</th>
                <th>Rate</th>
                <th>Avg Pkg</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((row) => (
                <tr key={row.company}>
                  <td style={{ fontWeight: 600 }}>{row.company}</td>
                  <td>{row.applicants}</td>
                  <td>{row.selected}</td>
                  <td>
                    <span className={`rp-rate-badge ${row.rateClass}`}>
                      {row.rate}
                    </span>
                  </td>
                  <td>{row.avgPkg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Department Analytics */}
        <div className="rp-card">
          <div className="rp-card-header">
            <h3>Department Analytics</h3>
          </div>
          <div className="rp-dept-list">
            {departmentAnalytics.map((dept) => (
              <div className="rp-dept-item" key={dept.dept}>
                <div className="rp-dept-info">
                  <span className="rp-dept-name">{dept.dept}</span>
                  <span className="rp-dept-stat">{dept.placedStat}</span>
                </div>
                <div className="rp-dept-track">
                  <div
                    className={`rp-dept-fill ${dept.fillClass}`}
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom Row (60% / 40%) ─── */}
      <div className="rp-grid-60-40">
        {/* Left: Recent Reports Generated */}
        <div className="rp-card">
          <div className="rp-card-header">
            <h3>Recent Reports Generated</h3>
          </div>
          <div className="rp-reports-list">
            {recentReports.map((report) => (
              <div className="rp-report-item" key={report.id}>
                <div className={`rp-report-icon-box ${report.type}`}>
                  {report.type === "pdf" ? (
                    <FiFileText size={15} />
                  ) : (
                    <FiGrid size={15} />
                  )}
                </div>
                <div className="rp-report-info">
                  <h4>{report.title}</h4>
                  <p>{report.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="rp-card">
          <div className="rp-card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="rp-quick-actions-body">
            <button className="rp-btn-action-primary">
              <FiPlusCircle size={14} />
              <span>Generate Monthly Report</span>
            </button>
            <button className="rp-btn-action-outline">
              <FiShare2 size={14} />
              <span>Share Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
