import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiPlus,
  FiChevronDown,
  FiEdit2,
  FiSend,
  FiCheckCircle,
  FiClipboard,
} from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import "../../styles/crm.css";

/* ── local data ── */

const timelineEvents = [
  {
    id: 1,
    icon: <FiSend size={14} />,
    iconBg: "#fef0e6",
    iconColor: "#c2410c",
    title: "Drive Confirmation Email Sent",
    date: "Today, 10:30 AM",
    description:
      "Sent final logistical details for the upcoming placement drive on Nov 15th.",
    badges: [
      { label: "Status: Sent", className: "crm-badge-outline" },
    ],
    user: "Rahul Sharma",
  },
  {
    id: 2,
    icon: <FiClipboard size={14} />,
    iconBg: "#fef0e6",
    iconColor: "#c2410c",
    title: "Meeting: Role Requirements",
    date: "Oct 28, 2:00 PM",
    description:
      "Discussed specific skill requirements for SDE-1 roles. They need React and Node.js proficiency.",
    badges: [
      { label: "Completed", className: "crm-badge-green" },
    ],
    user: "Priya Patel",
  },
  {
    id: 3,
    icon: <FiMail size={14} />,
    iconBg: "#fef0e6",
    iconColor: "#c2410c",
    title: "Initial Cold Email",
    date: "Oct 15, 9:00 AM",
    description:
      "Automated outreach sequence initiated for 2024 batch hiring.",
    badges: [
      { label: "Opened", className: "crm-badge-outline" },
    ],
    user: "System",
  },
];

const pendingTasks = [
  {
    id: 1,
    task: "Share Student Profiles",
    dueDate: "Nov 10, 2023",
    priority: "High",
    priorityClass: "crm-priority-high",
    assignedTo: "Priya Patel",
    status: "In Progress",
    statusClass: "crm-status-progress",
  },
  {
    id: 2,
    task: "Confirm Interview Panels",
    dueDate: "Nov 12, 2023",
    priority: "Med",
    priorityClass: "crm-priority-med",
    assignedTo: "Rahul Sharma",
    status: "Pending",
    statusClass: "crm-status-pending",
  },
];

const pipelineSteps = ["Prospect", "Contacted", "Drive Confirmed", "Archived"];
const currentStep = 2; // 0-indexed → "Drive Confirmed"

/* ── component ── */

