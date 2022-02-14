import React ,{ useState, useEffect } from "react";
import AddStoreContent from "./AddStoreContent";
import SIdata from "./SIdata";
import StoreList from "./StoreList";
import { addStoreData } from "./ApiStore";
import { Link } from 'react-router-dom';
import FormMainTitle from "../common/FormMainTitle";
import FormNotification from "../common/FormNotification";
import TableComponent from "../common/TableComponent";

const AddListStore = () =>{
    const [values , setValues] = useState({
        storeName : " ",
        ownerName : " ",
        address : " ",
        userName : " ",
        mobile : " ",
        password : " ",
        email : " ",
        errorNotification : "",
        alertColour : "",
        displayNotification : "none"
    });
    const {storeName,ownerName,address,userName,mobile,password,email,errorNotification,alertColour,displayNotification} = values;
    const [storeInput , setStoreInput] = useState([]);
    useEffect(() => {
        setStoreInput(SIdata)
    },[]);
    

    const handleChange = name => event => {
        setValues({ ...values , [name]: event.target.value });
    };

    const clickSubmit = event =>{
        event.preventDefault();
        addStoreData({...values}).then(data => {
            if(data.status == false){
                console.log("---------",data)
                setValues({
                    ...values,
                    errorNotification : data.message,
                    alertColour : "alert-danger",
                    displayNotification : "block"
                })
                let storeInputArray = []
                let errors = data.errors
                storeInput.forEach(element => {
                    element.error = errors[element.name]
                    storeInputArray.push(element)
                });
                setStoreInput(storeInputArray);
            }else{
                setValues({
                    ...values,
                    errorNotification : data.message,
                    alertColour : "alert-success",
                    displayNotification : "block"
                })
            }
        })
    }

    return(
        <>
        <FormNotification
                 message={errorNotification}
                 alertClass={alertColour}
                 style={{display : displayNotification}} />
        <div className="page-wrapper">
            <div className="container-fluid">
                <FormMainTitle title="Store Management" btnName="Add Role" />
                <div className="white-box">
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="box-title">Add Store</h4>
                            <hr />
                            <form className="form-horizontal" >
                            {  
                                storeInput.map(function data(val){
                                const setName=val.name;
                                return(
                                    <AddStoreContent 
                                        key = {val.key}
                                        label= {val.label} 
                                        placeholder= {val.placeholder}
                                        type={val.type}
                                        name={val.name}
                                        value ={values.setName}
                                        onChange ={handleChange(val.name)}
                                        errorSpan = {val.error}
                                    />
                                )
                            })}
                                <div className="col-md-12 t-a-c">
                                    <button type="submit" className="btn  btn-outline btn-rounded  btn-info" onClick={clickSubmit}><i className="fa fa-plus-circle"></i> Save Store</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <StoreList/>
                {/* <TableComponent title="Store List"></TableComponent> */}
            </div>
        </div>    
        </>    
        
    )
}

export default AddListStore;