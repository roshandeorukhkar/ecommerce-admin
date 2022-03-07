import React from 'react';
import ManageManufacturer from "./ManageManufacturer";
import { Link } from "react-router-dom";

const Manufacturer = () => {

    return (
        <>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle"> Manufacturer Management </p></div>
                            <div className='col-md-4'><p> <Link to={`create/manufacturer`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton">Add Manufacturer</button></Link> <button type="submit" className="btn btn-info btn-outline " id="DeletButton">Delete <i className="fa fa-trash-o"></i></button></p></div>
                        </div>
                        <div className="white-box">
                            <div className="row" >
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