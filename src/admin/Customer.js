import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteCustomer, getCoustomer, statusCustomer, statusCheckCustomer, removeCustomer } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";

const Customer = () => {
    
    const [values, setValues] = useState({
        error: '',
       redirectToProfile: false,
       success: false
   });

    const { error, success, redirectToProfile } = values;

    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        getCoustomer().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
       
        const category = {
           // manufacturerName: productId,
            name: new Date(),
        };
        deleteCustomer(productId, category).then(data => {
            if (data.error) {
                
                console.log(data.error);
            } else {
                alert('Are you soure you wont delete record!');
                loadProducts();
            }
        });
    };

    const remove = productId => {
        removeCustomer(productId).then(data => {
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

    const status = productId => {
       
        const category = {
            status: 0,
        };
        statusCustomer(productId, category).then(data => {
            if (data.error) {
                
                console.log(data.error);
            } else {
                //alert('Are you soure you wont delete record!');
                loadProducts();
            }
        });
    };

    const statusCheck = productId => {
       
        const category = {
            status: 1,
        };
        statusCheckCustomer(productId, category).then(data => {
            if (data.error) {
                
                console.log(data.error);
            } else {
                //alert('Are you soure you wont delete record!');
                loadProducts();
            }
        });
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
            dataField: 'name',
            text: 'Customer Name',
            sort: true
        }, 
        {
            dataField: 'email',
            text: 'E-mail',
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
            dataField: '',
            text: 'Ip'
        }, 
        {
            dataField: 'action',
            text: 'action'
      }];

      const getButtons = (product) => {
        return (
            <div>
                <Link to={`/admin/coustomers/update/${product._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Customer"><i className='fa fa-pencil font-15'></i></button></Link>
                {/* <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(product._id)} title=" Soft Delet"><i className='fa fa-trash-o font-15'></i></button> */}
                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => remove(product._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
            </div>
        )
      };

      const getSwitch = (product) => {
        return (
            <>
             {product.status == 1 
                 ?(
                    <>
                        <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => status(product._id)} color='primary'/>
                    </>
                 ):
                        <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusCheck(product._id)} color='primary'/>
             }
            </>
        )
      };

      const productsList = [];
      products.forEach((item) => {
        item['createdAt'] = getDate(item.createdAt);
        item['status'] = getSwitch(item);
        item['action'] = getButtons(item);
        productsList.push(item);
      });

    return (

        <div className="row">
            <div className="col-12">
                {deleteMessage()}
                {redirectUser()}
                {productsList != "" ? <DataTableComponent title="Test" tableHeading={columns} tableList={productsList}/> : null}
            </div>
        </div>
    );
};

export default Customer;
