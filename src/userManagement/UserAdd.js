
import React, { useState } from 'react';
import { createUser } from "./apiUser";
import { Redirect } from 'react-router-dom';
import AdminLayout from '../core/AdminLayout';

const AddUser = (props) =>{
    
const [values, setValues] = useState({
        ownerName: '',
        email:'',
        password:'',
        userId:'',
        mobile:'',
        address:'',
        storeName:'',
        error: '',
        success: false,
        redirectToProfile: false
    });

const { ownerName, email, password, mobile, address, storeName, userId, success, error, redirectToProfile } = values;

const handleChange = ownerName => event => {
    setValues({ ...values, error: false, [ownerName]: event.target.value });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createUser({ ownerName, email, password, mobile, address, storeName }).then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error, success: false });
        } else {
            setValues({
                ...values,
                ownerName: '',
                email:'',
                userId:'',
                password:'',
                mobile:'',
                address:'',
                storeName:'',
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
       <a class="text-center" style={{color:'white'}}> Users add successfully </a> 
    </div>  
);

const redirectUser = () => {
    if(redirectToProfile) {
        return <Redirect to="/users" />;
     }  
};
return(
        <AdminLayout data={props}>
            <div className="page-wrapper">
                <div className="container-fluid">
                    <h4 className="font-bold"> Add Users</h4>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form>
                                        {showSuccess()}
                                        {showError()}
                                        {redirectUser()}
                                        <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                                            <div className="form-group col-lg-6">
                                                <h6><b><span style={{color:'red'}}>*</span> User Name</b></h6>
                                                <input onChange={handleChange('ownerName')} type="text" className="form-control" placeholder='Enter name' value={ownerName} />
                                            </div>
                                            <div className="form-group col-lg-6">
                                                <h6><b><span style={{color:'red'}}>*</span> User Id</b></h6>
                                                <input onChange={handleChange('userId')} type="text" className="form-control" placeholder='Enter email' value={userId} />
                                            </div>
                                            <div className="form-group col-lg-6">
                                                <h6><b><span style={{color:'red'}}>*</span> Email </b></h6>
                                                <input onChange={handleChange('email')} type="text" className="form-control" placeholder='Enter name' value={email} />
                                            </div>
                                            
                                            <div className="form-group col-lg-6">
                                                <h6><b><span style={{color:'red'}}>*</span> password </b></h6>
                                                <input onChange={handleChange('password')} type="password" className="form-control" placeholder='Enter password' value={password} />
                                            </div>
                                            <div className="form-group col-lg-6">
                                                <h6><b><span style={{color:'red'}}>*</span> Mobile </b></h6>
                                                <input onChange={handleChange('mobile')} type="text" className="form-control" placeholder='Enter mobile' value={mobile} />
                                            </div>
                                            <div className="form-group col-lg-6">
                                                <h6><b>Store Name</b></h6>
                                                <input onChange={handleChange('storeName')}  type="text" className="form-control" placeholder='Address' value={storeName} />
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <h6><b>Address</b></h6>
                                                <textarea onChange={handleChange('address')} rows="4" type="text" className="form-control" placeholder='Address' value={address}></textarea>
                                            </div>
                                            <div className="col-lg-12">
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


export default AddUser;

