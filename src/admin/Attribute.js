import React from 'react';
import ManageAttribute from "./ManageAttribute";
import { Link } from "react-router-dom";

const Attribute = () => {

    return (
        <>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-4'><p id="hedingTitle">Attribute Management  </p></div>
                            <div className='col-md-4'><p><button type="submit" className="btn btn-info fa-pull-right" style={{height:'33px'}}><i className="fa fa-search"></i></button> <input type="text" id="search" placeholder='search' style={{float: 'right'}} /></p></div>
                            <div className='col-md-4'><p> <Link to={`create/addAttributenew`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton">Add Attribute</button></Link> <button type="submit" className="btn btn-info btn-outline " id="DeletButton">Delete <i className="fa fa-trash-o"></i></button></p></div>
                        </div>

                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ManageAttribute/>
                                        {/* pegination start */}
                                        <ul className="pagination" style={{float: 'right'}}>
                                            <li className='page-item'><a className="page-link" href="#">Previous</a></li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item "><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                        </ul>
                                        {/* pegination start */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )

}


export default Attribute;