import StatCard from "../../components/common/StatCard";
import { stats } from "../../data/dashboardData";
import DriveTable from "../../components/common/DriveTable";
import FollowUps from "../../components/common/FollowUps";
import ActivityTimeline from "../../components/common/ActivityTimeline";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>Good morning, Placement Team</h1>
          <p>Thursday, August 6, 2026</p>
        </div>

        <div className="dashboard-actions">
          <button className="dash-btn dash-btn-outline">Post Drive</button>
          <button className="dash-btn dash-btn-outline">Export Report</button>
          <button className="dash-btn dash-btn-primary">+ Add Company</button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            badge={item.badge}
          />
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main-col">
          <DriveTable />
          <FollowUps />
        </div>

        <div className="dashboard-side-col">
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}