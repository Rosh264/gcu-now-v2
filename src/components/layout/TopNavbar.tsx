import { FiBell, FiSearch } from "react-icons/fi";

export default function TopNavbar() {
  return (
    <header className="top-navbar">
      <div className="search-box">
        <FiSearch size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search across GCU NOW..."
        />
      </div>

      <div className="top-right">
        <button className="icon-btn notification-btn">
          <FiBell size={20} />
          <span className="notification-dot"></span>
        </button>

        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
          alt="profile"
          className="profile-avatar"
        />
      </div>
    </header>
  );
}