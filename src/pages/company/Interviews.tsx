import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiSend,
  FiUsers,
  FiCalendar,
  FiLayers,
  FiBriefcase,
  FiBell,
  FiPlus,
  FiClock,
  FiMapPin,
  FiVideo,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
  FiChevronRight,
  FiMoreVertical,
  FiX,
  FiStar,
  FiEdit3,
  FiFilter, 
  FiMessageSquare
} from "react-icons/fi";

/* =========================================================================
   MOCK DATA
   ========================================================================= */

const MOCK_INTERVIEWS = [
  {
    id: "int-1",
    time: "10:00 AM",
    date: "Today",
    candidateName: "Roshan Sharma",
    candidateId: "1",
    role: "Software Engineer",
    round: "Technical Round",
    panel: "Priya M., Amit K.",
    mode: "Online",
    location: "Google Meet",
    status: "In Progress",
  },
  {
    id: "int-2",
    time: "11:30 AM",
    date: "Today",
    candidateName: "Rahul Kumar",
    candidateId: "2",
    role: "Software Engineer",
    round: "Technical Round",
    panel: "Amit K.",
    mode: "In-Person",
    location: "Room 4B",
    status: "Upcoming",
  },
  {
    id: "int-3",
    time: "2:00 PM",
    date: "Today",
    candidateName: "Ananya Rao",
    candidateId: "3",
    role: "Data Analyst",
    round: "HR Round",
    panel: "Sarah J.",
    mode: "Online",
    location: "Zoom",
    status: "Upcoming",
  },
];

const PANEL_STATUS = [
  { name: "Priya M.", status: "In Interview" },
  { name: "Amit K.", status: "Available" },
  { name: "Sarah J.", status: "In Interview" },
  { name: "Rahul K.", status: "Available" },
];

const PENDING_FEEDBACK = [
  {
    id: "fb-1",
    candidate: "Vikram Desai",
    round: "Technical Round",
    completedTime: "Completed 2h ago",
    interviewer: "Amit K."
  },
  {
    id: "fb-2",
    candidate: "Sneha Patel",
    round: "HR Round",
    completedTime: "Completed 4h ago",
    interviewer: "Ravi J."
  }
];

/* =========================================================================
   MODALS
   ========================================================================= */

