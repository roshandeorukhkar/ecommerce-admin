// import React, { useEffect, useState } from "react";
// import AdminHeader from "../user/AdminHeader";
// import AdminSidebar from "../user/AdminSidebar";
// import Layout from "../core/Layout";
// import { isAuthenticated } from "../auth";
// import { Link } from "react-router-dom";
// import { createManufacturer } from "./apiAdmin";

//     const AddManufacturer = () => {
//     const [manufacturerName, setName] = useState("");
//     const [description, setDescription] = useState("");
  
//     const [error, setError] = useState(false);
//     const [success, setSuccess] = useState(false);

 
//     const handleChange = e => {
//         setError("");
//         setName(e.target.value);
//     };
    
//     const handleChange_des = e => {
//         setError("");
//         setDescription(e.target.value);
//     };

//     const clickSubmit = e => {
//         e.preventDefault();
//         setError("");
//         setSuccess(false);
      
//         createManufacturer({ manufacturerName, description }).then(data => {
//             if (data.error) {
//                 setError(data.error);
//             } else {
//                 setError("");
//                 setSuccess(true);
//                 setName('');
   
//             }
//         });
//     };
//     const newCategoryFom = () => (
//         <form onSubmit={clickSubmit}>
//             <div className="form-group">
//                 <label className="text-muted"><span className="text-danger">*</span><b> Manufacturer Name</b></label>
//                 <input type="text" className="form-control" onChange={handleChange} value={manufacturerName} autoFocus required />
//             </div>
//             <div className="form-group">
//                 <label className="text-muted"><b>Description</b></label>
//                 <textarea rows="2" className="form-control" onChange={handleChange_des} value={description} autoFocus></textarea>
//             </div>
//             <button className="btn btn-info">Save</button>
//         </form>
//     );
  
//     const showSuccess = () => {
//         if (success) {
//             return <h3 className="text-success">Manufacturer data is created</h3>;
//         }
//     };
    
//     const showError = () => {
//         if (error) {
//             return <h3 className="text-danger">Category should be unique</h3>;
//         }
//     };
//     return (
      
//             <div className="row">
//                  <AdminHeader />
//                  <AdminSidebar />
//                  <div className="page-wrapper">
//                     <div className="container-fluid">
//                         <h2 className="font-bold"> Add Manufacturer </h2>
//                             <div className="white-box">
//                                 <div className="row">
//                                     <div className="col-lg-12">
//                                         <div className="col-md-12 offset-md-2">
//                                             {showSuccess()}
//                                             {showError()}
//                                             {newCategoryFom()}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                      </div>
//                 </div>

//     );
// };

// export default AddManufacturer;

import React, { useState } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createManufacturer } from "./apiAdmin";


const AddManufacturer = () =>{
    
const [values, setValues] = useState({
        manufacturerName: '',
        description: '',
        error: '',
        success: false
    });

const { manufacturerName, description, success, error } = values;

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
                success: true
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
       <a class="text-center" style={{color:'white'}}> Manufacture add data successfully </a> 
    </div>
);

    return(
        <>
        <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
           
            <div className="page-wrapper">
            <div className="container-fluid">
                <h2 className="font-bold"> Add Manufacture 
                <button type="submit" className="btn  btn-outline btn-rounded  btn-info fa-pull-right"><i className="fa fa-plus-circle"></i> Add Manufacture</button></h2>
                <div className="white-box">
                    <div className="row">
                        <div className="col-lg-12">
                            <hr />
                            <form>
                            {showSuccess()}
                            {showError()}
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

