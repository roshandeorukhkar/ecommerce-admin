import React, { useState, useEffect } from "react";
import AddStoreContent from "./AddStoreContent";
import StoreList from "./StoreList";
import { addStoreData } from "./ApiStore";
import { Link, useParams, useForm } from "react-router-dom";
import FormMainTitle from "../common/FormMainTitle";
import FormNotification from "../common/FormNotification";
import { storeList } from "./ApiStore";
import { getStoreDataById } from "./ApiStore";
import { Switch } from '@mui/material';
import { deleteStore } from "./ApiStore";


const AddListStore = () => {
    const Initilize = {
        storeName: "",
        storeNameError: "",
        ownerName: "",
        ownerNameError: "",
        address: "",
        addressError: "",
        userName: "",
        userNameError: "",
        mobile: "",
        mobileError: "",
        password: "",
        passwordError: "",
        email: "",
        emailError: "",
    }
    const [values, setValues] = useState({
        Initilize,
        errorNotification: "",
        alertColour: "",
        displayNotification: "dn",
        storeId: ""
    });

    const [list, setList] = useState([]);
    const [checkParams, setCheckParams] = useState(false);
    const [check, setCheck] = useState(true);


    const getDate = (date) => {
        const newDate = date.split('T')[0];
        const dt = newDate.split('-');
        return dt[2] + '-' + dt[1] + '-' + dt[0];
    }
    var i = 1;
    let params = useParams();
    console.log(params.storeId)
    useEffect(() => {
        if (params.storeId != undefined) {
            getStoreById();
            setValues({ storeId: params.storeId })
            setCheckParams(true);
        } else {
            setValues({
                Initilize,
                errorNotification: "",
                alertColour: "",
                displayNotification: "dn",
                storeId: ""
            })
        }
        getStoreList();
    }, []);

    const getStoreList = () => {
        storeList().then((data) => {
            console.log("hello");
            setList(data.result);
        });
    };

    const deleteStoreDetails=element=>{
        deleteStore(element).then((data) => {
            console.log("---------",data);
            getStoreList();
        })
    }

    const getStoreById = (id) =>  () => {
        console.log("-----",id);
         getStoreDataById({ storeId: id }).then((data) => {
            setValues({
                storeName: data.storeName,
                ownerName: data.ownerName,
                address: data.address,
                userName: data.userName,
                mobile: data.mobile,
                password: data.password,
                email: data.email
            });
        });
    }

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        addStoreData({ ...values }).then((data) => {
            if (data.status == false) {
                setValues({
                    ...values,
                    storeNameError: data.errors.storeName,
                    ownerNameError: data.errors.ownerName,
                    addressError: data.errors.address,
                    userNameError: data.errors.userName,
                    mobileError: data.errors.mobile,
                    passwordError: data.errors.password,
                    emailError: data.errors.email,
                    errorNotification: data.message,
                    alertColour: "alert-danger",
                    displayNotification: "db",
                });
            } else {
                setValues({
                    Initilize,
                    errorNotification: data.message,
                    alertColour: "alert-success",
                    displayNotification: "db",
                });
                getStoreList();
                document.getElementById("myForm").reset();
            }
        });
    };

    return (
        <>
            <FormNotification
                message={values.errorNotification}
                alertClass={values.alertColour}
                show={values.displayNotification}
            // onClick ={}
            />
            <div className="page-wrapper">
                <div className="container-fluid">
                    <FormMainTitle title="Store Management"
                        btnName="Add Role"
                        btnSecond="Add Store"
                        onClick={() => setCheckParams(!checkParams)}
                        btnLink="/admin/rolemanagement"
                        btnSecondlink="/admin/storemanagement"
                    />
                    <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <h4 className="box-title">
                                    {!(params.storeId) ? "Add Store" : "Edit Store"}
                                </h4>
                                <hr />
                                <form className="form-horizontal" id="myForm">
                                    <AddStoreContent
                                        label="Store Name"
                                        placeholder="Enter store name"
                                        type="text"
                                        value={values.storeName}
                                        onChange={handleChange("storeName")}
                                        errorSpan={values.storeNameError}
                                    />
                                    <AddStoreContent
                                        label="Store Owner Name"
                                        placeholder="Enter owner name"
                                        type="text"
                                        value={values.ownerName}
                                        onChange={handleChange("ownerName")}
                                        errorSpan={values.ownerNameError}
                                    />
                                    <AddStoreContent
                                        label="Store Address"
                                        placeholder="Enter Store Address"
                                        type="text"
                                        value={values.address}
                                        onChange={handleChange("address")}
                                        errorSpan={values.addressError}
                                    />
                                    <AddStoreContent
                                        label="Store Login ID"
                                        placeholder="Enter Store Login ID"
                                        type="text"
                                        value={values.userName}
                                        onChange={handleChange("userName")}
                                        errorSpan={values.userNameError}
                                    />
                                    <AddStoreContent
                                        label="Mobile No"
                                        placeholder="Enter Mobile No"
                                        type="text"
                                        value={values.mobile}
                                        onChange={handleChange("mobile")}
                                        errorSpan={values.mobileError}
                                    />
                                    <AddStoreContent
                                        label="Store Password"
                                        placeholder="Enter Store Password"
                                        type="text"
                                        value={values.password}
                                        onChange={handleChange("password")}
                                        errorSpan={values.passwordError}
                                    />
                                    <AddStoreContent
                                        label="Email Id"
                                        placeholder="Enter Email Id"
                                        type="text"
                                        value={values.email}
                                        onChange={handleChange("email")}
                                        errorSpan={values.emailError}
                                    />
                                    <div className="col-md-12 t-a-c">
                                        {params.storeId !== undefined ? <input type="hidden" value={values.storeId} onChange={handleChange("storeId")} /> : ""}
                                        <button
                                            type="submit"
                                            className="btn  btn-outline btn-rounded  btn-info"
                                            onClick={clickSubmit}
                                        >
                                            <i className="fa fa-plus-circle"></i>{" "}
                                            {!params.storeId ? "Save Store" : "Update Store"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {list ?
                        <div className="white-box">
                            <h3 className="box-title">
                                Store List
                            </h3>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Store Name</th>
                                            <th>E-mail</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            list.map((ele, key) => (
                                                <tr key={key}>
                                                    <td>{i++}</td>
                                                    <td>{ele.storeName}</td>
                                                    <td>{ele.email}</td>
                                                    <td>
                                                        <Switch name="checkedA"
                                                            inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "primary" }}
                                                            color='primary'
                                                            // checked="false" 
                                                            onClick={() => setCheck(!check)}
                                                        />
                                                    </td>
                                                    <td>{getDate(ele.createdDate)}</td>
                                                    <td>
                                                        {/* <Link to={`/admin/storemanagement/${ele._id}`} className='btn btn-outline btn-info m-5' aria-label='Edit' ><i className='fa fa-pencil font-15'></i></Link> */}
                                                        <button className='btn btn-outline btn-info m-5' aria-label='Edit' onClick={getStoreById(ele._id)}><i className='fa fa-pencil font-15'></i></button>
                                                        <button className='btn btn-outline btn-danger m-5' aria-label='Delete' onClick={deleteStoreDetails(ele._id)}><i className='fa fa-trash-o font-15'></i></button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div> : null
                    }
                </div>
            </div>
        </>
    );
};

export default AddListStore;
