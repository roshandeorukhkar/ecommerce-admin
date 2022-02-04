import React from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import AddListStore from "./AddListStore";

const StoreManagement = () =>{

    return(
        <>
        <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <AddListStore />
        </div>
        </>
    )

}


export default StoreManagement;