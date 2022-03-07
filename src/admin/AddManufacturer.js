
import React, { useState } from 'react';
import { createManufacturer } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
import AdminLayout from "../core/AdminLayout";

const AddManufacturer = (props) =>{
    
const [values, setValues] = useState({
        manufacturerName: '',
        description: '',
        error: '',
        success: false,
        redirectToProfile: false
    });

const { manufacturerName, description, success, error, redirectToProfile } = values;

const handleChange = manufacturerName => event => {
    setValues({ ...values, error: false, [manufacturerName]: event.target.value });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createManufacturer({ manufacturerName, description}).then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error, success: false });
        } else {
            setValues({
                ...values,
                manufacturerName: '',
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
       <a class="text-center" style={{color:'white'}}> Manufacture add successfully </a> 
    </div>  
);

const redirectUser = () => {
    if(redirectToProfile) {
        return <Redirect to="/manufacturers" />;
     }  
};
return(
    <AdminLayout data={props}>
        <div className="page-wrapper">
            <div className="container-fluid">
                <h4 className="font-bold"> Add Manufacture</h4>
                    <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <form>
                                    {showSuccess()}
                                    {showError()}
                                    {redirectUser()}
                                    <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                                        <div className="form-group col-lg-7">
                                            <h6><b><span style={{color:'red'}}>*</span> Manufacturer Name</b></h6>
                                            <input onChange={handleChange('manufacturerName')} type="text" className="form-control" placeholder='Enter name' value={manufacturerName} />
                                        </div>
                                        <div className="form-group col-lg-7">
                                            <h6><b>Description</b></h6>
                                            <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                        </div>
                                        <div className="col-lg-7">
                                            <button onClick={clickSubmit} className="btn btn-info btn-md" style={{float:'right'}}> Submit </button>
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


export default AddManufacturer;

