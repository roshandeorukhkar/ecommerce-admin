import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';

import AddProduct from './user/AddProduct';
import Orders from './user/Orders';
import UpdateProduct from './user/UpdateProduct';
import UpdateCategory from './admin/updateCategory';
import SubCategory from './admin/subCategory';
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

import userManagemnt from './userManagement/UserManagemnt';
import UpdateUsers from './userManagement/UserEdit';
import AddUser from './userManagement/UserAdd';
import Manucategory from './admin/Manucategory';
import AddCategory from './admin/AddCategory';

import AllUser from './userManagement/AllUser';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <AdminRoute path="/admin" exact component={AdminMain} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/" exact component={AdminSignin} />
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                <AdminRoute path="/admin/category/subupdate/:categoryId" exact component={SubCategory} />
                <AdminRoute path="/admin/rolemanagement/:storeId" exact component={RoleManagement} />
                <AdminRoute path="/admin/statistic" exact component={AdminStatistics} />
                <AdminRoute path="/admin/storemanagement" exact component={AdminStoreMangement} />
                <AdminRoute path="/admin/specification" exact component={ProductSpecification} />
                <AdminRoute path="/admin/manufacturers" exact component={ProductManufacture} />
                <AdminRoute path="/admin/attribute" exact component={ProductAttribute} />
                <AdminRoute path="/admin/manufacturer" exact component={ManageManufacturer} />
                <AdminRoute path="/admin/create/manufacturer" exact component={AddManufacturer} />
                <AdminRoute path="/admin/create/addAttributenew" exact component={AddAttributenew} />
                <AdminRoute path="/admin/manufacturer/update/:manufacturerId" exact component={UpdateManufacturer} />
                <AdminRoute path="/admin/attribute/update/:attributeId" exact component={UpdateAttribute} />
                <AdminRoute path="/admin/storemanagement/delete/:deleteStoreId" exact component={AdminStoreMangement} />
                <AdminRoute path="/admin/storemanagement/edit/:storeId" exact component={AdminStoreMangement} />
                <AdminRoute path="/admin/coustomer" exact component={Customer} />
                <AdminRoute path="/admin/coustomers" exact component={CustomerManagement} />
                <AdminRoute path="/admin/coustomers/update/:productId" exact component={UpdateCustomer} />
                <AdminRoute path="/admin/Managespecification" exact component={Managespecification} />
                <AdminRoute path="/admin/Manuspecification" exact component={Manuspecification} />
                <AdminRoute path="/admin/Updatespecification/update/:productId" exact component={Updatespecification} />

                <AdminRoute path="/admin/users" exact component={userManagemnt} />
                <AdminRoute path="/admin/users/update/:userId" exact component={UpdateUsers} />
                <AdminRoute path="/admin/create/users/:storeId" exact component={AddUser} />
                <AdminRoute path="/admin/Manucategory" exact component={Manucategory} />

                <AdminRoute path="/admin/rolemanagement/edit/:storeId/:userRoleId" exact component={RoleManagement} />
                <AdminRoute path="/admin/user/list/:storeid" exact component={AllUser} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
