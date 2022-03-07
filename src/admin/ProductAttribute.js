import React from "react";
import AdminLayout from "../core/AdminLayout";
import Attribute from "./Attribute";

const ProductAttribute = (props) =>{
    return(
        <AdminLayout data={props}>
                <Attribute {...props}/>
        </AdminLayout>
    )

}
export default ProductAttribute;