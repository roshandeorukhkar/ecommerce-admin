import * as React from 'react';

export default function FormDropdown(props) {

  return (
    <div className="form-group col-md-6">
      <label className="col-md-12 lable">{props.lable}</label>
      <div className="col-sm-12">
        <select className="form-control"  
            value={props.value} 
            onChange={props.handleChange}>
          <option value="">Select Module</option>
          <option value={props.itme1}>{props.itme1}</option>
          <option value={props.itme2}>{props.itme2}</option>
          <option value={props.itme3}>{props.itme3}</option>
          <option value={props.itme4}>{props.itme4}</option>
        </select>
        <span className='text-danger'>{props.errorSpan}</span>
      </div>
    </div>

  );
}
