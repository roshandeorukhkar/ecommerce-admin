import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { getUsers, updateUser } from "./apiUser";
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { useParams } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const UpdateUsers = ({ match }) => {
  const params = useParams();

  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    storeId: "",
    createdDate: "",
    nameError: "",
    emailError: "",
    error: "",
    success: false,
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    email,
    address,
    storeId,
    createdDate,
    error,
    success,
    redirectToProfile,
  } = values;

  const init = (userId) => {
    getUsers(userId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          address: data.address,
          storeId: data.storeId._id,
          createdDate: data.storeId.createdDate,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (event) => {
    console.log(event);
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleChange_email = (email) => (event) => {
    setValues({ ...values, error: false, [email]: event.target.value });
  };

  const handleChange_address = (address) => (event) => {
    setValues({ ...values, error: false, [address]: event.target.value });
  };

  const submitUserForm = (e) => {
    e.preventDefault();
    const users = {
      name: name,
      email: email,
      address: address,
    };
    updateUser(match.params.userId, users).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          nameError: data.error.name,
          emailError: data.error.email,
          success: false,
        });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          address: data.address,
          nameError: "",
          emailError: "",
          error: false,
          success: true,
          redirectToProfile: false,
        });
        NotificationManager.success("User has been updated successfully", '', 2000);

        setTimeout(function () {
          setValues({
            ...values,
            redirectToProfile: true,
          });
        }, 2000);
      }
    });
  };

  const updateUserForm = () => (
    <div className="">
      <form className="mb-3" onSubmit={submitUserForm}>
        <div className="form-group col-lg-7">
          <h6>
            <b>
              <span className="text-danger">*</span> Name
            </b>
          </h6>
          <input
            onChange={handleChange("name")}
            type="text"
            placeholder="Enter name"
            className="form-control"
            value={name}
            name="name"
          />
          <span className="text-danger">{values.nameError}</span>
        </div>
        <div className="form-group col-lg-7">
          <h6>
            <b>
              <span className="text-danger">*</span> Email
            </b>
          </h6>
          <input
            onChange={handleChange_email("email")}
            type="text"
            placeholder="Enter user id"
            className="form-control"
            value={email}
            email="email"
          />
          <span className="text-danger">{values.emailError}</span>
        </div>
        <div className="form-group col-lg-7">
          <h6>
            <b>Address</b>
          </h6>
          <textarea
            onChange={handleChange_address("address")}
            rows="3"
            className="form-control"
            placeholder="Description"
            value={address}
            address="address"
          />
        </div>
        <div className="col-lg-7">
          <button
            className="btn btn-info btn-md"
            style={{ float: "right", borderRadius: "7px" }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to={`/admin/user/list/${storeId}`} />;
      }
    }
  };

  return (
    <div className="row">
      <AdminHeader />
      <AdminSidebar />
      <div className="page-wrapper">
        <div className="container-fluid">
          <NotificationContainer />
          <div className="row">
            <div className="col-md-8">
              <h4 className="font-bold"> Edit Users</h4>
            </div>
            <div className="col-md-4">
              <Link to={`/admin/user/list/${storeId}`}>
                <button
                  type="submit"
                  className="btn btn-outline btn-info fa-pull-right"
                  id="addButton"
                >
                  <i className="fa fa-backward"></i> Back
                </button>
              </Link>
            </div>
          </div>
          <div className="white-box">
            <div className="row">
              <div className="col-lg-12">
                <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                  {updateUserForm()}
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

export default UpdateUsers;
