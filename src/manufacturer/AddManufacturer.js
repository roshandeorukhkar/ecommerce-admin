import React, { useState } from 'react';
import { demo } from '../auth/Demo';

const AddManufacturer = () => {
    const [values, setValues] = useState({
        manufacturerName: '',
        description: '',
        error: '',
        success: false
    });

    const { manufacturerName, description, success, error } = values;

    const handleChange = manufacturerName => event => {
        setValues({ ...values, error: false, [manufacturerName]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        demo({ manufacturerName, description}).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    manufacturerName: '',
                    description: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const demoForm = () => (
        
        <form>
            <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                <h1 class="text-center">Add Manufacturer </h1>
                <hr></hr>
                <div className="form-group">
                    <input onChange={handleChange('manufacturerName')} type="text" placeholder='Employee Name' className="form-control" value={manufacturerName} />
                </div>
                <div className="form-group">
                    <input onChange={handleChange('description')} type="text" placeholder='Employee Age' className="form-control" value={description} />
                </div>
                <button onClick={clickSubmit} className="btn btn-info"> Submit </button>
            </div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
           <h6 class="text-center"> Demo Data Insert in Demos table </h6> 
        </div>
    );

    return (
        <div className="container col-md-8 offset-md-2" >
            {showSuccess()}
            {showError()}
            {demoForm()}
        </div>
    );
};

export default AddManufacturer;
