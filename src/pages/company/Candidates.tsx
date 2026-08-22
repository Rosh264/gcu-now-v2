import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiBell,
  FiSearch,
  FiChevronDown,
  FiMoreVertical,
  FiUsers,
  FiGrid,
  FiSend,
  FiCalendar,
  FiLayers,
  FiBriefcase,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiUserPlus,
  FiDownload,
  FiX,
  FiUser,
  FiFileText,
  FiCornerUpRight,
  FiSlash,
  FiArrowLeft,
  FiMapPin,
  FiEye,
  FiMessageSquare,
  FiChevronRight
} from "react-icons/fi";

/* --- Static mock data --------------------------------------------------- */
interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  appliedDate: string;
  stage: string;
  status: "Interview" | "Selected" | "Shortlisted" | "Applied" | "Rejected";
  drive: string;
  avatar: string;
}

const CANDIDATES: Candidate[] = [
  {
    id: "C001",
    name: "Roshan Sharma",
    email: "roshan.s@example.com",
    phone: "+91 98765 43210",
    role: "Software Engineer",
    department: "Computer Science",
    appliedDate: "Oct 24, 2023",
    stage: "Technical Interview",
    status: "Interview",
    drive: "Microsoft 2026",
    avatar: "https://i.pravatar.cc/150?u=roshan",
  },
  {
    id: "C002",
    name: "Ananya Rao",
    email: "ananya.r@example.com",
    phone: "+91 98765 43211",
    role: "Data Analyst",
    department: "Business Admin",
    appliedDate: "Oct 23, 2023",
    stage: "Final Round",
    status: "Selected",
    drive: "Analytics Drive",
    avatar: "https://i.pravatar.cc/150?u=ananya",
  },
  {
    id: "C003",
    name: "Rahul Kumar",
    email: "rahul.k@example.com",
    phone: "+91 98765 43212",
    role: "Systems Engineer",
    department: "Engineering",
    appliedDate: "Oct 22, 2023",
    stage: "Screening",
    status: "Shortlisted",
    drive: "Microsoft 2026",
    avatar: "https://i.pravatar.cc/150?u=rahul",
  },
  {
    id: "C004",
    name: "Priya Singh",
    email: "priya.s@example.com",
    phone: "+91 98765 43213",
    role: "Product Manager",
    department: "Business Admin",
    appliedDate: "Oct 21, 2023",
    stage: "Resume Review",
    status: "Applied",
    drive: "Product Drive",
    avatar: "https://i.pravatar.cc/150?u=priya",
  },
  {
    id: "C005",
    name: "Vikram Desai",
    email: "vikram.d@example.com",
    phone: "+91 98765 43214",
    role: "QA Tester",
    department: "Engineering",
    appliedDate: "Oct 20, 2023",
    stage: "Culture Fit",
    status: "Rejected",
    drive: "QA Drive",
    avatar: "https://i.pravatar.cc/150?u=vikram",
  },
];

/* --- Status badge helper ------------------------------------------------ */
function StatusBadge({ status }: { status: Candidate["status"] }) {
  const map: Record<Candidate["status"], { bg: string; text: string }> = {
    Interview: { bg: "#ffedd5", text: "#ea580c" },
    Selected: { bg: "#ecfdf5", text: "#10b981" },
    Shortlisted: { bg: "#eff6ff", text: "#3b82f6" },
    Applied: { bg: "#f1f5f9", text: "#64748b" },
    Rejected: { bg: "#fef2f2", text: "#ef4444" },
  };
  const s = map[status];
  return (
    <span
      style={{
        background: s.bg,
        color: s.text,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        padding: "2px 8px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.025em"
      }}
    >
      {status}
    </span>
  );
}

