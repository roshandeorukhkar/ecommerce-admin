import React from 'react';
import { Link } from "react-router-dom";
import Managespecification from "./Managespecification";
import AdminLayout from "../core/AdminLayout";


{/*
import DataTableComponent from "../common/DataTableComponent";

export const productsGenerator = quantity => {
    const items = [];
    for (let i = 0; i < quantity; i++) {
      items.push({ id: i, name: `Item name ${i}`, price: 2100 + i });
    }
    return items;
};

const products = productsGenerator(50);

const columns = [{
    dataField: 'id',
    text: 'Product ID',
    sort: true
  }, {
    dataField: 'name',
    text: 'Product Name',
    sort: true
  }, {
    dataField: 'price',
    text: 'Product Price'
  }];
*/}

const Manufacturer = () => {

    return (
        <AdminLayout>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <h2 className="font-bold"> Product Specification
                            <Link to={`specification`}><button type="submit" className="btn  btn-outline btn-rounded  btn-info fa-pull-right"><i className="fa fa-plus-circle"></i> Add Specification</button></Link></h2>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <Managespecification />
                                    {/*{products != "" ? <DataTableComponent title="Test" tableHeading={columns} tableList={products}/> : null}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </AdminLayout>
    )

}


export default Manufacturer;