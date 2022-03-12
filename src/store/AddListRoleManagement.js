import React, { useState, useEffect } from "react";
import FormMainTitle from "../common/FormMainTitle";
import AddStoreContent from "./AddStoreContent";
import { Link, useParams, useForm, useHistory } from "react-router-dom";
import Select from 'react-select'
import { addUserRoleData } from "./ApiStore";
import { getUserRoleListData } from "./ApiStore";
import { getUserRoleByIdData } from "./ApiStore";
import { deleteUserRole } from "./ApiStore";
import DataTableComponent from "../common/DataTableComponent";
import { Switch } from '@mui/material';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './AccessModuleOption';
import { accessModuleList } from "./ApiStore";
import { getStoreDataById } from "./ApiStore";
import { storeUserList } from "./ApiStore";

const AddListRoleManagement = (props) => {
  const history = useHistory();
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
    userRoleId: "",
    storeId: storeId,
    accessModuleLabel: "",
  });
  const [storeName, setStoreName] = useState('');
  const [list, setList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [checkParams, setCheckParams] = useState(false);
  const [accessModules, setAccessModules] = useState([]);

  useEffect(() => {
    if (params.userRoleId != undefined) {
      getUserRoleById();
      window.scrollTo(0, 0);
      setCheckParams(true);
    }//role module is editing
    else {
      setValues({
        roleName: "",
        accessModuleId: "",
        assingTo: "",
        errorNotification: "",
        errorRoleName: "",
        errorAssingTo: "",
        errorAccessModuleId: "",
        userRoleId: "",
        storeId: storeId,
      })
      setCheckParams(true);
    }
    getUserRoleList(); //fetch List of added user role
    getStoredata(); //Get store details 
    getAccessModuleList(); // fetch list of access module
    storeUsers();
  }, [checkParams])

  const getUserRoleById = () => {
    getUserRoleByIdData({ roleId: params.userRoleId }).then((data) => {
      setValues({
        roleName: data.roleName,
        accessModuleId: data.accessModuleId,
        assingTo: data.user_id,
        userRoleId: data._id,
        storeId: storeId
      })
    })
  }

  const storeUsers = () => {
    storeUserList(params.storeId).then((data) => {
      setUserList(data);
    })
  }

  const getStoredata = async () => {
    await getStoreDataById({ storeId: params.storeId }).then((data) => {
      setStoreName(data.storeId.storeName);
    });
  }

  const getUserRoleList = () => {
    getUserRoleListData(storeId).then((data) => {
      setList(data.result);
    });
  };

  const getAccessModuleList = () => {
    accessModuleList().then((data) => {
      setAccessModules(data.result);
    })
  }

  const deleteUserRoleDetails = (deleteId) => {
    deleteUserRole(deleteId).then((data) => {
      NotificationManager.error(data.message);
      getUserRoleList();

      if (params.userRoleId != undefined){
        history.push(`/admin/rolemanagement/${values.storeId}`);
        setValues({
          roleName: '',
          accessModuleId: '',
          assingTo: '',
          errorNotification: '',
          errorRoleName: '',
          errorAssingTo: '',
          errorAccessModuleId: '',
          userRoleId: '',
          storeId: storeId,
          accessModuleLabel: null
        })
      }
    })
  }

  const selectedOption = (event) => {
    const data = [];
    event.forEach(element => {
      data.push(element.value);
    });

    setValues({
      ...values, accessModuleId: data, accessModuleLabel:event.value
    });
  }

  const selectedUserOption = (data) => {
    setValues({
      ...values, assingTo: data
    })
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    addUserRoleData({ ...values }).then((data) => {
      if (data.status == false) {
        setValues({
          ...values,
          errorRoleName: data.errors.roleName,
          errorAssingTo: data.errors.assingTo,
          errorAccessModuleId: data.errors.accessModuleId,
        });
        NotificationManager.error(data.message);
      } else {
        setValues({
          roleName: "",
          accessModuleId: "",
          accessModuleLabel : "",
          assingTo: "",
          errorRoleName: "",
          errorAssingTo: "",
          errorNotification: data.message,
          errorAccessModuleId: "",
          userRoleId: "",
          storeId: storeId
        });
        NotificationManager.success(data.message);
        setCheckParams(true);
        getUserRoleList();
        if (params.userRoleId != undefined) {
          history.push(`/admin/rolemanagement/${values.storeId}`);
        }
      }//else end
    })
  }

  var selectOption = [];
  var option = [];

  accessModules.map((item) => {
    selectOption = {
      value: item.name,
      label: item.label
    }
    option.push(selectOption);
  });

  //users List
  var userSelectOption = [];
  var userOption = [];

  userList.map((item) => {
    userSelectOption = {
      value: item._id,
      label: item.name
    }
    userOption.push(userSelectOption);
  })

  // Data table content
  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true
    },
    {
      dataField: 'assingTo',
      text: 'User ID',
    },
    {
      dataField: 'userRoleName',
      text: 'User Role',
      sort: true
    },
    {
      dataField: 'accessModuleId',
      text: 'Access Module',
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
      text: 'action'
    }];

  const getDate = (date) => {
    const newDate = date.split('T')[0];
    const DATE = newDate.split('-');
    return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
  }

  const getButtons = (userRoleId) => {
    return (
      <div>
        <Link to={`/admin/rolemanagement/edit/${storeId}/${userRoleId}`} className='btn btn-outline btn-info m-5' onClick={() => setCheckParams(!checkParams)} aria-label='Edit' ><i className='fa fa-pencil font-15'></i></Link>
        <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => deleteUserRoleDetails(userRoleId)}><i className='fa fa-trash-o font-15'></i></button>
      </div>
    )
  };
  const getSwitch = (storeStatus) => {
    return (
      <Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "primary" }} color='primary' checked />
    )
  };

  const accessModuleListTable = (item) =>{
    return(
      <ul>
         {item.map(element => <li>{element.label}</li>)}
      </ul>
    )
  }

  const userRoleArray = [];
  list.forEach((item) => {
    item['id'] = item._id
    item['assingTo'] = item.user.name
    item['userRoleName'] = item.roleName
    item['accessModuleId'] = accessModuleListTable(item.accessModule)
    item['createdAt'] = getDate(item.createdDate)
    item['action'] = getButtons(item._id)
    item['status'] = getSwitch(item.status)
    userRoleArray.push(item);
  });

  return (
    <>
      <div className="page-wrapper">
        <div className="container-fluid">
          <NotificationContainer />
          <FormMainTitle title={`Role Management of ${storeName}`}
            btnIcon="fa fa-backward"
            btnName="Back"
            btnLink="/admin/storemanagement"
            onClick={() => setCheckParams(!checkParams)}
          />
          <div className="white-box">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="box-title">
                  {!(params.userRoleId) ? "Add Role " : "Edit Role"}
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
                  <div className="form-group col-md-6">
                    <label className="col-sm-12 lable">Access Module</label>
                    <div className="col-sm-12">
                      <Select options={option} isMulti='true' value={values.accessModuleLabel} onChange={selectedOption}  />
                      <span className='error text-danger'>{values.errorAccessModuleId}</span>
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="col-sm-12 lable">Assign To</label>
                    <div className="col-sm-12">
                      <Select options={userOption} value={values.assingTo} onChange={selectedUserOption}  />
                      <span className='error text-danger'>{values.errorAssingTo}</span>
                    </div>
                  </div>
                  <div className="col-md-6 t-a-r">
                    <input type="hidden" value={values.storeId} name="storeId" />
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
          <div className="white-box">
            <h3 className="box-title">
              User Role List
            </h3>
            <div className="col-12">
              {userRoleArray.length != 0 ? <DataTableComponent keyField="id" title=" User Role List" tableHeading={columns} tableList={userRoleArray} /> : "Please add user role...."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddListRoleManagement;
