import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteManufacturer, getManufacturers, deleteManufacturer1, statusManfacturer, statusChangeManfacturer } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';

const ManageManufacturer = () => {
    
    const [values, setValues] = useState({
         error: '',
        redirectToProfile: false,
        success: false
    });
    const { error, success, redirectToProfile } = values;
    
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const { manufacturerName } = isAuthenticated;

    const loadProducts = () => {
        getManufacturers().then(data => {
       // console.log("gaurav", data);
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
            manufacturerName: 0,
         };
        statusManfacturer(productId, category).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const statusChange = productId => {
        const category = {
            manufacturerName: 1,
         };
        statusChangeManfacturer(productId, category).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //alert('Are you soure you wont delete record...............');
                loadProducts();
            }
        });
    };

    const destroy1 = productId => {
       
        const category = {
           // manufacturerName: productId,
            manufacturerName: new Date(),
        };
        deleteManufacturer1(productId, category).then(data => {
            if (data.error) {
                
                console.log(data.error);
            } else {
                alert('Are you soure you wont delete record!');
                //console.log("test abc", manufacturerName);
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

    return (
        

            <div className="row">
                {deleteMessage()}
                {redirectUser()}
                <div className="col-12">
                    <table className="table">
                    
                    <thead>
                            <tr id="TH">
                                <th><input type="checkbox" id="checkboxTH"/></th>
                                <th>Manufacturer Name</th>
                                <th>Descrtiption</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                    </thead>
                    <tbody>
                        
                        {products.map((p, i) => (
                            
                       <tr  key={i} id="tableInput">
                           {!p.deletedAt ?(
                               <>
                                <td><input type="checkbox"  id="checkboxTH" /></td>
                                <td>{p.manufacturerName}</td>
                                <td>{p.description}</td>
                                <td>{getDate(p.createdAt)} </td>
                                <td>
                                {p.status == 1 
                                    ?(
                                    <>
                                      <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => status(p._id)} color='primary'/>
                                    </>
                                    ):
                                     <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusChange(p._id)} color='primary'/>
                                    }
                                </td>
                                <td>
                                    <Link to={`/admin/manufacturer/update/${p._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
                                    <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(p._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
                                    {/* <button className='btn btn-outline btn-danger m-5' aria-label='Delete' onClick={() => destroy1(p._id)} title="Soft Delete"><i className='fa fa-trash-o font-15'></i></button> */}
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

export default ManageManufacturer;
