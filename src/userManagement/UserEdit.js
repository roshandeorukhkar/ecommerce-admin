import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';

import { Redirect } from 'react-router-dom';
import { getUsers, updateUser } from './apiUser';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { useParams } from "react-router-dom";


const UpdateUsers = ({ match }) => {
    
    const params = useParams();

    const [values, setValues] = useState({
        name: '',
        email:'',
        address:'',
        storeId:'',
        createdDate:'',
        error: '',
        success: false,
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();

    const { name, email, address, storeId, createdDate, error, success, redirectToProfile } = values;

    const init = userId => {
        getUsers(userId).then(data => {
          //  console.log("hello",data.storeId._id)
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    email:data.email,
                    address:data.address,
                    storeId:data.storeId._id,
                    createdDate:data.storeId.createdDate
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => event => {
        console.log(event);
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleChange_email = email => event => {
        setValues({ ...values, error: false, [email]: event.target.value });
    };

    const handleChange_address = address => event => {
        setValues({ ...values, error: false, [address]: event.target.value });
    };

    const submitUserForm = e => {
        e.preventDefault();
        const users = {
            name: name,
            email:email,
            address:address
        };
        updateUser(match.params.userId, users).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    email: data.email,
                    address:data.address,
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

    const updateUserForm = () => (
        <div className="">
            <form className="mb-3" onSubmit={submitUserForm}>
            <div className="form-group col-lg-7">
                <h6><b><span style={{color:'red'}}>*</span> User Nmae</b></h6>
                <input onChange={handleChange('name')} type="text" placeholder='Enter name' className="form-control" value={name} required name="name" />
            </div>
            <div className="form-group col-lg-7">
                <h6><b><span style={{color:'red'}}>*</span> User Id</b></h6>
                <input onChange={handleChange_email('email')} type="text" placeholder='Enter user id' className="form-control" value={email} required email="email" />
            </div>
            <div className="form-group col-lg-7">
               <h6><b>Address</b></h6>
                <textarea onChange={handleChange_address('address')} rows="3" className="form-control" placeholder='Description' value={address} address="address"  />
            </div>
            <div className='col-lg-7'>
                <button className="btn btn-info btn-md"style={{float:'right'}}>Update</button>
            </div>
        </form>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
           <a class="text-center" style={{color:'white'}}> User update successfully </a> 
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
                return <Redirect to={`/admin/user/list/${storeId}`} />;
            }
        }
    };

   

    return (
            <div className="row">
                 <AdminHeader />
                 <AdminSidebar />
                 <div className="page-wrapper">
                    <div className="container-fluid">
                        <h2 className="font-bold"> Edit Users</h2>
                            <div className="white-box">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                                            {showSuccess()}
                                            {showError()}
                                            {updateUserForm()}
                                            {redirectUser()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    };

export default UpdateUsers;
