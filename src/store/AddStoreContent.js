import React, { useState } from 'react';

const AddStoreContent = (props) =>{
    const setName = props.value;
    return(
        <>
            <div className="form-group col-md-6">
                <label className="col-md-12">{props.label}<span className='text-danger'>*</span></label>
                <div className="col-md-12">
                    <input type={props.type} 
                    className="form-control" 
                    placeholder={props.placeholder} 
                    value = {setName}
                    onChange = {props.onChange}
                    autoComplete='off'
                    />
                </div>
            </div>
        </>
    )
}   

export default AddStoreContent;