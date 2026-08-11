import { FiBriefcase, FiHeart, FiClock } from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi";

export default function CompanyStats() {
  return (
    <div className="stats-grid company-stats">

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">TOTAL COMPANIES</span>
          <div className="stat-icon-wrapper">
            <FiBriefcase size={18} />
          </div>
        </div>
        <div className="stat-card-body">
          <h2 className="stat-value">1,248</h2>
          <span className="stat-badge orange-badge">+12 this week</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">INTERESTED</span>
          <div className="stat-icon-wrapper">
            <FiHeart size={18} />
          </div>
        </div>
        <div className="stat-card-body">
          <h2 className="stat-value">342</h2>
          <span className="stat-subtext">27% conversion</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">ACTIVE DRIVES</span>
          <div className="stat-icon-wrapper">
            <HiOutlineSpeakerphone size={18} />
          </div>
        </div>
        <div className="stat-card-body flex-bottom">
          <h2 className="stat-value">18</h2>
          <a href="#drives" className="stat-link">View details &rarr;</a>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">FOLLOW-UPS DUE</span>
          <div className="stat-icon-wrapper red-icon">
            <FiClock size={18} />
          </div>
        </div>
        <div className="stat-card-body">
          <h2 className="stat-value">45</h2>
          <span className="stat-alert-text">Requires attention</span>
        </div>
      </div>

    </div>
  );
}
