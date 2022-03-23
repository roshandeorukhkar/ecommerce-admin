import React, { useState } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createAttribute } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const AddAttributenew = () =>{

const [inputList, setInputList] = useState([{ specification: "" }]);
    
const [values, setValues] = useState({
        attributeName: '',
        errorsAttributeName:'',
        errorsAttributeValue:'',
        dimension:'',
        description: '',
        error: '',
        success: false,
        redirectToProfile: false
    });

const { attributeName,dimension, description, success, error, redirectToProfile } = values;

 //add multiple
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        //console.log("value",value);
        //console.log("value",index);
        const list = [...inputList];
       // const sList = [];
        list[index] = value;
        //sList.push(list);
        setInputList(list);
        setValues({ ...values, dimension: list });
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { specification: "" }]);
    };
    //end multiple

const handleChange = attributeName => event => {
    setValues({ ...values, error: false, [attributeName]: event.target.value });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createAttribute({ attributeName,dimension, description}).then(data => {
        // if (data.error) {
        //     setValues({ ...values, error: data.error, success: false });
        // } 
        if (data.status == false) {
            setValues({
              ...values,
              errorsAttributeName: data.errors.attributeName,
              errorsAttributeValue:data.errors.dimension,
            });
           // NotificationManager.error(data.message);
          } 
        else {
            setValues({
                ...values,
                attributeName: '',
                errorsAttributeName:'',
                errorsAttributeValue:'',
                dimension:'',
                description: '',
                error: '',
                success: true,
                redirectToProfile: false
            });
            NotificationManager.success('Attribute has been created successfully!');
            setTimeout(function(){
                setValues({
                    ...values,
                    redirectToProfile:true
                })
            },3000)
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
       <a class="text-center" style={{color:'white'}}> Attribute add successfully </a> 
    </div>  
);

const redirectUser = () => {
    if(redirectToProfile) {
        return <Redirect to="/admin/attribute" />;
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
                        <div className='col-md-8'><h3 className="font-bold"> Add Attribute</h3></div>
                        <div className='col-md-4'><Link to={`/admin/attribute`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form>
                                        <NotificationContainer/>
                                        {/* {showSuccess()} */}
                                        {showError()}
                                        {redirectUser()}
                                        <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                                            <div className="form-group col-sm-7"> 
                                                <h6><b> Attribute Name</b><span style={{color:'red'}}>*</span></h6>
                                                <input onChange={handleChange('attributeName')} type="text" className="form-control" placeholder='Enter Attribute' value={attributeName} />
                                                <span className='error text-danger'>{values.errorsAttributeName}</span>
                                            </div>
                                            <div className="form-group col-sm-7"> 
                                                <h6><b> Attributes Values</b></h6>
                                                {/* <input onChange={handleChange('dimension')} type="text" className="form-control" placeholder='Enter Dimension' value={dimension} />
                                                <span className='error text-danger'>{values.errorsAttributeValue}</span> */}
                                            </div>
                                            {inputList.map((x, i) => {
                                                return (
                                                    <div className="form-group">
                                                            <div className='col-lg-7'>
                                                                <input name="dimension" className="form-control" placeholder="Enter Values" value={x.dimension} onChange={e => handleInputChange(e, i)} />
                                                            </div>
                                                            <div className='form-group col-lg-1'>
                                                                {inputList.length !== 1 && <button className="btn btn-danger" onClick={() => handleRemoveClick(i)}><i className='fa fa-minus '></i></button>}
                                                                {inputList.length - 1 === i && <button onClick={handleAddClick} className="btn btn-info"><i className='fa fa-plus'></i></button>}
                                                            </div>
                                                        </div>
                                                );
                                            })}
                                            <div className="form-group col-sm-7">
                                                <h6><b> Attribute Description</b></h6>
                                                <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                            </div>
                                            <div className="form-group col-md-7">
                                            <button onClick={clickSubmit} className="btn btn-info btn-md"  style={{float: 'right', borderRadius:'7px'}}> Submit </button>
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


export default AddAttributenew;