export default function CRM() {
  return (
    <div className="crm-container">
      {/* ─── Header Row ─── */}
      <div className="crm-header">
        <div className="crm-header-left">
          <div className="crm-company-select">
            <span>Microsoft India</span>
            <FiChevronDown size={16} />
          </div>
          <span className="crm-tier-badge">Tier 1 Partner</span>
        </div>

        <div className="crm-header-actions">
          <button className="crm-action-btn">
            <FiMail size={14} />
            <span>Send Email</span>
          </button>
          <button className="crm-action-btn">
            <FiPhone size={14} />
            <span>Log Call</span>
          </button>
          <button className="crm-action-btn">
            <FiCalendar size={14} />
            <span>Schedule Meeting</span>
          </button>
          <button className="crm-action-btn crm-action-primary">
            <FiPlus size={14} />
            <span>Add Follow-up</span>
          </button>
        </div>
      </div>

      {/* ─── Main Grid ─── */}
      <div className="crm-grid">
        {/* ── Left Column ── */}
        <div className="crm-left">
          {/* Communication Timeline */}
          <div className="crm-card">
            <div className="crm-card-header">
              <div className="crm-card-title">
                <HiOutlineSpeakerphone size={16} />
                <h3>Communication Timeline</h3>
              </div>
            </div>

            <div className="crm-timeline">
              {timelineEvents.map((evt, idx) => (
                <div className="crm-timeline-item" key={evt.id}>
                  {/* Dot + line */}
                  <div className="crm-timeline-track">
                    <div
                      className="crm-timeline-dot"
                      style={{ background: evt.iconBg, color: evt.iconColor }}
                    >
                      {evt.icon}
                    </div>
                    {idx < timelineEvents.length - 1 && (
                      <div className="crm-timeline-line" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="crm-timeline-content">
                    <div className="crm-timeline-row">
                      <strong>{evt.title}</strong>
                      <span className="crm-timeline-date">{evt.date}</span>
                    </div>
                    <p className="crm-timeline-desc">{evt.description}</p>
                    <div className="crm-timeline-meta">
                      {evt.badges.map((b) => (
                        <span key={b.label} className={b.className}>
                          {b.label}
                        </span>
                      ))}
                      <span className="crm-timeline-user">👤 {evt.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="crm-card">
            <div className="crm-card-header">
              <div className="crm-card-title">
                <FiClipboard size={16} />
                <h3>Pending Tasks</h3>
              </div>
              <button className="crm-add-task-btn">
                <FiPlus size={13} /> Add Task
              </button>
            </div>

            <table className="crm-task-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingTasks.map((t) => (
                  <tr key={t.id}>
                    <td className="crm-task-name">{t.task}</td>
                    <td className="crm-task-date">{t.dueDate}</td>
                    <td>
                      <span className={`crm-priority-badge ${t.priorityClass}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td>
                      <div className="crm-assigned">
                        <img
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=60"
                          alt={t.assignedTo}
                          className="crm-avatar-sm"
                        />
                        <span>{t.assignedTo}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`crm-status-badge ${t.statusClass}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="crm-right">
          {/* Pipeline Status */}
          <div className="crm-card">
            <div className="crm-card-header">
              <h3 className="crm-card-title-text">Pipeline Status</h3>
              <span className="crm-pipeline-current-badge">Drive Confirmed</span>
            </div>

            <div className="crm-pipeline">
              <div className="crm-pipeline-track">
                {pipelineSteps.map((_, i) => (
                  <div key={i} className="crm-pipeline-segment">
                    <div
                      className={`crm-pipeline-node ${
                        i <= currentStep ? "crm-pipeline-node-active" : ""
                      }`}
                    />
                    {i < pipelineSteps.length - 1 && (
                      <div
                        className={`crm-pipeline-bar ${
                          i < currentStep ? "crm-pipeline-bar-active" : ""
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="crm-pipeline-labels">
                {pipelineSteps.map((step, i) => (
                  <span
                    key={step}
                    className={
                      i <= currentStep ? "crm-pipeline-label-active" : ""
                    }
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Next Follow-up */}
          <div className="crm-followup-card">
            <div className="crm-followup-header">
              <div>
                <span className="crm-followup-label">Next Follow-up</span>
                <h2 className="crm-followup-date">Nov 10</h2>
              </div>
              <FiCalendar size={28} className="crm-followup-icon" />
            </div>

            <p className="crm-followup-desc">
              Finalize Logistics &amp; Travel details for the HR team.
            </p>

            <div className="crm-followup-footer">
              <div className="crm-followup-user">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=60"
                  alt="Priya Patel"
                  className="crm-avatar-md"
                />
                <div>
                  <span className="crm-followup-responsible">Responsible</span>
                  <strong>Priya Patel</strong>
                </div>
              </div>
              <button className="crm-followup-edit">
                <FiEdit2 size={16} />
              </button>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="crm-card">
            <div className="crm-card-header">
              <div className="crm-card-title">
                <FiCheckCircle size={16} />
                <h3>Internal Notes</h3>
              </div>
              <button className="crm-notes-edit">Edit</button>
            </div>

            <div className="crm-notes-body">
              <p>
                <strong>Nov 1:</strong> HR confirmed they will be visiting
                campus. Looking to hire 15-20 SDEs. Compensation is unchanged
                from last year.
              </p>
              <p>
                <strong>Oct 28:</strong> Met with lead recruiter. They
                emphasized need for strong fundamentals in DSA. Advised
                placement training team to focus on mock technical interviews
                next week.
              </p>
              <p>
                <strong>Note:</strong> Ensure the main auditorium is booked for
                the pre-placement talk on Nov 14. Confirm AV equipment
                availability with admin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
