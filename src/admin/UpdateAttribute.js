import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getAttribute, updateAttribute } from './apiAdmin';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const UpdateAttribute = ({ match }) => {
const [inputList, setInputList] = useState([{ specification: "" }]);

    const [values, setValues] = useState({
        manufacturerName: '',
        description:'',
        dimension:'',
        errorsAttributeName:'',
        errorsAttributeValue:'',
        error: '',
        success: false,
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { attributeName,dimension, description, error, success, redirectToProfile } = values;

    const init = attributeId => {
        getAttribute(attributeId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    attributeName: data.attributeName,
                    dimension:data.dimension,
                    description: data.description
                });
                setInputList(data.dimension);
            }
        });
    };

    //add multiple
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        //console.log("value",value);
        //console.log("value",index);
        const list = [...inputList];
        //const sList = [];
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
        setInputList([...inputList, { dimension: "" }]);
    };
    //end multiple

    useEffect(() => {
        init(match.params.attributeId);
    }, []);

    const handleChange = attributeName => event => {
        setValues({ ...values, error: false, [attributeName]: event.target.value, errorsAttributeName:''});
    };

    const handleChange_des = description => event => {
        setValues({ ...values, error: false, [description]: event.target.value });
    };

    const submitAttributeForm = e => {
        e.preventDefault();
        const attribute = {
            attributeName: attributeName,
            dimension:dimension,
            description:description
        };
        updateAttribute(match.params.attributeId,attribute).then(data => {
            if (data.status == false) {
                setValues({
                  ...values,
                  errorsAttributeName: data.errors.attributeName,
                  errorsAttributeValue:data.errors.dimension,
                });
                NotificationManager.error(data.message);
              } 
            else {
                setValues({
                    ...values,
                    attributeName: data.attributeName,
                    dimension:data.dimension,
                    description:data.description,
                    errorsAttributeName:'',
                    error: false,
                    success: true,
                    redirectToProfile: false
                });
                NotificationManager.success('Attribute has been updated successfully!');
                setTimeout(function(){
                    setValues({
                        ...values,
                        redirectToProfile:true
                    })
                },2000)
            }
        });
    };

    const updateAttributeForm = () => (
        <div className="">
            <form className="mb-3" onSubmit={submitAttributeForm}>
            <div className="form-group col-sm-7">
                <h6><b><span style={{color:'red'}}>*</span> Attribute Name</b></h6>
                <input onChange={handleChange('attributeName')} type="text" placeholder='Enter Attribute' className="form-control" value={attributeName} attributeName="attributeName" />
                <span className='error text-danger'>{values.errorsAttributeName}</span>
            </div>
            <div className="form-group col-sm-7">
                <h6><b> Attribute value</b></h6>
    
            </div>
                         {inputList.map((x, i) => {
                                return (
                                    <>
                                       <div className="form-group"> 
                                            <div className='col-lg-7'>
                                                <input name="dimension" className="form-control" placeholder="Enter Values" value={dimension[i]} onChange={e => handleInputChange(e, i)} dimension="dimension" />
                                            </div>
                                            <div className='form-group col-lg-1'>
                                                {inputList.length !== 1 && <button className="btn btn-danger" onClick={() => handleRemoveClick(i)}><i className='fa fa-minus '></i></button>}
                                                {inputList.length - 1 === i && <button onClick={handleAddClick} className="btn btn-info"><i className='fa fa-plus'></i></button>}
                                            </div>
                                        </div>
                                    </>
                                 
                                    );
                            })}

                            <div className="form-group col-sm-7">
                                <h6><b>Attribute Description</b></h6>
                                <textarea onChange={handleChange_des('description')} rows="4" className="form-control" placeholder='Description' value={description} description="description"  />
                            </div>
                        <div className="form-group col-md-7">
                             <button className="btn btn-info btn-md"style={{float: 'right', borderRadius:'7px'}}>Update</button>
                        </div>
        </form>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
           <a class="text-center" style={{color:'white'}}> Attribute  update successfully </a> 
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
                return <Redirect to="/admin/attribute" />;
            }
        }
    };

    return (
            <div className="row">
                 <AdminHeader />
                 <AdminSidebar />
                 <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><h3 className="font-bold"> Edit Attribute</h3></div>
                            <div className='col-md-4'><Link to={`/admin/attribute`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                        </div>
                            <div className="white-box">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                                            <NotificationContainer/>
                                            {/* {showSuccess()} */}
                                            {showError()}
                                            {updateAttributeForm()}
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

export default UpdateAttribute;
