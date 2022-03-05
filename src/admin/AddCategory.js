
import React, { useState } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createCategory } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
//import Select from 'react-select';

const AddManufacturer = () =>{
    
const [values, setValues] = useState({
        name: '',
        description: '',
        error: '',
        success: false,
        redirectToProfile: false
    });

const { name, success,description, error, redirectToProfile } = values;

const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createCategory({ name}).then(data => {
      // alert(data.error)
        if (data.error) {
            setValues({ ...values, error: data.error, success: false });
        } else {
            setValues({
                ...values,
                name: '',
                description: '',
                error: '',
                success: true,
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
return(
        <>
            <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                    <h4 className="font-bold"> Add Category</h4>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form onSubmit={clickSubmit} >
                                        {showSuccess()}
                                        {showError()}
                                        {redirectUser()}
                                        <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> Category Name</b></h6>
                                                <input onChange={handleChange('name')} type="text" className="form-control" placeholder='Enter name' value={name} required/>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> Main Category</b></h6>
                                                <select placeholder='select' className="form-control" />
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b>Description</b></h6>
                                                <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                            </div>
                                            <div className="col-lg-7">
                                                <button className="btn btn-info btn-md" style={{float:'right'}}> Submit </button>
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

