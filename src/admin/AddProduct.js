import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createProduct, getCategories, getAttributes, Specification, getManufacturers } from './apiAdmin';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Redirect } from 'react-router-dom';

    const AddProduct = () => {
    const [inputList, setInputList] = useState([{ dimension: "" }]);
    const [values, setValues] = useState({
        name: '',
        brand:'',
        errorname: '',
        description: '',
        dimension:'',
        attribute:'',
        categoryval:'',
        attributeval:'',
        price: '',
        errorprice:'',
        category: '',
        shipping: '',
        quantity: '',
        height:'',
        width:'',
        leanth:'',
        photo: '',
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData:new FormData()
    });
    
    const [attributess , setAttributess] = useState([]);
    const [categories , setCategories] = useState([]);
    const [specifications , setSpecification] = useState([]);
    const [manufactures , setManufactures] = useState([]);
    const { user, token } = isAuthenticated();

    const { name, description, price, attribute, height, width, leanth, dimension, category, quantity, brand, error, createdProduct, redirectToProfile, formData } = values;

    //add multiple
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index] = value;
        setInputList(list);
        setValues({ ...values, dimension: list });
    };
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    const handleAddClick = () => {
        setInputList([...inputList, { dimension: "" }]);
    };
    //end multiple
    
    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues( data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const listOfAttributes = () => {
        getAttributes().then(data => {
            if (data.error) {
                console.log({ ...values, error: data.error });
            } else {
                setAttributess(data);
            }
        });
    };

    const listOfSpecification = () => {
        Specification().then(data => {
            if (data.error) {
                console.log({ ...values, error: data.error });
            } else {
                setSpecification(data);
            }
        });
    };

    const listOfManufacter = () => {
        getManufacturers().then(data => {
            if (data.error) {
                console.log({ ...values, error: data.error });
            } else {
                setManufactures(data);
            }
        });
    };

    useEffect(() => {
        init();
        listOfAttributes();
        listOfSpecification();
        listOfManufacter();
    }, []);

    const handleChange = name => event => {
    console.log(name, "name");
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
       formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
         console.log(formData.dimension);
       // console.log(dimension);
        //return false; 
        createProduct(token, formData).then(data => {
            if (data.status == false) {
                setValues({
                  ...values,
                  errorname: data.errors.name,
                });
              } 
            else {
                setValues({
                    ...values,
                    name: '',
                    errorname:'',
                    description: '',
                    photo: '',
                    price: '',
                    attribute:'',
                    quantity: '',
                    redirectToProfile: false,
                    createdProduct: data.name
                });
                NotificationManager.success('Product has been added successfully!...');
                setTimeout(function(){                
                    setValues({
                        ...values,
                        redirectToProfile:true  
                    })
                },1000)
            }
        });
    };

    const newPostForm = () => (
    <>
        <form> 
         <div className="white-box">
            <div className="row">
                <h3>Product Information</h3><hr></hr>
                <div className="col-lg-12">
                    <div className="form-group col-lg-6">
                        <h6><b>Product Name <span style={{color:'red'}}>*</span></b></h6>
                        <input onChange={handleChange('name')} type="text" className="form-control" placeholder='Enter product name' value={name} />
                        <span className='error text-danger'>{values.errorname}</span>
                    </div>
                    <div className="form-group col-lg-6">
                        <h6><b> Manufacturer </b></h6>
                        <select onChange={handleChange('manufactures')} className="form-control" placeholder='select manufactures'>
                            <option>Please select</option>
                            {manufactures &&
                                manufactures.map((s, i) => (
                                    <>
                                    {!s.deletedAt ?(
                                        <option key={i} value={s._id}>
                                            {s.manufacturerName }
                                        </option>
                                    ):null}
                                </>
                                ))}
                        </select>
                    </div> 
                    <div className="form-group col-lg-6">
                            <h6><b> Category</b></h6>
                            <select onChange={handleChange('category')} className="form-control" value={category}>
                                <option>Please select</option>
                                {categories &&
                                    categories.map((c, i) => (
                                        <option key={i} value={c._id}>
                                            {c.name }
                                        </option>
                                    ))}
                            </select>
                    </div> 
                    <div className="form-group col-lg-6">
                            <h6><b>Sub Category</b></h6>
                            <select onChange={handleChange('subcategory')} className="form-control" value={category}>
                                <option>Please select</option>
                                {categories &&
                                    categories.map((c, i) => (
                                        <option key={i} value={c._id}>
                                            {c.name }
                                        </option>
                                    ))}
                            </select>
                    </div>
                    <div className="form-group col-lg-6">
                        <h6><b>Brand Name</b></h6>
                        <input onChange={handleChange('brand')} type="text" className="form-control" placeholder='Enter brand name' value={brand} />
                        <span className='error text-danger'>{values.errorname}</span>
                    </div> 
                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <h3>Product Details</h3><hr></hr>
                <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <h6><b> Price <span style={{color:'red'}}>*</span></b></h6>
                            <input onChange={handleChange('price')} type="number" placeholder='Enter price ' className="form-control" value={price} />
                        </div>
                        <div className="form-group col-lg-6">
                            <h6><b> Shipping</b></h6>
                            <select onChange={handleChange('shipping')} className="form-control">
                                <option>Please select</option>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>
                        <div className="form-group col-lg-6">
                            <h6><b> product type</b></h6>
                            <select onChange={handleChange('type')} className="form-control">
                                <option>Please select</option>
                                <option value="1">New Arrivale</option>
                                <option value="2">Normal </option>
                                <option value="3">Comming soon </option>
                            </select>
                        </div>
                        <div className="form-group col-lg-6">
                            <h6><b> Quantity</b></h6>
                            <input onChange={handleChange('quantity')} type="number" placeholder='Enter quantity' className="form-control" value={quantity} />
                        </div> 
                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <div className="col-lg-12">
                    <h3>Prodect Attribute</h3><hr></hr>
                        <div className="form-group col-lg-6">
                            <h6><b> Attribute</b></h6>
                            <select onChange={handleChange('attribute')} className="form-control" value={attribute}>
                                <option>Please select</option>
                                {attributess &&
                                    attributess.map((a, i) => (
                                        <>
                                        {!a.deletedAt ?(
                                            <option key={i} value={a._id}>
                                            {a.attributeName }
                                            </option>
                                        
                                            ):null}
                                        </>
                                    ))}
                            </select>
                        </div>
                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <div className="col-lg-12">
                    <h3>Prodect Specification</h3><hr></hr>
                        <div className="form-group col-lg-6">
                            <h6><b> specification</b></h6>
                            <select onChange={handleChange('specification')} className="form-control">
                                <option>Please select</option>
                                {specifications &&
                                    specifications.map((s, i) => (
                                        <option key={i} value={s._id}>
                                            {s.manufacturerName }
                                        </option>
                                    ))}
                            </select>
                        </div>
                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <h3>Product Other</h3><hr></hr>
                <div className="col-lg-12">
                        <div className="form-group  col-lg-7">
                            <h6><b> product height </b></h6>
                            <input onChange={handleChange('height')} type="text" className="form-control" value={height} />
                        </div>
                        <div className="form-group col-lg-7">
                            <h6><b> product width</b></h6>
                            <input onChange={handleChange('width')} type="text" className="form-control" value={width} />
                        </div>
                        <div className="form-group col-lg-7">
                            <h6><b> product length </b></h6>
                            <input onChange={handleChange('leanth')} type="text" className="form-control" value={leanth} />
                        </div>
                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <div className="col-lg-12">
                    <h3>Prodect images</h3><hr></hr>
                    {/* <input onChange={handleChange('dimension')} type="text" className="form-control" placeholder='Enter Dimension' value={dimension} />
                                                <span className='error text-danger'>{values.errorsAttributeValue}</span> */}
                    {inputList.map((x, i) => {
                        return (
                            <div className="form-group"  key={i}>
                                    <div className='col-lg-7'>
                                        <input name="dimension" className="form-control" placeholder="Enter Values" value={x.dimension} onChange={e => handleInputChange(e, i)} />
                                    </div>
                                    <div className='form-group col-lg-1'>
                                        {inputList.length !== 1 && <button className="btn btn-danger" onClick={() => handleRemoveClick(i)}><i className='fa fa-minus '></i></button>}
                                        {inputList.length - 1 === i && <button onClick={handleAddClick} className="btn btn-info"><i className='fa fa-plus'></i></button>}
                                    </div>
                                </div>
                        );
                    })}

                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <h3>Product Description</h3>
                    <div className="form-group col-lg-6">
                        <h6><b> Description</b></h6>
                        <textarea onChange={handleChange('description')} rows="4" className="form-control" value={description} />
                    </div>
                    <div className="form-group col-lg-6 ">
                        <h6><b> Photo</b></h6>
                        <label className="btn btn-secondary">
                            <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" multiple  />
                        </label>
                    </div>
                    <div className="form-group col-lg-9">
                        <button onClick={clickSubmit} className="btn btn-info btn-md" style={{float: 'right', borderRadius:'7px'}}> Submit </button>
                    </div>
            </div>
        </div>
        </form>
    </>
   
    );

    const redirectUser = () => {
        if(redirectToProfile) {
            return <Redirect to="/admin/productlist" />;
         }  
    };

    return (
        <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <NotificationContainer/>
                        {redirectUser()}
                        {newPostForm()}   
                    </div>
                </div>
        </div>
    );
};

export default AddProduct;
