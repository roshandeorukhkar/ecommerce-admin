import React, { useState, useEffect } from "react";
import FormNotification from "../common/FormNotification";
import FormMainTitle from "../common/FormMainTitle";
import AddStoreContent from "./AddStoreContent";
import { Link, useParams, useForm } from "react-router-dom";
import RoleList from "./RoleList";

const AddListRoleManagement = () => {
  let params = useParams();
  const [values, setValues] = useState({
    errorNotification: "",
    alertColour: "",
    displayNotification: "dn",
    storeId: ""
});
    const [list, setList] = useState([]);
    const [checkParams, setCheckParams] = useState(false);
    const handleChange = (name) => (event) => {
      setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <FormNotification
        message=" "
        alertClass=" "
        show = {values.displayNotification}
      />
      <div className="page-wrapper">
        <div className="container-fluid">
        <FormMainTitle title="Role Management"
                        btnName="Add Role"
                        btnLink = "/admin/rolemanagement"
                        btnSecond="Back"
                        btnSecondlink = "/admin/storemanagement"
                        btnSecondIcon = "fa fa-backward"
                    />
                     <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <h4 className="box-title">
                                    {!(params.storeId) ? "Add Role" : "Edit Role"}
                                </h4>
                                <hr />
                                <form className="form-horizontal" id="myForm">
                                    <AddStoreContent
                                        label="Role Name"
                                        placeholder="Enter role name"
                                        type="text"
                                        value={values.storeName}
                                        onChange={handleChange("roleName")}
                                        errorSpan={values.storeNameError}
                                    />
                                    <AddStoreContent
                                        label="Access Module"
                                        placeholder="Enter owner name"
                                        type="text"
                                        value={values.ownerName}
                                        onChange={handleChange("ownerName")}
                                        errorSpan={values.ownerNameError}
                                    />
                                    <AddStoreContent
                                        label="Assign To"
                                        placeholder="Enter User ID"
                                        type="text"
                                        value={values.ownerName}
                                        onChange={handleChange("assignId")}
                                        errorSpan={values.ownerNameError}
                                    />
                                    <div className="col-md-12 t-a-c">
                                        {params.storeId !== undefined ? <input type="hidden" value={values.storeId} onChange={handleChange("storeId")} /> : ""}
                                        <button
                                            type="submit"
                                            className="btn  btn-outline btn-rounded  btn-info"
                                            onClick={clickSubmit}
                                        >
                                            <i className="fa fa-plus-circle"></i>{" "}
                                            {!params.storeId ? "Save Role" : "Update Role"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {list ? <RoleList tableList={list}   /> : null}

        </div>
      </div>
    </>
  );
};
export default AddListRoleManagement;
