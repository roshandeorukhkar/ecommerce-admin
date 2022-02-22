import { Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RoleList = (props) => {

    const [list, setList] = useState(props.tableList);
    const [check, setCheck] = useState(true);

    useEffect(() => {
        setList(props.tableList);
    }, [props]);

    const getDate = (date) => {
        const newDate = date.split('T')[0];
        const dt = newDate.split('-');
        return dt[2] + '-' + dt[1] + '-' + dt[0];
    }
    var i = 1;
    return (
        <div className="white-box">
            <h3 className="box-title">
                Role Management List
            </h3>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User ID</th>
                            <th>Role</th>
                            <th>Access Module</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{i++}</td>
                            <td>abcd@gmail.com</td>
                            <td>Clerk</td>
                            <td>Product
                                Customer
                                Payment
                            </td>
                            <td>30-12-2021</td>
                            <td>
                                <Switch name="checkedA"
                                    inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "primary" }}
                                    color='primary'
                                    onClick={() => setCheck(!check)}
                                />
                            </td>
                            <td>
                                <Link  className='btn btn-outline btn-info m-5' aria-label='Edit' onClick={props.onClick}><i className='fa fa-pencil font-15'></i></Link>
                                <Link  className='btn btn-outline btn-danger m-5' aria-label='Delete' onClick={props.onClick}><i className='fa fa-trash-o font-15'></i></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RoleList;