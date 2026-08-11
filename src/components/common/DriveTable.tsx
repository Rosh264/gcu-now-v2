import { drives } from "../../data/dashboardData";

export default function DriveTable() {
  return (
    <div className="drive-table">

      <div className="table-header">
        <h2>Upcoming Placement Drives</h2>

        <button>View All →</button>
      </div>

      <table>

        <thead>
          <tr>
            <th>Company</th>
            <th>Date</th>
            <th>Stream</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {drives.map((drive) => (

            <tr key={drive.company}>

              <td>{drive.company}</td>

              <td>{drive.date}</td>

              <td>{drive.stream}</td>

              <td>
                <span
                  className={
                    drive.status === "Confirmed"
                      ? "status confirmed"
                      : "status tentative"
                  }
                >
                  {drive.status}
                </span>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}