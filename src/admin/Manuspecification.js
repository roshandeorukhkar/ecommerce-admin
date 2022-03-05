import React from 'react';
import { Link } from "react-router-dom";
import Managespecification from "./Managespecification";
import AdminLayout from "../core/AdminLayout";

const Manufacturer = () => {

    return (
        <AdminLayout>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <h2 className="font-bold"> Product Specification
                            <Link to={`specification`}><button type="submit" className="btn  btn-outline btn-rounded  btn-info fa-pull-right"><i className="fa fa-plus-circle"></i> Add Specification</button></Link></h2>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <Managespecification />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </AdminLayout>
    )

}


export default Manufacturer;