import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser, deleteUser } from "./apiUser";
import { Switch } from '@mui/material';
import DataTableComponent from "../common/DataTableComponent";

const UserList= () =>{

    const [user, setUser] = useState([]);
    
    const loadUser = () => {
        getUser().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUser(data);
            }
        });
    };

    const destroy = userId => {
        deleteUser(userId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadUser();
            }
        });
    };
   
    useEffect(() => {
        loadUser();
    }, []);
    const getDate = (date) => {
        const newDate = date.split('T')[0];
        const dt = newDate.split('-');
        return dt[2] + '-' + dt[1] + '-' + dt[0];
    }
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
            dataField: 'ownerName',
            text: 'Name'
        }, 
        {
            dataField: 'address',
            text: 'Address'
        }, 
        {
            dataField: 'createdDate',
            text: 'Date'
        }, 
        {
            dataField: 'status',
            text: 'Status'
        }, 
        {
            dataField: 'action',
            text: 'action'
      }];

      const getButtons = (user) => {
        return (
            <div>
                 <Link to={`/admin/users/update/${user._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
                 <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(user._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
            </div>
        )
      };

      const getSwitch = (product) => {
        return (
            <Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"primary" }} color='primary'/>
        )
      };

      const productsList = [];
      user.forEach((item) => {
        item['createdDate'] = getDate(item.createdDate);
        item['status'] = getSwitch(item);
        item['action'] = getButtons(item);
        productsList.push(item);
      });

    return(
        <>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle"> User Management </p></div>
                            {/* <div className='col-md-4'><p><button type="submit" className="btn btn-info fa-pull-right" style={{height:'33px'}}><i className="fa fa-search"></i></button> <input type="text" id="search" placeholder='search' style={{float: 'right'}} /></p></div> */}
                            <div className='col-md-4'><p> <Link to={`create/users`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton">Add User</button></Link> <button type="submit" className="btn btn-info btn-outline " id="DeletButton">Delete <i className="fa fa-trash-o"></i></button></p></div>
                        </div>
                        <div className="white-box">
                            {/* <h1>Welcome User</h1> */}
                                <div className="row">
                                    <div className="col-12">
                                        {/* <table className="table">
                                            <thead>
                                                <tr id="TH">
                                                    <th><input type="checkbox" id="checkboxTH"/></th>
                                                    <th>Store Nmae</th>
                                                    <th>User Name</th>
                                                    <th>User ID</th>
                                                    <th>Address</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>  
                                                {user.map((u, i) => ( 
                                                <tr id="tableInput">
                                                    <>
                                                    <td><input type="checkbox"  id="checkboxTH" /></td>
                                                    <td><Link to={`/admin/user/list`}>{u.storeName}</Link></td>
                                                    <td>{u.ownerName}</td>
                                                    <td>{u.email}</td>
                                                    <td>{u.address}</td>
                                                    <td>{getDate(u.createdDate)}</td>
                                                    <td><Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"primary" }} color='primary'/></td>
                                                    <td>
                                                        <Link to={`/admin/users/update/${u._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
                                                        <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(u._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
                                                    </td>  
                                                    </>
                                                </tr>
                                                 ))}
                                            </tbody>
                                        </table> */}
                                         {productsList != "" ? <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={productsList}/> : null}
                                    </div>
                                </div>  
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserList;