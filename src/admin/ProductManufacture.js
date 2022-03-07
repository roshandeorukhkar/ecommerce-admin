import React from "react";
import AdminLayout from "../core/AdminLayout";
import Manufacturer from "./Manufacturer";

const ProductManufacture = (props) =>{
    return(
        <AdminLayout data={props}>
                <Manufacturer {...props}/>
        </AdminLayout>
    )

}
export default ProductManufacture;