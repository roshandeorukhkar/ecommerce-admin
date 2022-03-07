import React from "react";
import AdminLayout from "../core/AdminLayout";
import AddListRoleManagement from "./AddListRoleManagement";


const RoleManagement = (props) =>{
    return(
        <>
        <AdminLayout data={props}>
            <AddListRoleManagement {...props} />
        </AdminLayout>  
        </>
    )
} 
export default RoleManagement;