import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteCustomer, getCoustomer } from "./apiAdmin";
import { Switch } from '@mui/material';

const Customer = () => {
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
                {/* <h4 className="box-title">Customer {products.length}</h4><hr></hr> */}
                {/* <h2><Link to={`create/customer`}><button type="submit" className="btn  btn-outline btn-rounded  btn-info fa-pull-right"><i className="fa fa-plus-circle"></i> Add Customer</button></Link></h2> */}
                <div className="col-12">
                   <br></br>
                    <table className="table">
                    <thead>
                            <tr>
                                <th><input type="checkbox"/></th>
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
                       <tr  key={i}>
                            {!customer.deletedAt ?(
                               <>
                           <td><input type="checkbox"/></td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td> 
                                {customer.status == 1 
                                    ?(
                                    <>
                                      <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} color='primary'/>
                                    </>
                                    ):
                                     <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} color='primary'/>
                                    }
                               
                            </td>
                            <td>2233343434</td>
                            
                            <td>{getData(customer.createdAt)} </td>
                            <td>
                                <Link to={`/admin/coustomers/update/${customer._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Customer"><i className='fa fa-pencil font-15'></i></button></Link>
                                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(customer._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
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