function FeedbackModal({ feedbackData, onClose, onSubmit }: any) {
  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [comments, setComments] = useState("");

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "white", width: "100%", maxWidth: "500px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8f9fb" }}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#111827" }}>Interview Feedback</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer" }}><FiX size={20} /></button>
        </div>
        
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Candidate Context */}
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
             <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Candidate</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{feedbackData.candidate}</span>
             </div>
             <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Round & Role</span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>{feedbackData.round}</span>
             </div>
             <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Interviewer</span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>{feedbackData.interviewer}</span>
             </div>
          </div>

          {/* Rating */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Overall Rating</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[1,2,3,4,5].map(star => (
                <button 
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ background: "none", border: "none", color: rating >= star ? "#fbbf24" : "#d1d5db", cursor: "pointer", padding: "4px" }}
                >
                  <FiStar size={24} fill={rating >= star ? "#fbbf24" : "none"} />
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Recommendation</label>
            <div style={{ display: "flex", gap: "12px" }}>
              {["Shortlist", "Hold", "Reject", "Accept/Select"].map(rec => (
                 <button 
                   key={rec}
                   onClick={() => setRecommendation(rec)}
                   style={{
                     flex: 1, padding: "8px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                     background: recommendation === rec ? (rec === "Reject" ? "#fee2e2" : rec === "Accept/Select" ? "#d1fae5" : "#ffedd5") : "white",
                     color: recommendation === rec ? (rec === "Reject" ? "#ef4444" : rec === "Accept/Select" ? "#10b981" : "#ea580c") : "#6b7280",
                     border: recommendation === rec ? (rec === "Reject" ? "1px solid #fca5a5" : rec === "Accept/Select" ? "1px solid #6ee7b7" : "1px solid #fdba74") : "1px solid #e5e7eb",
                   }}
                 >
                   {rec}
                 </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Comments</label>
            <textarea 
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter detailed feedback..."
              style={{ width: "100%", height: "100px", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", resize: "none", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", background: "#f9fafb", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button onClick={onClose} style={{ padding: "10px 16px", background: "white", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Cancel</button>
          <button onClick={() => onSubmit(feedbackData.id)} style={{ padding: "10px 16px", background: "#ea580c", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 700, color: "white", cursor: "pointer" }}>Submit Feedback</button>
        </div>
      </div>
    </div>
  )
}

function ScheduleModal({ onClose }: any) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "white", width: "100%", maxWidth: "600px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#111827" }}>Schedule Interview</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer" }}><FiX size={20} /></button>
        </div>
        
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
           <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Candidate</label>
                <select style={{ width: "100%", padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", outline: "none", boxSizing: "border-box" }}>
                   <option>Select Candidate...</option>
                   <option>Roshan Sharma</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Placement Drive</label>
                <select style={{ width: "100%", padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", outline: "none", boxSizing: "border-box" }}>
                   <option>Select Drive...</option>
                   <option>Microsoft 2026</option>
                </select>
              </div>
           </div>

           <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Role</label>
                <input type="text" placeholder="e.g. Software Engineer" style={{ width: "100%", padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Interview Round</label>
                <select style={{ width: "100%", padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", outline: "none", boxSizing: "border-box" }}>
                   <option>Technical Round</option>
                   <option>HR Round</option>
                   <option>Managerial</option>
                </select>
              </div>
           </div>

           <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Date</label>
                <input type="date" style={{ width: "100%", padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Time</label>
                <input type="time" style={{ width: "100%", padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", outline: "none", boxSizing: "border-box" }} />
              </div>
           </div>

           <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Interviewer / Panel</label>
              <input type="text" placeholder="Search and select interviewers..." style={{ width: "100%", padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", outline: "none", boxSizing: "border-box" }} />
           </div>

           <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Mode</label>
                <select style={{ width: "100%", padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", outline: "none", boxSizing: "border-box" }}>
                   <option>Online</option>
                   <option>In-Person</option>
                </select>
              </div>
              <div style={{ flex: 2 }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Meeting Link OR Room</label>
                <input type="text" placeholder="e.g. meet.google.com/xyz or Room 4B" style={{ width: "100%", padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", outline: "none", boxSizing: "border-box" }} />
              </div>
           </div>
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", background: "#f9fafb", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button onClick={onClose} style={{ padding: "10px 16px", background: "white", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Cancel</button>
          <button onClick={onClose} style={{ padding: "10px 16px", background: "#ea580c", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 700, color: "white", cursor: "pointer" }}>Save Interview</button>
        </div>
      </div>
    </div>
  )
}


/* =========================================================================
   MAIN PAGE COMPONENT
   ========================================================================= */

export default function CompanyInterviews() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeFeedbackModal, setActiveFeedbackModal] = useState<any>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [interviews, setInterviews] = useState(MOCK_INTERVIEWS);
  const [campusQueue, setCampusQueue] = useState({ current: 18, next: 19, waiting: 12 });
  const [pendingFeedback, setPendingFeedback] = useState(PENDING_FEEDBACK);

  const navItems = [
    { name: "Dashboard", path: "/company/dashboard", icon: <FiGrid size={17} /> },
    { name: "Placement Drives", path: "/company/drives", icon: <FiSend size={17} /> },
    { name: "Candidates", path: "/company/candidates", icon: <FiUsers size={17} /> },
    { name: "Interviews", path: "/company/interviews", icon: <FiCalendar size={17} /> },
  ];

  const handleViewCandidate = (candidateId: string) => {
    navigate("/company/candidates", { state: { candidateId } });
  };

  const handleMarkCompleted = (id: string) => {
    setInterviews(interviews.map(int => int.id === id ? { ...int, status: "Completed" } : int));
  };

  const handleCallNext = () => {
    setCampusQueue(prev => ({ current: prev.next, next: prev.next + 1, waiting: Math.max(0, prev.waiting - 1) }));
  };

  const handleFeedbackSubmit = (id: string) => {
    setPendingFeedback(pendingFeedback.filter(fb => fb.id !== id));
    setActiveFeedbackModal(null);
  };

  const kpiData = [
    { label: "TODAY'S INTERVIEWS", value: "8", subtext: "", icon: null, color: "#111827" },
    { label: "IN PROGRESS", value: "2", subtext: "Live", icon: <FiVideo size={12} />, color: "#ea580c", badgeBg: "#ffedd5" },
    { label: "UPCOMING", value: "6", subtext: "Later", icon: <FiClock size={12} />, color: "#3b82f6", badgeBg: "#eff6ff" },
    { label: "PENDING FEEDBACK", value: "5", subtext: "Action Required", icon: <FiAlertCircle size={12} />, color: "#ef4444", badgeBg: "#fee2e2", highlightBorder: true },
    { label: "SCHEDULING CONFLICTS", value: "1", subtext: "Review", icon: <FiCalendar size={12} />, color: "#ef4444", badgeBg: "#fee2e2", highlightBorder: true },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fb", fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      
      {/* ═══════ SIDEBAR ═══════ */}
      <aside style={{ width: "240px", background: "white", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0, position: "sticky", top: 0, height: "100vh", zIndex: 40 }}>
        <div>
          <div style={{ padding: "22px 20px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "#381c0f", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "18px", boxShadow: "0 2px 4px rgba(56, 28, 15, 0.2)" }}>
              <FiBriefcase size={20} />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#111827", letterSpacing: "-0.3px" }}>GCU NOW</div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#ea580c", letterSpacing: "0.8px", textTransform: "uppercase" }}>HR PORTAL</div>
            </div>
          </div>
          <nav style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button key={item.name} type="button" onClick={() => navigate(item.path)} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: isActive ? 700 : 500, color: isActive ? "white" : "#4b5563", background: isActive ? "#381c0f" : "transparent", border: "none", cursor: "pointer", transition: "all 0.15s ease", textAlign: "left" }}>
                  <span style={{ color: isActive ? "#ea580c" : "#9ca3af" }}>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div style={{ padding: "16px 12px", borderTop: "1px solid #f3f4f6" }}>
          <button type="button" onClick={() => navigate("/company/profile")} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: location.pathname === "/company/profile" ? 700 : 500, color: location.pathname === "/company/profile" ? "white" : "#4b5563", background: location.pathname === "/company/profile" ? "#381c0f" : "transparent", border: "none", cursor: "pointer", transition: "all 0.15s ease", textAlign: "left" }}>
            <FiLayers size={17} style={{ color: location.pathname === "/company/profile" ? "#ea580c" : "#9ca3af" }} />
            <span>Company Profile</span>
          </button>
        </div>
      </aside>

      {/* ═══════ MAIN VIEW ═══════ */}
      <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        <div style={{ padding: "32px 32px 64px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
          
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#381c0f", margin: "0 0 4px", letterSpacing: "-0.5px" }}>
                Interview Operations
              </h1>
              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
                Coordinate today's interviews, interview panels and recruitment progress from one place.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginRight: "8px" }}>
                <button
                  type="button"
                  style={{ position: "relative", width: "40px", height: "40px", borderRadius: "10px", background: "white", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                >
                  <FiBell size={18} />
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 12px 4px 4px", borderRadius: "9999px", background: "white", border: "1px solid #e5e7eb", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: 700 }}>MS</div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#1f2937" }}>Microsoft HR</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button type="button" style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", color: "#374151", padding: "10px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, border: "1px solid #d1d5db", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                  <FiCalendar size={16} />
                  <span>Calendar</span>
                </button>
                <button type="button" onClick={() => setShowScheduleModal(true)} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#ea580c", color: "white", padding: "10px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(234, 88, 12, 0.25)" }}>
                  <FiPlus size={16} />
                  <span>Schedule Interview</span>
                </button>
              </div>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px" }}>
            {kpiData.map((kpi, idx) => (
              <div key={idx} style={{ background: "white", border: kpi.highlightBorder ? "1px solid #ef4444" : "1px solid #e5e7eb", borderLeft: kpi.highlightBorder ? "3px solid #ef4444" : "3px solid #ea580c", borderRadius: "8px", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px", color: "#6b7280" }}>{kpi.label}</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
                   <div style={{ fontSize: "28px", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", lineHeight: "1" }}>{kpi.value}</div>
                   {kpi.subtext && (
                     <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 600, color: kpi.color, background: kpi.badgeBg, padding: "2px 8px", borderRadius: "4px" }}>
                       {kpi.icon} {kpi.subtext}
                     </div>
                   )}
                </div>
              </div>
            ))}
          </div>

          {/* TWO COLUMN MAIN CONTENT */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "28px" }}>
             
             {/* LEFT: Today's Interview Schedule */}
             <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#381c0f" }}>Today's Interview Schedule</h2>
                   <div style={{ display: "flex", gap: "8px" }}>
                      <button style={{ padding: "6px 12px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>All Statuses</button>
                      <button style={{ padding: "6px 12px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}><FiFilter size={12}/> Filters</button>
                   </div>
                </div>

                <div style={{ padding: "24px", position: "relative" }}>
                   {/* Vertical Line */}
                   <div style={{ position: "absolute", top: "24px", bottom: "24px", left: "32px", width: "2px", background: "#f3f4f6" }} />

                   <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                      {interviews.map((int, i) => {
                         const isInProgress = int.status === "In Progress";
                         const isCompleted = int.status === "Completed";
                         return (
                           <div key={int.id} style={{ display: "flex", gap: "20px", position: "relative", zIndex: 1 }}>
                              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: isInProgress ? "#ea580c" : (isCompleted ? "#10b981" : "#d1d5db"), border: "3px solid white", marginTop: "4px" }} />
                              
                              <div style={{ flex: 1, background: "#f8f9fb", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "20px" }}>
                                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                                    <div>
                                       <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                          <span style={{ fontSize: "14px", fontWeight: 800, color: "#111827" }}>{int.time}</span>
                                          <span style={{ color: "#d1d5db" }}>•</span>
                                          <span style={{ fontSize: "15px", fontWeight: 700, color: "#381c0f" }}>{int.candidateName}</span>
                                       </div>
                                       <div style={{ fontSize: "13px", color: "#6b7280" }}>{int.role} <span style={{ margin: "0 6px" }}>•</span> {int.round}</div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, color: isInProgress ? "#ea580c" : (isCompleted ? "#10b981" : "#3b82f6"), background: isInProgress ? "#ffedd5" : (isCompleted ? "#d1fae5" : "#eff6ff"), padding: "4px 8px", borderRadius: "4px" }}>
                                       <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: isInProgress ? "#ea580c" : (isCompleted ? "#10b981" : "#3b82f6") }} />
                                       {int.status.toUpperCase()}
                                    </div>
                                 </div>

                                 <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4b5563", fontWeight: 500 }}>
                                       <FiUsers style={{ color: "#9ca3af" }} /> Panel: {int.panel}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4b5563", fontWeight: 500 }}>
                                       {int.mode === "Online" ? <FiVideo style={{ color: "#9ca3af" }} /> : <FiMapPin style={{ color: "#9ca3af" }} />} 
                                       {int.mode} ({int.location})
                                    </div>
                                 </div>

                                 <div style={{ display: "flex", gap: "10px" }}>
                                    {isInProgress && (
                                      <button style={{ padding: "8px 16px", background: "#ea580c", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: 600, color: "white", cursor: "pointer" }}>Join / Open</button>
                                    )}
                                    <button onClick={() => handleViewCandidate(int.candidateId)} style={{ padding: "8px 16px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>View Candidate</button>
                                    {!isCompleted && (
                                      <>
                                        <button onClick={() => setShowScheduleModal(true)} style={{ padding: "8px 16px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Reschedule</button>
                                        <button onClick={() => setShowScheduleModal(true)} style={{ padding: "8px 16px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Reassign Panel</button>
                                      </>
                                    )}
                                    {isInProgress && (
                                      <button onClick={() => handleMarkCompleted(int.id)} style={{ padding: "8px 16px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Mark Completed</button>
                                    )}
                                 </div>
                              </div>
                           </div>
                         )
                      })}
                   </div>
                </div>
             </div>

             {/* RIGHT: Operational Panels */}
             <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                
                {/* Needs Attention */}
                <div style={{ background: "#fffbeb", borderRadius: "12px", border: "1px solid #fde68a", padding: "20px" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: 700, color: "#92400e", marginBottom: "16px" }}>
                      <FiAlertCircle size={16} /> Needs Attention
                   </div>
                   <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "10px 12px", borderRadius: "8px", border: "1px solid #fef3c7" }}>
                         <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "#b45309" }}><FiMessageSquare /> 5 Feedback Pending</div>
                         <button style={{ padding: "4px 10px", fontSize: "11px", fontWeight: 600, background: "none", border: "1px solid #fcd34d", borderRadius: "4px", color: "#92400e", cursor: "pointer" }}>Review</button>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "10px 12px", borderRadius: "8px", border: "1px solid #fef3c7" }}>
                         <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "#b45309" }}><FiCalendar /> 1 Interviewer Conflict</div>
                         <button style={{ padding: "4px 10px", fontSize: "11px", fontWeight: 600, background: "none", border: "1px solid #fcd34d", borderRadius: "4px", color: "#92400e", cursor: "pointer" }}>Resolve</button>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "10px 12px", borderRadius: "8px", border: "1px solid #fef3c7" }}>
                         <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "#b45309" }}><FiClock /> 2 Need Rescheduling</div>
                         <button style={{ padding: "4px 10px", fontSize: "11px", fontWeight: 600, background: "none", border: "1px solid #fcd34d", borderRadius: "4px", color: "#92400e", cursor: "pointer" }}>Reschedule</button>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "10px 12px", borderRadius: "8px", border: "1px solid #fef3c7" }}>
                         <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "#b45309" }}><FiUser /> 1 Awaiting Decision</div>
                         <button style={{ padding: "4px 10px", fontSize: "11px", fontWeight: 600, background: "none", border: "1px solid #fcd34d", borderRadius: "4px", color: "#92400e", cursor: "pointer" }}>Review</button>
                      </div>
                   </div>
                </div>

                {/* Campus Interview Queue */}
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                   <div style={{ marginBottom: "16px" }}>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "#381c0f", marginBottom: "4px" }}>Campus Interview Queue</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>Technical Round • Room 4B</div>
                   </div>
                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", textAlign: "center" }}>
                      <div>
                         <div style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px", textTransform: "uppercase" }}>Now Serving</div>
                         <div style={{ fontSize: "24px", fontWeight: 800, color: "#111827" }}>#{campusQueue.current}</div>
                      </div>
                      <div>
                         <div style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px", textTransform: "uppercase" }}>Next</div>
                         <div style={{ fontSize: "24px", fontWeight: 800, color: "#ea580c" }}>#{campusQueue.next}</div>
                      </div>
                      <div>
                         <div style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px", textTransform: "uppercase" }}>Waiting</div>
                         <div style={{ fontSize: "24px", fontWeight: 800, color: "#111827" }}>{campusQueue.waiting}</div>
                      </div>
                   </div>
                   <button onClick={handleCallNext} style={{ width: "100%", padding: "10px", background: "#ea580c", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 700, color: "white", cursor: "pointer", marginBottom: "8px" }}>Call Next</button>
                   <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                      <button style={{ flex: 1, padding: "8px", background: "white", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Skip</button>
                      <button style={{ flex: 1, padding: "8px", background: "white", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Complete</button>
                   </div>
                   <div style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center", fontStyle: "italic", cursor: "pointer" }}>Click to manage full queue</div>
                </div>

                {/* Interview Panel Status */}
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                   <div style={{ fontSize: "15px", fontWeight: 700, color: "#381c0f", marginBottom: "16px" }}>Interview Panel Status</div>
                   <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {PANEL_STATUS.map(p => (
                         <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>{p.name}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, color: p.status === "Available" ? "#10b981" : "#ea580c" }}>
                               <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.status === "Available" ? "#10b981" : "#ea580c" }} />
                               {p.status}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Pending Feedback */}
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                     <div style={{ fontSize: "15px", fontWeight: 700, color: "#381c0f" }}>Pending Feedback</div>
                     <div style={{ fontSize: "10px", fontWeight: 700, background: "#fee2e2", color: "#ef4444", padding: "2px 6px", borderRadius: "4px" }}>{pendingFeedback.length} Pending</div>
                   </div>
                   
                   {pendingFeedback.length === 0 ? (
                      <div style={{ fontSize: "13px", color: "#6b7280", textAlign: "center", padding: "20px 0" }}>All caught up!</div>
                   ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                         {pendingFeedback.map(fb => (
                            <div key={fb.id} style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px", background: "#f9fafb" }}>
                               <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>{fb.candidate}</div>
                               <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "8px" }}>{fb.round} • {fb.completedTime} <br/> Interviewer: {fb.interviewer}</div>
                               <button onClick={() => setActiveFeedbackModal(fb)} style={{ width: "100%", padding: "6px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Enter Feedback</button>
                            </div>
                         ))}
                      </div>
                   )}
                </div>

             </div>
          </div>

        </div>
      </div>

      {activeFeedbackModal && <FeedbackModal feedbackData={activeFeedbackModal} onClose={() => setActiveFeedbackModal(null)} onSubmit={handleFeedbackSubmit} />}
      {showScheduleModal && <ScheduleModal onClose={() => setShowScheduleModal(false)} />}
    </div>
  );
}
