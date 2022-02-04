import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { adminsignin } from "../auth/User";
import { authenticate ,isAuthenticated} from '../common/utils';
import { useHistory } from "react-router-dom";

const AdminSignin = () => {
    const [values , setValues] = useState({})
    const [error, setError] = useState('');
    const { email , password } = values;
    //const { admin } = isAuthenticated();
    let history = useHistory();

    const handleChange = name => event => {
        setValues({ ...values , [name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
       // setValues({ ...values, error : false ,loading: true });
        const res = await adminsignin({ email , password })
            const data = res.json();
            if(res.status === 400 || !data){
                setError('Please enter valid Email and Password!');
            }else{
                history.push("/admin/dashboard");
            }
        
    };

    const signUpForm = () => (
        <div>
            <div className="logoimage">
                <img className="img-fluid" src="../assets/images/logo.png" alt="logo" />
            </div>
            <div className="login_form">
                <form> 
                    <div className='admin_login'>
                        <div>
                            <i className='fa fa-mail'></i>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                onChange={handleChange("email")}
                                className="form-control"
                                placeholder='email'
                                value={email}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={handleChange("password")}
                                className="form-control"
                                placeholder='password'
                                value={password}
                            />
                           {error && (<span className="validation"> {error} </span>)}
                        </div>
                        
                        <Link to="#" className='admin_link'>forgotten Password</Link>

                        <div className='button_align'>
                            <div type="submit" onClick={handleSubmit} className="btn_1">
                                Login
                            </div>
                        </div>
                    </div>
                </form>                                                         
            </div>
        </div>
    );

    // const redirectUser = () => {
    //     if (isAuthenticated()) {
    //         return <Redirect to="/admin/dashboard" />;
    //     }
    // };

    const AdminFooter =()=>(
        <footer className='admin_footer'>
            <Link className='admin_link' to="keasofttech.com"><small>KEA Softtech Pvt. Ltd</small></Link>
            <small>"© 2017-2021 All Rights Reserved"</small>
        </footer>
    );

    return (
        <>
            {signUpForm()}
            {AdminFooter()}
            {/* {redirectUser()} */}
        </>
    );
};

export default AdminSignin;