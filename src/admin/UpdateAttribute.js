import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getAttribute, updateAttribute } from './apiAdmin';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import AdminLayout from '../core/AdminLayout';


const UpdateAttribute = (props) => {
    const { match } = props
    const [values, setValues] = useState({
        manufacturerName: '',
        description:'',
        dimension:'',
        error: '',
        success: false,
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { attributeName,dimension, description, error, success, redirectToProfile } = values;

    const init = attributeId => {
        getAttribute(attributeId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    attributeName: data.attributeName,
                    dimension:data.dimension,
                    description: data.description
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.attributeId);
    }, []);

    const handleChange = attributeName => event => {
        setValues({ ...values, error: false, [attributeName]: event.target.value });
    };

    const handleChange_des = description => event => {
        setValues({ ...values, error: false, [description]: event.target.value });
    };

    const submitAttributeForm = e => {
        e.preventDefault();
        const attribute = {
            attributeName: attributeName,
            dimension:dimension,
            description:description
        };
        updateAttribute(match.params.attributeId,attribute).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    attributeName: data.attributeName,
                    dimension:data.dimension,
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
                },2000)
            }
        });
    };

    const updateAttributeForm = () => (
        <div className="">
            <form className="mb-3" onSubmit={submitAttributeForm}>
            <div className="form-group col-sm-7">
                <h6><b><span style={{color:'red'}}>*</span> Attribute Name</b></h6>
                <input onChange={handleChange('attributeName')} type="text" placeholder='Enter Attribute' className="form-control" value={attributeName} required attributeName="attributeName" />
            </div>
            <div className="form-group col-sm-7">
                <h6><b> Dimension</b></h6>
                <input onChange={handleChange('dimension')} type="text" placeholder='Enter Dimension' className="form-control" value={dimension} required dimension="dimension" />
            </div>
            <div className="form-group col-sm-7">
               <h6><b>Description</b></h6>
                <textarea onChange={handleChange_des('description')} rows="4" className="form-control" placeholder='Description' value={description} description="description"  />
            </div>
            <div className="form-group col-md-7">
            <button className="btn btn-info btn-md"style={{float:'right'}}>Update</button>
            </div>
        </form>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
           <a class="text-center" style={{color:'white'}}> Attribute  update successfully </a> 
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
                return <Redirect to="/admin/attribute" />;
            }
        }
    };

   

    return (
        <AdminLayout data={props}>
            <div className="page-wrapper">
                    <div className="container-fluid">
                        <h2 className="font-bold"> Edit Attribute</h2>
                            <div className="white-box">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                                            {showSuccess()}
                                            {showError()}
                                            {updateAttributeForm()}
                                            {redirectUser()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        </AdminLayout>
    );
};

export default UpdateAttribute;
