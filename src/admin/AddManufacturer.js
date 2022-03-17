
import React, { useState } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createManufacturer } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Link } from "react-router-dom";

const AddManufacturer = () =>{
    
const [values, setValues] = useState({
        manufacturerName: '',
        errormanufacturerName: '',
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
        //console.log("-----",data)
        // if (data.error) {
        //     errormanufacturerName: data.errors.manufacturerName,
        //     NotificationManager.error('Manufacter name already exits!');
        //     setValues({ ...values, error: data.error, success: false });
        // } 
        if (data.status == false) {
            setValues({
              ...values,
              errormanufacturerName: data.errors.manufacturerName,
            });
            NotificationManager.error(data.message);
          } 
        else {
            setValues({
                ...values,
                manufacturerName: '',
                errormanufacturerName: '',
                description: '',
                error: '',
                success: true,
                redirectToProfile: false
            });
            NotificationManager.success('Manufacter has been added successfully!');
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
        return <Redirect to="/admin/manufacturers" />;
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
                        <div className='col-md-8'><h4 className="font-bold"> Add Manufacture</h4></div>
                        <div className='col-md-4'><Link to={`/admin/manufacturers`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                        <div className="white-box">
                            <div className="row">
                                 <NotificationContainer/>
                                <div className="col-lg-12">
                                    <form>
                                        {/*{showSuccess()}
                                        {showError()} */}
                                        {redirectUser()}
                                        <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> Manufacturer Name</b></h6>
                                                <input onChange={handleChange('manufacturerName')} type="text" className="form-control" placeholder='Enter name' value={manufacturerName} />
                                                <span className='error text-danger'>{values.errormanufacturerName}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b> Manufacturer Description</b></h6>
                                                <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                            </div>
                                            <div className="col-lg-7">
                                                <button onClick={clickSubmit} className="btn btn-info btn-md" style={{float: 'right', borderRadius:'7px'}}> Submit </button>
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


export default AddManufacturer;

