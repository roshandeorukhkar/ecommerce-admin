import React from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { Link } from "react-router-dom";
import CustomerList from "./Customer";

const CustomerManagement = () =>{

    return(
            <>
              <AdminHeader />
              <AdminSidebar />
                <div id="wrapper">
                    <div className="page-wrapper">
                        <div className="container-fluid">
                                <h2 className="font-bold"> Customers
                                {/* <Link to={`create/customer`}>
                                    <button type="submit" className="btn  btn-outline btn-rounded  btn-info fa-pull-right"><i className="fa fa-plus-circle"></i> Add Customer</button>
                                </Link> */}
                                <button className='btn btn-info' style={{float: 'right', height:'42px'}}><i className='fa fa-search font-15'></i></button>
                                <input type="text" style={{float: 'right'}} />
                                </h2><br></br>
                                <div className="white-box">
                                    <div className="row">
                                        <div className="col-lg-12">
                                             <CustomerList />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
          </>
    )

}


export default CustomerManagement;