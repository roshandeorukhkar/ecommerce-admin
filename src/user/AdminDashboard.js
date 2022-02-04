import React from "react";
import AdminLayout from "../core/AdminLayout";
import { isAuthenticated } from "../auth/Cutomer";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminDashboardContent from './AdminDashboardContent';

const AdminDashboard = () => {
    return(
        <>
        <div id="wrapper">
            {/* <div className="preloader">
                <div className="cssload-speeding-wheel"></div>
            </div> */}
            <AdminHeader />
            <AdminSidebar />
            <AdminDashboardContent />
        </div>
            {/* <Link to="admin/addRollManagement"> Roll Management</Link> */}
        </>
    )
};

export default AdminDashboard;
