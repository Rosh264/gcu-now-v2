import { useState } from "react";
import {
  FiSearch,
  FiBell,
  FiHelpCircle,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiDownload,
  FiEye,
  FiCheck,
  FiFileText,
  FiX,
  FiMapPin,
  FiCalendar,
  FiAward,
} from "react-icons/fi";

/* ─── Interfaces ─── */
interface TimelineStep {
  label: string;
  status: "completed" | "in_progress" | "pending" | "rejected";
  date?: string;
}

interface ResultItem {
  id: string;
  company: string;
  role: string;
  packageLPA: string;
  resultDate: string;
  status: "SELECTED" | "WAITING" | "REJECTED";
  applicationId: string;
  location: string;
  driveDate: string;
  timeline: TimelineStep[];
  offerDetails?: {
    designation: string;
    ctc: string;
    baseSalary: string;
    joiningDate: string;
    location: string;
    validTill: string;
  };
}

/* ─── Mock Placement Results Data ─── */
const mockResultsData: ResultItem[] = [
  {
    id: "res-1",
    company: "Microsoft",
    role: "Software Development Engineer",
    packageLPA: "12 LPA",
    resultDate: "Aug 10, 2026",
    status: "SELECTED",
    applicationId: "APP-2026-00124",
    location: "Hyderabad / Bengaluru",
    driveDate: "Jul 28, 2026",
    timeline: [
      { label: "Application Submitted", status: "completed", date: "Jul 28" },
      { label: "Resume Shortlisted", status: "completed", date: "Jul 30" },
      { label: "Online Assessment", status: "completed", date: "Aug 02" },
      { label: "Technical Interview", status: "completed", date: "Aug 06" },
      { label: "HR Interview", status: "completed", date: "Aug 08" },
      { label: "Final Result: Selected", status: "completed", date: "Aug 10" },
    ],
    offerDetails: {
      designation: "Software Development Engineer - I",
      ctc: "12,00,000 INR Per Annum",
      baseSalary: "9,50,000 INR",
      joiningDate: "Oct 15, 2026",
      location: "Microsoft India R&D, Hyderabad",
      validTill: "Aug 25, 2026",
    },
  },
  {
    id: "res-2",
    company: "Amazon",
    role: "Cloud Engineer",
    packageLPA: "15 LPA",
    resultDate: "Awaiting",
    status: "WAITING",
    applicationId: "APP-2026-00189",
    location: "Bengaluru",
    driveDate: "Aug 02, 2026",
    timeline: [
      { label: "Application Submitted", status: "completed", date: "Aug 02" },
      { label: "Resume Shortlisted", status: "completed", date: "Aug 04" },
      { label: "Online Assessment", status: "completed", date: "Aug 07" },
      { label: "Technical Interview", status: "completed", date: "Aug 11" },
      { label: "HR Interview", status: "completed", date: "Aug 12" },
      { label: "Final Result: Decision in Progress", status: "in_progress", date: "Pending" },
    ],
  },
  {
    id: "res-3",
    company: "Infosys",
    role: "Systems Engineer",
    packageLPA: "6.5 LPA",
    resultDate: "Aug 5, 2026",
    status: "REJECTED",
    applicationId: "APP-2026-00078",
    location: "Pune / Mysore",
    driveDate: "Jul 20, 2026",
    timeline: [
      { label: "Application Submitted", status: "completed", date: "Jul 20" },
      { label: "Resume Shortlisted", status: "completed", date: "Jul 22" },
      { label: "Online Assessment", status: "completed", date: "Jul 26" },
      { label: "Technical Interview", status: "completed", date: "Jul 31" },
      { label: "Final Result: Not Shortlisted", status: "rejected", date: "Aug 05" },
    ],
  },
  {
    id: "res-4",
    company: "Google",
    role: "Associate Cloud Specialist",
    packageLPA: "18 LPA",
    resultDate: "Aug 12, 2026",
    status: "SELECTED",
    applicationId: "APP-2026-00342",
    location: "Bengaluru",
    driveDate: "Jul 15, 2026",
    timeline: [
      { label: "Application Submitted", status: "completed", date: "Jul 15" },
      { label: "Resume Shortlisted", status: "completed", date: "Jul 18" },
      { label: "Coding Assessment", status: "completed", date: "Jul 24" },
      { label: "Technical Rounds (x2)", status: "completed", date: "Aug 03" },
      { label: "Leadership & Fit Round", status: "completed", date: "Aug 09" },
      { label: "Final Result: Selected", status: "completed", date: "Aug 12" },
    ],
    offerDetails: {
      designation: "Associate Cloud Solutions Specialist",
      ctc: "18,00,000 INR Per Annum",
      baseSalary: "14,00,000 INR",
      joiningDate: "Nov 01, 2026",
      location: "Google India, Bengaluru Campus",
      validTill: "Aug 30, 2026",
    },
  },
];

