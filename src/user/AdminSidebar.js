import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {

    const [productSubMenu, setProductSubMenu] = useState(false);

    return (
        <>
            <aside className="sidebar">
                <div className="scroll-sidebar">
                    <div className="user-profile">
                        <div className='profile-image' >
                            <img src="/assets/plugins/images/users/hanna.jpg" alt="user-img" className="img-circle" />
                        </div>
                        <div className="profile-name p-t-40">
                            <p className="profile-text font-16"><Link to="#"> Admin</Link></p>
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        <ul id="side-menu">
                            <li>
                                <Link to='/admin/dashboard'><i className="icon-screen-desktop fa-fw"></i><span className='hide-menu'> Dashboard</span></Link>
                            </li>
                            <li>
                                <Link to="/admin/statistic" aria-expanded="false"><i className="icon-chart fa-fw"></i><span className="hide-menu"> Statistics</span></Link>
                            </li>
                            <li className={`two-column ${productSubMenu == true ? "active" : ""}`}>
                                <Link className="waves-effect" to="#"
                                    aria-expanded={`${productSubMenu == true ? "true" : "false"}`} onClick={() => setProductSubMenu(!productSubMenu)}><i className="icon-bag fa-fw"></i> <span className="hide-menu"> My Product</span> <span className="label label-rounded pull-right"><i className= {`${productSubMenu == true ? 'icon-arrow-down' : 'icon-arrow-right'}`}></i></span></Link>
                                <ul aria-expanded={`${productSubMenu == true ? "true" : "false"}`} className={`${productSubMenu == true ? "collapse in" : "collapse"}`}>
                                    <li><Link to="#">Product List</Link></li>
                                    <li><Link to="/admin/Manuspecification">Specification</Link></li>
                                    <li><Link to="#">Attribute</Link></li>
                                    <li><Link to="Manucategory">Category</Link></li>
                                    <li><Link to="/admin/manufacturers">Manufacturer</Link></li>
                                </ul>
                            </li>
                           
                            <li>
                                <Link to="/admin/coustomers" aria-expanded="false"><i className="icon-people fa-fw"></i><span className="hide-menu"> Customers</span></Link>
                            </li>
                            <li>
                                <Link to="#" aria-expanded="false"><i className="icon-user fa-fw"></i><span className="hide-menu"> User Management</span></Link>
                            </li>
                            <li>
                                <Link to="/admin/storemanagement" aria-expanded="false">
                                    <i className="icon-grid fa-fw"></i>
                                    <span className="hide-menu"> Store Management</span></Link>
                            </li>
                            <li>
                                <Link to="#" aria-expanded="false">
                                    <i className="icon-grid fa-fw"></i>
                                    <span className="hide-menu"> Orders Management</span></Link>
                            </li>
                            <li>
                                <Link to="#" aria-expanded="false">
                                    <i className="icon-credit-card fa-fw"></i>
                                    <span className="hide-menu"> Transactions</span></Link>
                            </li>
                            <li>
                                <Link to="#" aria-expanded="false">
                                    <i className="icon-note fa-fw"></i>
                                    <span className="hide-menu"> Feedback</span></Link>
                            </li>
                            <li>
                                <Link to="#" aria-expanded="false">
                                    <i className="icon-grid fa-fw"></i>
                                    <span className="hide-menu"> Reviews</span></Link>
                            </li>
                            <li>
                                <Link to="#" aria-expanded="false">
                                    <i className="icon-docs fa-fw"></i>
                                    <span className="hide-menu"> Reports</span></Link>
                            </li>
                            <li>
                                <Link to="#" aria-expanded="false">
                                    <i className="icon-settings fa-fw"></i>
                                    <span className="hide-menu"> settings</span></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )



}

export default AdminSidebar;