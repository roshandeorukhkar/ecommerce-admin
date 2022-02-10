import React from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import ManufacturerList from "./ListManufacturer";

const ManufacturerManagement = () =>{

    return(
        <>
        <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
          
            <div className="page-wrapper">
            <div className="container-fluid">
                <h2 className="font-bold"> Manufacturer Management 
                <button type="submit" className="btn  btn-outline btn-rounded  btn-info fa-pull-right"><a href='admin/manufacturer/add'><i className="fa fa-plus-circle"></i> Add Manufacturer</a></button></h2>
                <div className="white-box">
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="box-title">List Manufacturer</h4>
                            <hr />
                            <ManufacturerList/>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>   
        </div>
        </>
    )

}


export default ManufacturerManagement;