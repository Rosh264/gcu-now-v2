import { useState } from "react";
import { FiChevronRight, FiChevronDown, FiDownload } from "react-icons/fi";
import "../../styles/settings.css";

/* ── Menu Items ── */
const settingsTabs = [
  "General",
  "User Management",
  "Departments",
  "Email Configuration",
  "Notification Settings",
  "Placement Policies",
  "Integrations",
  "Security",
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<string>("General");

  // State for interactive toggles
  const [strictReg, setStrictReg] = useState<boolean>(true);
  const [autoVerify, setAutoVerify] = useState<boolean>(false);
  const [multipleOffer, setMultipleOffer] = useState<boolean>(true);
  const [twoFactor, setTwoFactor] = useState<boolean>(true);

  // State for inputs
  const [univName, setUnivName] = useState<string>("Global City University");
  const [cellName, setCellName] = useState<string>("GCU Career Services");
  const [academicYear, setAcademicYear] = useState<string>("2024 - 2025");
  const [timeZone, setTimeZone] = useState<string>("EST (Eastern Standard Time)");
  const [idleTimeout, setIdleTimeout] = useState<string>("30 Minutes");

  return (
    <div className="settings-page-container">
      {/* ─── Header ─── */}
      <div className="st-header">
        <div>
          <h1>Settings &amp; Configuration</h1>
          <p>Manage institutional preferences, users, and system rules.</p>
        </div>
        <div className="st-header-actions">
          <button className="st-btn-outline">Restore Defaults</button>
          <button
            className="st-btn-primary"
            style={{ background: "#78350f", borderColor: "#78350f" }}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* ─── Main Grid (25% / 75%) ─── */}
      <div className="st-grid">
        {/* ── Left Sidebar Menu ── */}
        <div className="st-menu-list">
          {settingsTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                className={`st-menu-item ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                <span>{tab}</span>
                {isActive && <FiChevronRight size={14} />}
              </button>
            );
          })}
        </div>

        {/* ── Right Content Area ── */}
        <div className="st-cards-stack">
          {/* Card 1: General Information */}
          <div className="st-card">
            <div className="st-card-top">
              <div>
                <h3 className="st-card-title">General Information</h3>
                <p className="st-card-subtitle">
                  Basic institutional details used across the CRM.
                </p>
              </div>
            </div>

            <div className="st-form-grid-2">
              <div className="st-form-group">
                <label className="st-label">University Name</label>
                <input
                  type="text"
                  className="st-input"
                  value={univName}
                  onChange={(e) => setUnivName(e.target.value)}
                />
              </div>

              <div className="st-form-group">
                <label className="st-label">Placement Cell Name</label>
                <input
                  type="text"
                  className="st-input"
                  value={cellName}
                  onChange={(e) => setCellName(e.target.value)}
                />
              </div>

              <div className="st-form-group">
                <label className="st-label">Current Academic Year</label>
                <div className="st-select-wrap">
                  <select
                    className="st-select"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  >
                    <option value="2024 - 2025">2024 - 2025</option>
                    <option value="2025 - 2026">2025 - 2026</option>
                    <option value="2023 - 2024">2023 - 2024</option>
                  </select>
                  <FiChevronDown size={13} className="st-select-arrow" />
                </div>
              </div>

              <div className="st-form-group">
                <label className="st-label">System Time Zone</label>
                <div className="st-select-wrap">
                  <select
                    className="st-select"
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                  >
                    <option value="EST (Eastern Standard Time)">
                      EST (Eastern Standard Time)
                    </option>
                    <option value="IST (Indian Standard Time)">
                      IST (Indian Standard Time)
                    </option>
                    <option value="PST (Pacific Standard Time)">
                      PST (Pacific Standard Time)
                    </option>
                    <option value="UTC (Coordinated Universal Time)">
                      UTC (Coordinated Universal Time)
                    </option>
                  </select>
                  <FiChevronDown size={13} className="st-select-arrow" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Placement Policies */}
          <div className="st-card">
            <div className="st-card-top">
              <div>
                <h3 className="st-card-title">Placement Policies</h3>
                <p className="st-card-subtitle">
                  Configure rules for student participation and offers.
                </p>
              </div>
            </div>

            <div className="st-policies-grid">
              {/* Box 1 */}
              <div className="st-policy-box">
                <div className="st-policy-text">
                  <h4>Strict Registration Rules</h4>
                  <p>Lock profiles after the initial registration deadline.</p>
                </div>
                <button
                  type="button"
                  className={`st-toggle-switch ${strictReg ? "on" : ""}`}
                  onClick={() => setStrictReg(!strictReg)}
                  aria-label="Toggle strict registration rules"
                >
                  <div className="st-toggle-thumb">
                    {strictReg && <span className="st-toggle-check">✓</span>}
                  </div>
                </button>
              </div>

              {/* Box 2 */}
              <div className="st-policy-box">
                <div className="st-policy-text">
                  <h4>Auto-verify Resumes</h4>
                  <p>Automatically approve standardized resume formats.</p>
                </div>
                <button
                  type="button"
                  className={`st-toggle-switch ${autoVerify ? "on" : ""}`}
                  onClick={() => setAutoVerify(!autoVerify)}
                  aria-label="Toggle auto-verify resumes"
                >
                  <div className="st-toggle-thumb">
                    {autoVerify && <span className="st-toggle-check">✓</span>}
                  </div>
                </button>
              </div>

              {/* Box 3: Full Width */}
              <div className="st-policy-box full-width">
                <div className="st-policy-text">
                  <h4>Multiple Offer Policy (Dream Status)</h4>
                  <p>
                    Allow students with one offer to apply for designated 'Dream'
                    companies.
                  </p>
                </div>
                <button
                  type="button"
                  className={`st-toggle-switch ${multipleOffer ? "on" : ""}`}
                  onClick={() => setMultipleOffer(!multipleOffer)}
                  aria-label="Toggle multiple offer policy"
                >
                  <div className="st-toggle-thumb">
                    {multipleOffer && <span className="st-toggle-check">✓</span>}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Security & Access */}
          <div className="st-card">
            <div className="st-card-top">
              <div>
                <h3 className="st-card-title">Security &amp; Access</h3>
                <p className="st-card-subtitle">
                  Manage authentication protocols and system logs.
                </p>
              </div>
              <button className="st-btn-outline-sm">
                <FiDownload size={13} />
                <span>Audit Log</span>
              </button>
            </div>

            <div className="st-security-list">
              <div className="st-security-row">
                <div className="st-security-info">
                  <h4>Require Two-Factor Authentication (2FA)</h4>
                  <p>Mandatory for all admin and staff roles.</p>
                </div>
                <button
                  type="button"
                  className={`st-toggle-switch ${twoFactor ? "on" : ""}`}
                  onClick={() => setTwoFactor(!twoFactor)}
                  aria-label="Toggle two factor authentication"
                >
                  <div className="st-toggle-thumb">
                    {twoFactor && <span className="st-toggle-check">✓</span>}
                  </div>
                </button>
              </div>

              <div className="st-security-row">
                <div className="st-security-info">
                  <h4>Idle Session Timeout</h4>
                  <p>Automatically log out users after inactivity.</p>
                </div>
                <div className="st-select-wrap st-timeout-select">
                  <select
                    className="st-select"
                    value={idleTimeout}
                    onChange={(e) => setIdleTimeout(e.target.value)}
                  >
                    <option value="15 Minutes">15 Minutes</option>
                    <option value="30 Minutes">30 Minutes</option>
                    <option value="1 Hour">1 Hour</option>
                    <option value="2 Hours">2 Hours</option>
                    <option value="Never">Never</option>
                  </select>
                  <FiChevronDown size={13} className="st-select-arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
