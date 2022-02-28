import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import { getUsers, updateUser } from './apiUser';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";


const UpdateUsers = ({ match }) => {
    const [values, setValues] = useState({
        ownerName: '',
        email:'',
        address:'',
        createdDate:'',
        error: '',
        success: false,
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { ownerName, email, address, createdDate, error, success, redirectToProfile } = values;

    const init = userId => {
        getUsers(userId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    ownerName: data.ownerName,
                    email:data.email,
                    address:data.address,
                    createdDate:data.createdDate
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = ownerName => event => {
        setValues({ ...values, error: false, [ownerName]: event.target.value });
    };

    const handleChange_email = email => event => {
        setValues({ ...values, error: false, [email]: event.target.value });
    };

    const handleChange_date = createdDate => event => {
        setValues({ ...values, error: false, [createdDate]: event.target.value });
    };

    const handleChange_address = address => event => {
        setValues({ ...values, error: false, [address]: event.target.value });
    };

    const submitUserForm = e => {
        e.preventDefault();
        const users = {
            ownerName: ownerName,
            email:email,
            address:address
        };
        updateUser(match.params.userId, users).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    ownerName: data.ownerName,
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
                <input onChange={handleChange('ownerName')} type="text" placeholder='Enter name' className="form-control" value={ownerName} required ownerName="ownerName" />
            </div>
            <div className="form-group col-lg-7">
                <h6><b><span style={{color:'red'}}>*</span> User Id</b></h6>
                <input onChange={handleChange_email('email')} type="text" placeholder='Enter user id' className="form-control" value={email} required email="email" />
            </div>
            <div className="form-group col-lg-7">
                <h6><b><span style={{color:'red'}}>*</span>Date</b></h6>
                <input onChange={handleChange_date('createdDate')} type="text" className="form-control" value={createdDate} required createdDate="createdDate" />
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
                return <Redirect to="/admin/users" />;
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
