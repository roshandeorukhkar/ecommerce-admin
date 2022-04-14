import React, { useState } from "react";
import { NavLink as Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const [productSubMenu, setProductSubMenu] = useState(false);
  const [settingSubMenu, setSettingSubMenu ] = useState(false);

  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  var myProductMenu = "0";
  if (
    pathname.startsWith("/admin/productlist") ||
    pathname.startsWith("/admin/Manuspecification") ||
    pathname.startsWith("/admin/Manucategory") ||
    pathname.startsWith("/admin/manufacturers") ||
    pathname.startsWith("/admin/specification") ||
    pathname.startsWith("/admin/Updatespecification/update") ||
    pathname.startsWith("/admin/attribute") ||
    pathname.startsWith("/admin/create/addAttributenew") ||
    pathname.startsWith("/admin/attribute/update") ||
    pathname.startsWith("/admin/Manucategory") ||
    pathname.startsWith("/admin/create/category") ||
    pathname.startsWith("/admin/Manucategory/update") ||
    pathname.startsWith("/admin/manufacturers") ||
    pathname.startsWith("/admin/create/manufacturer") ||
    pathname.startsWith("/admin/manufacturer/update/")
  ) {
    myProductMenu = "1";

    var specificationMenu = "0";
    if (
      pathname.startsWith("/admin/Manuspecification") ||
      pathname.startsWith("/admin/Updatespecification/update") ||
      pathname.startsWith("/admin/specification")
    ) {
      specificationMenu = "1";
    }

    var attributeMenu = "0";
    if (
      pathname.startsWith("/admin/attribute") ||
      pathname.startsWith("/admin/create/addAttributenew") ||
      pathname.startsWith("/admin/attribute/update")
    ) {
      attributeMenu = "1";
    }

    var categoryMenu = "0";
    if (
      pathname.startsWith("/admin/Manucategory") ||
      pathname.startsWith("/admin/create/category") ||
      pathname.startsWith("/admin/Manucategory/update")
    ) {
      categoryMenu = "1";
    }

    var manufacturersMenu = "0";
    if (
      pathname.startsWith("/admin/manufacturers") ||
      pathname.startsWith("/admin/create/manufacturer") ||
      pathname.startsWith("/admin/manufacturer/update/")
    ) {
      manufacturersMenu = "1";
    }

    var discountMenu = "0";
    if (
      pathname.startsWith("/admin/manufacturers") ||
      pathname.startsWith("/admin/create/manufacturer") ||
      pathname.startsWith("/admin/manufacturer/update/")
    ) {
      discountMenu = "1";
    }

  }




  var settingMenu = "0";
  if (
    pathname.startsWith("/admin/slider")
  ) {
    settingMenu = "1";

    var sliderMenu = "0";
    if (
      pathname.startsWith("/admin/slider") 
    ) {
      sliderMenu = "1";
    }
  }

  var userMenu = "0";
  if (
    pathname.startsWith("/admin/users") ||
    pathname.startsWith("admin/create/users") ||
    pathname.startsWith("/admin/users/update")
  ) {
    userMenu = "1";
  }

  var storeMenu = "0";
  if (
    pathname.startsWith("/admin/storemanagement") ||
    pathname.startsWith("admin/storemanagement/edit") ||
    pathname.startsWith("/admin/rolemanagement")
  ) {
    storeMenu = "1";
  }

  var orderMenu = "0";
  if (
    pathname.startsWith("/admin/orders")
  ) {
    orderMenu = "1";
  }

  return (
    <>
      <aside className="sidebar">
        <div className="scroll-sidebar">
          {/* <div className="user-profile">
                        <div className='profile-image' >
                            <img src="/assets/plugins/images/users/hanna.jpg" alt="user-img" className="img-circle" />
                        </div>
                        <div className="profile-name p-t-40">
                            <p className="profile-text font-16"><Link to="#"> Admin</Link></p>
                        </div>
                    </div> */}
          <nav className="sidebar-nav">
            <ul id="side-menu">
              <li>
                <Link to="/admin/dashboard">
                  <i className="icon-screen-desktop fa-fw"></i>
                  <span className="hide-menu"> Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/statistic" aria-expanded="false">
                  <i className="icon-chart fa-fw"></i>
                  <span className="hide-menu"> Statistics</span>
                </Link>
              </li>
              <li>
                <a
                  className="waves-effect"
                  aria-expanded={
                    myProductMenu == "1" || productSubMenu == true
                      ? "true"
                      : "false"
                  }
                  onClick={() => setProductSubMenu(!productSubMenu)}
                >
                  <i className="icon-bag fa-fw"></i>{" "}
                  <span className="hide-menu"> My Product</span>{" "}
                  <span className="label label-rounded pull-right">
                    <i
                      className={
                        myProductMenu == "1" || productSubMenu == true
                          ? "icon-arrow-down"
                          : "icon-arrow-right"
                      }
                    ></i>
                  </span>
                </a>
                <ul
                  aria-expanded={
                    myProductMenu == "1" || productSubMenu == true
                      ? "true"
                      : "false"
                  }
                  className={
                    myProductMenu == "1" || productSubMenu == true
                      ? "collapse in"
                      : "collapse"
                  }
                >
                  <li>
                    <Link to="/admin/productlist">Product List</Link>
                  </li>
                  <li>
                    <Link
                      className={specificationMenu == "1" ? "active" : ""}
                      to="/admin/Manuspecification"
                    >
                      Specification
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={attributeMenu == "1" ? "active" : ""}
                      to="/admin/attribute"
                    >
                      Attribute
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={categoryMenu == "1" ? "active" : ""}
                      to="/admin/Manucategory"
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={manufacturersMenu == "1" ? "active" : ""}
                      to="/admin/manufacturers"
                    >
                      Manufacturer
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={discountMenu == "1" ? "active" : ""}
                      to="/admin/discount"
                    >
                      Discount
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/admin/coustomers" aria-expanded="false">
                  <i className="icon-people fa-fw"></i>
                  <span className="hide-menu"> Customers</span>
                </Link>
              </li>
              {/* <li>
                   <Link className={userMenu == '1' ? 'active' : ''} to="/admin/users" aria-expanded="false"><i className="icon-user fa-fw"></i><span className="hide-menu"> User Management</span></Link>
              </li> */}
              <li>
                <Link
                  className={storeMenu == "1" ? "active" : ""}
                  to="/admin/storemanagement"
                  aria-expanded="false"
                >
                  <i className="icon-grid fa-fw"></i>
                  <span className="hide-menu"> Store Management</span>
                </Link>
              </li>
              <li>
                <Link
                  className={orderMenu == "1" ? "active" : ""}
                   to="/admin/orders" 
                   aria-expanded="false">
                  <i className="icon-grid fa-fw"></i>
                  <span className="hide-menu"> Orders Management</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/transactions" aria-expanded="false">
                  <i className="icon-credit-card fa-fw"></i>
                  <span className="hide-menu"> Transactions</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/feedback" aria-expanded="false">
                  <i className="icon-note fa-fw"></i>
                  <span className="hide-menu"> Feedback</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/review" aria-expanded="false">
                  <i className="icon-grid fa-fw"></i>
                  <span className="hide-menu"> Reviews</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/reports" aria-expanded="false">
                  <i className="icon-docs fa-fw"></i>
                  <span className="hide-menu"> Reports</span>
                </Link>
              </li>
              <li>
                <a
                  className="waves-effect"
                  to="#"
                  aria-expanded={
                    settingMenu == "1" || settingSubMenu == true
                      ? "true"
                      : "false"
                  }
                  onClick={()=>{setSettingSubMenu(!settingSubMenu)}}
                >
                  <i className="icon-settings fa-fw"></i>
                  <span className="hide-menu"> Settings</span>
                  <span className="label label-rounded pull-right">
                    <i
                      className={
                        settingMenu == "1" || settingSubMenu == true
                          ? "icon-arrow-down"
                          : "icon-arrow-right"
                      }
                    ></i>
                  </span>
                </a>
                <ul  aria-expanded={
                     settingMenu == "1" || settingSubMenu == true
                      ? "true"
                      : "false"
                  }
                  className={
                    settingMenu == "1" || settingSubMenu == true
                      ? "collapse in"
                      : "collapse"
                  } >
                  <li>
                    <Link to="/admin/slider" className={sliderMenu == "1" ? "active" : ""} >Slider Setting</Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/admin/advertis">Advertising Setting</Link>{" "}
                  </li>
                  <li>
                    <Link to="/admin/partnerImage">Partner Setting</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
