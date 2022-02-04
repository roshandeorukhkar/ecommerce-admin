import { Switch } from '@material-ui/core';
import React from 'react';

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
                    <li className="disabled"> <a href="#"><i className="fa fa-angle-left"></i></a> </li>
                    <li> <a href="#">1</a> </li>
                    <li className="active"> <a href="#">2</a> </li>
                    <li> <a href="#">3</a> </li>
                    <li> <a href="#">4</a> </li>
                    <li> <a href="#">5</a> </li>
                    <li> <a href="#"><i className="fa fa-angle-right"></i></a> </li>
                </ul>
            </div>  
    </div>
    )
}

export default StoreList;