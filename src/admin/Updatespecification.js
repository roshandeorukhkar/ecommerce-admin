import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getSpecification, updatespecification } from './apiAdmin';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";


const Updatespecification = ({ match }) => {
    const [values, setValues] = useState({
        manufacturerName: '',
        description:'',
        specification_type:'',
        error: '',
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { manufacturerName,specification_type, description, error, redirectToProfile } = values;

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
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    manufacturerName: data.manufacturerName,
                    description:data.description,
                    error: false,
                    redirectToProfile: true
                });
            }
        });
    };

    const updateCategoryForm = () => (
        <div className="">
            <form className="mb-3" onSubmit={submitCategoryForm}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('manufacturerName')} type="text" className="form-control" value={manufacturerName} required manufacturerName="manufacturerName" />
            </div>
            <div className="form-group">
                <label className="text-muted"><span className="text-danger">*</span><b>Type</b></label>
                <input onChange={handleChange_type('specification_type')} type="text" className="form-control"  value={specification_type}  specification_type="specification_type"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange_des('description')} className="form-control" value={description} description="description" required />
            </div>
            <button className="btn btn-info">Update</button>
        </form>
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
                        <h2 className="font-bold"> Update Specification</h2>
                            <div className="white-box">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="col-md-12 offset-md-2 m-b-250 mb-5">
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
