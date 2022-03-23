import React, { useState, useEffect } from "react";
import { getUser, deleteUser} from "./apiUser";
import AdminLayout from '../core/AdminLayout';
import { Link, useParams } from "react-router-dom";
import { Switch } from '@mui/material';
import DataTableComponent from "../common/DataTableComponent";

const AllUser = () =>{

    const [user, setUser] = useState([]);
    const params = useParams();

    const loadUser = () => {
        getUser().then(data => {
            //console.log(data, "user list.....");
            if (data.error) {
                console.log(data.error);
            } else {
                setUser(data);
            }
        });
    };

    const destroy = userId => {

        console.log(userId, "user id")

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
            dataField: 'name',
            text: 'Name'
        }, 
        {
            dataField: 'email',
            text: 'E-mail'
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
            text: 'Action'
      }];


      const getButtons = (user) => {
        return (
            <div>
                 <Link to={`/admin/users/update/${user._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15' ></i></button></Link>
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
        console.log(item.storeId._id);
        if(params.storeid == item.storeId._id && item.role == 5){
            // item['address']= item.storeId.address;
            // item['ownerName']= item.storeId.ownerName;
            item['createdDate'] = getDate(item.createdAt);
            item['status'] = getSwitch(item);
            item['action'] = getButtons(item);
            productsList.push(item);
        }else{
            console.log("error")
        }
        
      });

    return(
        <>
          <AdminLayout>
          <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle"> User Management </p></div>
                            <div className='col-md-4'><p> 
                            <Link to={`/admin/create/users/${params.storeid}`} className="btn btn-outline btn-info fa-pull-right addButton"> add User </Link>
                            <Link to="/admin/storemanagement" className="btn  btn-outline btn-info fa-pull-right m-r-5 addButton"> <i className="fa fa-backward"></i> Back</Link>
                             </p></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={productsList}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </AdminLayout>
        </>
    );
}
export default AllUser;