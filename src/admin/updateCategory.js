
import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { Redirect } from 'react-router-dom';
import { getCategory, updateCategory } from './apiAdmin';
import { Link } from "react-router-dom";
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCategory = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        navigation:'',
        navigation_image:'',
        description:'',
        errorsCategories:'',
        error: '',
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { name, description,navigation,navigation_image, error, redirectToProfile ,success } = values;

    const init = categoryId => {
        getCategory(categoryId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description:data.description,
                    navigation:data.navigation,
                    navigation_image:data.navigation_image
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.categoryId);
    }, []);

    const handleChange = name => event => {
          if(name=='navigation') {
            setValues({ ...values, error: false, [name]: event.target.checked, errorsCategories:'' });
            
           }
           else {
             setValues({ ...values, error: false, [name]: event.target.value, errorsCategories:'' });
           }
     
    };


    const submitCategoryForm = e => {
        e.preventDefault();
        const category = {
            name: name,
            description:description,
            navigation:navigation,
            navigation_image:navigation_image
        };
        updateCategory(match.params.categoryId, category,navigation).then(data => {
            console.log(navigation)
            console.log(111)
            // if (data.error) {
            //     setValues({ ...values, error: data.error });
            // } 
            if (data.status == false) {
                setValues({
                  ...values,
                  errorsCategories: data.errors.name,
                });
               // NotificationManager.error(data.message);
              } 
            else {
                setValues({
                    ...values,
                    name: data.name,
                    navigation:data.navigation,
                    error: false,
                    success: true,
                    redirectToProfile: false
                });
                toast.success('Updated successfully!', {
                    autoClose:600,
                    onClose: () => {
                        setValues({
                            ...values,
                            redirectToProfile: true
                        })
                    }
                })
                // NotificationManager.success('Category has been updated successfully!','',2000);
                // setTimeout(function(){
                //     setValues({
                //         ...values,
                //         redirectToProfile:true
                //     })
                // },2000)
            }
        });
    };
    const updateCategoryForm = () => (
        <div className="">
         <form onSubmit={submitCategoryForm} >
            {/* {showSuccess()} */}
            {showError()}
            {redirectUser()}
            <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                <div className="form-group col-lg-7">
                    <h6><b><span style={{color:'red'}}>*</span> Category Name</b></h6>
                    <input onChange={handleChange('name')} type="text" className="form-control" placeholder='Enter name' value={name} name= "name"/>
                    <span className='error text-danger'>{values.errorsCategories}</span>
                </div>
                <div className="form-group col-lg-7">
                <h6><b>Top navigation </b></h6>
                <input onChange={handleChange('navigation')} name="navigation" type="checkbox" className="" checked={navigation} value={navigation} style={{width: '32px', height:'30px'}} />                             
                </div>
                <div id="navigation_id" className="form-group col-lg-7">
                                                        <h6><b>Top navigation image</b></h6>
                                                        <input onChange={handleChange('navigation_image')} name="navigation_image" type="file" className="" value={navigation_image} />


                                                        
                                                    </div>
                <div className="form-group col-lg-7">
                    <h6><b>Category Description</b></h6>
                    <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description'  value={description}></textarea>
                </div>
                <div className="col-lg-7">
                    <button className="btn btn-info btn-md" style={{float: 'right', borderRadius:'7px'}}> Update </button>
                </div>
            </div>
        </form>
    </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
           <a class="text-center" style={{color:'white'}}> category update successfully </a> 
        </div>  
    );

    const showError = () => (
        <div className={'alert alert-danger'} role="alert" style={{ display: error ? '' : 'none' }}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/Manucategory" />;
            }
        }
    };

    

    return (
        <div className="row">
        <AdminHeader />
        <AdminSidebar />
        <div className="page-wrapper">
           <div className="container-fluid">
               <div className='row'>
                   <div className='col-md-8'><h4 className="font-bold"> Edit Category</h4></div>
                   <div className='col-md-4'><Link to={`/admin/Manucategory`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
               </div>
                   <div className="white-box">
                       <div className="row">
                           <div className="col-lg-12">
                               <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                                    <ToastContainer />
                                   {/* <NotificationContainer/> */}
                                   {/* {showSuccess()} */}
                                   {showError()}
                                   {updateCategoryForm()}
                                   {redirectUser()}
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
   </div>
    );
};

export default UpdateCategory;
