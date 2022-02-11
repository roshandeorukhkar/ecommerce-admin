import React from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { Link } from "react-router-dom";
import ManageManufacturer from "./ManageManufacturer";

const Manufacturer = () =>{

    return(
        <>
        <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
            <div className="container-fluid">
                <h2 className="font-bold"> List Management 
                <Link to={`create/manufacturer`}><button type="submit" className="btn  btn-outline btn-rounded  btn-info fa-pull-right"><i className="fa fa-plus-circle"></i> Add Manufacturer</button></Link></h2>
                <div className="white-box">
                    <div className="row">
                        <div className="col-lg-12">
                                <ManageManufacturer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        </div>
        </>
    )

}


export default Manufacturer;