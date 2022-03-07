import React, { useState, useEffect } from "react";
import FormNotification from "../common/FormNotification";
import FormMainTitle from "../common/FormMainTitle";
import AddStoreContent from "./AddStoreContent";
import { Link, useParams, useForm, useHistory } from "react-router-dom";
import RoleList from "./RoleList";
import FormDropdown from "../common/FormDropdown";
import { addUserRoleData } from "./ApiStore";
import { getUserRoleListData } from "./ApiStore";
import { getUserRoleByIdData } from "./ApiStore";
import { deleteUserRole } from "./ApiStore";
import FormDropdownWithCheckbox from "../common/FormDropdownWithCheckbox";

const AddListRoleManagement = (props) => {
  let params = useParams();
  var storeId = params.storeId;
  const [values, setValues] = useState({
    roleName: "",
    accessModuleId: "",
    assingTo: "",
    errorNotification: "",
    errorRoleName: "",
    errorAssingTo: "",
    errorAccessModuleId: "",
    alertColour: "",
    displayNotification: "dn",
    userRoleId: ""
  });
  const [list, setList] = useState([]);
  const [checkParams, setCheckParams] = useState(false);
  const history = useHistory();
  const [select ,setSelect] = useState();

  useEffect(() => {
    console.log(params.userRoleId);
    if (params.userRoleId != undefined) {
      getUserRoleById();
      window.scrollTo(0, 0);
      setCheckParams(true);
    } else if (params.deleteUserRoleId != undefined) {
      deleteUserRoleDetails();
      setCheckParams(true);
      history.push("/rolemanagement");
    }
    else {
      setValues({
        roleName: "",
        accessModuleId: "",
        assingTo: "",
        errorNotification: "",
        errorRoleName: "",
        errorAssingTo: "",
        errorAccessModuleId: "",
        alertColour: "",
        displayNotification: "dn",
        userRoleId: ""
      })
      setCheckParams(true);
    }
    getUserRoleList();
  }, [checkParams])

  const getUserRoleById = () => {
    getUserRoleByIdData({ roleId: params.userRoleId }).then((data) => {
      console.log(data);
      setValues({
        roleName: data.roleName,
        accessModuleId: data.accessModuleId,
        assingTo: data.assingTo,
        userRoleId: data._id
      })
    })
  }

  const getUserRoleList = () => {
    getUserRoleListData().then((data) => {
      console.log(data.result);
      setList(data.result);
    });
  };

  const deleteUserRoleDetails = () => {
    const deleteUserRoleId = params.deleteUserRoleId;
    deleteUserRole(deleteUserRoleId).then((data) => {
      setValues({
        ...values,
        errorNotification: data.message,
        alertColour: "alert-success",
        displayNotification: "db",
      })
    })
  }

  const selectedOption = (data) =>{
    setValues({accessModuleId: JSON.stringify(data)});
    console.log("-------",checkParams);
  }


  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    addUserRoleData({ ...values }).then((data) => {
      console.log(data);
      if (data.status == false) {
        console.log(data);
        setValues({
          ...values,
          errorRoleName: data.errors.roleName,
          errorAssingTo: data.errors.assingTo,
          errorAccessModuleId: data.errors.accessModuleId,
          errorNotification: data.message,
          alertColour: "alert-danger",
          displayNotification: "db",
        })
      } else {
        setValues({
          roleName: "",
          accessModuleId: "",
          assingTo: "",
          errorRoleName: "",
          errorAssingTo: "",
          errorNotification: data.message,
          errorAccessModuleId: "",
          alertColour: "alert-success",
          displayNotification: "db",
          userRoleId: ""
        })
        setCheckParams(true);
        getUserRoleList();
        if (params.userRoleId != undefined) {
          history.push("/rolemanagement");
        }
      }//else end
    })

  }

  return (
    <>
      <div className="page-wrapper">
        <div className="container-fluid">
          <FormMainTitle title="Role Management"
            btnIcon="fa fa-backward"
            btnName="Back"
            btnLink="/storemanagement"
            onClick={() => setCheckParams(!checkParams)}
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
                  {!(params.userRoleId) ? "Add Role" : "Edit Role"}
                </h4>
                <form className="form-horizontal" id="myForm">
                  <AddStoreContent
                    label="Role Name"
                    placeholder="Enter role name"
                    type="text"
                    value={values.roleName}
                    onChange={handleChange("roleName")}
                    errorSpan={values.errorRoleName}
                  />
                  {/* <FormDropdown
                    lable="Access Module"
                    itme1="Product"
                    itme2="Customer"
                    itme3="Payment"
                    itme4="Store"
                    value={values.accessModuleId}
                    handleChange={handleChange("accessModuleId")}
                    errorSpan={values.errorAccessModuleId}
                  /> */}
                  <FormDropdownWithCheckbox 
                      label="Access Module"
                      itme1="Product"
                      itme2="Customer"
                      itme3="Payment"
                      itme4="Store"
                      selectData = {selectedOption}
                      // value={values.accessModuleId}
                      handleChange={handleChange("accessModuleId")}
                      errorSpan={values.errorAccessModuleId}
                  />

                  <AddStoreContent
                    label="Assign To"
                    placeholder="Enter User ID"
                    type="text"
                    value={values.assingTo}
                    onChange={handleChange("assingTo")}
                    errorSpan={values.errorAssingTo}
                  />
                  <div className="col-md-6 t-a-r">
                    <input type="hidden" value={params.storeId} name="storeId" />
                    <br></br>
                    {params.userRoleId != undefined ? <input type="hidden" value={values.userRoleId} name="userRoleId" /> : ""}
                    <button
                      type="submit"
                      className="btn btn-rounded-min btn-primary"
                      onClick={clickSubmit}
                    >
                      {!params.userRoleId ? "Add Role" : "Update Role"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {list != "" ? <RoleList title="Role List" tableList={list} onClick={() => setCheckParams(!checkParams)} /> : null}

        </div>
      </div>
    </>
  );
};
export default AddListRoleManagement;
