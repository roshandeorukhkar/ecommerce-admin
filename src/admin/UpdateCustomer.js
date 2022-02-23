import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import { getCust, updateCustomer } from './apiAdmin';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";


const UpdateCustomer = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email:'',
        description:'',
        error: '',
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { name, email, error, redirectToProfile, createdAt } = values;

    const init = productId => {
        getCust(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    email: data.email,
                    createdAt:data.createdAt
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleChange_des = email => event => {
        setValues({ ...values, error: false, [email]: event.target.value });
    };

    const submitCategoryForm = e => {
        e.preventDefault();
        const category = {
            name: name,
            email:email
        };
        updateCustomer(match.params.productId, category).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    email:data.email,
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
                <h6>Customer Name</h6>
                <input onChange={handleChange('name')} type="text" placeholder='Cutomer name' className="form-control" value={name} required name="name" />
            </div>
            <div className="form-group">
                <label className="text-muted">E-mail</label>
                <input onChange={handleChange_des('email')} type="text" className="form-control" value={email} required email="email" />
            </div>
            <div className="form-group">
                <label className="text-muted">Add Date</label>
                <input type="text" className="form-control" value={createdAt}  />
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
                return <Redirect to="/admin/coustomers" />;
            }
        }
    };

   

    return (
            <div className="row">
                 <AdminHeader />
                 <AdminSidebar />
                 <div className="page-wrapper">
                    <div className="container-fluid">
                        <h2 className="font-bold"> Edit Customer</h2>
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

export default UpdateCustomer;
