import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteManufacturer, getManufacturers, deleteManufacturer1 } from "./apiAdmin";

const ManageManufacturer = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const { manufacturerName } = isAuthenticated;

    const loadProducts = () => {
        getManufacturers().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteManufacturer(productId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const destroy1 = productId => {
        // const category = {
        //     manufacturerName: manufacturerName,
        // };
        deleteManufacturer1(productId).then(data => {
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

    let no = 1;
    return (

            <div className="row">
                <h4 className="box-title">List of Manufacturer {products.length}</h4><hr></hr>
                <div className="col-12">
                   <br></br>
                    <table className="table">
                    <thead>
                            <tr>
                                <th>Id</th>
                                <th>Manufacturer Name</th>
                                <th>Descrtiption</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                       <tr  key={i}>
                           
                            <td>{no++}</td>
                            <td>{p.manufacturerName}</td>
                            <td>{p.description}</td>
                            <td>31-12-2010 </td>
                            <td>
                                <Link to={`/admin/manufacturer/update/${p._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit'><i className='fa fa-pencil font-15'></i></button></Link>
                                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(p._id)}><i className='fa fa-trash-o font-15'></i></button>
                                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy1(p._id)}>Test</button>
                            </td>     
                        
                        </tr>
                        
                        ))}

                    </tbody>
                </table>
                    
                    <br />
                </div>
            </div>
    );
};

export default ManageManufacturer;
