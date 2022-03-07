import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';

import AdminSetup from "./admin/Setup";
import Orders from './user/Orders';
import UpdateCategory from './admin/updateCategory';
import AdminSignin from './user/Signin';
import AdminMain from './user/UserMain';
import AddRollManagement from './user/AddRollMangement'; //shubha : demo
import AdminStatistics from './user/AdminStatistics';
import AdminStoreMangement from './store/StoreManagement';
import Manufacturer from './admin/Manufacturer';
import ManageManufacturer from './admin/ManageManufacturer';
import AddManufacturer from './admin/AddManufacturer';
import AddAttributenew from './admin/AddAttributenew';
import UpdateManufacturer from './admin/UpdateManufacturer';
import UpdateAttribute from './admin/UpdateAttribute';
import Addspecification from './admin/Addspecification';
import ProductSpecification from './admin/ProductSpecification';
import ProductManufacture from './admin/ProductManufacture';
import ProductAttribute from './admin/ProductAttribute';
import Customer from './admin/Customer';
import CustomerManagement from './admin/CustomerManagement';
import UpdateCustomer from './admin/UpdateCustomer';
import RoleManagement from './store/RoleManagement';

import Managespecification from './admin/Managespecification';
import Manuspecification from './admin/Manuspecification';
import Updatespecification from './admin/Updatespecification';

import UserManagemnt from './userManagement/UserManagemnt';
import UpdateUsers from './userManagement/UserEdit';
import AddUser from './userManagement/UserAdd';
import Manucategory from './admin/Manucategory';
import AddCategory from './admin/AddCategory';

import AllUser from './userManagement/AllUser';

import ManageProducts from "./products/ManageProducts";
import AddProduct from './products/AddProduct';
import UpdateProduct from './products/UpdateProduct';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <AdminRoute path="/" exact component={AdminMain} />
                <Route path="/setup" exact component={AdminSetup} />
                <Route path="/signin" exact component={AdminSignin} />
                <AdminRoute path="/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <AdminRoute path="/orders" exact component={Orders} />
                <AdminRoute path="/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/category/update/:categoryId" exact component={UpdateCategory} />
                <AdminRoute path="/rolemanagement/:storeId" exact component={RoleManagement} />
                <AdminRoute path="/statistic" exact component={AdminStatistics} />
                <AdminRoute path="/storemanagement" exact component={AdminStoreMangement} />
                <AdminRoute path="/specification" exact component={ProductSpecification} />
                <AdminRoute path="/manufacturers" exact component={ProductManufacture} />
                <AdminRoute path="/attribute" exact component={ProductAttribute} />
                <AdminRoute path="/manufacturer" exact component={ManageManufacturer} />
                <AdminRoute path="/create/manufacturer" exact component={AddManufacturer} />
                <AdminRoute path="/create/addAttributenew" exact component={AddAttributenew} />
                <AdminRoute path="/manufacturer/update/:productId" exact component={UpdateManufacturer} />
                <AdminRoute path="/attribute/update/:attributeId" exact component={UpdateAttribute} />
                <AdminRoute path="/storemanagement/delete/:deleteStoreId" exact component={AdminStoreMangement} />
                <AdminRoute path="/storemanagement/edit/:storeId" exact component={AdminStoreMangement} />
                <AdminRoute path="/customers" exact component={Customer} />
                <AdminRoute path="/customers/update/:productId" exact component={UpdateCustomer} />
                <AdminRoute path="/Managespecification" exact component={Managespecification} />
                <AdminRoute path="/Manuspecification" exact component={Manuspecification} />
                <AdminRoute path="/Updatespecification/update/:productId" exact component={Updatespecification} />

                <AdminRoute path="/users" exact component={UserManagemnt} />
                <AdminRoute path="/users/update/:userId" exact component={UpdateUsers} />
                <AdminRoute path="/create/users" exact component={AddUser} />
                <AdminRoute path="/Manucategory" exact component={Manucategory} />
               
                <AdminRoute path="/rolemanagement/edit/:userRoleId" exact component={RoleManagement} />
                <AdminRoute path="/rolemanagement/delete/:deleteUserRoleId" exact component={RoleManagement} />

                <AdminRoute path="/user/list" exact component={AllUser} />

                <AdminRoute path="/products" exact component={ManageProducts} />
                <AdminRoute path="/product/create" exact component={AddProduct} />
                <AdminRoute path="/product/update/:productId" exact component={UpdateProduct} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
