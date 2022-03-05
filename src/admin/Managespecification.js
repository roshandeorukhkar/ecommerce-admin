import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteSpecification, Specification ,statusSpecification ,statusChangeSpecification } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';

const Managespecification = () => {

    const [values, setValues] = useState({
        error: '',
       redirectToProfile: false,
       success: false
    });
    const { error, success, redirectToProfile } = values;

    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        Specification().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteSpecification(productId).then(data => {
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

    const status = specificationId => {
        const specification = {
            manufacturerName: 0,
         };
         statusSpecification(specificationId, specification).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };
    
    const statusChange = specificationId => {
        const specification = {
            manufacturerName: 1,
         };
         statusChangeSpecification(specificationId, specification).then(data => {
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


    const deleteMessage = () => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
           <a class="text-center" style={{color:'white'}}> specification Deleted </a> 
        </div>  
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/manuspecification" />;
            }
        }
    };

    const getDate = (date) => {
        const newDate = date.split('T')[0];
        const DATE = newDate.split('-');
        return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
    }

    const columns = [{
        dataField: 'manufacturerName',
        text: 'Specification Name',
        sort: true
      }, {
        dataField: 'createdAt',
        text: 'Date',
        sort: true
      }, {
        dataField: 'status',
        text: 'Status'
      }, {
        dataField: 'action',
        text: 'action'
      }];

      const getButtons = (product) => {
        return (
            <div>
                <Link to={`/admin/Updatespecification/update/${product._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit'><i className='fa fa-pencil font-15'></i></button></Link>
                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(product._id)}><i className='fa fa-trash-o font-15'></i></button>
            </div>
        )
      };

      const getSwitch = (product) => {
        return (
            <Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"primary" }} color='primary'/>
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
            {deleteMessage()}
            {redirectUser()}
            <h4 className="box-title">Total List of Specification {products.length}</h4><hr></hr>
            <div className="col-12">
                
            <br></br>
                {/* <table className="table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="checkboxTH"/></th>
                            <th>Specification Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr  key={i}>
                                <td><input type="checkbox"  id="checkboxTH" /></td>
                                <td>{p.manufacturerName}</td>
                                <td>{getDate(p.createdAt)} </td>
                                <td>
                                    {p.status == 1 
                                        ?(
                                        <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => status(p._id)} color='primary'/>
                                        ):
                                        <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusChange(p._id)} color='primary'/>
                                    }
                                </td>
                                <td>
                                    <Link to={`/admin/Updatespecification/update/${p._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit'><i className='fa fa-pencil font-15'></i></button></Link>
                                    <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(p._id)}><i className='fa fa-trash-o font-15'></i></button>
                                </td>     
                            </tr>
                        ))}
                    </tbody>
                </table> {/* <table className="table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="checkboxTH"/></th>
                            <th>Specification Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr  key={i}>
                                <td><input type="checkbox"  id="checkboxTH" /></td>
                                <td>{p.manufacturerName}</td>
                                <td>{getDate(p.createdAt)} </td>
                                <td>
                                    {p.status == 1 
                                        ?(
                                        <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => status(p._id)} color='primary'/>
                                        ):
                                        <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusChange(p._id)} color='primary'/>
                                    }
                                </td>
                                <td>
                                    <Link to={`/admin/Updatespecification/update/${p._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit'><i className='fa fa-pencil font-15'></i></button></Link>
                                    <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(p._id)}><i className='fa fa-trash-o font-15'></i></button>
                                </td>     
                            </tr>
                        ))}
                    </tbody>
                </table> */}
                 {productsList != "" ? <DataTableComponent title="Test" tableHeading={columns} tableList={productsList}/> : null}
                <br />
            </div>
        </div>
    );
};

export default Managespecification;
