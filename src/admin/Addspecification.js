
import React, { useState } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createspecification } from "./apiAdmin";
import { Redirect } from 'react-router-dom';

const Addspecification = () =>{
    
const [values, setValues] = useState({
        manufacturerName: '',
        specification_type:'',
        description: '',
        error: '',
        success: false,
        redirectToProfile: false
    });

const { manufacturerName,specification_type, description, success, error, redirectToProfile } = values;

const handleChange = manufacturerName => event => {
    setValues({ ...values, error: false, [manufacturerName]: event.target.value });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createspecification({ manufacturerName,specification_type, description}).then(data => {
        //alert(data.error)
        if (data.error) {
            setValues({ ...values, error: data.error, success: false });
        } else {
            setValues({
                ...values,
                manufacturerName: '',
                specification_type:'',
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
            },1000)
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
       <a class="text-center" style={{color:'white'}}> Specification add successfully </a> 
    </div>  
);

const redirectUser = () => {
    if(redirectToProfile) {
        return <Redirect to="/admin/Manuspecification" />;
     }  
};
return(
        <>
            <div id="wrapper">
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                    <h4 className="font-bold"> Add Specification</h4>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form  onSubmit={clickSubmit} class="col-md-6 offset-md-2">
                                        {showSuccess()}
                                        {showError()}
                                        {redirectUser()}
                                        <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                                            <div className="form-group ">
                                                <h6><b><span style={{color:'red'}}>*</span> Specification Name</b></h6>
                                                <input onChange={handleChange('manufacturerName')} type="text" className="form-control" placeholder='Enter name' value={manufacturerName} required/>
                                            </div>
               <div className="form-group">
                <label className="text-muted"><span className="text-danger">*</span><b>Specification Type</b></label>
                <input type="text" className="form-control" onChange={handleChange('specification_type')}  value={specification_type} autoFocus required />
            </div>
                                            <div className="form-group">
                                                <h6><b>Description</b></h6>
                                                <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                            </div>
                                            <div className="col-lg-7">
                                            <button className="btn btn-info">Submit</button>
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


export default Addspecification;

