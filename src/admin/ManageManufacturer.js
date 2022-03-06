import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteManufacturer, getManufacturers, deleteManufacturer1, statusManfacturer, statusChangeManfacturer } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";

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

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        },
        {
        dataField: 'manufacturerName',
        text: 'Manufacturer Name',
        sort: true
        }, 
        {
        dataField: 'description',
        text: 'Description',
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
        dataField: 'action',
        text: 'action'
      }];

      const getButtons = (product) => {
        return (
            <div>
                 <Link to={`/admin/manufacturer/update/${product._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(product._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
                 {/* <button className='btn btn-outline btn-danger m-5' aria-label='Delete' onClick={() => destroy1(product._id)} title="Soft Delete"><i className='fa fa-trash-o font-15'></i></button> */}
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
                <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusChange(product._id)} color='primary'/>
            }
            </>
        )
      };

      const productsList = [];
      products.forEach((item) => {
        item['id'] = item._id;
        item['createdAt'] = getDate(item.createdAt);
        item['status'] = getSwitch(item);
        item['action'] = getButtons(item);
        productsList.push(item);
      });


    return (
        
        <div className="row">
            {deleteMessage()}
            {redirectUser()}
            <div className="col-12">
                {productsList != "" ? <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={productsList}/> : null}
            </div>
        </div>
    );  
};

export default ManageManufacturer;
