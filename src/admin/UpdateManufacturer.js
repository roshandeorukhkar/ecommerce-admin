import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getManufacturer, updateManfacturer } from './apiAdmin';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";


const UpdateManufacturer = ({ match }) => {
    const [values, setValues] = useState({
        manufacturerName: '',
        description:'',
        error: '',
        success: false,
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { manufacturerName, description, error, success, redirectToProfile } = values;

    const init = productId => {
        getManufacturer(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    manufacturerName: data.manufacturerName,
                    description: data.description
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = manufacturerName => event => {
        setValues({ ...values, error: false, [manufacturerName]: event.target.value });
    };

    const handleChange_des = description => event => {
        setValues({ ...values, error: false, [description]: event.target.value });
    };

    const submitCategoryForm = e => {
        e.preventDefault();
        const category = {
            manufacturerName: manufacturerName,
            description:description
        };
        updateManfacturer(match.params.productId, category).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    manufacturerName: data.manufacturerName,
                    description:data.description,
                    error: false,
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

    const updateCategoryForm = () => (
        <div className="">
            <form className="mb-3" onSubmit={submitCategoryForm}>
            <div className="form-group col-lg-7">
                <h6><b><span style={{color:'red'}}>*</span> Manufacturer Nmae</b></h6>
                <input onChange={handleChange('manufacturerName')} type="text" placeholder='Enter name' className="form-control" value={manufacturerName} manufacturerName="manufacturerName" />
            </div>
            <div className="form-group col-lg-7">
               <h6><b>Description</b></h6>
                <textarea onChange={handleChange_des('description')} rows="4" className="form-control" placeholder='Description' value={description} description="description"  />
            </div>
            <div className='col-lg-7'>
                <button className="btn btn-info btn-md"style={{float:'right'}}>Update</button>
            </div>
        </form>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
           <a class="text-center" style={{color:'white'}}> Manufacture update successfully </a> 
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
                return <Redirect to="/admin/manufacturers" />;
            }
        }
    };

   

    return (
            <div className="row">
                 <AdminHeader />
                 <AdminSidebar />
                 <div className="page-wrapper">
                    <div className="container-fluid">
                        <h2 className="font-bold"> Edit Manufacturer</h2>
                            <div className="white-box">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                                            {showSuccess()}
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

export default UpdateManufacturer;
