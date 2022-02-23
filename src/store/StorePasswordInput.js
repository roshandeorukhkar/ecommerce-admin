import React, { useState } from 'react';

const StorePasswordInput = (props) => {

    const [isRevealPwd, setIsRevealPwd] = useState(false);

    return (
        <div className="form-group col-md-6" >
            <label className="col-md-12 lable">{props.label}
                <span className='text-danger'>*</span>
            </label>
            <div className="input-group col-md-12 p-r-10 p-l-15">
                <input
                    type={isRevealPwd ? "text" : "password"}
                    defaultValue={props.value}
                    className="form-control"
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    autoComplete="off"
                />
                <span className="input-group-addon"
                 onClick={() => setIsRevealPwd(!isRevealPwd)}>
                    <i className="icon-eye"></i>
                </span>
                <span className='error text-danger'>{props.errorSpan}</span>
            </div>
        </div>
    )
}

export default StorePasswordInput;