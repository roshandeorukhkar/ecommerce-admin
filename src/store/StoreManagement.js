import React from 'react';
import AddListStore from "./AddListStore";
import AdminLayout from '../core/AdminLayout';

const StoreManagement = (props) => {

    return (
        <>
            <div id="wrapper">
                <AdminLayout data={props}>
                    <AddListStore {...props}/>
                </AdminLayout>
            </div>
        </>
    )

}


export default StoreManagement;