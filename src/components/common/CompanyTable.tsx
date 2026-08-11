import { FiSearch, FiChevronDown, FiSliders } from "react-icons/fi";
import { companies } from "../../data/companyData";

export default function CompanyTable() {
  return (
    <div className="company-card">
      {/* Toolbar */}
      <div className="company-toolbar">
        <div className="table-search-wrapper">
          <FiSearch className="table-search-icon" size={14} />
          <input
            type="text"
            placeholder="Search companies..."
          />
        </div>

        <div className="toolbar-buttons">
          <button className="filter-dropdown-btn">
            <span>Status</span>
            <FiChevronDown size={14} />
          </button>

          <button className="filter-dropdown-btn">
            <span>Industry</span>
            <FiChevronDown size={14} />
          </button>

          <button className="filter-icon-btn">
            <FiSliders size={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="custom-company-table">
          <thead>
            <tr>
              <th style={{ width: "220px" }}>COMPANY NAME</th>
              <th>INDUSTRY</th>
              <th>TYPE</th>
              <th>CURRENT STATUS</th>
              <th>LAST CONTACT</th>
              <th>NEXT FOLLOW-UP</th>
              <th style={{ textAlign: "center" }}>ACTIVE DRIVES</th>
              <th style={{ textAlign: "center" }}>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((comp) => (
              <tr key={comp.id}>
                <td>
                  <div className="company-name-cell">
                    <div
                      className="company-logo-avatar"
                      style={{
                        backgroundColor: comp.logoBg || "#F3F4F6",
                        color: comp.logoColor || "#1F2937",
                      }}
                    >
                      {comp.logoText || comp.company.charAt(0)}
                    </div>
                    <span className="company-title">{comp.company}</span>
                  </div>
                </td>

                <td className="text-secondary">{comp.industry}</td>

                <td className="text-secondary">{comp.type}</td>

                <td>
                  <span className={`status-badge ${comp.statusClass}`}>
                    {comp.status}
                  </span>
                </td>

                <td className="text-secondary">{comp.lastContact}</td>

                <td className="followup-cell">
                  {comp.nextFollowup !== "-" ? (
                    <strong>{comp.nextFollowup}</strong>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>

                <td style={{ textAlign: "center" }}>
                  <span className={comp.activeDrives > 0 ? "orange-drive-count" : "text-muted"}>
                    {comp.activeDrives}
                  </span>
                </td>

                <td style={{ textAlign: "center" }}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}