import React from 'react';

const AdminHeader = () =>{
    return(
    <>
    <nav className="navbar navbar-default navbar-static-top m-b-0">
        <div className="navbar-header">
        <a className="navbar-toggle font-20 hidden-sm hidden-md hidden-lg " href='#' data-toggle="collapse" data-target=".navbar-collapse">
            <i className="fa fa-bars"></i>
        </a>
        <div className="top-left-part">
            <a className="logo" href="index.html">
                <b>
                    <img src="/assets/plugins/images/logo.png" alt="home" />
                </b>
                <span>
                    {/* <img src="/assets/plugins/images/logo-text.png" alt="homepage" className="dark-logo" /> */}
                    App Name
                </span>
            </a>
        </div>
        <ul className="nav navbar-top-links navbar-left hidden-xs">
            <li>
                <a className="sidebartoggler font-20 waves-effect waves-light"><i className="icon-arrow-left-circle"></i></a>
            </li>
        </ul>
        <ul className="nav navbar-top-links navbar-right pull-right">
            <li className="dropdown">
                <a className="dropdown-toggle waves-effect waves-light font-20" data-toggle="dropdown" href='#'>
                    <i className="icon-bell"></i>
                    <span className="badge badge-xs badge-danger">6</span>
                </a>
                <ul className="dropdown-menu mailbox animated bounceInDown">
                    <li>
                        <div className="drop-title">You have 4 new messages</div>
                    </li>
                    <li>
                        <div className="message-center">
                            <a href='#'>
                                <div className="user-img">
                                    <img src="/assets/plugins/images/users/1.jpg" alt="user" className="img-circle" />
                                    <span className="profile-status online pull-right" ></span>
                                </div>
                                <div className="mail-contnet">
                                    <h5>Pavan kumar</h5>
                                    <span className="mail-desc">Just see the my admin!</span>
                                    <span className="time">9:30 AM</span>
                                </div>
                            </a>
                            <a href='#'>
                                <div className="user-img">
                                    <img src="/assets/plugins/images/users/2.jpg" alt="user" className="img-circle" />
                                    <span className="profile-status busy pull-right"></span>
                                </div>
                                <div className="mail-contnet">
                                    <h5>Sonu Nigam</h5>
                                    <span className="mail-desc">I've sung a song! See you at</span>
                                    <span className="time">9:10 AM</span>
                                </div>
                            </a>
                            <a href='#'>
                                <div className="user-img">
                                    <img src="/assets/plugins/images/users/3.jpg" alt="user" className="img-circle" /><span className="profile-status away pull-right"></span>
                                </div>
                                <div className="mail-contnet">
                                    <h5>Arijit Sinh</h5>
                                    <span className="mail-desc">I am a singer!</span>
                                    <span className="time">9:08 AM</span>
                                </div>
                            </a>
                            <a href='#'>
                                <div className="user-img">
                                    <img src="/assets/plugins/images/users/4.jpg" alt="user" className="img-circle" />
                                    <span className="profile-status offline pull-right"></span>
                                </div>
                                <div className="mail-contnet">
                                    <h5>Pavan kumar</h5>
                                    <span className="mail-desc">Just see the my admin!</span>
                                    <span className="time">9:02 AM</span>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li>
                        <a className="text-center" href='#'>
                            <strong>See all notifications</strong>
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </li>
                </ul>
            </li>
            {/* <li className="right-side-toggle">
                <a className="right-side-toggler waves-effect waves-light b-r-0" href='#' style={{display: "inline-flex"}}>
              
                <img src="/assets/plugins/images/users/hanna.jpg" alt="user-img" className="img-circle m-t-10 m-r-10 thumb-sm"  />
                <p className='p-t-5'> 
                <span className='font-bold text-dark'> Shubha Bankar</span>
                <span className='font-12'>KeaSofttech@gmail.com</span></p>
                    <i className="icon-arrow-down" style={{ marginTop: '17px'}}></i>
                    </a>
            </li> */}
            <li className="dropdown right-side-toggle">
                <a className="dropdown-toggle right-side-toggler waves-effect waves-light b-r-0" data-toggle="dropdown" href='#' style={{display: "inline-flex"}}>
                    <img src="/assets/plugins/images/users/hanna.jpg" alt="user-img" className="img-circle m-t-10 m-r-10 thumb-sm"  />
                    <p className='p-t-5'> 
                        <span className='font-bold text-dark'> Shubha Bankar</span>
                        <span className='font-12'>KeaSofttech@gmail.com</span>
                    </p>
                    <i className="icon-arrow-down" style={{ marginTop: '17px'}}></i>
                </a>
                <ul className="dropdown-menu mailbox animated bounceInDown">
                    <li>
                        <div className="drop-title">
                            <p></p>
                           <center> <a href='admin/signin' className='btn btn-primary btn-outline'>Sign Out</a></center>
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