/* --- Quick-action dropdown ---------------------------------------------- */
function ActionMenu({ onSelect }: { onSelect: (action: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const items = [
    { icon: <FiUser size={14} />, label: "View Profile", action: "profile" },
    { icon: <FiFileText size={14} />, label: "View Resume", action: "resume" },
    { icon: <FiCornerUpRight size={14} />, label: "Move Stage", action: "move" },
    { icon: <FiSlash size={14} />, label: "Reject", danger: true, action: "reject" },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          height: "28px",
          width: "28px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          color: "#9ca3af",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          transition: "all 0.15s ease"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; }}
      >
        <FiMoreVertical size={16} />
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "32px",
          zIndex: 30,
          width: "160px",
          overflow: "hidden",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          background: "white",
          padding: "4px 0",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)"
        }}>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setOpen(false);
                onSelect(item.action);
              }}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: "10px",
                padding: "8px 16px",
                textAlign: "left",
                fontSize: "12px",
                fontWeight: 600,
                transition: "all 0.15s ease",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: item.danger ? "#dc2626" : "#374151"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = item.danger ? "#fef2f2" : "#f8fafc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


/* --- Candidate Profile View --------------------------------------------- */
function CandidateProfileView({
  candidate,
  onBack,
  onPrevious,
  onNext,
  currentIndex,
  totalCandidates
}: any) {
  const [notes, setNotes] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "40px" }}>
      {/* Top Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "#4b5563", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
          <FiArrowLeft size={16} /> Back to Candidates
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>Candidate {currentIndex + 1} of {totalCandidates}</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={onPrevious} disabled={currentIndex === 0} style={{ padding: "6px 12px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "13px", fontWeight: 600, color: currentIndex === 0 ? "#9ca3af" : "#374151", cursor: currentIndex === 0 ? "not-allowed" : "pointer" }}>← Previous</button>
            <button onClick={onNext} disabled={currentIndex === totalCandidates - 1} style={{ padding: "6px 12px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "13px", fontWeight: 600, color: currentIndex === totalCandidates - 1 ? "#9ca3af" : "#374151", cursor: currentIndex === totalCandidates - 1 ? "not-allowed" : "pointer" }}>Next →</button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", gap: "20px" }}>
          <img src={candidate.avatar} alt={candidate.name} style={{ width: "80px", height: "80px", borderRadius: "12px", objectFit: "cover" }} />
          <div>
             <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 8px 0", color: "#111827", display: "flex", alignItems: "center" }}>
               {candidate.name} 
               <span style={{ marginLeft: "16px", fontSize: "11px", padding: "4px 8px", background: "#eff6ff", color: "#3b82f6", borderRadius: "4px", fontWeight: 700, letterSpacing: "0.5px" }}>&lt;&gt; {candidate.stage.toUpperCase()}</span>
             </h2>
             <div style={{ fontSize: "14px", color: "#4b5563", marginBottom: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
               <span style={{ fontWeight: 500 }}>{candidate.role}</span>
               <span style={{ color: "#d1d5db" }}>•</span>
               <span>{candidate.department}</span>
             </div>
             <div style={{ fontSize: "13px", color: "#6b7280", display: "flex", gap: "16px", alignItems: "center" }}>
               <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><FiMapPin /> Bangalore, India</span>
               <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><FiClock /> Applied {candidate.appliedDate || "14 days ago"}</span>
             </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "10px 16px", background: "white", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "13px", fontWeight: 700, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
            <FiCalendar /> Schedule Interview
          </button>
          <button style={{ padding: "10px 16px", background: "#ea580c", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 700, color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 12px rgba(234, 88, 12, 0.25)" }}>
            Move Stage <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Action Decision Row */}
      <div style={{ background: "white", padding: "16px 24px", borderRadius: "12px", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
         <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151" }}>Candidate Decision</div>
         <div style={{ display: "flex", gap: "12px" }}>
            <button style={{ padding: "8px 16px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "13px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Shortlist</button>
            <button style={{ padding: "8px 16px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "13px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Hold</button>
            <button style={{ padding: "8px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "6px", fontSize: "13px", fontWeight: 600, color: "#ef4444", cursor: "pointer" }}>Reject</button>
            <button style={{ padding: "8px 16px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "6px", fontSize: "13px", fontWeight: 600, color: "#10b981", cursor: "pointer" }}>Accept / Select</button>
         </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "24px" }}>
        
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
           
           {/* Personal Details */}
           <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: 700, color: "#381c0f", marginBottom: "20px" }}>
                <FiUser style={{ color: "#ea580c" }} /> Personal Details
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                 <div>
                   <div style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>Email</div>
                   <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>{candidate.email}</div>
                 </div>
                 <div>
                   <div style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>Phone</div>
                   <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>{candidate.phone}</div>
                 </div>
                 <div>
                   <div style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>Department</div>
                   <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>{candidate.department}</div>
                 </div>
                 <div>
                   <div style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>Course</div>
                   <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>B.Tech</div>
                 </div>
                 <div>
                   <div style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>Graduation Year</div>
                   <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>2024</div>
                 </div>
                 <div>
                   <div style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>CGPA</div>
                   <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>8.7 / 10.0</div>
                 </div>
              </div>
           </div>

           {/* Application Details */}
           <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: 700, color: "#381c0f", marginBottom: "20px" }}>
                <FiFileText style={{ color: "#ea580c" }} /> Application Details
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <span style={{ fontSize: "13px", color: "#6b7280" }}>Applied Role</span>
                   <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{candidate.role}</span>
                 </div>
                 <div style={{ height: "1px", background: "#f3f4f6" }} />
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <span style={{ fontSize: "13px", color: "#6b7280" }}>Placement Drive</span>
                   <span style={{ fontSize: "13px", fontWeight: 600, color: "#ea580c" }}>{candidate.drive}</span>
                 </div>
                 <div style={{ height: "1px", background: "#f3f4f6" }} />
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <span style={{ fontSize: "13px", color: "#6b7280" }}>Application Date</span>
                   <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{candidate.appliedDate}</span>
                 </div>
                 <div style={{ height: "1px", background: "#f3f4f6" }} />
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <span style={{ fontSize: "13px", color: "#6b7280" }}>Source</span>
                   <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", display: "flex", alignItems: "center", gap: "6px" }}><FiBriefcase size={14}/> University Portal</span>
                 </div>
              </div>
           </div>

           {/* Resume */}
           <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: 700, color: "#381c0f", marginBottom: "20px" }}>
                <FiFileText style={{ color: "#ea580c" }} /> Resume & Documents
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#f9fafb" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "6px", background: "#fee2e2", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                       <FiFileText size={16} />
                    </div>
                    <div>
                       <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{candidate.name.replace(" ", "_")}_Resume.pdf</div>
                       <div style={{ fontSize: "11px", color: "#6b7280" }}>Updated 2 weeks ago • 1.2 MB</div>
                    </div>
                 </div>
                 <div style={{ display: "flex", gap: "8px" }}>
                    <button style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: "4px" }} title="Open in new view"><FiEye size={16} /></button>
                    <button style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: "4px" }} title="Download"><FiDownload size={16} /></button>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
           
           {/* Recruitment Progress */}
           <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: 700, color: "#381c0f" }}>
                   <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#ffedd5", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FiCheckCircle size={14} />
                   </div>
                   Recruitment Progress
                 </div>
                 <span style={{ fontSize: "12px", fontWeight: 600, color: "#ea580c", background: "#ffedd5", padding: "4px 10px", borderRadius: "12px" }}>Stage 4 of 6</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative", padding: "0 20px" }}>
                 <div style={{ position: "absolute", top: "12px", left: "40px", right: "40px", height: "2px", background: "#e5e7eb", zIndex: 0 }} />
                 <div style={{ position: "absolute", top: "12px", left: "40px", width: "50%", height: "2px", background: "#10b981", zIndex: 0 }} />
                 
                 {["Applied", "Screening", "Shortlisted", "Technical", "HR Round", "Selected"].map((step, i) => {
                    let status = "upcoming";
                    if (i < 3) status = "completed";
                    if (i === 3) status = "current";
                    
                    return (
                       <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", position: "relative", zIndex: 1 }}>
                          <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: status === "completed" ? "#10b981" : status === "current" ? "#eff6ff" : "white", border: status === "completed" ? "none" : status === "current" ? "2px solid #3b82f6" : "2px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", color: status === "completed" ? "white" : status === "current" ? "#3b82f6" : "#9ca3af" }}>
                             {status === "completed" ? <FiCheckCircle size={14} /> : status === "current" ? <span style={{ fontSize: "10px", fontWeight: 800 }}>&lt;&gt;</span> : <span style={{ fontSize: "10px", fontWeight: 700 }}>{i+1}</span>}
                          </div>
                          <span style={{ fontSize: "12px", fontWeight: status === "current" ? 700 : 500, color: status === "current" ? "#3b82f6" : "#4b5563" }}>{step}</span>
                       </div>
                    );
                 })}
              </div>
           </div>

           {/* Interviews and Notes Grid */}
           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              
              {/* Interviews */}
              <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: 700, color: "#381c0f" }}>
                      <FiCalendar style={{ color: "#ea580c" }} /> Interviews
                    </div>
                    <button style={{ background: "none", border: "none", color: "#ea580c", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>View All</button>
                 </div>
                 
                 <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {/* Interview 1 */}
                    <div style={{ padding: "16px", border: "1px solid #bfdbfe", borderRadius: "8px", borderLeft: "4px solid #3b82f6", background: "#f8fafc" }}>
                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>Technical Round</div>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: "#3b82f6", background: "#eff6ff", padding: "2px 6px", borderRadius: "4px" }}>IN-PROGRESS</div>
                       </div>
                       <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#6b7280", marginBottom: "12px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><FiCalendar /> Oct 28, 2023</span>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><FiClock /> 10:00 AM</span>
                       </div>
                       <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <img src="https://i.pravatar.cc/150?u=priya2" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                          <span style={{ fontSize: "12px", color: "#4b5563" }}>Priya M. (Interviewer)</span>
                       </div>
                       <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                          <button style={{ flex: 1, padding: "6px", fontSize: "11px", fontWeight: 600, background: "white", border: "1px solid #d1d5db", borderRadius: "4px", color: "#374151", cursor: "pointer" }}>Reschedule</button>
                          <button style={{ flex: 1, padding: "6px", fontSize: "11px", fontWeight: 600, background: "white", border: "1px solid #d1d5db", borderRadius: "4px", color: "#374151", cursor: "pointer" }}>Completed</button>
                       </div>
                    </div>
                    {/* Interview 2 */}
                    <div style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: "#4b5563" }}>Aptitude Test</div>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: "#10b981", background: "#ecfdf5", padding: "2px 6px", borderRadius: "4px" }}>PASSED</div>
                       </div>
                       <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#9ca3af" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><FiCalendar /> Oct 25, 2023</span>
                          <span>Score: 85%</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Recruiter Notes */}
              <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: 700, color: "#381c0f", marginBottom: "20px" }}>
                   <FiMessageSquare style={{ color: "#ea580c" }} /> Recruiter Notes
                 </div>
                 
                 <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", marginBottom: "16px" }}>
                    <div style={{ padding: "12px", background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: "8px" }}>
                       <div style={{ fontSize: "13px", color: "#374151", lineHeight: "1.5", marginBottom: "8px" }}>
                          Strong background in data structures. Mentioned active contribution to open source during initial screening call.
                       </div>
                       <div style={{ fontSize: "11px", color: "#9ca3af", textAlign: "right" }}>- Sarah J. (Oct 26)</div>
                    </div>
                 </div>

                 <div style={{ marginTop: "auto" }}>
                    <textarea 
                       placeholder="Add a note about this candidate..." 
                       value={notes}
                       onChange={(e) => setNotes(e.target.value)}
                       style={{ width: "100%", padding: "12px", fontSize: "13px", border: "1px solid #e5e7eb", borderRadius: "8px", resize: "none", height: "80px", marginBottom: "8px", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                       <button style={{ padding: "8px 16px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Add Note</button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Activity Timeline */}
           <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: 700, color: "#381c0f", marginBottom: "24px" }}>
                <FiClock style={{ color: "#ea580c" }} /> Activity Timeline
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
                 <div style={{ position: "absolute", left: "6px", top: "10px", bottom: "10px", width: "2px", background: "#e5e7eb" }} />
                 
                 {[
                    { title: "Technical Interview Scheduled", date: "Oct 27, 2023 • 14:30 PM", active: true },
                    { title: "Shortlisted for Technical Round", date: "Oct 26, 2023 • 09:15 AM", active: false },
                    { title: "Aptitude Test Completed", date: "Oct 25, 2023 • 11:45 AM", active: false },
                    { title: "Application Submitted", date: "Oct 24, 2023 • 18:20 PM", active: false },
                 ].map((evt, i) => (
                    <div key={i} style={{ display: "flex", gap: "16px", position: "relative", zIndex: 1 }}>
                       <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: evt.active ? "#3b82f6" : "white", border: evt.active ? "2px solid white" : "2px solid #d1d5db", marginTop: "2px", outline: evt.active ? "1px solid #3b82f6" : "none" }} />
                       <div>
                          <div style={{ fontSize: "14px", fontWeight: evt.active ? 600 : 500, color: evt.active ? "#111827" : "#4b5563", marginBottom: "2px" }}>{evt.title}</div>
                          <div style={{ fontSize: "12px", color: "#9ca3af" }}>{evt.date}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN PAGE COMPONENT
   ========================================================================= */

export default function CompanyCandidates() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/company/dashboard", icon: <FiGrid size={17} /> },
    { name: "Placement Drives", path: "/company/drives", icon: <FiSend size={17} /> },
    { name: "Candidates", path: "/company/candidates", icon: <FiUsers size={17} /> },
    { name: "Interviews", path: "/company/interviews", icon: <FiCalendar size={17} /> },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [driveFilter, setDriveFilter] = useState("All Placement Drives");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [sortBy, setSortBy] = useState("Latest Applied");

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  /* -- Filter logic ------------------------------------------------------ */
  const filteredCandidates = CANDIDATES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDrive = driveFilter === "All Placement Drives" || c.drive === driveFilter;
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    const matchesDept = deptFilter === "All Departments" || c.department === deptFilter;
    return matchesSearch && matchesDrive && matchesStatus && matchesDept;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setDriveFilter("All Placement Drives");
    setStatusFilter("All");
    setDeptFilter("All Departments");
    setSortBy("Latest Applied");
  };

  /* -- Action handlers --------------------------------------------------- */
  const handleAction = (action: string, candidate: Candidate) => {
    if (action === "profile") {
      setSelectedCandidate(candidate);
    } else {
      alert(`Action '${action}' triggered for ${candidate.name}`);
    }
  };

  /* -- KPI computation --------------------------------------------------- */
  const kpiData = [
    {
      label: "TOTAL CANDIDATES",
      value: "1,248",
      subtext: "+12% this week",
      icon: <FiUsers size={18} />,
      accent: "#10b981", // green text
    },
    {
      label: "NEW APPLICATIONS",
      value: "24",
      subtext: "Since last login",
      icon: <FiFileText size={18} />,
      accent: "#6b7280", // gray text
    },
    {
      label: "SHORTLISTED",
      value: "312",
      subtext: "25% conversion",
      icon: <FiUser size={18} />, // Need to replace FiUserCheck, using FiUser
      iconAlt: <FiUser size={18} />,
      accent: "#ea580c", // orange text
    },
    {
      label: "INTERVIEWS",
      value: "18",
      subtext: "Scheduled this week",
      icon: <FiCalendar size={18} />,
      accent: "#ea580c", // orange text
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fb", fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
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
                <button key={item.name} type="button" onClick={() => navigate(item.path)} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: isActive ? 700 : 500, color: isActive ? "white" : "#4b5563", background: isActive ? "#381c0f" : "transparent", border: "none", cursor: "pointer", transition: "all 0.15s ease", textAlign: "left" }} onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(255, 237, 213, 0.5)"; e.currentTarget.style.color = "#7c2d12"; } }} onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4b5563"; } }}>
                  <span style={{ color: isActive ? "#ea580c" : "#9ca3af" }}>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div style={{ padding: "16px 12px", borderTop: "1px solid #f3f4f6" }}>
          <button type="button" onClick={() => navigate("/company/profile")} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: location.pathname === "/company/profile" ? 700 : 500, color: location.pathname === "/company/profile" ? "white" : "#4b5563", background: location.pathname === "/company/profile" ? "#381c0f" : "transparent", border: "none", cursor: "pointer", transition: "all 0.15s ease", textAlign: "left" }} onMouseEnter={(e) => { if (location.pathname !== "/company/profile") { e.currentTarget.style.background = "rgba(255, 237, 213, 0.5)"; e.currentTarget.style.color = "#7c2d12"; } }} onMouseLeave={(e) => { if (location.pathname !== "/company/profile") { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4b5563"; } }}>
            <FiLayers size={17} style={{ color: location.pathname === "/company/profile" ? "#ea580c" : "#9ca3af" }} />
            <span>Company Profile</span>
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        <div style={{ padding: "32px 32px 64px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
          {selectedCandidate ? (
            <CandidateProfileView 
              candidate={selectedCandidate} 
              onBack={() => setSelectedCandidate(null)}
              currentIndex={CANDIDATES.findIndex(c => c.id === selectedCandidate.id)}
              totalCandidates={CANDIDATES.length}
              onPrevious={() => {
                const idx = CANDIDATES.findIndex(c => c.id === selectedCandidate.id);
                if (idx > 0) setSelectedCandidate(CANDIDATES[idx - 1]);
              }}
              onNext={() => {
                const idx = CANDIDATES.findIndex(c => c.id === selectedCandidate.id);
                if (idx < CANDIDATES.length - 1) setSelectedCandidate(CANDIDATES[idx + 1]);
              }}
            />
          ) : (
            <>
          {/* ═══════ Top Content Header ═══════ */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#381c0f", margin: "0 0 4px", letterSpacing: "-0.5px" }}>
                Candidates
              </h1>
              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
                Review, filter and manage candidates across your recruitment drives.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginRight: "8px" }}>
                <button
                  type="button"
                  style={{ position: "relative", width: "40px", height: "40px", borderRadius: "10px", background: "white", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", cursor: "pointer", transition: "all 0.15s ease", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                >
                  <FiBell size={18} />
                  <span style={{ position: "absolute", top: "8px", right: "8px", width: "8px", height: "8px", borderRadius: "50%", background: "#ea580c", border: "2px solid white" }} />
                </button>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 12px 4px 4px", borderRadius: "9999px", background: "white", border: "1px solid #e5e7eb", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                >
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: 700 }}>
                    MS
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#1f2937" }}>Microsoft HR</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "white",
                    color: "#374151",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: 700,
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f9fafb"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "white"; }}
                >
                  <FiUserPlus size={16} />
                  <span>Add Candidate</span>
                </button>
                <button
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#ea580c",
                    color: "white",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(234, 88, 12, 0.25)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#c2410c"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#ea580c"; }}
                >
                  <FiDownload size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* ═══════ KPI Row (Compact Stat Cards) ═══════ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "14px",
            }}
          >
            {kpiData.map((kpi, idx) => (
              <div
                key={kpi.label}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px", color: "#6b7280" }}>
                    {kpi.label}
                  </span>
                  <span style={{ color: "#9ca3af" }}>{kpi.iconAlt || kpi.icon}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#381c0f", letterSpacing: "-0.5px" }}>
                    {kpi.value}
                  </div>
                  {idx === 0 ? (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 6px", background: "#ecfdf5", borderRadius: "4px", color: "#047857", fontSize: "10px", fontWeight: 700 }}>
                      <FiTrendingUp size={10} />
                      {kpi.subtext}
                    </div>
                  ) : idx === 2 ? (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 6px", background: "#ffedd5", borderRadius: "4px", color: "#c2410c", fontSize: "10px", fontWeight: 700 }}>
                      {kpi.subtext}
                    </div>
                  ) : (
                    <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 500, paddingBottom: "4px" }}>
                      {kpi.subtext}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ═══════ Main Content Section ═══════ */}
          <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>

            {/* Filter Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: "8px",
                padding: "12px 16px",
                borderBottom: "1px solid #e5e7eb",
                width: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              {/* Search */}
              <div style={{ position: "relative", flex: "1 1 220px", minWidth: "200px" }}>
                <FiSearch
                  size={14}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search candidate, email or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    height: "34px",
                    boxSizing: "border-box",
                    padding: "6px 10px 6px 30px",
                    fontSize: "12px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    outline: "none",
                    background: "#f9fafb",
                  }}
                />
              </div>

              {/* Placement Drive */}
              <select
                value={driveFilter}
                onChange={(e) => setDriveFilter(e.target.value)}
                style={{
                  width: "190px",
                  height: "34px",
                  padding: "6px 10px",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  outline: "none",
                  cursor: "pointer",
                  background: "white",
                  flexShrink: 0,
                }}
              >
                <option value="All Placement Drives">All Placement Drives</option>
                <option value="Microsoft 2026">Microsoft 2026</option>
                <option value="Analytics Drive">Analytics Drive</option>
                <option value="Product Drive">Product Drive</option>
                <option value="QA Drive">QA Drive</option>
              </select>

              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: "130px",
                  height: "34px",
                  padding: "6px 10px",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  outline: "none",
                  cursor: "pointer",
                  background: "white",
                  flexShrink: 0,
                }}
              >
                <option value="All">Status: All</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Applied">Applied</option>
                <option value="Rejected">Rejected</option>
              </select>

              {/* Department */}
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                style={{
                  width: "190px",
                  height: "34px",
                  padding: "6px 10px",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  outline: "none",
                  cursor: "pointer",
                  background: "white",
                  flexShrink: 0,
                }}
              >
                <option value="All Departments">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business Admin">Business Admin</option>
              </select>

              {/* Clear Filters */}
              <button
                type="button"
                onClick={clearFilters}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ea580c",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "0 6px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                Clear Filters
              </button>

              {/* Sort */}
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    whiteSpace: "nowrap",
                  }}
                >
                  Sort by:
                </span>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: "150px",
                    height: "34px",
                    padding: "6px 10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    outline: "none",
                    cursor: "pointer",
                    background: "white",
                    flexShrink: 0,
                  }}
                >
                  <option value="Latest Applied">Latest Applied</option>
                  <option value="Oldest First">Oldest First</option>
                  <option value="Name A-Z">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
                    <th style={{ padding: "10px 16px", fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>Candidate</th>
                    <th style={{ padding: "10px 16px", fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>Applied Role</th>
                    <th style={{ padding: "10px 16px", fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>Department</th>
                    <th style={{ padding: "10px 16px", fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>Application Date</th>
                    <th style={{ padding: "10px 16px", fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>Current Stage</th>
                    <th style={{ padding: "10px 16px", fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>Status</th>
                    <th style={{ padding: "10px 16px", fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "right", whiteSpace: "nowrap" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate, idx) => (
                    <tr key={candidate.id} style={{ borderBottom: idx === filteredCandidates.length - 1 ? "none" : "1px solid #e5e7eb", transition: "background 0.15s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"} onMouseLeave={(e) => e.currentTarget.style.background = "white"}>
                      <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <img src={candidate.avatar} alt={candidate.name} style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }} />
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{candidate.name}</div>
                            <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>{candidate.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "10px 16px", fontSize: "12px", color: "#374151", whiteSpace: "nowrap" }}>{candidate.role}</td>
                      <td style={{ padding: "10px 16px", fontSize: "12px", color: "#6b7280", whiteSpace: "nowrap" }}>{candidate.department}</td>
                      <td style={{ padding: "10px 16px", fontSize: "12px", color: "#6b7280", whiteSpace: "nowrap" }}>{candidate.appliedDate}</td>
                      <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#374151" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: candidate.status === "Rejected" ? "#ef4444" : candidate.status === "Selected" ? "#10b981" : candidate.status === "Shortlisted" ? "#3b82f6" : "#ea580c" }} />
                          {candidate.stage}
                        </div>
                      </td>
                      <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                        <StatusBadge status={candidate.status} />
                      </td>
                      <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px" }}>
                          <button
                            type="button"
                            onClick={() => setSelectedCandidate(candidate)}
                            style={{ background: "none", border: "none", color: "#ea580c", fontSize: "12px", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
                          >
                            View Profile
                          </button>
                          <ActionMenu onSelect={(action) => handleAction(action, candidate)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCandidates.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: "48px 20px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                        No candidates match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #e5e7eb", background: "#fdfdfd", borderRadius: "0 0 12px 12px" }}>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>
                Showing 1-{Math.min(10, filteredCandidates.length)} of {filteredCandidates.length} candidates
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button type="button" disabled style={{ padding: "6px 12px", fontSize: "12px", fontWeight: 600, color: "#9ca3af", background: "white", border: "1px solid #e5e7eb", borderRadius: "6px", cursor: "not-allowed" }}>
                  Previous
                </button>
                <button type="button" style={{ padding: "6px 12px", fontSize: "12px", fontWeight: 600, color: "#374151", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer" }}>
                  Next
                </button>
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
