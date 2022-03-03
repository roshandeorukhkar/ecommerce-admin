import React from 'react';
import ManageAttribute from "./ManageAttribute";
import { Link } from "react-router-dom";

const Attribute = () => {

    return (
        <>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <h2 className="font-bold"> Attribute Management 
                            <Link to={`create/addAttributenew`}><button type="submit" className="btn  btn-outline   btn-info fa-pull-right"> Add Attribute</button></Link>
                            <button type="submit" className="btn  btn-outline btn-info fa-pull-right" style={{float: 'right', height:'42px', marginRight:'20px'}}><i className="fa fa-search font-15"></i></button>
                            <input type="text" placeholder='search' style={{float: 'right'}} />
                        </h2><br></br>
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