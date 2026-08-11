import { FiFileText, FiPlus } from "react-icons/fi";
import CompanyStats from "../../components/common/CompanyStats";
import CompanyTable from "../../components/common/CompanyTable";

export default function Companies() {
  return (
    <div className="companies-container">
      <div className="page-header">
        <div>
          <h1>Company Management</h1>
          <p>
            Track and manage your corporate partners and placement opportunities.
          </p>
        </div>

        <div className="header-actions">
          <button className="secondary-btn flex-btn">
            <FiFileText size={16} />
            <span>Import Excel</span>
          </button>

          <button className="primary-orange-btn flex-btn">
            <FiPlus size={18} />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      <CompanyStats />

      <CompanyTable />
    </div>
  );
}