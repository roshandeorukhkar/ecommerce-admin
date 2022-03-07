import React from 'react';
import AdminStatisticPage from './AdminStatisticPage';
import AdminLayout from "../core/AdminLayout";

const AdminStatistics = (props) =>{
   

    return(
        <AdminLayout data={props}>
            <AdminStatisticPage {...props} />
        </AdminLayout>
    )

}

export default AdminStatistics;

