import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct , statusProducts ,statusChangeProducts, statusDeleteProducts} from "./apiAdmin";
import DataTableComponent from "../common/DataTableComponent";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';


const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const showMore = () => setShowAll(true);
    const showLess = () => setShowAll(false)

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);

            }
        });
    };


    // const destroy = productId => {
    //     deleteProduct(productId).then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    //             loadProducts();
    //         }
    //     });
    // };

    const destroys = productId => {
        if(window.confirm('Are you sure you want to delete this record?'))
        {
            const product = {
                statusVlaue: new Date(),
            };
            statusDeleteProducts(productId, product).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    loadProducts();
                }
            });
        }
    };

    useEffect(() => {
        loadProducts();
    }, [showAll]);

    const status = productId => {
        const product = {
            statusVlaue: 0,
         };
         statusProducts(productId, product).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };
    
    const statusChange = productId => {
        const product = {
            statusVlaue: 1,
         };
         statusChangeProducts(productId, product).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const getDate = (date) => {
        const newDate = date.toString().split('T')[0];
        const DATE = newDate.toString().split('-');
        return (
            <div style={{width:'90px'}}>
                {DATE[2] + '-' + DATE[1] + '-' + DATE[0]}
            </div>    
        );
    }
    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        },
        {
            dataField: "image",
            text: "Image",
        },
        {
            dataField: 'name',
            text: 'Product Name',
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
            text: 'Action'
        }
    ];

      const getImage = (path) =>{
        return(
            <>
            {Object.values(path).map((res, i) =>{
                if(i == 0)
                return <img src={res[0]} width="50" />
                }
            )}
            </>
        )
      }

    const getButtons = (product) => {
        return (
            <div>
                <div style={{width:'100px'}}>
                    <Link to={`/admin/product/update/${product._id}`}><button className='btn btn-outline btn-info m-5 btn-sm' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
                    {/* <button className='btn btn-outline btn-danger m-5' aria-label='Delete' onClick={() => destroy(product._id)} title="Soft Delete"><i className='fa fa-trash-o font-15'></i></button> */}
                    <button className='btn btn-outline btn-danger m-5 btn-sm' aria-label='Delete' onClick={() => destroys(product._id)} title="Soft Delete"><i className='fa fa-trash-o font-15'></i></button>
                </div>
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

    const getDescription = (description) => {
        return(
            <div>
            {
                showAll ? description : String(description).substr(0, 40) +'...'}
            {
                showAll?<Link to="#" style={{fontSize:'12px'}} onClick={showLess}> Show less</Link> :<Link to="#" style={{fontSize:'12px'}} onClick={showMore}> Show more</Link> 
            }
            
        </div>
        )
    }

    const productList = [];
    products.forEach((item) => {
        if(!item.deletedAt){
        item['id'] = item._id;
        item['image'] = getImage(item.images);
        item['description'] = getDescription(item.description);
        item['createdAt'] = getDate(item.createdAt);
        item['status'] = getSwitch(item);
        item['action'] = getButtons(item);
        productList.push(item);
        }
        else{
            console.log("error");
        }
    });


    return (
        <>
           <div id="wrapper">
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col-md-8'><p id="hedingTitle"> Product Management </p></div>
                        <div className='col-md-4'><Link to={`/admin/create/product`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton" style={{float: 'right'}} >Add product</button></Link></div>
                    </div>
                    <div className="white-box">
                        <div className="col-12">
                            <DataTableComponent keyField="name" title="Product Specification" tableHeading={columns} tableList={productList}/>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </>
      
    );
};

export default ManageProducts;
