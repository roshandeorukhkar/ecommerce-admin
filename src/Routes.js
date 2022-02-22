import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './user/AddCategory';
import AddProduct from './user/AddProduct';
import Orders from './user/Orders';
import UpdateProduct from './user/UpdateProduct';
import UpdateCategory from './user/updateCategory';
import AdminSignin from './user/Signin';
import AdminMain from './user/UserMain';
import AddRollManagement from './user/AddRollMangement'; //shubha : demo
import AdminStatistics from './user/AdminStatistics';
import AdminStoreMangement from './store/StoreManagement';
import Manufacturer from './admin/Manufacturer';
import ManageManufacturer from './admin/ManageManufacturer';
import AddManufacturer from './admin/AddManufacturer';
import UpdateManufacturer from './admin/UpdateManufacturer';
import Addspecification from './admin/Addspecification';
import ProductSpecification from './admin/ProductSpecification';
import ProductManufacture from './admin/ProductManufacture';

import Customer from './admin/Customer';
import CustomerManagement from './admin/CustomerManagement';
import UpdateCustomer from './admin/UpdateCustomer';
import RoleManagement from './store/RoleManagement';
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
                <AdminRoute path="/admin/rolemanagement" exact component={RoleManagement} />
                <AdminRoute path="/admin/statistic" exact component={AdminStatistics} />
                <AdminRoute path="/admin/storemanagement" exact component={AdminStoreMangement} />
                <AdminRoute path="/admin/specification" exact component={ProductSpecification} />
                <AdminRoute path="/admin/manufacturers" exact component={ProductManufacture} />
                <AdminRoute path="/admin/manufacturer" exact component={ManageManufacturer} />
                <AdminRoute path="/admin/create/manufacturer" exact component={AddManufacturer} />
                <AdminRoute path="/admin/manufacturer/update/:productId" exact component={UpdateManufacturer} />
                <AdminRoute path="/admin/storemanagement/edit/:storeId" exact component={AdminStoreMangement} />
                <AdminRoute path="/admin/storemanagement/delete/:deleteStoreId" exact component={AdminStoreMangement} />
                <AdminRoute path="/admin/coustomer" exact component={Customer} />
                <AdminRoute path="/admin/coustomers" exact component={CustomerManagement} />
                <AdminRoute path="/admin/coustomers/update/:productId" exact component={UpdateCustomer} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
