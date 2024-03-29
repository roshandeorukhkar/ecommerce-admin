import React, { useState, useEffect, useCallback } from "react";
import AddStoreContent from "./AddStoreContent";
import { addStoreData } from "./ApiStore";
import { Link, useParams, useForm, useHistory } from "react-router-dom";
import FormMainTitle from "../common/FormMainTitle";
import { storeList } from "./ApiStore";
import { getStoreDataById } from "./ApiStore";
import { deleteStore } from "../store/ApiStore";
import { statusStore } from "../store/ApiStore";
import { statusChangeStore } from "../store/ApiStore";
import StorePasswordInput from "./StorePasswordInput";
import DataTableComponent from "../common/DataTableComponent";
import { Switch } from "@mui/material";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
// import "react-notifications/lib/notifications.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MobileInput from "./MobileInput";

const AddListStore = () => {
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
    storeId: "",
  });

  const [list, setList] = useState([]);
  const [checkParams, setCheckParams] = useState(false);
  const history = useHistory();

  let params = useParams();
  useEffect(() => {
    if (params.storeId != undefined) {
      getStoreById();
      window.scrollTo(0, 0);
      setValues({ storeId: params.storeId });
      setCheckParams(true);
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
        storeId: "",
      });
      setCheckParams(true);
    }
    getStoreList();
  }, [checkParams]);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
      storeNameError: "",
      ownerNameError: "",
      addressError: "",
      userNameError: "",
      mobileError: "",
      passwordError: "",
      emailError: "",
    });
  };
    const deleteStoreDetails = (deleteStoreId) => {
        if(window.confirm('Are you sure you want to delete this record?'))
        {
            const deleteStoreID = deleteStoreId;
            deleteStore(deleteStoreID).then((data) => {
              toast.success('Deleted successfully!', {
                autoClose:600
              })
              //NotificationManager.success(data.message,'',2000);
            });        
            getStoreList();
        }
    }

    const getStoreList = () => {
        storeList().then((data) => {
            setList(data.result);
        });
    };
    const getStoreById = async () => {
        await getStoreDataById({ storeId: params.storeId }).then((data) => {
            setValues({
                storeName: data.storeId.storeName,
                ownerName: data.name,
                address: data.address,
                mobile: data.mobile,
                password: data.password,
                email: data.email,
                storeId: data.storeId._id
            });
        });
    }

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
                });
                toast.error('Email already exist!', {
                  autoClose:600
                })
                //NotificationManager.error('Email already exist...','',2000);
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
                });
                toast.success(data.message, {
                  autoClose:600
                })
                //NotificationManager.success(data.message,'',2000);
                getStoreList();
                if (params.storeId != 'undefined') {
                    history.push("/admin/storemanagement")
                }
                setCheckParams(true);
            }
        });
    };

    //Store List component
    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'storeName',
            text: 'Store Name',
            sort: true
        },
        {
            dataField: 'email',
            text: 'E-mail',
            sort: true
        },
        {
            dataField: 'createdAt',
            text: 'Date',
            sort: true
        }, {
            dataField: 'status',
            text: 'Status'
        }, {
            dataField: 'action',
            text: 'Action'
        }];

    const getDate = (date) => {
        const newDate = date.split('T')[0];
        const DATE = newDate.split('-');
        return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
    }
    const statusStores = storeId => {
        console.log("hello",storeId)
        statusStore(storeId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                getStoreList();
            }
        });
    };

    const statusChange = storeId => {
       
        statusChangeStore(storeId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                getStoreList();
            }
        });
    };

    const getButtons = (storeId_) => {
        return (
            <div>
                <Link to={`/admin/storemanagement/edit/${storeId_}`} className='btn btn-outline btn-info m-5' onClick={() => setCheckParams(!checkParams)} aria-label='Edit' ><i className='fa fa-pencil font-15'></i></Link>
                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => deleteStoreDetails(storeId_)}><i className='fa fa-trash-o font-15'></i></button>
                <Link to={`/admin/user/list/${storeId_}`} className="btn btn-outline btn-info m-5">Add User</Link>
                <Link to={`/admin/rolemanagement/${storeId_}`} className="btn btn-outline btn-info m-5" aria-label="Add role">Add Role</Link>
            </div>
        )
    };
    const getSwitch = (storeStatus, status) => {
        return (
            <>
            {status == true 
               ?(
               <>
               <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusStores(storeStatus)} color='primary'/>
               </>
               ):
               <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusChange(storeStatus)} color='primary'/>
           }
           </>        )
    };
    const storeListArray = [];
    list.forEach((item) => {
        if (item.storeId.isDelete == false) {
            item['id'] = item.storeId._id
            item['storeName'] = item.storeId.storeName
            item['email'] = item.email
            item['createdAt'] = getDate(item.storeId.createdDate)
            item['status'] = getSwitch(item.storeId._id,item.storeId.status)
            item['action'] = getButtons(item.storeId._id)
            storeListArray.push(item);
        }
  });


  return (
    <>
      <div className="page-wrapper">
        <div className="container-fluid">
          {/* <NotificationContainer /> */}
          <ToastContainer />
          <FormMainTitle
            title="Store Management"
            onClick={() => setCheckParams(!checkParams)}
          />
          <div className="white-box">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="box-title">
                  {!params.storeId ? "Add Store" : "Edit Store"}
                </h4>
                <form
                  className="form-horizontal"
                  id="myForm"
                  autoComplete="false"
                >
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
                  <MobileInput
                    label="Mobile No"
                    placeholder="Enter Mobile No"
                    type="text"
                    value={values.mobile}
                    onChange={handleChange("mobile")}
                    errorSpan={values.mobileError}
                  />
                  
                  <AddStoreContent
                    label="Email Id"
                    placeholder="Enter Email Id"
                    type="text"
                    value={values.email}
                    onChange={handleChange("email")}
                    errorSpan={values.emailError}
                  />
                  <StorePasswordInput
                    label="Store Password"
                    placeholder="Enter Store Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange("password")}
                    errorSpan={values.passwordError}
                  />
                  <div className="col-md-6 t-a-r">
                    <br></br>
                    {params.storeId != undefined ? (
                      <input
                        type="hidden"
                        value={values.storeId}
                        name="storeId"
                      />
                    ) : (
                      ""
                    )}
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
          <div className="white-box">
            <h3 className="box-title">Store List</h3>
            <div className="col-12">
              <DataTableComponent
                keyField="id"
                title=" Store List"
                tableHeading={columns}
                tableList={storeListArray}
                onClick={() => setCheckParams(!checkParams)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddListStore;
