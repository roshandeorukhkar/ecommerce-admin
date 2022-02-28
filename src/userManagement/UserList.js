import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser, deleteUser } from "./apiUser";
import { Switch } from '@mui/material';

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
    const getDate = (date) => {
        const newDate = date.split('T')[0];
        const dt = newDate.split('-');
        return dt[2] + '-' + dt[1] + '-' + dt[0];
    }
    
    useEffect(() => {
        loadUser();
    }, []);
    return(
        <>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-4'><p id="hedingTitle"> User Management </p></div>
                            <div className='col-md-4'><p><button type="submit" className="btn btn-info fa-pull-right" style={{height:'33px'}}><i className="fa fa-search"></i></button> <input type="text" id="search" placeholder='search' style={{float: 'right'}} /></p></div>
                            <div className='col-md-4'><p> <Link to={`create/users`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton">Add User</button></Link> <button type="submit" className="btn btn-info btn-outline " id="DeletButton">Delete <i className="fa fa-trash-o"></i></button></p></div>
                        </div>
                        <div className="white-box">
                            {/* <h1>Welcome User</h1> */}
                                <div className="row">
                                    <div className="col-12">
                                        <table className="table">
                                            <thead>
                                                    <tr id="TH">
                                                        <th><input type="checkbox" id="checkboxTH"/></th>
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
                                                        <td>{u.ownerName}</td>
                                                        <td>{u.email}</td>
                                                        <td>{u.address}</td>
                                                        <td>{getDate(u.createdDate)} </td>
                                                        <td><Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"primary" }} color='primary'/></td>
                                                        <td>
                                                            <Link to={`/admin/users/update/${u._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
                                                            <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(u._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
                                                        </td>  
                                                    </>

                                                </tr>
                                                 ))}
                                            </tbody>
                                        </table>
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