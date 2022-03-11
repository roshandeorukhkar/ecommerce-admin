import React, { useState , useEffect} from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createUser ,getUser } from "./apiUser";
import { Redirect } from 'react-router-dom';
import { Link, useParams } from "react-router-dom";

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
            setValues({ ...values, error: data.error, success: false });
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
     //   return <Redirect to="/admin/users" />;
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
                    <h4 className="font-bold"> Add Users</h4>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form>
                                        {showSuccess()}
                                        {showError()}
                                        {redirectUser()}

                                            <input hidden  value={values.userId}  />
                                            <input hidden value={values.storeId} />
                                            <input hidden value={values.role} />
                                            
                                        <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>

                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> name </b></h6>
                                                <input onChange={handleChange('name')} type="text" className="form-control" placeholder='Enter name' />
                                            </div>

                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> Mobile </b></h6>
                                                <input onChange={handleChange('mobile')} type="text" className="form-control" placeholder='Enter mobile' />
                                            </div>
                                          
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> Email </b></h6>
                                                <input onChange={handleChange('email')} type="text" className="form-control" placeholder='Enter name' />
                                            </div>
                                            
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> password </b></h6>
                                                <input onChange={handleChange('password')} type="password" className="form-control" placeholder='Enter password'/>
                                            </div>

                                    
                                            <div className="form-group col-lg-7">
                                                <h6><b>Address</b></h6>
                                                <textarea onChange={handleChange('address')} rows="4" type="text" className="form-control" placeholder='Address'></textarea>
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
        </div>
    </>

    )

}


export default AddUser;

