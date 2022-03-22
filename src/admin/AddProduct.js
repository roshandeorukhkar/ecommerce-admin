import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        height:'',
        width:'',
        leanth:'',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    //console.log(user._id, "login id")
    const { name, description, price, categories, height, width, leanth, category, shipping, quantity, loading, error, createdProduct, redirectToProfile, formData } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <div className="col-lg-12">
        <form>
            <h6><b> Photo</b></h6>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" multiple />
                </label>
            </div>

            <div className="form-group ">
                <h6><b> Name</b></h6>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <h6><b> Price</b></h6>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <h6><b> Category</b></h6>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <h6><b> Shipping</b></h6>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <h6><b> specification</b></h6>
                <select onChange={handleChange('specification')} className="form-control">
                    <option>Please select</option>
                    <option value="0">8 Gb</option>
                    <option value="1">Color</option>
                </select>
            </div>

            <div className="form-group">
                <h6><b> product type</b></h6>
                <select onChange={handleChange('type')} className="form-control">
                    <option>Please select</option>
                    <option value="1">New Arrivale</option>
                    <option value="2">Normal </option>
                    <option value="3">Comming soon </option>
                </select>
            </div>

            <div className="form-group">
                <h6><b> Quantity</b></h6>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <div className="form-group">
                <h6><b> Description</b></h6>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <hr></hr>
            <h6>Other options</h6>
            <hr></hr>

            <div className="form-group ">
                <h6><b> product Heighit</b></h6>
                <input onChange={handleChange('height')} type="text" className="form-control" value={height} />
            </div>
            <div className="form-group ">
                <h6><b> product width</b></h6>
                <input onChange={handleChange('width')} type="text" className="form-control" value={width} />
            </div>
            <div className="form-group ">
                <h6><b> product leanth</b></h6>
                <input onChange={handleChange('leanth')} type="text" className="form-control" value={leanth} />
            </div>

            <div className="form-group">
                <button onClick={clickSubmit} className="btn btn-info btn-md" style={{float: 'right', borderRadius:'7px'}}> Submit </button>
            </div>
          
        </form>
        
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <div id="wrapper">
        <AdminHeader />
        <AdminSidebar />
        <div className="page-wrapper">
            <div className="container-fluid">
                    <div className="white-box">
                        <div className="row">
                                <div className="col-md-7 offset-md-2">
                                    {showLoading()}
                                    {showSuccess()}
                                    {showError()}
                                    {newPostForm()}
                                </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
