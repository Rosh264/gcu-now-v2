import { activities } from "../../data/activityData";

export default function ActivityTimeline() {
  return (
    <div className="activity-card">

      <h2>Recent Activities</h2>

      {activities.map((item, index) => (

        <div
          key={index}
          className="activity-item"
        >
          <div className="activity-dot"></div>

          <div>

            <h4>{item.title}</h4>

            <p>{item.desc}</p>

            <span>{item.time}</span>

          </div>

        </div>

      ))}

    </div>
  );
}