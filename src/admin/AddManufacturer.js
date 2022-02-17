import React, { useState } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createManufacturer } from "./apiAdmin";
import { Redirect } from 'react-router-dom';

const AddManufacturer = () =>{
    
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
                redirectToProfile: true
            });
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
       <a class="text-center" style={{color:'white'}}> Manufacture add data successfully</a> 
       <button className='btn btn-info'>Ok</button>
    </div>  
);

const redirectUser = () => {
   
    if (redirectToProfile) { 
        // setTimeout(() => {
            console.log("DSF"); 
        return <Redirect to="/admin/manufacturers" />;
        // }, 1000);
    }
};

// const redirectUser = () => {
//     if (redirectToProfile) {
//         if (success == true) {
//             //return <Redirect to="/admin/manufacturers" />;
//             // setTimeout(() => {
//                 alert(1)
//                 return <Redirect to="/admin/manufacturers" />;
//             //}, 2000)

//             return '';
//         }
//     }
// };

    return(
        <>
            <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
           
            <div className="page-wrapper">
            <div className="container-fluid">
                
                <h2 className="font-bold"> Add Manufacture </h2>
                
                <div className="white-box">
                    <div className="row">
                        <div className="col-lg-12">
                            <hr />
                            <form>
                              
                            {showSuccess()}   
                            {showError()}
                            {redirectUser()}
                            <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                                <div className="form-group">
                                    <label> <span style={{color:'red'}}>*</span> Manufacturer Name</label>
                                    <input onChange={handleChange('manufacturerName')} type="text" className="form-control" value={manufacturerName} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" value={description}></textarea>
                                </div>
                                <button onClick={clickSubmit} className="btn btn-info"> Save </button>
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

