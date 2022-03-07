import React from "react";
import AdminLayout from '../core/AdminLayout';
import { Link } from "react-router-dom";

const AllUser = (props) =>{
    return(
        <>
          <AdminLayout data={props}>
          <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-4'><p id="hedingTitle"> User Management </p></div>
                            <div className='col-md-4'><p><button type="submit" className="btn btn-info fa-pull-right" style={{height:'33px'}}><i className="fa fa-search"></i></button> <input type="text" id="search" placeholder='search' style={{float: 'right'}} /></p></div>
                            <div className='col-md-4'><p> <Link to={`create/users`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton">Add User</button></Link> <button type="submit" className="btn btn-info btn-outline " id="DeletButton">Delete <i className="fa fa-trash-o"></i></button></p></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <h1>welcome all user................</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              
         </AdminLayout>
        </>
    );
}
export default AllUser;