import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="main-section">

        <TopNavbar />

        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}