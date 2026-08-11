import {
  FiMail,
  FiPhone,
  FiFileText,
} from "react-icons/fi";

const followUps = [
  {
    icon: <FiMail />,
    title: "Email Google HR",
    subtitle: "Regarding final interview schedule",
  },
  {
    icon: <FiPhone />,
    title: "Call Wipro SPOC",
    subtitle: "Confirm tentative dates for Dec",
  },
  {
    icon: <FiFileText />,
    title: "Send student list to IBM",
    subtitle: "Shortlisted candidates for round 2",
  },
];

export default function FollowUps() {
  return (
    <div className="follow-ups">

      <div className="follow-header">
        <h2>Pending Follow-ups</h2>

        <span className="urgent-tag">
          3 Urgent
        </span>
      </div>

      {followUps.map((item, index) => (

        <div key={index} className="follow-card">

          <div className="follow-icon">
            {item.icon}
          </div>

          <div>
            <h4>{item.title}</h4>
            <p>{item.subtitle}</p>
          </div>

        </div>

      ))}

    </div>
  );
}