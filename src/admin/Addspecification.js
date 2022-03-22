
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createspecification } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Addspecification = () => {

    const [inputList, setInputList] = useState([{ specification: "" }]);


    const [values, setValues] = useState({
        manufacturerName: '',
        errorsSpecificationName: '',
        errorsSpecificationValue: '',
        specification_type: '',
        description: '',
        error: '',
        success: false,
        redirectToProfile: false
    });
    //add multiple
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        //console.log("value",value);
        //console.log("value",index);
        const list = [...inputList];
        const sList = [];
        list[index] = value;
        sList.push(list);
        setInputList(list);
        setValues({ ...values, specification_type: sList });
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
    const { manufacturerName, specification_type, description, success, error, redirectToProfile } = values;

    const handleChange = manufacturerName => event => {
        setValues({ ...values, error: false, [manufacturerName]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        createspecification({ manufacturerName, specification_type, description }).then(data => {
            //alert(data.error)
            if (data.status == false) {
                setValues({
                    ...values,
                    errorsSpecificationName: data.errors.manufacturerName,
                    errorsSpecificationValue: data.errors.specification_type,
                });
                // NotificationManager.error(data.message);
            }
            else {
                setValues({
                    ...values,
                    manufacturerName: '',
                    specification_type: '',
                    errorsSpecificationName: '',
                    errorsSpecificationValue: '',
                    description: '',
                    error: '',
                    success: false,
                    redirectToProfile: false
                });
                setValues({
                    ...values,
                    redirectToProfile: true
                })
                NotificationManager.success('Specification has been added successfully!');
                setTimeout(function () {
                    setValues({
                        ...values,
                        redirectToProfile: true
                    })
                }, 1000)
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
            <a className='text-center' style={{ color: 'white' }}> Specification add successfully </a>
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            return <Redirect to="/admin/Manuspecification" />;
        }
    };

    return (
        <>
            <div id="wrapper">
                <AdminSidebar />

                <div className="page-wrapper">
                    <div className="container-fluid">
                        {/* <Select options={options} isMulti='true'/> */}
                        <NotificationContainer />
                        <div className='row'>
                            <div className='col-md-8'><h3 className="font-bold"> Add Specification</h3></div>
                            <div className='col-md-4'><Link to={`Manuspecification`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i className="fa fa-backward"></i> Back</button></Link></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    {showError()}
                                    <form onSubmit={clickSubmit}>
                                        {/* {showSuccess()} */}
                                        {redirectUser()}
                                        <div className="demoPage" style={{ background: '#ffffff', padding: '20px' }}>
                                            <div className="form-group col-lg-7 ">
                                                <h6><b><span style={{ color: 'red' }}>*</span> Specification Name</b></h6>
                                                <input onChange={handleChange('manufacturerName')} type="text" className="form-control" placeholder='Enter name' />
                                                <span className='error text-danger'>{values.errorsSpecificationName}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{ color: 'red' }}>*</span> Specification Value</b></h6>
                                                {/* <input type="text" className="form-control" onChange={handleChange('specification_type')} placeholder="Enter values" value={specification_type} />
                                                <span className='error text-danger'>{values.errorsSpecificationValue}</span> */}
                                            </div>
                                            {/* <a>add multiple start</a> */}
                                            {inputList.map((x, i) => {
                                                return (
                                                    <div className="form-group">
                                                            <div className='col-lg-7'>
                                                                <input name="specification" className="form-control" placeholder="Enter Values" value={x.specification_type} onChange={e => handleInputChange(e, i)} />
                                                            </div>
                                                            <div className='form-group col-lg-1'>
                                                                {inputList.length !== 1 && <button className="btn btn-danger" onClick={() => handleRemoveClick(i)}><i className='fa fa-minus '></i></button>}
                                                                {inputList.length - 1 === i && <button onClick={handleAddClick} className="btn btn-info"><i className='fa fa-plus'></i></button>}
                                                            </div>
                                                        </div>
                                                );
                                            })}
                                            {/* <a>End add multiple start</a> */}
                                            <div className="form-group col-lg-7">
                                                <h6><b>Specification Description</b></h6>
                                                <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <button className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}>Submit</button>
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


export default Addspecification;

