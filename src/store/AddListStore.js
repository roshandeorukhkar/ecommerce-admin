import React, { useState, useEffect } from "react";
import AddStoreContent from "./AddStoreContent";
import StoreList from "./StoreList";
import { addStoreData } from "./ApiStore";
import { Link, useParams } from "react-router-dom";
import FormMainTitle from "../common/FormMainTitle";
import FormNotification from "../common/FormNotification";
import { storeList } from "./ApiStore";
import { getStoreDataById } from "./ApiStore";

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
    displayNotification: "none",
  });
  const {
    storeName,
    storeNameError,
    ownerName,
    ownerNameError,
    address,
    addressError,
    userName,
    userNameError,
    mobile,
    mobileError,
    password,
    passwordError,
    email,
    emailError,
    errorNotification,
    alertColour,
    displayNotification,
  } = values;
  const [list, setList] = useState([]);

  let params = "1";
  console.log(params);
  useEffect(() => {
    getStoreList();
    // getStoreById();
  }, []);

  const getStoreList = () => {
    storeList().then((data) => {
      setList(data.result);
    });
  };

  // const getStoreById = () => {
  //   getStoreDataById().then((data) => {
  //       console.log(data);
  //   });
  // }

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
          displayNotification: "block",
        });
      } else {
        setValues({
          storeName: "",
          ownerName: "",
          address: "",
          userName: "",
          mobile: "",
          password: "",
          email: "",
          storeNameError: "",
          ownerNameError: "",
          addressError: "",
          userNameError: "",
          mobileError: "",
          passwordError: "",
          emailError: "",
          errorNotification: data.message,
          alertColour: "alert-success",
          displayNotification: "block",
        });
        getStoreList();
        document.getElementById("myForm").reset();
      }
    });
  };

  return (
    <>
      <FormNotification
        message={errorNotification}
        alertClass={alertColour}
        style={{ display: displayNotification }}
      />
      <div className="page-wrapper">
        <div className="container-fluid">
          <FormMainTitle title="Store Management" btnName="Add Role" />
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
                    value={storeName}
                    onChange={handleChange("storeName")}
                    errorSpan={storeNameError}
                  />
                  <AddStoreContent
                    label="Store Owner Name"
                    placeholder="Enter owner name"
                    type="text"
                    value={ownerName}
                    onChange={handleChange("ownerName")}
                    errorSpan={ownerNameError}
                  />
                  <AddStoreContent
                    label="Store Address"
                    placeholder="Enter Store Address"
                    type="text"
                    value={address}
                    onChange={handleChange("address")}
                    errorSpan={addressError}
                  />
                  <AddStoreContent
                    label="Store Login ID"
                    placeholder="Enter Store Login ID"
                    type="text"
                    value={userName}
                    onChange={handleChange("userName")}
                    errorSpan={userNameError}
                  />
                  <AddStoreContent
                    label="Mobile No"
                    placeholder="Enter Mobile No"
                    type="text"
                    value={mobile}
                    onChange={handleChange("mobile")}
                    errorSpan={mobileError}
                  />
                  <AddStoreContent
                    label="Store Password"
                    placeholder="Enter Store Password"
                    type="text"
                    value={password}
                    onChange={handleChange("password")}
                    errorSpan={passwordError}
                  />
                  <AddStoreContent
                    label="Email Id"
                    placeholder="Enter Email Id"
                    type="text"
                    value={email}
                    onChange={handleChange("email")}
                    errorSpan={emailError}
                  />
                  <div className="col-md-12 t-a-c">
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
          {list ? <StoreList tableList={list} /> : null}
        </div>
      </div>
    </>
  );
};

export default AddListStore;
