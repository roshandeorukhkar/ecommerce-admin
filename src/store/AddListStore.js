import React, { useState, useEffect, useCallback } from "react";
import AddStoreContent from "./AddStoreContent";
import { addStoreData } from "./ApiStore";
import { Link, useParams, useForm, useHistory } from "react-router-dom";
import FormMainTitle from "../common/FormMainTitle";
import FormNotification from "../common/FormNotification";
import { storeList } from "./ApiStore";
import { getStoreDataById } from "./ApiStore";
import { deleteStore } from "../store/ApiStore";
import TableComponent from "../common/TableComponent";
import StorePasswordInput from "./StorePasswordInput";

const AddListStore = (props) => {
    const [values, setValues] = useState({
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
        errorNotification: "",
        alertColour: "",
        displayNotification: "dn",
        storeId: ""
    });

    const [list, setList] = useState([]);
    const [checkParams, setCheckParams] = useState(false);
    const history = useHistory();

    let params = useParams();
    useEffect(() => {
        if (params.storeId != undefined) {
            getStoreById();
            window.scrollTo(0, 0);
            setValues({ storeId: params.storeId })
            setCheckParams(true);

        } else if (params.deleteStoreId != undefined) {
            deleteStoreDetails();
            window.scrollTo(0, 0);
            clearNotification();
            setCheckParams(true);
            history.push("/storemanagement");
        } else {
            setValues({
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
                errorNotification: "",
                alertColour: "",
                displayNotification: "dn",
                storeId: ""
            })
            setCheckParams(true);
        }
        getStoreList();
    }, [checkParams]);

    const deleteStoreDetails = () => {
        const deleteStoreID = params.deleteStoreId;
        deleteStore(deleteStoreID).then((data) => {
            setValues({
                ...values,
                errorNotification: data.message,
                alertColour: "alert-success",
                displayNotification: "db",
            })
        })
    }

    const clearNotification = () => {
        // setTimeout(() => {
        //     setValues({
        //         ...values,
        //         errorNotification: "",
        //         alertColour: "",
        //         displayNotification: "dn",
        //     })
        // }, 2000);
    }
    // const editStore = useCallback(
    //     (e) =>{
    //             console.log("hello",e)
    //         }
    //     ,
    //     []
    // )


    const getStoreList = () => {
        storeList().then((data) => {
            setList(data.result);
        });
    };
    const getStoreById = async () => {
        await getStoreDataById({ storeId: params.storeId }).then((data) => {
            setValues({
                storeName: data.storeName,
                ownerName: data.ownerName,
                address: data.address,
                userName: data.userName,
                mobile: data.mobile,
                password: data.password,
                email: data.email,
                storeId: data._id
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
                clearNotification();
            } else {
                setValues({
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
                    errorNotification: data.message,
                    alertColour: "alert-success",
                    displayNotification: "db",
                });
                getStoreList();
                clearNotification();
                if (params.storeId != 'undefined') {
                    history.push("/storemanagement")
                }
                setCheckParams(true);
            }
        });
    };

    return (
        <>

            <div className="page-wrapper">
                <div className="container-fluid">
                    <FormMainTitle title="Store Management"
                        // btnName="Add Role"
                        // btnSecond="Add Store"
                        onClick={() => setCheckParams(!checkParams)}
                        // btnLink="/rolemanagement"
                        // btnSecondlink = "/storemanagement"
                        // btnSecondIcon="fa fa-plus-circle"
                    />
                    <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <FormNotification
                                    message={values.errorNotification}
                                    alertClass={values.alertColour}
                                    show={values.displayNotification}
                                />
                                <h4 className="box-title">
                                    {!(params.storeId) ? "Add Store" : "Edit Store"}
                                </h4>
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
                                        type="number"
                                        value={values.mobile}
                                        onChange={handleChange("mobile")}
                                        errorSpan={values.mobileError}
                                    />
                                    <StorePasswordInput
                                        label="Store Password"
                                        placeholder="Enter Store Password"
                                        type="password"
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
                                    <div className="col-md-6 t-a-r">

                                        <br></br>
                                        {params.storeId != undefined ? <input type="hidden" value={values.storeId} name="storeId" /> : ""}
                                        <button
                                            type="submit"
                                            className="btn btn-rounded-min btn-primary"
                                            onClick={clickSubmit}
                                        >
                                            {!params.storeId ? "Add Store" : "Update Store"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {list != "" ? <TableComponent title=" Store List" tableList={list} onClick={() => setCheckParams(!checkParams)} /> : null}
                    {/* {list != "" ? <TableComponent title=" Store List" clickEditData={editStore()} tableList={list} onClick={() => setCheckParams(!checkParams)} /> : null} */}
                </div>
            </div>
        </>
    );
};

export default AddListStore;
