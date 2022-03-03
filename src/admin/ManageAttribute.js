import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

import { deleteAttribute, getAttributes, deleteAttributeone } from "./apiAdmin";
import { Switch } from '@material-ui/core';

const ManageAttribute = () => {
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

    const destroy = attributeId => {
        deleteAttribute(attributeId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const destroy1 = attributeId => {
       
        const category = {
           // manufacturerName: productId,
            attributeName: new Date(),
        };
        deleteAttributeone(attributeId, category).then(data => {
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

    const getDate = (date) => {
        const newDate = date.split('T')[0];
        const DATE = newDate.split('-');
        return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
    }

    return (

            <div className="row">
                <h2 className="font-bold"> 
                {/* List of Manufacturer {products.length} */}
                    {/* <Link to={`create/manufacturer`}><button type="submit" className="btn  btn-outline btn-rounded  btn-info fa-pull-right"><i className="fa fa-plus-circle"></i> Add Manufacturer</button></Link> */}
                </h2>
                <div className="col-12">
                   <br></br>
                    <table className="table">
                    <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>Attribute Name</th>
                                <th>Attribute Descrtiption</th>
                                <th>Added Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                    </thead>
                    <tbody>
                        
                        {AttributeList.map((A, i) => (
                            
                       <tr  key={i}>
                           {!A.deletedAt ?(
                               <>
                                <td><input type="checkbox" /></td>
                                <td>{A.attributeName}</td>
                                <td>{A.description}</td>
                                <td>{getDate(A.createdAt)} </td>
                                <td><Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"primary" }} color='primary'/></td>
                                <td>
                                 <Link to={`/admin/attribute/update/${A._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
                                    <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(A._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
                                    <button className='btn btn-outline btn-danger m-5' aria-label='Delete' onClick={() => destroy1(A._id)} title="Soft Delete"><i className='fa fa-trash-o font-15'></i></button> 
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

export default ManageAttribute;
