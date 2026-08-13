import { Outlet, NavLink } from "react-router-dom";
import {
  FiGrid,
  FiCalendar,
  FiCheckSquare,
  FiVideo,
  FiClock,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";
import "../../styles/student-portal.css";

export default function StudentLayout() {
  const navItems = [
    { name: "Dashboard", path: "/student/dashboard", icon: <FiGrid size={16} /> },
    { name: "Available Drives", path: "/student/drives", icon: <FiCalendar size={16} /> },
    { name: "My Applications", path: "/student/applications", icon: <FiCheckSquare size={16} /> },
    { name: "Mock Interviews", path: "/student/mock-interviews", icon: <FiVideo size={16} /> },
    { name: "Interview Queue", path: "/student/interviews", icon: <FiClock size={16} /> },
    { name: "Results", path: "/student/results", icon: <FiBarChart2 size={16} /> },
    { name: "Settings", path: "/student/settings", icon: <FiSettings size={16} /> },
  ];

  return (
    <div className="student-layout-wrapper">
      {/* ─── Left Sidebar ─── */}
      <aside className="student-sidebar">
        <div className="student-sidebar-top">
          <div className="student-logo">
            <h2>GCU NOW</h2>
            <span>Student Portal</span>
          </div>

          <nav className="student-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `student-nav-item ${isActive ? "active" : ""}`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* ─── Bottom Profile Section ─── */}
        <div className="student-sidebar-bottom">
          <div className="student-profile-badge">
            <div className="student-profile-avatar">RS</div>
            <div className="student-profile-info">
              <span className="student-profile-name">Roshan Sharma</span>
              <span className="student-profile-email">23btre136@gcu.edu.in</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main Content Area (No Top Header) ─── */}
      <main className="student-main-content">
        <Outlet />
      </main>
    </div>
  );
}