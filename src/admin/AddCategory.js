
import React, { useState, useEffect } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createCategory, getCategories } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const AddManufacturer = () =>{
    
const [values, setValues] = useState({
        name: '',
        description: '',
        errorsCategories:'',
        categories:[],
        subcategory:'',
        error: '',
        success: false,
        redirectToProfile: false
    });

const { name, success,description, categories, subcategory, error, redirectToProfile } = values;

const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value, errorsCategories:'' });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createCategory({ name, description, subcategory}).then(data => {
        // if (data.error) {
        //     setValues({ ...values, error: data.error, success: false, errorsCategories: data.errors.name });
        // } 
        if (data.status == false) {
            setValues({
              ...values,
              errorsCategories: data.errors.name,
            });
            //NotificationManager.error(data.message);
          } 
        else {
            setValues({
                ...values,
                name: '',
                errorsCategories:'',
                description: '',
                category:'',
                error: '',
                success: true,
                redirectToProfile: false
            });
            NotificationManager.success('Category has been add successfully!','',2000);
            setTimeout(function(){
                setValues({
                    ...values,
                    redirectToProfile:true
                })
            },2000)
        }
    });
};

const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
);

const showSuccess = () => (
    <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
       <a class="text-center" style={{color:'white'}}> Category add successfully </a> 
    </div>  
);

const redirectUser = () => {
    if(redirectToProfile) {
        return <Redirect to="/admin/Manucategory" />;
     }  
};
const init = () => {
    getCategories().then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error });
        } else {
            setValues({
                ...values,
                categories: data,
            });
        }
    });
};

useEffect(() => {
    init();
}, []);
return(
        <>
            <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                <div className='row'>
                        <div className='col-md-8'><h4 className="font-bold"> Add Category</h4></div>
                        <div className='col-md-4'><Link to={`/admin/Manucategory`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form onSubmit={clickSubmit} >
                                    <NotificationContainer/>
                                        {/* {showSuccess()} */}
                                        {showError()}
                                        {redirectUser()}
                                        <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> Category Name</b></h6>
                                                <input onChange={handleChange('name')} type="text" className="form-control" placeholder='Enter name' value={name} />
                                                <span className='error text-danger'>{values.errorsCategories}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                 <h6><b>Select Category </b></h6>
                                                <select onChange={handleChange('subcategory')} className="form-control">
                                                    <option>Please select</option>
                                                    {categories &&
                                                        categories.map((c, i) => (
                                                            <>
                                                            {c.subcategory == '' && !c.deletedAt ?(
                                                                <option key={i} value={c._id}>
                                                                {c.name}
                                                            </option>
                                                            ):null}
                                                           </>
                                                        ))
                                                       }
                                                </select>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b>Category Description</b></h6>
                                                <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                            </div>
                                            <div className="col-lg-7">
                                                <button className="btn btn-info btn-md" style={{float: 'right', borderRadius:'7px'}}> Submit </button>
                                            </div>
                                    </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            </div>
         </>

    )

}


export default AddManufacturer;

