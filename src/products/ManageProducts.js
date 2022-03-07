import React, { useState, useEffect } from "react";
import AdminLayout from "../core/AdminLayout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { Switch } from '@mui/material';
import { getProducts, deleteProduct } from "../admin/apiAdmin";

const ManageProducts = (props) => {
    const [products, setProducts] = useState([]);

    const { user, token } = products();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <AdminLayout data={props}>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-4'><p id="hedingTitle"> Products </p></div>
                            <div className='col-md-4 col-md-offset-4'>
                                <Link to={`product/create`} className="btn  btn-outline btn-info fa-pull-right" id="addButton">
                                    New
                                </Link> 
                            </div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-12">
                                    <table className="table">
                                        <thead>
                                            <tr id="th">
                                                <th><input type="checkbox" id="checkboxTH"/></th>
                                                <th>Product Name</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>  
                                        {products.map((p, i) => (
                                            <tr id="tableInput" key={i}>
                                                <>
                                                    <td><input type="checkbox"  id="checkboxTH" /></td>
                                                    <td>{p.name}</td>
                                                    
                                                    <td><Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"primary" }} color='primary'/></td>
                                                    <td>
                                                        <Link to={`/product/update/${p._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Edit"><i className='fa fa-pencil font-15'></i></button></Link>
                                                        <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(p._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
                                                    </td>  
                                                </>
                                            </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageProducts;
