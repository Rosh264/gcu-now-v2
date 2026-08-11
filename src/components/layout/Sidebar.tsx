import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiBriefcase,
  FiUsers,
  FiMail,
  FiCalendar,
  FiClock,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiGrid /> },
    { name: "Companies", path: "/admin/companies", icon: <FiBriefcase /> },
    { name: "CRM", path: "/admin/crm", icon: <FiUsers /> },
    { name: "Cold Emails", path: "/admin/cold-emails", icon: <FiMail /> },
    { name: "Placement Drives", path: "/admin/drives", icon: <FiCalendar /> },
    { name: "Students", path: "/admin/students", icon: <FiUsers /> },
    { name: "Interview Queue", path: "/admin/interviews", icon: <FiClock /> },
    { name: "History", path: "/admin/history", icon: <FiClock /> },
    { name: "Reports", path: "/admin/reports", icon: <FiBarChart2 /> },
    { name: "Settings", path: "/admin/settings", icon: <FiSettings /> },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>GCU NOW</h2>
        <span>SaaS CRM</span>
      </div>

      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;