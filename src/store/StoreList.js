import { Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {storeList} from './ApiStore';


const StoreList = (props) =>{
    console.log("------------------",props.tableList);

    const [list , setList] = useState(props.tableList);
    const [checke , setCheck] = useState();

    

    const handleChange = (checked) =>{
        console.log(checked)
    }
    useEffect(()=>{
        setList(props.tableList);
    },[props])

    const   getDate = (date) => {
        const newDate = date.split('T')[0];
        const dt =  newDate.split('-');
        return dt[2]+'-'+dt[1]+'-'+dt[0];
       }
   //    console.log("list--------------", list);
    var i = 1;
    return(
        <div className="white-box">
            <h3 className="box-title">
            Store List
            </h3>   
            {list?(
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
                                list.map((ele,key) => (
                                    <tr key={key}>
                                    <td>{i++}</td>
                                    <td>{ele.storeName}</td>
                                    <td>{ele.email}</td>
                                    <td>
                                        <Switch name="checkedA"
                                            inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"primary" }}
                                            color='primary'
                                            checked={ele.status} 
                                            onChange={handleChange()}
                                        />
                                    </td>
                                    <td>{getDate(ele.createdDate)}</td>
                                    <td>
                                        <button className='btn btn-outline btn-info m-5' aria-label='Edit'><i className='fa fa-pencil font-15'></i></button>
                                        <button className='btn btn-outline btn-danger' aria-label='Delete'><i className='fa fa-trash-o font-15'></i></button>
                                    </td>
                                    </tr>
                                ))
                            }
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
            ):null}
             
    </div>
    )
}

export default StoreList;