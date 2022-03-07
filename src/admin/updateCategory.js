
import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { Redirect } from 'react-router-dom';
import { getCategory, updateCategory } from './apiAdmin';
// {category: ["5cd0258f2793ec6e100bc191"], price: []}
// http://localhost:3000/category/update/5cd0258f2793ec6e100bc191
const UpdateCategory = (props) => {
    const { match } = props
    const [values, setValues] = useState({
        name: '',
        error: '',
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { name, error, redirectToProfile } = values;

    const init = categoryId => {
        getCategory(categoryId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.categoryId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };


    const submitCategoryForm = e => {
        e.preventDefault();
        const category = {
            name: name
        };
        updateCategory(match.params.productId, category).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
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
/*
    const submitCategoryForm = e => {
        e.preventDefault();
        // update with ? you should send category name otherwise what to update?
        const category = {
            name: name
        };
        updateCategory(match.params.categoryId, user._id, token, category).then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    error: false,
                    redirectToProfile: true
                });
            }
        });
    };
*/
    const updateCategoryForm = () => (
        <div id="wrapper">
        <AdminHeader />
        <AdminSidebar />
        <div className="page-wrapper">
            <div className="container-fluid">
                <h4 className="font-bold"> Add Category</h4>
                    <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">
            <form className="mb-5" onSubmit={submitCategoryForm}>
                <span className="">Update Category Form</span>
                <span className="">Category Name</span>
                <br />
                <br />
                <div className="">
                    <input
                        onChange={handleChange('name')}
                        value={name}
                        className="input100"
                        type="text"
                        required
                        name="name"
                    />
                </div>
                <div className="w-size25">
                    <button type="submit" className="">
                        Save Changes
                    </button>
                </div>
            </form>
            </div>
                        </div>
                    </div>
                </div>
            </div> 
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
                return <Redirect to="/categories" />;
            }
        }
    };

    

    return (
            <div className="row">
                <div className="col-md-12">
                    {showError()}
                    {updateCategoryForm()}
                    {redirectUser()}
                </div>
            </div>
    );
};

export default UpdateCategory;
