import React from 'react';
import { Link } from "react-router-dom";
import Managespecification from "./Managespecification";
import AdminLayout from "../core/AdminLayout";
<<<<<<< HEAD

=======
>>>>>>> 000757bfba4cb4d576adf815d8a08bb3e4380134
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
<<<<<<< HEAD
=======
                                    <ul className="pagination" style={{float: 'right'}}>
                                        <li className='page-item'><a className="page-link" href="#">Previous</a></li>
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item "><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
>>>>>>> 000757bfba4cb4d576adf815d8a08bb3e4380134
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