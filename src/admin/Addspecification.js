import React, { useEffect, useState } from "react";
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createspecification } from "./apiAdmin";
import  Managespecification  from "./Managespecification";

const Addspecification = () => {
    const [manufacturerName, setName] = useState("");
    const [specification_type, set_type] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const handleChange_type = e => {
        setError("");
        set_type(e.target.value);
    };
    const handleChange_des = e => {
        setError("");
        setDescription(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        createspecification({ manufacturerName, specification_type, description }).then(data => {
            //alert(manufacturerName)
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
                setName('');
                set_type('');
                setDescription('');

            }
        });
    };
    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted"><span className="text-danger">*</span><b>Name</b></label>
                <input type="text" className="form-control" onChange={handleChange} value={manufacturerName} autoFocus required />
            </div>
            <div className="form-group">
                <label className="text-muted"><span className="text-danger">*</span><b>Type</b></label>
                <input type="text" className="form-control" onChange={handleChange_type} value={specification_type} autoFocus required />
            </div>
            <div className="form-group">
                <label className="text-muted"><b>Description</b></label>
                <textarea rows="2" className="form-control" onChange={handleChange_des} value={description} autoFocus></textarea>
            </div>
            <button className="btn btn-info">Save</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Specification data is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    };
    return (

        <div className="row">
            <div className="page-wrapper">
                <div className="container-fluid">
                    <h2 className="font-bold"> Add specification </h2>
                    <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="col-md-12 offset-md-2">
                                    {showSuccess()}
                                    {showError()}
                                    {newCategoryFom()}
                                </div>
                            </div>
                        </div>
                        <Managespecification />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Addspecification;
