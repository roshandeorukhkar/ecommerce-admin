import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNotification from './AdminNotification';

const AdminHeader = () =>{

    const [showNotification ,setShowNotification] = useState(false);
    const [showLogin , setShowLogin] = useState(false);

    return(
    <>
    <nav className="navbar navbar-default navbar-static-top m-b-0">
        <div className="navbar-header">
        <Link className="navbar-toggle font-20 hidden-sm hidden-md hidden-lg " to='#' data-toggle="collapse" data-target=".navbar-collapse">
            <i className="fa fa-bars"></i>
        </Link>
        <div className="top-left-part">
            <Link className="logo" to="index.html">
                <b>
                    Logo{/* <img src="/assets/plugins/images/logo.png" alt="home" /> */}
                </b>
                <span>
                    {/* <img src="/assets/plugins/images/logo-text.png" alt="homepage" className="dark-logo" /> */}
                   Ecommerce
                </span>
            </Link>
        </div>
        {/* <ul className="nav navbar-top-links navbar-left hidden-xs">
            <li>
                <Link to="#" className="sidebartoggler font-20 waves-effect waves-light"><i className="icon-arrow-left-circle"></i></Link>
            </li>
        </ul> */}
        <ul className="nav navbar-top-links navbar-right pull-right">
                {/* <li className={`dropdown ${showNotification == true ? "open" : ""}`}>
                <Link to="#" className="dropdown-toggle waves-effect waves-light font-20" data-toggle="dropdown" onClick={() => setShowNotification(!showNotification)}>
                    <i className="icon-bell"></i>
                    <span className="badge badge-xs badge-danger">8</span>
                </Link>
               <AdminNotification />
            </li> */}
            <li className={`dropdown right-side-toggle ${showLogin == true ?"open" : "" }`}>
                <Link to="#" className="dropdown-toggle right-side-toggler waves-effect waves-light b-r-0" data-toggle="dropdown"  style={{display: "inline-flex"}}  onClick={() => setShowLogin(!showLogin)}>
                    {/* <img src="/assets/plugins/images/users/hanna.jpg" alt="user-img" className="img-circle m-t-10 m-r-10 thumb-sm"  /> */}
                    <p className='p-t-5'> 
                        <span className='font-bold text-dark'> Admin</span> 
                        <span className='font-12'>admin@gmail.com</span>
                    </p>
                    <i className="icon-arrow-down m-t-15" ></i>
                </Link>
                <ul className="dropdown-menu mailbox animated bounceInDown">
                    <li>
                        <div className="drop-title">
                            <p></p>
                           <center> <Link to='/' className='btn btn-primary btn-outline'>Logout</Link></center>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        </div>
    </nav>
    </>
    )
};

export default AdminHeader;
