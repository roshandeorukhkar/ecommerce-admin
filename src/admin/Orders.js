import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteOrder, listOrders } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => { 

  const [values, setValues] = useState({
        error: '',
        redirectToProfile: false,
        success: false
   });

    const { error, success, redirectToProfile } = values;

    const [orders, setOrders] = useState([]);

    const loadOrders = () => {
        listOrders().then(data => {
            console.log(data, "order......s")
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

  
    const remove = orderId => {
        if(window.confirm('Are you sure you want to delete this record?'))
        {
            const order = {
                deletedAt: new Date(),
            };
            deleteOrder(orderId,order).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    toast.success('Deleted successfully!', {
                        autoClose:600,
                        onClose: () => {
                            setValues({
                                ...values,
                                redirectToProfile: true
                            })
                        }
                    })
                    loadOrders();
                }
            });
        }
    };

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/orders" />;
            }
        }
    };


    useEffect(() => {
        loadOrders();
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
        {
            dataField: 'name',
            text: 'Product Name',
        }, 
        {
            dataField: 'user',
            text: 'Customer Name',
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
            text: 'Action'
      }];

      const getButtons = (product) => {
        return (
            <>
                <div style={{width:'110px'}}>
                    <Link to={`/admin/order/update/${product._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Customer"><i className='fa fa-pencil font-15'></i></button></Link>
                    <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => remove(product._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
                </div>
            </>
        )
      };

      const getSwitch = (item) => {
        return (
            <>
                <span>{item.status}</span>
            </>
        )
      };

      const getCustomer = (item) => {
        return (
            <>
               <a>{item.user.firstName}</a>
            </>
        )
      };

      const getName = (item) => {
        return (
            <>
                <span>{item.user.firstName + ' ' + item.user.lastName}</span>
            </>
        )
      };
 
      const orderList = [];
      orders.forEach((item) => {
          console.log(item.products);
        if(!item.deletedAt){
            if(item.user !== null)
            {
                item['id'] = item._id;
                item['name'] = item.products[0].name;
                item['user'] = item.user.firstName + ' ' + item.user.lastName;
                item['mobile'] = item.mobile;
                item['status'] = getSwitch(item);
                item['action'] = getButtons(item);
                orderList.push(item);
            }
        }
      });


    return (
        <div className="row">
        <div className="col-12">
            {redirectUser()}
            <ToastContainer />
            <DataTableComponent keyField="id" title="Test" tableHeading={columns} tableList={orderList}/> 
        </div>
    </div>
    );
};

export default Orders;
