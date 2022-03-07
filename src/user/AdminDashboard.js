import React from "react";
import AdminLayout from "../core/AdminLayout";
import { isAuthenticated } from "../auth/Cutomer";
import { Link } from "react-router-dom";

import AdminDashboardContent from './AdminDashboardContent';

const AdminDashboard = (props) => {
    return(
        <AdminLayout data={props}>
            <AdminDashboardContent {...props} />
        </AdminLayout>            
    )
};

export default AdminDashboard;
