import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { removeCustomer, listOrders } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Orders = () => {

  const [values, setValues] = useState({
        error: '',
        redirectToProfile: false,
        success: false
   });

    const { error, success, redirectToProfile } = values;

    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        listOrders().then(data => {
            console.log(data, "order......s")
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

  
    const remove = productId => {
        if(window.confirm('Are you sure you want to delete this record?'))
        {
            removeCustomer(productId).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    NotificationManager.success('Customer has been deleted successfully!','',2000);
                    loadProducts();
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
           <a class="text-center" style={{color:'white'}}> Customer Deleted </a> 
        </div>  
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/coustomers" />;
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
            dataFiled:'id',
            text:'ID',
            hidden:true
        },
        // {
        //     dataField: 'prodect name',
        //     text: 'Product Name',
        //     sort: true
        // }, 
        // {
        //     dataField: 'quntity',
        //     text: 'Quantity',
        //     sort: true
        // }, 

        {
            dataField: 'name',
            text: 'Product Name ',
        }, 
        {
            dataField: 'address',
            text: 'Location',
        }, 
        {
            dataField: 'amount',
            text: 'Amount',
        }, 
        {
            dataField: 'status',
            text: 'Status'
        }, 
        {
            dataField: 'action',
            text: 'action'
      }];

      const getButtons = (product) => {
        return (
            <div>
                <Link to={`/admin/coustomers/update/${product._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Customer"><i className='fa fa-pencil font-15'></i></button></Link>
                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => remove(product._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
            </div>
        )
      };

      const getSwitch = (product) => {
        return (
            <>
                <button type="button" class="btn btn-primary">Success</button>
            </>
        )
      };

      const orderList = [];
      products.forEach((item) => {
        item['id'] = item._id;
        item['name'] = item.products[0].name;
        item['mobile'] =item.mobile;
        item['status'] = getSwitch(item);
        item['action'] = getButtons(item);
        orderList.push(item);
      });


    return (
        <div className="row">
        <div className="col-12">
            {deleteMessage()}
            {redirectUser()}
            <NotificationContainer/>
            <DataTableComponent keyField="id" title="Test" tableHeading={columns} tableList={orderList}/> 
        </div>
    </div>
    );
};

export default Orders;
