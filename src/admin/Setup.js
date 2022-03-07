import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth';

const AdminSetup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        userRole:"0",
        success: false
    });

    const { name, email, password, success, error, userRole } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password, userRole }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
         <div>
            <div id="wrapper" className='login-register' >
                <div className='login-box'>
                    <div className='white-box'>
                        {showSuccess()}
                        {showError()}
                        <div className="logoimage t-a-c" >
                            <img className="img-fluid" src="../assets/images/logo.png" alt="logo" />
                        </div>
                        <div className="login_form">
                            {signUpForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSetup;
