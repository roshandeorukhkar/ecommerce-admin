import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteCustomer, getCoustomer, statusCustomer, statusCheckCustomer, removeCustomer } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';

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

    const getData = (date) => {
        const newDate = date.split('T')[0];
        const DATE = newDate.split('-');
        return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
    }
    return (

            <div className="row">
                <div className="col-12">
                {deleteMessage()}
                {redirectUser()}
                    <table className="table">
                    <thead>
                            <tr id="TH">
                                <th><input type="checkbox" id="checkboxTH"/></th>
                                <th>Customer Name</th>
                                <th>E-mail</th>
                                <th>Status</th>
                                <th>Ip</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                    </thead>
                    <tbody>
                        {products.map((customer, i) => (
                       <tr  key={i} id="tableInput">
                            {!customer.deletedAt ?(
                               <>
                           <td><input type="checkbox" id="checkboxTH" /></td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td> 
                                {customer.status == 1 
                                    ?(
                                    <>
                                      <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => status(customer._id)} color='primary'/>
                                    </>
                                    ):
                                     <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusCheck(customer._id)} color='primary'/>
                                    }
                               
                            </td>
                            <td>2233343434</td>
                            
                            <td>{getData(customer.createdAt)} </td>
                            <td>
                                <Link to={`/admin/coustomers/update/${customer._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Customer"><i className='fa fa-pencil font-15'></i></button></Link>
                                {/* <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(customer._id)} title=" Soft Delet"><i className='fa fa-trash-o font-15'></i></button> */}
                                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => remove(customer._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
                            </td>     
                            </>
                           ):null}
                        </tr>
                        
                        ))}

                    </tbody>
                </table>
                    
                    <br />
                </div>
            </div>
    );
};

export default Customer;
