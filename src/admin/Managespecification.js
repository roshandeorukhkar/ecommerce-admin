import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteSpecification, Specification } from "./apiAdmin";
import { Switch } from '@mui/material';
import DataTableComponent from "../common/DataTableComponent";

const Managespecification = () => {
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
            <h4 className="box-title">Total List of Specification {products.length}</h4><hr></hr>
            <div className="col-12">
                {productsList != "" ? <DataTableComponent title="Test" tableHeading={columns} tableList={productsList}/> : null}
                {/*<table className="table">
                <thead>
                        <tr>
                            <th>Specification Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                </thead>
                <tbody>
                    {products.map((p, i) => (
                    <tr  key={i}>
                        <td>{p.manufacturerName}</td>
                        <td>{getDate(p.createdAt)} </td>
                        <td><Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"primary" }} color='primary'/></td>
                        
                        <td>
                            <Link to={`/admin/Updatespecification/update/${p._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit'><i className='fa fa-pencil font-15'></i></button></Link>
                            <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(p._id)}><i className='fa fa-trash-o font-15'></i></button>
                        </td>     
                    
                    </tr>
                    
                    ))}

                </tbody>
                    </table>*/}
                
                <br />
            </div>
        </div>
    );
};

export default Managespecification;
