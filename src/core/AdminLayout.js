import React from "react";
import Menu from "./Menu";
import "../styles.css";
import { Link } from "react-router-dom"
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
const AdminLayout = ({
    data,
    children,
    title
}) => {
    return (
        <div id="wrapper">
            <AdminHeader {...data}/>
            <AdminSidebar {...data}/>
            {children}
        </div>
    );
}

export default AdminLayout;