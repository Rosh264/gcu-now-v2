import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiFileText,
  FiDownload,
  FiCheckCircle,
  FiUpload,
  FiLock,
  FiShield,
  FiSmartphone,
  FiMonitor,
  FiLogOut,
  FiCheck,
  FiEdit2,
  FiInfo,
  FiExternalLink,
  FiX,
} from "react-icons/fi";

export default function StudentSettings() {
  // Personal Info State
  const [name, setName] = useState("Roshan Sharma");
  const [studentId] = useState("23btre136@gcu.edu.in");
  const [department, setDepartment] = useState("Robotics Engineering");
  const [course, setCourse] = useState("B.Tech Robotics & Automation");
  const [year, setYear] = useState("Final Year");
  const [academicYear, setAcademicYear] = useState("2026 - 2027");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Notification Toggles State
  const [notifications, setNotifications] = useState({
    driveAlerts: true,
    appStatus: true,
    interviewSchedule: true,
    queueToken: true,
    interviewReminders: true,
    resultOffers: true,
    mockReminders: true,
  });

  // Delivery & Preferences State
  const [emailDelivery, setEmailDelivery] = useState("All notifications");
  const [inAppDelivery, setInAppDelivery] = useState("All notifications");
  const [reminderTiming, setReminderTiming] = useState("15 mins");
  const [preferredRoles, setPreferredRoles] = useState("Robotics Engineer, ROS2 Developer");
  const [preferredLocations, setPreferredLocations] = useState("Bangalore, Hyderabad, Pune");
  const [workPreference, setWorkPreference] = useState("Hybrid");
  const [expectedPackage, setExpectedPackage] = useState("8 - 12 LPA");

  // Security State
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [signedOutDevices, setSignedOutDevices] = useState(false);

  // Technical skills list
  const [skills, setSkills] = useState([
    "ROS2",
    "Python",
    "C++",
    "Computer Vision",
    "Control Systems",
    "MoveIt",
    "Gazebo",
    "PyTorch",
    "MATLAB",
  ]);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleCancel = () => {
    // Reset to defaults
    setDepartment("Robotics Engineering");
    setCourse("B.Tech Robotics & Automation");
    setPhone("+91 98765 43210");
    setIsEditingProfile(false);
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
      {/* ═══════ Save Success Toast ═══════ */}
      {showSaveToast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 100,
            background: "#111827",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#10b981",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiCheck size={14} />
          </div>
          <span style={{ fontSize: "13px", fontWeight: 600 }}>
            Settings & preferences saved successfully!
          </span>
        </div>
      )}

      {/* ═══════ Header Row with Top-Right Action Buttons ═══════ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
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
            Settings
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px", lineHeight: 1.4 }}>
            Manage your account, preferences and placement notifications.
          </p>
        </div>

        {/* Top Right Buttons: Cancel & Save Changes */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: "9px 18px",
              borderRadius: "8px",
              background: "white",
              border: "1px solid #d1d5db",
              color: "#374151",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              transition: "all 0.15s ease",
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveChanges}
            style={{
              padding: "9px 22px",
              borderRadius: "8px",
              background: "#381c0f",
              border: "1px solid #381c0f",
              color: "white",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(56, 28, 15, 0.25)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.15s ease",
            }}
          >
            <FiCheck size={15} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* ═══════ Main 2-Column SaaS Grid ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ────────────────────────────────────────────────────────
            LEFT COLUMN: Personal Info, Placement Profile, Security
            ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {/* ── 1. Personal Information Card ── */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>
                Personal Information
              </h3>
              <button
                type="button"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: isEditingProfile ? "#fffaf5" : "white",
                  border: isEditingProfile ? "1px solid #ea580c" : "1px solid #d1d5db",
                  color: isEditingProfile ? "#ea580c" : "#374151",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <FiEdit2 size={12} />
                <span>{isEditingProfile ? "Editing Mode" : "Edit Profile"}</span>
              </button>
            </div>

            {/* Avatar & Name Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "14px 16px",
                background: "#fafafa",
                border: "1px solid #f3f4f6",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "10px",
                    background: "#ea580c",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "18px",
                    boxShadow: "0 2px 6px rgba(234, 88, 12, 0.25)",
                  }}
                >
                  RS
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    right: "-4px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "white",
                    border: "1px solid #d1d5db",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                  title="Change avatar"
                >
                  <FiEdit2 size={10} />
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>
                  {name}
                </h4>
                <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                  Update your photo and personal details.
                </p>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {/* Student ID */}
              <div style={{ gridColumn: "span 2" }}>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#4b5563",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Student ID
                </label>
                <div
                  style={{
                    padding: "9px 12px",
                    fontSize: "13px",
                    color: "#4b5563",
                    background: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    fontWeight: 500,
                  }}
                >
                  {studentId}
                </div>
              </div>

              {/* Department (Side-by-Side with Course) */}
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#4b5563",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Department
                </label>
                <select
                  value={department}
                  disabled={!isEditingProfile}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "13px",
                    color: "#111827",
                    background: isEditingProfile ? "white" : "#f9fafb",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    outline: "none",
                    cursor: isEditingProfile ? "pointer" : "default",
                  }}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Computer Applications">Computer Applications</option>
                  <option value="Sciences">Sciences</option>
                  <option value="Management">Management</option>
                </select>
              </div>

              {/* Course (Side-by-Side with Department) */}
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#4b5563",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Course
                </label>
                <select
                  value={course}
                  disabled={!isEditingProfile}
                  onChange={(e) => setCourse(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "13px",
                    color: "#111827",
                    background: isEditingProfile ? "white" : "#f9fafb",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    outline: "none",
                    cursor: isEditingProfile ? "pointer" : "default",
                  }}
                >
                  <option value="Robotics Engineering">Robotics Engineering</option>
                  <option value="B.Tech Robotics & Automation">B.Tech Robotics & Automation</option>
                  <option value="B.Tech CSE - AI & ML">B.Tech CSE - AI & ML</option>
                  <option value="B.Tech Mechatronics">B.Tech Mechatronics</option>
                  <option value="B.Tech Electronics & Communication">B.Tech Electronics & Communication</option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#4b5563",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Year
                </label>
                <select
                  value={year}
                  disabled={!isEditingProfile}
                  onChange={(e) => setYear(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "13px",
                    color: "#111827",
                    background: isEditingProfile ? "white" : "#f9fafb",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    outline: "none",
                    cursor: isEditingProfile ? "pointer" : "default",
                  }}
                >
                  <option value="Final Year">Final Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="2nd Year">2nd Year</option>
                </select>
              </div>

              {/* Academic Year */}
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#4b5563",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Academic Year
                </label>
                <input
                  type="text"
                  value={academicYear}
                  disabled={!isEditingProfile}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "13px",
                    color: "#111827",
                    background: isEditingProfile ? "white" : "#f9fafb",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Phone Number (Spanning 2 columns) */}
              <div style={{ gridColumn: "span 2" }}>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#4b5563",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  disabled={!isEditingProfile}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "13px",
                    color: "#111827",
                    background: isEditingProfile ? "white" : "#f9fafb",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── 2. Placement Profile Card ── */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>
              Placement Profile
            </h3>

            {/* Current Resume Box */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 16px",
                background: "#fafafa",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                marginBottom: "18px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: "#fef3c7",
                    color: "#b45309",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FiFileText size={20} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                      Roshan_Sharma_Resume_2026.pdf
                    </span>
                    <span
                      style={{
                        background: "#ecfdf5",
                        color: "#047857",
                        border: "1px solid #a7f3d0",
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      ✓ Verified
                    </span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px", display: "block" }}>
                    Uploaded on Jul 20, 2026 • 245 KB
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => alert("Downloading verified student resume PDF...")}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4b5563",
                    cursor: "pointer",
                  }}
                  title="Download Resume"
                >
                  <FiDownload size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => alert("Opening resume re-upload modal...")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    background: "white",
                    color: "#374151",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Update
                </button>
              </div>
            </div>

            {/* Technical Skills Pills */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Technical Skills
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      background: "#fffaf5",
                      border: "1px solid #fed7aa",
                      color: "#c2410c",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "16px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Split View: Preferred Roles & Preferred Locations */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #f3f4f6",
                  borderRadius: "8px",
                  padding: "12px 14px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Preferred Roles
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>
                    • Robotics Engineer
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>
                    • Autonomous Systems
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>
                    • Computer Vision Dev
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #f3f4f6",
                  borderRadius: "8px",
                  padding: "12px 14px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Preferred Locations
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>
                    • Bengaluru
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>
                    • Hyderabad
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>
                    • Pune / Chennai
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Privacy & Security Card (Without Delete Account / Danger Zone) ── */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>
              Privacy & Security
            </h3>

            {/* Change Password Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "16px",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              <div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827", display: "block" }}>
                  Password
                </span>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                  Ensure your account uses a strong password.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(true)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: "1px solid #ea580c",
                  background: "#fffaf5",
                  color: "#ea580c",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Change Password
              </button>
            </div>

            {/* Two-Factor Authentication Toggle */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              <div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827", display: "block" }}>
                  Two-Factor Authentication
                </span>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                  Add an extra layer of security to your account.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                style={{
                  width: "42px",
                  height: "24px",
                  borderRadius: "12px",
                  background: twoFactorAuth ? "#ea580c" : "#e5e7eb",
                  border: "none",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "white",
                    position: "absolute",
                    top: "3px",
                    left: twoFactorAuth ? "21px" : "3px",
                    transition: "left 0.2s ease",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                />
              </button>
            </div>

            {/* Login Activity */}
            <div style={{ padding: "16px 0", borderBottom: "1px solid #f3f4f6" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Login Activity
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#111827", fontWeight: 500 }}>
                    <FiMonitor size={13} color="#6b7280" />
                    <span>Chrome on Windows (Current)</span>
                  </div>
                  <span style={{ color: "#047857", fontWeight: 600 }}>Active now</span>
                </div>

                {!signedOutDevices && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#111827", fontWeight: 500 }}>
                      <FiSmartphone size={13} color="#6b7280" />
                      <span>Safari on iPhone</span>
                    </div>
                    <span style={{ color: "#6b7280" }}>2 days ago</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSignedOutDevices(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ea580c",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                  marginTop: "10px",
                  textDecoration: "underline",
                }}
              >
                {signedOutDevices ? "✓ Signed out of other devices" : "Sign out of all other devices"}
              </button>
            </div>

            {/* Data & Privacy Section */}
            <div style={{ paddingTop: "16px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Data & Privacy
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#4b5563", lineHeight: 1.4 }}>
                <p style={{ margin: 0 }}>
                  <strong>Profile Visibility:</strong> Visible to verified campus recruiters.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Application Data:</strong> Shared securely with applied organizations.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Mock Recordings:</strong> Retained securely for 30 days for mentorship review.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ea580c",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0,
                    textDecoration: "underline",
                  }}
                >
                  View Privacy Information
                </button>

                <button
                  type="button"
                  onClick={() => alert("Signing out of Student Portal...")}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "6px",
                    border: "1px solid #c2410c",
                    background: "white",
                    color: "#c2410c",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease",
                  }}
                  className="hover:bg-orange-50"
                >
                  <FiLogOut size={13} style={{ color: "#c2410c" }} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            RIGHT COLUMN: Notification Prefs & Delivery Preferences
            ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {/* ── 4. Notification Preferences Card (Compact Vertical List) ── */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>
              Notification Preferences
            </h3>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                {
                  key: "driveAlerts" as const,
                  title: "Placement Drive Alerts",
                  desc: "Get notified when new drives matching your profile are added.",
                },
                {
                  key: "appStatus" as const,
                  title: "Application Status Updates",
                  desc: "Receive updates when your application status changes.",
                },
                {
                  key: "interviewSchedule" as const,
                  title: "Interview Schedule Updates",
                  desc: "Alerts for new or modified interview schedules.",
                },
                {
                  key: "queueToken" as const,
                  title: "Queue / Token Updates",
                  desc: "Real-time notifications for your place in the interview queue.",
                },
                {
                  key: "interviewReminders" as const,
                  title: "Interview Reminders",
                  desc: "Get reminded before upcoming interviews.",
                },
                {
                  key: "resultOffers" as const,
                  title: "Result & Offer Notifications",
                  desc: "Alerts when interview results or offers are released.",
                },
                {
                  key: "mockReminders" as const,
                  title: "Mock Interview Reminders",
                  desc: "Reminders for scheduled mock interviews.",
                },
              ].map((item, idx, arr) => (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "13px 0",
                    borderBottom: idx !== arr.length - 1 ? "1px solid #f3f4f6" : "none",
                  }}
                >
                  <div style={{ paddingRight: "16px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", display: "block" }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: "11px", color: "#6b7280", lineHeight: 1.3, display: "block" }}>
                      {item.desc}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleNotification(item.key)}
                    style={{
                      width: "42px",
                      height: "24px",
                      borderRadius: "12px",
                      background: notifications[item.key] ? "#ea580c" : "#e5e7eb",
                      border: "none",
                      position: "relative",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "white",
                        position: "absolute",
                        top: "3px",
                        left: notifications[item.key] ? "21px" : "3px",
                        transition: "left 0.2s ease",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── 5. Delivery & Placement Preferences Card ── */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>
              Delivery & Placement Preferences
            </h3>

            {/* Notification Delivery Dropdowns */}
            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                Notification Delivery
              </span>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#4b5563", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                    Email Notifications
                  </label>
                  <select
                    value={emailDelivery}
                    onChange={(e) => setEmailDelivery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      fontSize: "12px",
                      color: "#111827",
                      background: "white",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      outline: "none",
                    }}
                  >
                    <option value="All notifications">All notifications</option>
                    <option value="Critical only">Critical only</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#4b5563", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                    In-App Notifications
                  </label>
                  <select
                    value={inAppDelivery}
                    onChange={(e) => setInAppDelivery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      fontSize: "12px",
                      color: "#111827",
                      background: "white",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      outline: "none",
                    }}
                  >
                    <option value="All notifications">All notifications</option>
                    <option value="Mentions only">Mentions only</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ fontSize: "11px", color: "#4b5563", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                    Interview Reminders Before
                  </label>
                  <select
                    value={reminderTiming}
                    onChange={(e) => setReminderTiming(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      fontSize: "12px",
                      color: "#111827",
                      background: "white",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      outline: "none",
                    }}
                  >
                    <option value="15 mins">15 mins before</option>
                    <option value="30 mins">30 mins before</option>
                    <option value="1 hour">1 hour before</option>
                    <option value="1 day">1 day before</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Placement Preferences */}
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                Placement Preferences
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#4b5563", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                    Preferred Job Roles
                  </label>
                  <input
                    type="text"
                    value={preferredRoles}
                    onChange={(e) => setPreferredRoles(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      fontSize: "13px",
                      color: "#111827",
                      background: "white",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#4b5563", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                    Locations
                  </label>
                  <input
                    type="text"
                    value={preferredLocations}
                    onChange={(e) => setPreferredLocations(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      fontSize: "13px",
                      color: "#111827",
                      background: "white",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "11px", color: "#4b5563", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                      Work Preference
                    </label>
                    <select
                      value={workPreference}
                      onChange={(e) => setWorkPreference(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        fontSize: "12px",
                        color: "#111827",
                        background: "white",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        outline: "none",
                      }}
                    >
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", color: "#4b5563", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                      Expected Package Range
                    </label>
                    <select
                      value={expectedPackage}
                      onChange={(e) => setExpectedPackage(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        fontSize: "12px",
                        color: "#111827",
                        background: "white",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        outline: "none",
                      }}
                    >
                      <option value="8 - 12 LPA">8 - 12 LPA</option>
                      <option value="12 - 16 LPA">12 - 16 LPA</option>
                      <option value="16+ LPA">16+ LPA</option>
                      <option value="Negotiable">Negotiable</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MODAL: CHANGE PASSWORD
          ════════════════════════════════════════════════════════════════ */}
      {isPasswordModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              maxWidth: "440px",
              width: "100%",
              padding: "24px",
              position: "relative",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              style={{ position: "absolute", top: "18px", right: "18px", width: "30px", height: "30px", borderRadius: "50%", background: "#f3f4f6", border: "none", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <FiX size={15} />
            </button>

            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
              Change Password
            </h3>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 18px" }}>
              Enter your current password and choose a secure new password.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#4b5563", display: "block", marginBottom: "4px" }}>
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#4b5563", display: "block", marginBottom: "4px" }}>
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#4b5563", display: "block", marginBottom: "4px" }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  style={{ padding: "8px 14px", fontSize: "12px", fontWeight: 600, color: "#4b5563", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert("Password updated successfully!");
                    setIsPasswordModalOpen(false);
                  }}
                  style={{ padding: "8px 18px", fontSize: "12px", fontWeight: 700, color: "white", background: "#381c0f", border: "1px solid #381c0f", borderRadius: "6px", cursor: "pointer" }}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          MODAL: PRIVACY INFORMATION
          ════════════════════════════════════════════════════════════════ */}
      {isPrivacyModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              maxWidth: "520px",
              width: "100%",
              padding: "24px",
              position: "relative",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <button
              onClick={() => setIsPrivacyModalOpen(false)}
              style={{ position: "absolute", top: "18px", right: "18px", width: "30px", height: "30px", borderRadius: "50%", background: "#f3f4f6", border: "none", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <FiX size={15} />
            </button>

            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", margin: "0 0 10px" }}>
              Student Data & Privacy Policy
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "12px", color: "#4b5563", lineHeight: 1.5 }}>
              <p style={{ margin: 0 }}>
                1. <strong>Verification:</strong> Student academic scores, backlog records, and identity information are verified directly by the university registrar.
              </p>
              <p style={{ margin: 0 }}>
                2. <strong>Recruiter Access:</strong> Only registered corporate partners approved by the GCU Training & Placement Cell can access student resumes.
              </p>
              <p style={{ margin: 0 }}>
                3. <strong>Integrity & Mock Data:</strong> Mock interview feeds and oral transcripts are encrypted and accessible only to student mentors and the student.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "18px" }}>
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                style={{ padding: "8px 18px", fontSize: "12px", fontWeight: 700, color: "white", background: "#381c0f", border: "1px solid #381c0f", borderRadius: "6px", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
