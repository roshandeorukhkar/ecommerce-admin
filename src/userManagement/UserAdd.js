import React, { useState , useEffect} from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createUser ,getUser } from "./apiUser";
import { Redirect } from 'react-router-dom';
import { Link, useParams } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';

const AddUser = () =>{

const [user, setUser] = useState([]);
const params = useParams();


const [values, setValues] = useState({
        email:'',
        password:'',
        userId:'',
        name:'',
        mobile:'',
        address:'',
        storeId:'',
        error: '',
        nameError: '',
        mobileError:'',
        emailError:'',
        passwordError:'',
        success: false,
        redirectToProfile: false
    });

const { email, password, mobile, address, userId, storeId, name, success, error, redirectToProfile } = values;
var role = 5;
const loadUser = () => {
    getUser().then(data => {
        if (data.error) {
        } else {
            setValues({userId : data[0]._id, storeId :params.storeId, role:role});
        }
    });
};
 
const handleChange = email => event => {
    setValues({ ...values, error: false, [email]: event.target.value });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createUser({ email, password, mobile, address, userId, storeId, name, role }).then(data => {
        if (data.error) {
            setValues({ 
                ...values,
                nameError: data.error.name,
                mobileError:data.error.mobile,
                emailError:data.error.email,
                passwordError:data.error.password,
            });
        } else {
            setValues({
                ...values,
                email:'',
                userId:'',
                storeId:'',
                name:'',
                role:'',
                password:'',
                mobile:'',
                address:'',
                error: '',
                nameError: '',
                mobileError:'',
                emailError:'',
                passwordError:'',
                success: true,
                redirectToProfile: false
            });
            NotificationManager.success("Users add successfully");
            setTimeout(function(){
                setValues({
                    ...values,
                    redirectToProfile:true
                })
            },1000)
        }
    });
};


const redirectUser = () => {
    if(redirectToProfile) {
        return <Redirect to={`/admin/user/list/${storeId}`} />;
     }  
};

useEffect(() => {
    loadUser();
}, []);
return(
        <>
            <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                <NotificationContainer />
                <div className='row'>
                        <div className='col-md-8'><h4 className="font-bold"> Add Users</h4></div>
                        <div className='col-md-4'><Link to={`/admin/user/list/${storeId}`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form>
                                        {redirectUser()}

                                            <input hidden  value={values.userId}  />
                                            <input hidden value={values.storeId} />
                                            <input hidden value={values.role} />
                                            
                                        <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>

                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> Name </b></h6>
                                                <input onChange={handleChange('name')} type="text" className="form-control" placeholder='Enter name' />
                                                <span className='text-danger'>{values.nameError}</span>
                                            </div>

                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> Mobile </b></h6>
                                                <input onChange={handleChange('mobile')} type="text" maxLength={10} className="form-control" placeholder='Enter mobile' />
                                                <span className='text-danger'>{values.mobileError}</span>
                                            </div>
                                          
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> Email </b></h6>
                                                <input onChange={handleChange('email')} type="text" className="form-control" placeholder='Enter name' />
                                                <span className='text-danger'>{values.emailError}</span>
                                            </div>
                                            
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> Password </b></h6>
                                                <input onChange={handleChange('password')} type="password" className="form-control" placeholder='Enter password' autoComplete="new-password"/>
                                                <span className='text-danger'>{values.passwordError}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b>Address</b></h6>
                                                <textarea onChange={handleChange('address')} rows="4" type="text" className="form-control" placeholder='Address'></textarea>
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


export default AddUser;

