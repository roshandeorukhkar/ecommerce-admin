import { Switch } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';


const StoreList = () =>{
    return(
        <div className="white-box">
            <h3 className="box-title">
                Store list
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
                            <tr>
                                <td>1</td>
                                <td>My shope</td>
                                <td>shope@gmail.com</td>
                                <td>
                                    <Switch name="checkedA"
                                        inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"primary" }}
                                        color='primary' 
                                    />
                                </td>
                                <td>31-12-2010</td>
                                <td>
                                    <button className='btn btn-outline btn-info m-5' aria-label='Edit'><i className='fa fa-pencil font-15'></i></button>
                                    <button className='btn btn-outline btn-danger' aria-label='Delete'><i className='fa fa-trash-o font-15'></i></button>
                                </td>
                            </tr>

                    </tbody>
                </table>
                <ul className="pagination pagination-sm m-b-0 fa-pull-right">
                    <li className="disabled"> <Link to="#"><i className="fa fa-angle-left"></i></Link> </li>
                    <li> <Link to="#">1</Link> </li>
                    <li className="active"> <Link to="#">2</Link> </li>
                    <li> <Link to="#">3</Link> </li>
                    <li> <Link to="#">4</Link> </li>
                    <li> <Link to="#">5</Link> </li>
                    <li> <Link to="#"><i className="fa fa-angle-right"></i></Link> </li>
                </ul>
            </div>  
    </div>
    )
}

export default StoreList;