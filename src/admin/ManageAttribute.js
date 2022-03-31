import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteAttribute, getAttributes, deleteAttributeone ,statusAttributes ,statusChangeAttributes} from "./apiAdmin";
import { Switch } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ManageAttribute = () => {
    const [values, setValues] = useState({
       error: '',
       redirectToProfile: false,
       success: false
    });
    const { error, success, redirectToProfile } = values;

    const [AttributeList, setAttribute] = useState([]);

    const { user, token } = isAuthenticated();

    const { attributeName } = isAuthenticated;

    const loadProducts = () => {
        getAttributes().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setAttribute(data);
            }
        });
    };

    const destroy1 = attributeId => {
        if(window.confirm('Are you sure you want to delete this record?'))
        {
            const attribute = {
                attributeName: new Date(),
            };
            deleteAttributeone(attributeId, attribute).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    loadProducts();
                    /*setValues({
                        ...values,
                        success:true,
                        redirectToProfile: false
                    });*/
                    NotificationManager.success('Attribute has been deleted successfully!','',2000);
                    setTimeout(function(){
                        setValues({
                            ...values,
                            redirectToProfile:true
                        })
                    },2000)
                }
            });
        }
    };

    const deleteMessage = () => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
           <a class="text-center" style={{color:'white'}}> Attribute Deleted </a> 
        </div>  
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/attribute" />;
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

    const status = attributeId => {
        const attribute = {
            attributeName: 0,
         };
         statusAttributes(attributeId, attribute).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };
    
    const statusChange = attributeId => {
        const attribute = {
            attributeName: 1,
         };
         statusChangeAttributes(attributeId, attribute).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };
// Table 
const columns = [
    {
        dataField: 'id',
        text: 'ID',
        hidden: true
    },
    {
        dataField: 'attributeName',
        text: 'Attribute Name',
        sort: true
    }, 
    {
        dataField: 'description',
        text: 'Attribute Description',
        sort: true
    }, 
    {
        dataField: 'createdAt',
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

  const getButtons = (attribute) => {
    return (
        <div>
            <Link to={`/admin/attribute/update/${attribute._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
            <button className='btn btn-outline btn-danger m-5' aria-label='Delete' onClick={() => destroy1(attribute._id)} title="Soft Delete"><i className='fa fa-trash-o font-15'></i></button> 
        </div>
    )
  };

  const getSwitch = (attribute) => {
    return (
        <>
         {attribute.status == 1 
            ?(
            <>
            <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => status(attribute._id)} color='primary'/>
            </>
            ):
            <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusChange(attribute._id)} color='primary'/>
        }
        </>
    )
  };

  const attributeList = [];
  AttributeList.forEach((item) => {
    if(!item.deletedAt){
    item['id'] = item._id;
    item['createdAt'] = getDate(item.createdAt);
    item['status'] = getSwitch(item);
    item['action'] = getButtons(item);
    attributeList.push(item);
    }
    else{
        console.log("error");
    }
  });
// end table
    return (
            <div className="row">
                {deleteMessage()}
                {redirectUser()}
                <div className="col-md-12">
                    <NotificationContainer/>
                    <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={attributeList}/> 
                </div>
            </div>
    );
};

export default ManageAttribute;
