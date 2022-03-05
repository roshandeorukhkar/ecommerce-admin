import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deletecategory, getCategories ,statusCategory, statusChangeCategory} from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';

const Managecategory = () => {
    const [values, setValues] = useState({
       error: '',
       redirectToProfile: false,
       success: false
   });
   const { error, success, redirectToProfile } = values;

    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = categoryId => {
        deletecategory(categoryId).then(data => {
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

    useEffect(() => {
        loadProducts();
    }, []);

    const status = categoryId => {
        const category = {
            name: 0,
         };
         statusCategory(categoryId, category).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };
    
    const statusChange = categoryId => {
        const category = {
            name: 1,
         };
         statusChangeCategory(categoryId, category).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const deleteMessage = () => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
           <a class="text-center" style={{color:'white'}}> Category Deleted </a> 
        </div>  
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/Manucategory" />;
            }
        }
    };

    const getDate = (date) => {
        const newDate = date.split('T')[0];
        const DATE = newDate.split('-');
        return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
    }
    return (

        <div className="row">
            {deleteMessage()}
            {redirectUser()}
            <h4 className="box-title">Total List of Category {products.length}</h4><hr></hr>
            <div className="col-12">
                <br></br>
                <table className="table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="checkboxTH"/></th>
                            <th>Category Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                        <tr key={i}>
                            <td><input type="checkbox"  id="checkboxTH" /></td>
                            <td>{p.name}</td>
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
                            <Link to={`/admin/Manucategory/update/${p._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit'><i className='fa fa-pencil font-15'></i></button></Link>
                                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(p._id)}><i className='fa fa-trash-o font-15'></i></button>
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

export default Managecategory;
