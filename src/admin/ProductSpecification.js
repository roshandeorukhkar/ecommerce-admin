import React from 'react';
import AdminLayout from '../core/AdminLayout';
import Addspecification from './Addspecification';

const ProductSpecification = (props) =>{
    return(
        <AdminLayout data={props}>
            <Addspecification {...props}/>
        </AdminLayout>  
    )
} 
export default ProductSpecification;