export default function StudentPlacementResults() {
  const [selectedResultId, setSelectedResultId] = useState<string>("res-1");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");

  // Offer Modals
  const [isViewOfferModalOpen, setIsViewOfferModalOpen] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState<Record<string, boolean>>({});
  const [showAcceptSuccessModal, setShowAcceptSuccessModal] = useState(false);

  // Filter & Sort logic
  const filteredResults = mockResultsData
    .filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ||
        item.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "Company A-Z") {
        return a.company.localeCompare(b.company);
      }
      if (sortBy === "Package: High to Low") {
        const pkgA = parseFloat(a.packageLPA.replace(/[^0-9.]/g, "")) || 0;
        const pkgB = parseFloat(b.packageLPA.replace(/[^0-9.]/g, "")) || 0;
        return pkgB - pkgA;
      }
      // Default: Latest
      return 0;
    });

  const activeResult =
    mockResultsData.find((r) => r.id === selectedResultId) || mockResultsData[0];

  const handleDownloadOffer = () => {
    alert(`Downloading Official Offer Letter for ${activeResult.company} (${activeResult.packageLPA})...`);
  };

  const handleAcceptOffer = () => {
    setOfferAccepted((prev) => ({ ...prev, [activeResult.id]: true }));
    setShowAcceptSuccessModal(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "1240px",
        margin: "0 auto",
        paddingBottom: "56px",
      }}
    >
      {/* ═══════ Header Row ═══════ */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#381c0f",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Placement Results
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "6px", lineHeight: 1.4 }}>
            Track your placement outcomes, offers and recruitment progress.
          </p>
        </div>

        {/* Top Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#6b7280",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              transition: "all 0.15s ease",
            }}
            title="Notifications"
          >
            <FiBell size={17} />
          </button>
          <button
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#6b7280",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              transition: "all 0.15s ease",
            }}
            title="Placement Guidelines & Help"
          >
            <FiHelpCircle size={17} />
          </button>
        </div>
      </div>

      {/* ═══════ 4 KPI Cards Row ═══════ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {[
          { label: "DRIVES PARTICIPATED", value: "8" },
          { label: "SELECTED", value: "2" },
          { label: "OFFERS RECEIVED", value: "1" },
          { label: "AWAITING RESULTS", value: "3" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "92px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#6b7280",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              {kpi.label}
            </span>
            <div style={{ marginTop: "6px" }}>
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 800,
                  color: "#111827",
                  lineHeight: 1,
                  letterSpacing: "-0.5px",
                }}
              >
                {kpi.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════ Filter & Search Bar ═══════ */}
      <div
        style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          padding: "12px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        {/* Search Input on Left */}
        <div style={{ position: "relative", flex: 1, minWidth: "260px", maxWidth: "420px" }}>
          <FiSearch
            size={15}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 14px 8px 36px",
              fontSize: "13px",
              color: "#111827",
              background: "#fafafa",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Dropdowns on Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "7px 12px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#111827",
                background: "white",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="All">All</option>
              <option value="SELECTED">Selected</option>
              <option value="WAITING">Waiting</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "7px 12px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#111827",
                background: "white",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="Latest">Latest</option>
              <option value="Package: High to Low">Package: High to Low</option>
              <option value="Company A-Z">Company A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* ═══════ Main 60/40 Split Grid ═══════ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "60fr 40fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* ─── Left Side: Results List (60%) ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#381c0f", margin: "0 0 2px" }}>
            My Placement Results
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredResults.map((item) => {
              const isSelected = item.id === selectedResultId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedResultId(item.id)}
                  style={{
                    background: isSelected ? "#fffaf5" : "white",
                    border: isSelected ? "1px solid #fed7aa" : "1px solid #e5e7eb",
                    borderLeft: isSelected ? "4px solid #ea580c" : "1px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "18px 22px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: isSelected
                      ? "0 4px 12px rgba(234, 88, 12, 0.06)"
                      : "0 1px 3px rgba(0,0,0,0.02)",
                    boxSizing: "border-box",
                  }}
                  className={!isSelected ? "hover:bg-orange-50/20" : ""}
                >
                  {/* Top Row: Company Title + Status Badge */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "4px",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#111827",
                          margin: "0 0 2px",
                        }}
                      >
                        {item.company}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, fontWeight: 500 }}>
                        {item.role}
                      </p>
                    </div>

                    {/* Status Badge */}
                    {item.status === "SELECTED" && (
                      <span
                        style={{
                          background: "#ecfdf5",
                          color: "#047857",
                          border: "1px solid #a7f3d0",
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "3px 10px",
                          borderRadius: "4px",
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                        }}
                      >
                        SELECTED
                      </span>
                    )}

                    {item.status === "WAITING" && (
                      <span
                        style={{
                          background: "#fffbeb",
                          color: "#b45309",
                          border: "1px solid #fde68a",
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "3px 10px",
                          borderRadius: "4px",
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                        }}
                      >
                        WAITING
                      </span>
                    )}

                    {item.status === "REJECTED" && (
                      <span
                        style={{
                          background: "#fff1f2",
                          color: "#be123c",
                          border: "1px solid #fecdd3",
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "3px 10px",
                          borderRadius: "4px",
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                        }}
                      >
                        REJECTED
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div style={{ borderTop: "1px solid #f3f4f6", margin: "12px 0 10px" }} />

                  {/* Meta 2-column details: Package & Result Date */}
                  <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                    <div>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.4px",
                          display: "block",
                        }}
                      >
                        PACKAGE
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827", marginTop: "2px", display: "block" }}>
                        {item.packageLPA}
                      </span>
                    </div>

                    <div>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.4px",
                          display: "block",
                        }}
                      >
                        RESULT DATE
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827", marginTop: "2px", display: "block" }}>
                        {item.resultDate}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredResults.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 20px",
                  color: "#9ca3af",
                  fontSize: "14px",
                  background: "white",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                }}
              >
                No placement results match your search or filter.
              </div>
            )}
          </div>
        </div>

        {/* ─── Right Side: Result Details Panel (40%) ─── */}
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            position: "sticky",
            top: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          {/* Header with Result Details & Status Badge */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #f3f4f6",
              paddingBottom: "12px",
            }}
          >
            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", margin: 0 }}>
              Result Details
            </h3>

            {activeResult.status === "SELECTED" && (
              <span
                style={{
                  background: "#ecfdf5",
                  color: "#047857",
                  border: "1px solid #a7f3d0",
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: "4px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                SELECTED
              </span>
            )}

            {activeResult.status === "WAITING" && (
              <span
                style={{
                  background: "#fffbeb",
                  color: "#b45309",
                  border: "1px solid #fde68a",
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: "4px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                WAITING
              </span>
            )}

            {activeResult.status === "REJECTED" && (
              <span
                style={{
                  background: "#fff1f2",
                  color: "#be123c",
                  border: "1px solid #fecdd3",
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: "4px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                REJECTED
              </span>
            )}
          </div>

          {/* Company Info Box */}
          <div>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 2px",
                letterSpacing: "-0.3px",
              }}
            >
              {activeResult.company}
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 16px", fontWeight: 500 }}>
              {activeResult.role}
            </p>

            {/* 2-Column Info Grid */}
            <div
              style={{
                background: "#fafafa",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      display: "block",
                    }}
                  >
                    PACKAGE
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginTop: "2px", display: "block" }}>
                    {activeResult.packageLPA}
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      display: "block",
                    }}
                  >
                    RESULT DATE
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginTop: "2px", display: "block" }}>
                    {activeResult.resultDate}
                  </span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "10px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    display: "block",
                  }}
                >
                  APPLICATION ID
                </span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151", marginTop: "2px", display: "block" }}>
                  {activeResult.applicationId}
                </span>
              </div>
            </div>
          </div>

          {/* Recruitment Progress Vertical Timeline */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#381c0f",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                margin: "0 0 14px",
              }}
            >
              Recruitment Progress
            </h4>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {activeResult.timeline.map((step, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {step.status === "completed" ? (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#ea580c",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        flexShrink: 0,
                      }}
                    >
                      <FiCheck size={12} style={{ strokeWidth: 3 }} />
                    </div>
                  ) : step.status === "in_progress" ? (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#f59e0b",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        flexShrink: 0,
                      }}
                    >
                      <FiClock size={11} />
                    </div>
                  ) : step.status === "rejected" ? (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#e11d48",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        flexShrink: 0,
                      }}
                    >
                      <FiX size={12} style={{ strokeWidth: 3 }} />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: "2px solid #d1d5db",
                        flexShrink: 0,
                      }}
                    />
                  )}

                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight:
                        step.status === "completed"
                          ? 600
                          : step.status === "in_progress"
                          ? 700
                          : 500,
                      color:
                        step.status === "completed"
                          ? "#111827"
                          : step.status === "in_progress"
                          ? "#b45309"
                          : step.status === "rejected"
                          ? "#be123c"
                          : "#9ca3af",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Placement Offer Section (Only Rendered when SELECTED) */}
          {activeResult.status === "SELECTED" && (
            <div
              style={{
                borderTop: "1px solid #f3f4f6",
                paddingTop: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#381c0f",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    margin: "0 0 4px",
                  }}
                >
                  Placement Offer
                </h4>
                <p style={{ fontSize: "12px", color: "#6b7280", margin: 0, lineHeight: 1.4 }}>
                  {offerAccepted[activeResult.id] ? (
                    <span style={{ color: "#047857", fontWeight: 600 }}>
                      ✓ Offer accepted! Placement cell notification sent.
                    </span>
                  ) : (
                    "Congratulations! Your offer letter is ready for review."
                  )}
                </p>
              </div>

              {/* Full-width Solid Dark Brown Button: Download Offer Letter */}
              <button
                type="button"
                onClick={handleDownloadOffer}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#381c0f",
                  border: "1px solid #381c0f",
                  color: "white",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 1px 2px rgba(56, 28, 15, 0.2)",
                  transition: "all 0.15s ease",
                }}
              >
                <FiDownload size={15} />
                <span>Download Offer Letter</span>
              </button>

              {/* 2-Column Grid Below: View Offer & Accept Offer */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsViewOfferModalOpen(true)}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    background: "white",
                    border: "1px solid #d1d5db",
                    color: "#381c0f",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <FiEye size={14} />
                  <span>View Offer</span>
                </button>

                <button
                  type="button"
                  onClick={handleAcceptOffer}
                  disabled={offerAccepted[activeResult.id]}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    background: offerAccepted[activeResult.id] ? "#ecfdf5" : "white",
                    border: offerAccepted[activeResult.id]
                      ? "1px solid #a7f3d0"
                      : "1px solid #d1d5db",
                    color: offerAccepted[activeResult.id] ? "#047857" : "#381c0f",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: offerAccepted[activeResult.id] ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <FiCheck size={14} />
                  <span>{offerAccepted[activeResult.id] ? "Accepted" : "Accept Offer"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Informational Box for WAITING Status */}
          {activeResult.status === "WAITING" && (
            <div
              style={{
                borderTop: "1px solid #f3f4f6",
                paddingTop: "16px",
                background: "#fffbeb",
                border: "1px solid #fde68a",
                borderRadius: "8px",
                padding: "14px",
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#b45309", textTransform: "uppercase", letterSpacing: "0.4px", display: "block", marginBottom: "4px" }}>
                Next Steps
              </span>
              <p style={{ fontSize: "12px", color: "#92400e", margin: 0, lineHeight: 1.4 }}>
                The final HR selection committee is reviewing interview records. Results will be published on GCU NOW and notified via official email.
              </p>
            </div>
          )}

          {/* Informational Box for REJECTED Status */}
          {activeResult.status === "REJECTED" && (
            <div
              style={{
                borderTop: "1px solid #f3f4f6",
                paddingTop: "16px",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "14px",
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.4px", display: "block", marginBottom: "4px" }}>
                Placement Guidance
              </span>
              <p style={{ fontSize: "12px", color: "#4b5563", margin: 0, lineHeight: 1.4 }}>
                You remain eligible for upcoming software and consulting placement drives. Use the Mock Interviews tool to practice technical and HR communication.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MODAL: VIEW OFFER LETTER DETAILS
          ════════════════════════════════════════════════════════════════ */}
      {isViewOfferModalOpen && activeResult.offerDetails && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              maxWidth: "560px",
              width: "100%",
              padding: "26px",
              position: "relative",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsViewOfferModalOpen(false)}
              style={{ position: "absolute", top: "20px", right: "20px", width: "32px", height: "32px", borderRadius: "50%", background: "#f3f4f6", border: "none", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <FiX size={16} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ecfdf5", color: "#047857", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FiAward size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", margin: 0 }}>
                  Offer Letter Summary
                </h3>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>{activeResult.company}</span>
              </div>
            </div>

            <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ background: "#fafafa", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase" }}>Designation</span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827", display: "block", marginTop: "2px" }}>
                    {activeResult.offerDetails.designation}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase" }}>Total CTC</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#ea580c", display: "block", marginTop: "2px" }}>
                    {activeResult.offerDetails.ctc}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase" }}>Base Salary</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", display: "block", marginTop: "2px" }}>
                    {activeResult.offerDetails.baseSalary}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase" }}>Joining Date</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", display: "block", marginTop: "2px" }}>
                    {activeResult.offerDetails.joiningDate}
                  </span>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase" }}>Location</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", display: "block", marginTop: "2px" }}>
                    {activeResult.offerDetails.location}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setIsViewOfferModalOpen(false)}
                  style={{ padding: "8px 16px", fontSize: "12px", fontWeight: 600, color: "#4b5563", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer" }}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleDownloadOffer}
                  style={{
                    padding: "8px 18px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "white",
                    background: "#381c0f",
                    border: "1px solid #381c0f",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <FiDownload size={13} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          MODAL: ACCEPT OFFER SUCCESS
          ════════════════════════════════════════════════════════════════ */}
      {showAcceptSuccessModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              maxWidth: "460px",
              width: "100%",
              padding: "26px",
              textAlign: "center",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#ecfdf5",
                color: "#047857",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
              }}
            >
              <FiCheck size={28} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>
              Offer Accepted Successfully!
            </h3>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 20px", lineHeight: 1.4 }}>
              Congratulations on accepting the placement offer from <strong>{activeResult.company}</strong> ({activeResult.packageLPA}). The university placement coordinator has been notified.
            </p>
            <button
              type="button"
              onClick={() => setShowAcceptSuccessModal(false)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                background: "#381c0f",
                border: "1px solid #381c0f",
                color: "white",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
