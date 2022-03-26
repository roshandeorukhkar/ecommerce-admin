import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link, useParams } from "react-router-dom";
import { deletecategory, getCategories ,statusCategory, statusChangeCategory} from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";

const SubCategory = ({ match }) => {
    const params = useParams();
    const [values, setValues] = useState({
        error: '',
        redirectToProfile: false,
        success: false
    });
    const { error, success, redirectToProfile } = values;
 
     const [products, setProducts] = useState([]);
 
     const { user, token } = isAuthenticated();
 
     const loadProducts = () => {
         getCategories().then(data => {
             if (data.error) {
                 console.log(data.error);
             } else {
                 setProducts(data);
             }
         });
     };
 
     const destroy = categoryId => {
         deletecategory(categoryId).then(data => {
             if (data.error) {
                 console.log(data.error);
             } else {
                 loadProducts();
                 setValues({
                     ...values,
                     success:true,
                     redirectToProfile: false
                 });
                 setTimeout(function(){
                     setValues({
                         ...values,
                         redirectToProfile:true
                     })
                 },1000)
             }
         });
     };
 
     useEffect(() => {
         loadProducts();
     }, []);
 
     const status = categoryId => {
         const category = {
             name: 0,
          };
          statusCategory(categoryId, category).then(data => {
             if (data.error) {
                 console.log(data.error);
             } else {
                 loadProducts();
             }
         });
     };
     
     const statusChange = categoryId => {
         const category = {
             name: 1,
          };
          statusChangeCategory(categoryId, category).then(data => {
             if (data.error) {
                 console.log(data.error);
             } else {
                 loadProducts();
             }
         });
     };
 
     const deleteMessage = () => (
         <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
            <a class="text-center" style={{color:'white'}}> Category Deleted </a> 
         </div>  
     );
     const redirectUser = () => {
         if (redirectToProfile) {
             if (!error) {
                 return <Redirect to="/admin/Manucategory" />;
             }
         }
     };
 
     const getDate = (date) => {
         const newDate = date.split('T')[0];
         const DATE = newDate.split('-');
         return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
     }
 
     // Table 
 const columns = [
     {
         dataField: 'id',
         text: 'ID',
         hidden: true
     },
     {
         dataField: 'name',
         text: 'Category Name',
         sort: true
     }, 
     {
         dataField: 'createdAt',
         text: 'Date'
     }, 
     {
         dataField: 'status',
         text: 'Status'
     }, 
     {
         dataField: 'action',
         text: 'action'
   }];
 
   const getButtons = (category) => {
     return (
         <div>
             <Link to={`/admin/subcategory/update/${category._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit'><i className='fa fa-pencil font-15'></i></button></Link>
             <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(category._id)}><i className='fa fa-trash-o font-15'></i></button>
         </div>
     )
   };
 
   const getSwitch = (category) => {
     return (
         <>
          {category.status == 1 
              ?(
                 <>
                     <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => status(category._id)} color='primary'/>
                 </>
              ):
                 <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusChange(category._id)} color='primary'/>
         }
         </>
     )
   };
 
   const categoryList = [];
   products.forEach((item) => {
     if(!item.deletedAt , item.subcategory && item.subcategory == params.categoryId){
     item['id'] = item._id;
     item['createdAt'] = getDate(item.createdAt);
     item['status'] = getSwitch(item);
     item['action'] = getButtons(item);
     categoryList.push(item);
     }
     else{
         console.log("error");
     }
   });
 
     return (
        <div className="row">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                <div className='row'>
                        <div className='col-md-8'><p id="hedingTitle"> SubCategory List </p></div>
                        <div className='col-md-4'><Link to={`/admin/Manucategory`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                     </div>
                   <div className="white-box">
                  
                       <div className="row">
                           
                            {deleteMessage()}
                            {redirectUser()}
                            <div className="col-12">
                                
                                 <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={categoryList}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
     );
};

export default SubCategory;
