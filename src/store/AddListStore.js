import React ,{ useState } from "react";
import AddStoreContent from "./AddStoreContent";
import SIdata from "./SIdata";
import StoreList from "./StoreList";
import { addStoreData } from "./ApiStore";
import { Link } from 'react-router-dom';

const AddListStore = () =>{
    const [values , setValues] = useState({
        storeName : " ",
        ownerName : " ",
        address : " ",
        userName : " ",
        mobile : " ",
        password : " ",
        email : " ",
    });
    const {storeName,ownerName,address,userName,mobile,password,email} = values;

    const handleChange = name => event => {
        console.log( event.target.value);
        setValues({ ...values , [name]: event.target.value });
    };
    
    const clickSubmit = event =>{
        event.preventDefault();
        setValues({...values});
        addStoreData({...values}).then(data => {
            console.log("data",data);
            var alert = document.getElementById("alerttopright");
            var msg = document.getElementById("alertMsg");
            var hasError;
            if(data.status == false){
                alert.classList.add('alert-danger');
                alert.classList.remove('alert-success');
                msg.innerHTML= data.message;
                for(let key in data.errors){
                    console.log(key);
                    hasError =  document.getElementById(key).classList.add('has-error');
                    let div = document.getElementById(key+"_error");
                    div.innerHTML =  data.errors[key];
                }
            }else{
                document.querySelector('.page-wrapper').classList.remove('has-error');
                document.querySelector('.page-wrapper').classList.remove('error');
                alert.classList.remove('alert-danger');
                alert.classList.add('alert-success');
                msg.innerHTML= data.message;
            }
        })
    }

    const successResult = () =>(
        <div id="alerttopright" className="myadmin-alert  myadmin-alert-top-right"> 
        <Link to="#" className="closed">&times;</Link>
        <h4 id="alertMsg"></h4></div>
        )
    

    return(
        <>
        {successResult()}
        <div className="page-wrapper">
            <div className="container-fluid">
                <h2 className="font-bold"> Store Management 
                <button type="submit" className="btn  btn-outline btn-rounded  btn-info fa-pull-right"><i className="fa fa-plus-circle"></i> Add Role</button></h2>
                <div className="white-box">
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="box-title">Add Store</h4>
                            <hr />
                            <form className="form-horizontal" >
                            {SIdata.map(function data(val){
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
            </div>
        </div>    
        </>    
        
    )
}

export default AddListStore;