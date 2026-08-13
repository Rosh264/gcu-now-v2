import { useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiCreditCard,
  FiMapPin,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import "../../styles/student-portal.css";

interface Drive {
  id: number;
  company: string;
  role: string;
  package: string;
  location: string;
  type: string;
  eligibility: string;
  deadline: string;
  avatarText: string;
  avatarClass: "gray" | "orange";
}

const mockDrives: Drive[] = [
  {
    id: 1,
    company: "Microsoft",
    role: "Software Development Engineer",
    package: "12 LPA",
    location: "Bangalore",
    type: "Full-Time",
    eligibility: "CSE / ISE / ECE",
    deadline: "Oct 24, 2026",
    avatarText: "M",
    avatarClass: "gray",
  },
  {
    id: 2,
    company: "Amazon",
    role: "Cloud Engineer",
    package: "15 LPA",
    location: "Bangalore",
    type: "Full-Time",
    eligibility: "CSE / ISE",
    deadline: "Oct 28, 2026",
    avatarText: "A",
    avatarClass: "orange",
  },
  {
    id: 3,
    company: "Infosys",
    role: "Systems Engineer",
    package: "4.5 LPA",
    location: "Multiple",
    type: "Full-Time",
    eligibility: "All Branches",
    deadline: "Nov 02, 2026",
    avatarText: "I",
    avatarClass: "gray",
  },
  {
    id: 4,
    company: "Wipro",
    role: "Project Engineer",
    package: "5 LPA",
    location: "Chennai",
    type: "Full-Time",
    eligibility: "CSE / ISE / ECE / EEE",
    deadline: "Nov 05, 2026",
    avatarText: "W",
    avatarClass: "orange",
  },
  {
    id: 5,
    company: "Deloitte",
    role: "Analyst",
    package: "7 LPA",
    location: "Hyderabad",
    type: "Full-Time",
    eligibility: "CSE / ISE",
    deadline: "Nov 10, 2026",
    avatarText: "D",
    avatarClass: "gray",
  },
  {
    id: 6,
    company: "Accenture",
    role: "Associate Software Engineer",
    package: "6.5 LPA",
    location: "Pune",
    type: "Full-Time",
    eligibility: "CSE / ISE / ECE",
    deadline: "Nov 12, 2026",
    avatarText: "Ac",
    avatarClass: "orange",
  },
  {
    id: 7,
    company: "TCS",
    role: "Ninja Profile",
    package: "3.36 LPA",
    location: "Multiple",
    type: "Full-Time",
    eligibility: "All Branches",
    deadline: "Nov 15, 2026",
    avatarText: "T",
    avatarClass: "gray",
  },
  {
    id: 8,
    company: "HCL Tech",
    role: "Graduate Trainee",
    package: "4.2 LPA",
    location: "Noida",
    type: "Internship + PPO",
    eligibility: "CSE / ISE",
    deadline: "Nov 20, 2026",
    avatarText: "H",
    avatarClass: "orange",
  },
];

export default function AvailableDrives() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedPackage, setSelectedPackage] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedIds, setAppliedIds] = useState<number[]>([]);

  const handleApply = (id: number) => {
    if (!appliedIds.includes(id)) {
      setAppliedIds([...appliedIds, id]);
    }
  };

  const handleClearAll = () => {
    setSearchTerm("");
    setSelectedDept("All");
    setSelectedType("All");
    setSelectedPackage("All");
    setSelectedLocation("All");
  };

  const filteredDrives = mockDrives.filter((drive) => {
    const matchesSearch =
      drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "All" || drive.type.includes(selectedType);
    const matchesLocation =
      selectedLocation === "All" ||
      drive.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="drv-page-container">
      {/* ─── Header & Subtitle ─── */}
      <div className="drv-header">
        <h1>Available Placement Drives</h1>
        <p>Explore placement opportunities available for you.</p>
      </div>

      {/* ─── Compact Minimal KPI Row (3 Cards) ─── */}
      <div className="drv-kpi-row">
        <div className="drv-stat-card">
          <span className="drv-stat-label">ELIGIBLE DRIVES</span>
          <span className="drv-stat-value">12</span>
        </div>

        <div className="drv-stat-card">
          <span className="drv-stat-label">APPLICATIONS OPEN</span>
          <span className="drv-stat-value">8</span>
        </div>

        <div className="drv-stat-card">
          <span className="drv-stat-label">CLOSING SOON</span>
          <span className="drv-stat-value">3</span>
        </div>
      </div>

      {/* ─── Filter Bar ─── */}
      <div className="drv-filter-bar">
        {/* Search Input */}
        <div className="drv-search-wrap">
          <FiSearch size={15} className="drv-search-icon" />
          <input
            type="text"
            placeholder="Search companies or roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="drv-search-input"
          />
        </div>

        {/* Dropdowns & Clear Link */}
        <div className="drv-dropdowns-row">
          {/* Department */}
          <div className="drv-select-wrap">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="drv-select"
            >
              <option value="All">Department</option>
              <option value="CSE">CSE</option>
              <option value="ISE">ISE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
            </select>
            <FiChevronDown size={12} className="drv-select-arrow" />
          </div>

          {/* Package */}
          <div className="drv-select-wrap">
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="drv-select"
            >
              <option value="All">Package</option>
              <option value="3-6">3 - 6 LPA</option>
              <option value="6-10">6 - 10 LPA</option>
              <option value="10+">10+ LPA</option>
            </select>
            <FiChevronDown size={12} className="drv-select-arrow" />
          </div>

          {/* Type */}
          <div className="drv-select-wrap">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="drv-select"
            >
              <option value="All">Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Internship">Internship</option>
            </select>
            <FiChevronDown size={12} className="drv-select-arrow" />
          </div>

          {/* Location */}
          <div className="drv-select-wrap">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="drv-select"
            >
              <option value="All">Location</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Noida">Noida</option>
            </select>
            <FiChevronDown size={12} className="drv-select-arrow" />
          </div>

          {/* Clear All Link */}
          <button onClick={handleClearAll} className="drv-clear-link">
            Clear All
          </button>
        </div>
      </div>

      {/* ─── Drive Cards (List) ─── */}
      <div className="drv-cards-list">
        {filteredDrives.map((drive) => {
          const isApplied = appliedIds.includes(drive.id);

          return (
            <div key={drive.id} className="drv-card">
              {/* Left Side: Avatar + Details */}
              <div className="drv-card-left">
                <div className={`drv-avatar ${drive.avatarClass}`}>
                  {drive.avatarText}
                </div>

                <div className="drv-details">
                  <div className="drv-title-row">
                    <span className="drv-company-name">{drive.company}</span>
                    <span className="drv-separator">|</span>
                    <span className="drv-role-name">{drive.role}</span>
                  </div>

                  {/* Meta Tags */}
                  <div className="drv-meta-row">
                    <span className="drv-meta-item">
                      <FiCreditCard size={13} style={{ color: "#9ca3af" }} />
                      <span>{drive.package}</span>
                    </span>
                    <span className="drv-meta-item">
                      <FiMapPin size={13} style={{ color: "#9ca3af" }} />
                      <span>{drive.location}</span>
                    </span>
                    <span className="drv-meta-item">
                      <FiBriefcase size={13} style={{ color: "#9ca3af" }} />
                      <span>{drive.type}</span>
                    </span>
                  </div>

                  {/* Eligibility Line */}
                  <p className="drv-eligibility">
                    Eligible: <strong>{drive.eligibility}</strong>
                  </p>
                </div>
              </div>

              {/* Right Side: Eligible Badge, Deadline & Action Buttons */}
              <div className="drv-card-right">
                <div className="drv-badge-row">
                  <span className="drv-eligible-badge">Eligible</span>
                  <span className="drv-deadline">Deadline: {drive.deadline}</span>
                </div>

                {/* BOTH Action Buttons: View Details + Apply Now */}
                <div className="drv-actions-row">
                  <button className="drv-btn-details">View Details</button>

                  <button
                    onClick={() => handleApply(drive.id)}
                    disabled={isApplied}
                    className={`drv-btn-apply ${isApplied ? "applied" : ""}`}
                  >
                    {isApplied ? "Applied ✓" : "Apply Now"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Pagination Footer ─── */}
      <div className="drv-pagination-footer">
        <span>
          Showing 1–{filteredDrives.length} of {mockDrives.length} eligible drives
        </span>

        <div className="drv-pagination-controls">
          <button
            onClick={() => setCurrentPage(1)}
            className="drv-page-btn"
            title="Previous page"
          >
            <FiChevronLeft size={13} />
          </button>
          <button
            onClick={() => setCurrentPage(1)}
            className={`drv-page-btn ${currentPage === 1 ? "active" : ""}`}
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className={`drv-page-btn ${currentPage === 2 ? "active" : ""}`}
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className="drv-page-btn"
            title="Next page"
          >
            <FiChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
