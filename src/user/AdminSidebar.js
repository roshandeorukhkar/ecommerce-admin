import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = (props) => {
    const { user, modules } = props
    const moduleList = (modules.accessModuleId != "" && modules.accessModuleId != "All")?  modules.accessModuleId.split(",") : [];
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
                            <p className="profile-text font-16"><Link to="/"> {user.name}</Link></p>
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        <ul id="side-menu">
                            <li>
                                <Link to='/dashboard'><i className="icon-screen-desktop fa-fw"></i><span className='hide-menu'> Dashboard</span></Link>
                            </li>
                            {moduleList.includes("statistic") &&
                                <li>
                                    <Link to="/statistic" aria-expanded="false"><i className="icon-chart fa-fw"></i><span className="hide-menu"> Statistics</span></Link>
                                </li>
                            }
                            
                            {moduleList.includes("products") &&
                                <li className={`two-column ${productSubMenu == true ? "active" : ""}`}>
                                    <Link className="waves-effect" to="#"
                                        aria-expanded={`${productSubMenu == true ? "true" : "false"}`} onClick={() => setProductSubMenu(!productSubMenu)}><i className="icon-bag fa-fw"></i> <span className="hide-menu"> My Product</span> <span className="label label-rounded pull-right"><i className= {`${productSubMenu == true ? 'icon-arrow-down' : 'icon-arrow-right'}`}></i></span></Link>
                                    <ul aria-expanded={`${productSubMenu == true ? "true" : "false"}`} className={`${productSubMenu == true ? "collapse in" : "collapse"}`}>
                                        <li><Link to="/products">Products</Link></li>
                                        <li><Link to="/Manuspecification">Specification</Link></li>
                                        <li><Link to="/attribute">Attribute</Link></li>
                                        <li><Link to="/Manucategory">Category</Link></li>
                                        <li><Link to="/manufacturers">Manufacturer</Link></li>
                                    </ul>
                                </li>
                            }
                            {moduleList.includes("customers") &&
                                <li>
                                    <Link to="/customers" aria-expanded="false"><i className="icon-people fa-fw"></i><span className="hide-menu"> Customers</span></Link>
                                </li>
                            }
                            {moduleList.includes("users") &&
                                <li>
                                    <Link to="/users" aria-expanded="false"><i className="icon-user fa-fw"></i><span className="hide-menu"> User Management</span></Link>
                                </li>
                            }
                            {moduleList.includes("stores") &&
                                <li>
                                    <Link to="/storemanagement" aria-expanded="false">
                                        <i className="icon-grid fa-fw"></i>
                                        <span className="hide-menu"> Store Management</span></Link>
                                </li>
                            }
                            {moduleList.includes("orders") &&
                                <li>
                                    <Link to="#" aria-expanded="false">
                                        <i className="icon-grid fa-fw"></i>
                                        <span className="hide-menu"> Orders Management</span>
                                    </Link>
                                </li>
                            }
                            {moduleList.includes("transactions") &&
                                <li>
                                    <Link to="#" aria-expanded="false">
                                        <i className="icon-credit-card fa-fw"></i>
                                        <span className="hide-menu"> Transactions</span></Link>
                                </li>
                            }
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
                            {moduleList.includes("reports") &&
                            <li>
                                <Link to="#" aria-expanded="false">
                                    <i className="icon-docs fa-fw"></i>
                                    <span className="hide-menu"> Reports</span></Link>
                            </li>
                            }
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