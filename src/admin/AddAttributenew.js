import React, { useState } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createAttribute } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

const AddAttributenew = () =>{
    
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
        <>
            <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                <div className='row'>
                        <div className='col-md-8'><h3 className="font-bold"> Add Attribute</h3></div>
                        <div className='col-md-4'><Link to={`/admin/attribute`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form>
                                        {showSuccess()}
                                        {showError()}
                                        {redirectUser()}
                                        <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                                            <div className="form-group col-sm-7"> 
                                                <h6><b> Attribute Name</b><span style={{color:'red'}}>*</span></h6>
                                                <input onChange={handleChange('attributeName')} type="text" className="form-control" placeholder='Enter Attribute' value={attributeName} />
                                            </div>
                                            <div className="form-group col-sm-7"> 
                                                <h6><b> Attributes Values</b><span style={{color:'red'}}>*</span></h6>
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
        </div>
    </>

    )

}


export default AddAttributenew;

