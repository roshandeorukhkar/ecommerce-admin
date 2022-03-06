import React, { Component, useState }    from 'react';
import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const FromDropdown = (props) => {
    return (
      <div className="form-group col-md-6">
          <label className="col-sm-12 lable">{props.label}</label>
          <div className="col-sm-12">
              <Select options={options} isMulti='true'/>
          </div>
        </div>
    )
}

export default FromDropdown;
