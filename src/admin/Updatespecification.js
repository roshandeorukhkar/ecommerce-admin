import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getSpecification, updatespecification } from './apiAdmin';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import {NotificationContainer, NotificationManager} from 'react-notifications';



const Updatespecification = ({ match }) => {
    const [values, setValues] = useState({
        manufacturerName: '',
        errorsSpecificationName:'',
        errorsSpecificationValue:'',
        description:'',
        specification_type:'',
        error: '',
        success: false,
        redirectToProfile: false,
        formData: ''
    });
     
    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { manufacturerName,specification_type, description,success, error, redirectToProfile } = values;

    const init = productId => {
        getSpecification(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    manufacturerName: data.manufacturerName,
                    specification_type: data.specification_type,
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

    const handleChange_type = specification_type => event => {
        setValues({ ...values, error: false, [specification_type]: event.target.value });
    };

    const handleChange_des = description => event => {
        setValues({ ...values, error: false, [description]: event.target.value });
    };

    const submitCategoryForm = e => {
        e.preventDefault();
        const category = {
            manufacturerName: manufacturerName,
            specification_type:specification_type,
            description:description
        };
        updatespecification(match.params.productId, category).then(data => {
            if (data.status == false) {
                setValues({
                  ...values,
                  errorsSpecificationName: data.errors.manufacturerName,
                  errorsSpecificationValue:data.errors.specification_type,
                });
                NotificationManager.error(data.message);
              } 
            else {
                setValues({
                    ...values,
                    manufacturerName: data.manufacturerName,
                    description:data.description,
                    errorsSpecificationName:'',
                    errorsSpecificationValue:'',
                    error: false,
                    success: true,
                    redirectToProfile: false
                });
                NotificationManager.success('Specification has been updated successfully!');
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
            <form className="col-lg-6 offset-md-4" onSubmit={submitCategoryForm}>
            <div className="form-group">
            <h6><b><span style={{color:'red'}}>*</span> Specification Name</b></h6>
                <input onChange={handleChange('manufacturerName')} type="text" className="form-control" value={manufacturerName} manufacturerName="manufacturerName" />
                <span className='error text-danger'>{values.errorsSpecificationName}</span>
            </div>
            <div className="form-group">
                <h6><b><span style={{color:'red'}}>*</span> Specification Value</b></h6>
                <input onChange={handleChange_type('specification_type')} type="text" className="form-control"  value={specification_type}  specification_type="specification_type"/>
                <span className='error text-danger'>{values.errorsSpecificationValue}</span>
            </div>
            <div className="form-group">
                <h6><b>Description</b></h6>
                <textarea onChange={handleChange_des('description')} rows="4" className="form-control" value={description} description="description" />
            </div>
            <div className="form-group" style={{float:'right'}}>
                <button className="btn btn-info btn-md">Update</button>
            </div>
           
        </form>
        </div>
    );
    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
           <a class="text-center" style={{color:'white'}}> Specification updated successfully </a> 
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
                return <Redirect to="/admin/Manuspecification" />;
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
                            <div className='col-md-8'><h3 className="font-bold"> Update Specification</h3></div>
                            <div className='col-md-4'><Link to={`/admin/Manuspecification`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                        </div>
                            <div className="white-box">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                                            <NotificationContainer/>
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

export default Updatespecification;
