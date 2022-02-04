import React from 'react';

const AdminSidebar = () =>{

return(
    <>
    <aside className="sidebar">
        <div className="scroll-sidebar">
            <div className="user-profile">
                <div className='profile-image' >
                    <img src="/assets/plugins/images/users/hanna.jpg" alt="user-img" className="img-circle" />
                </div>
                <div className="profile-name p-t-40">
                    <p className="profile-text font-16"><a href="#"> Hanna Gover</a></p>
                </div>
            </div>
            <nav className="sidebar-nav">
                <ul id="side-menu">
                    <li>
                        <a href='/admin/dashboard'><i className="icon-screen-desktop fa-fw"></i><span className='hide-menu'> Dashboard</span></a>
                    </li>
                    <li>
                        <a href="/admin/statistic" aria-expanded="false"><i className="icon-chart fa-fw"></i><span className="hide-menu"> Statistics</span></a>
                    </li>
                    <li className="two-column">
                        <a className="waves-effect" href="#" aria-expanded="false"><i className="icon-bag fa-fw"></i> <span className="hide-menu"> My Product</span></a>
                        <ul aria-expanded="false" className="collapse">
                            <li><a href="#">Product List</a></li>
                            <li><a href="#">Specification</a></li>
                            <li><a href="#">Attribute</a></li>
                            <li><a href="#">Category</a></li>
                            <li><a href="#">Manufacturer</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="calendar.html" aria-expanded="false"><i className="icon-people fa-fw"></i><span className="hide-menu"> Customers</span></a>
                    </li>
                    <li>
                        <a href="calendar.html" aria-expanded="false"><i className="icon-user fa-fw"></i><span className="hide-menu"> User Management</span></a>
                    </li>
                    <li>
                        <a href="admin/storemanagement" aria-expanded="false">
                        <i className="icon-grid fa-fw"></i>
                        <span className="hide-menu"> Store Management</span></a>
                    </li>
                    <li>
                        <a href="calendar.html" aria-expanded="false">
                        <i className="icon-grid fa-fw"></i>
                        <span className="hide-menu"> Orders Management</span></a>
                    </li>
                    <li>
                        <a href="calendar.html" aria-expanded="false">
                        <i className="icon-credit-card fa-fw"></i>
                        <span className="hide-menu"> Transactions</span></a>
                    </li>
                    <li>
                        <a href="calendar.html" aria-expanded="false">
                        <i className="icon-note fa-fw"></i>
                        <span className="hide-menu"> Feedback</span></a>
                    </li>
                    <li>
                        <a href="calendar.html" aria-expanded="false">
                        <i className="icon-grid fa-fw"></i>
                        <span className="hide-menu"> Reviews</span></a>
                    </li>
                    <li>
                        <a href="calendar.html" aria-expanded="false">
                        <i className="icon-docs fa-fw"></i>
                        <span className="hide-menu"> Reports</span></a>
                    </li>
                    <li>
                        <a href="calendar.html" aria-expanded="false">
                        <i className="icon-settings fa-fw"></i>
                        <span className="hide-menu"> settings</span></a>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
        </>
    )



}

export default AdminSidebar;