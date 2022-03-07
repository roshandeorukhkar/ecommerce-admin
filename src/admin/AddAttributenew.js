import React, { useState } from 'react';
import { createAttribute } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
import AdminLayout from "../core/AdminLayout";

const AddAttributenew = (props) =>{
    
const [values, setValues] = useState({
        attributeName: '',
        dimension:'',
        description: '',
        error: '',
        success: false,
        redirectToProfile: false
    });

const { attributeName,dimension, description, success, error, redirectToProfile } = values;

const handleChange = attributeName => event => {
    setValues({ ...values, error: false, [attributeName]: event.target.value });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createAttribute({ attributeName,dimension, description}).then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error, success: false });
        } else {
            setValues({
                ...values,
                attributeName: '',
                dimension:'',
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
            },3000)
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
       <a class="text-center" style={{color:'white'}}> Attribute add successfully </a> 
    </div>  
);

const redirectUser = () => {
    if(redirectToProfile) {
        return <Redirect to="/admin/attribute" />;
     }  
};
return(
    <AdminLayout data={props}>
        <div className="page-wrapper">
            <div className="container-fluid">
                <h2 className="font-bold"> Add Attribute </h2>
                    <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <form>
                                    {showSuccess()}
                                    {showError()}
                                    {redirectUser()}
                                    <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                                        <div className="form-group col-sm-7"> 
                                            <h6><b><span style={{color:'red'}}>*</span> Attribute Name</b></h6>
                                            <input onChange={handleChange('attributeName')} type="text" className="form-control" placeholder='Enter Attribute' value={attributeName} />
                                        </div>
                                        <div className="form-group col-sm-7"> 
                                            <h6><b> Dimension</b></h6>
                                            <input onChange={handleChange('dimension')} type="text" className="form-control" placeholder='Enter Dimension' value={dimension} />
                                        </div>
                                        <div className="form-group col-sm-7">
                                            <h6><b> Attribute Description</b></h6>
                                            <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                        </div>
                                        <div className="form-group col-md-7">
                                        <button onClick={clickSubmit} className="btn btn-info btn-md" style={{float: 'right'}}> Submit </button>
                                        </div>
                                        
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </AdminLayout>

    )

}


export default AddAttributenew;

