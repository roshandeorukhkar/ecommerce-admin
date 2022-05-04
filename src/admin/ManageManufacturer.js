import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteManufacturer, getManufacturers, deleteManufacturer1, statusManfacturer, statusChangeManfacturer } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";
// import {NotificationContainer, NotificationManager} from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageManufacturer = () => {
    
    const [values, setValues] = useState({
         error: '',
        redirectToProfile: false,
        success: false
    });
    const { error, success, redirectToProfile } = values;
    
    const [manufacture, setManufacture] = useState([]);

    const { user, token } = isAuthenticated();

    const { manufacturerName } = isAuthenticated;

    const loadProducts = () => {
        getManufacturers().then(data => {
       // console.log("gaurav", data);
            if (data.error) {
                console.log(data.error);
            } else {
                setManufacture(data);
            }
        });
    };
    const destroy1 = productId => {
        if(window.confirm('Are you sure you want to delete this record?'))
        {
            const category = {
            // manufacturerName: productId,
                manufacturerName: new Date(),
            };
            deleteManufacturer1(productId, category).then(data => {
                if (data.error) {
                    
                    console.log(data.error);
                } else {
                    //NotificationManager.success('Manufacturer has been deleted successfully!','',2000);
                    toast.success('Deleted successfully!', {
                        autoClose:600
                    })
                    loadProducts();
                }
            });
        }
    };

    const destroy = manufacturerId => {
        deleteManufacturer(manufacturerId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
                setValues({
                    ...values,
                    success:true,
                    redirectToProfile: false
                });
                setTimeout(function(){
                    setValues({
                        ...values,
                        redirectToProfile:true
                    })
                },1000)
            }
        });
    };

    const destroyAll = manufacturerId => {

        
        deleteManufacturer(manufacturerId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
                setValues({
                    ...values,
                    success:true,
                    redirectToProfile: false
                });
                setTimeout(function(){
                    setValues({
                        ...values,
                        redirectToProfile:true
                    })
                },1000)
            }
        });
    };

    const status = manufacturerId => {
        const manufactures = {
            manufacturerName: 0,
         };
        statusManfacturer(manufacturerId, manufactures).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const statusChange = manufacturerId => {
        const manufacturers = {
            manufacturerName: 1,
         };
        statusChangeManfacturer(manufacturerId, manufacturers).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const deleteMessage = () => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
           <a class="text-center" style={{color:'white'}}> Manufacturer Deleted </a> 
        </div>  
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/manufacturers" />;
            }
        }
    };


    useEffect(() => {
        loadProducts();
    }, []);

    const getDate = (date) => {
        const newDate = date.split('T')[0];
        const DATE = newDate.split('-');
        return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
    }

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        },
        {
           dataField: 'manufacturerName',
            text: 'Manufacturer Name',
            sort: true
        }, 
        {
            dataField: 'description',
            text: 'Description',
            sort: true
        }, 
        {
            dataField: 'createdAt',
            text: 'Date',
            sort: true
        }, 
        {
            dataField: 'status',
            text: 'Status'
        }, 
        {
            dataField: 'action',
            text: 'action'
      }];

      const getButtons = (manufacture) => {
        return (
            <div>
                 <Link to={`/admin/manufacturer/update/${manufacture._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
                 {/* <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(manufacture._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button> */}
                 <button className='btn btn-outline btn-danger m-5' aria-label='Delete' onClick={() => destroy1(manufacture._id)} title="Soft Delete"><i className='fa fa-trash-o font-15'></i></button>
            </div>
        )
      };

      const getSwitch = (manufacture) => {
        return (
            <>
             {manufacture.status == 1 
                ?(
                <>
                <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => status(manufacture._id)} color='primary'/>
                </>
                ):
                <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusChange(manufacture._id)} color='primary'/>
            }
            </>
        )
      };

      const manufactureList = [];
      manufacture.forEach((item) => {
        if(!item.deletedAt){
        item['id'] = item._id;
        item['createdAt'] = getDate(item.createdAt);
        item['status'] = getSwitch(item);
        item['action'] = getButtons(item);
        manufactureList.push(item);
        }
        else{
            console.log("error");
        }
      });


    return (
        
        <div className="row">
            {deleteMessage()}
            {redirectUser()}
            <div className="col-12">
                <ToastContainer />
                {/* <NotificationContainer/> */}
                <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={manufactureList} />
            </div>
        </div>
    );  
};

export default ManageManufacturer;
