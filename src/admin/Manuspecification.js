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
                        <div className='row'>
                            <div className='col-md-4'><p id="hedingTitle"> Specification Management </p></div>
                            <div className='col-md-4'><p><button type="submit" className="btn btn-info fa-pull-right" style={{height:'33px'}}><i className="fa fa-search"></i></button> <input type="text" id="search" placeholder='search' style={{float: 'right'}} /></p></div>
                            <div className='col-md-4'><p> <Link to={`specification`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton">Add Specification</button></Link> </p></div>
                        </div>
                    
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