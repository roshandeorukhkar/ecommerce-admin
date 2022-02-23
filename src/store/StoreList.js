import { Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteStore } from "../store/ApiStore";

const StoreList = (props) => {

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
                Store List
            </h3>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Store Name</th>
                            <th>E-mail</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((ele, key) => (
                                ele.isDelete != true ?
                                    <tr key={key}>
                                        <td>{i++}</td>
                                        <td>{ele.storeName}</td>
                                        <td>{ele.email}</td>
                                        <td>
                                            <Switch name="checkedA"
                                                inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "primary" }}
                                                color='primary'
                                                onClick={() => setCheck(!check)}
                                            />
                                        </td>
                                        <td>{getDate(ele.createdDate)}</td>
                                        <td>
                                            <Link to={`/admin/storemanagement/edit/${ele._id}`} className='btn btn-outline btn-info m-5' aria-label='Edit' onClick={props.onClick}><i className='fa fa-pencil font-15'></i></Link>
                                            <Link to={`/admin/storemanagement/delete/${ele._id}`} className='btn btn-outline btn-info m-5' aria-label='Delete' onClick={props.onClick}><i className='fa fa-trash-o font-15'></i></Link>
                                        </td>
                                    </tr>
                                  : null 
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StoreList;