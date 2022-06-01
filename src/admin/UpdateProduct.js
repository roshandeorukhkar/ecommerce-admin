import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct, Specification, getManufacturers, getSubCategory, getAttributes, getDimanstions } from './apiAdmin';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useForm, Controller, useFieldArray } from "react-hook-form"; // user for 
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateProduct = ({ match }) => {
    const [values, setValues] = useState({});
    console.log("=====",values)
    const [attributess , setAttributess] = useState([]);
    console.log("attributess=>",attributess)
    const [categories, setCategories] = useState([]);
    const [setOfAttributes, setSetOfAttributes] = useState([])
    console.log("setOfAttributes=>",setOfAttributes)
    const [filteredAttributes, setFilteredAttributes] = useState([])
    const [dimanstions , setDimanstions] = useState(null);
    const [specifications , setSpecification] = useState([]);
    const [manufactures , setManufactures] = useState([]);
    console.log("manufactures=>",manufactures)
    const [subcategories , setSubcategories] = useState([]);
    const [setOfImages, setSetOfImages] = useState([])
    const { user, token } = isAuthenticated();

    const { name, brand, price, quantity, description, discount, shipping, type, manuf, sub, cate, dimanstion, attribute, image, specification, redirectToProfile} = values;
    console.log("values--->",attribute)
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            dimanstions: {},
            attribute: [{ Id: "", Values: "" }],
            specification: [],
            image: [{ colors: "", pic: "" }]
        }
      });

    const init = productId => {
        let defaultValues = {};
        getProduct(productId).then(data => {
            console.log("data=>",data)
            defaultValues.name = data.name;
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                // setValues({
                //     name: data.name,
                //     brand: data.brand,
                //     description:data.description,
                //     quantity: data.quantity,
                //     price:data.price,
                //     discount:data.discount,
                //     shipping:data.shipping,
                //     type:data.type,
                //     manuf:data.manufactures,  
                //     cate:data.category._id,
                //     subcate:data.subcategory,
                //     attri:data.attribute[0]._id,
                //     spe:data.specification
                // // });
                
                reset({
                    specification: data.specification, 
                    attribute:data.attribute,
                    name:data.name,
                    brand: data.brand,
                    description:data.description,
                    quantity: data.quantity,
                    price:data.price,
                    discount:0,
                    shipping:data.shipping,
                    type:data.type,
                    manuf:data.manufactures,  
                    cate:data.category._id,
                    subcategory:data.subcategory,
                })
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            console.log("data", data)
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };
    // get attributes
    const listOfAttributes = () => {
        getAttributes().then(data => {
            console.log("getAttributes-data", data)
            if (data.error) {
                console.log({ ...values, error: data.error });
            } else {
                setAttributess(data);
                let attr = []
                attr.push(data)
                setSetOfAttributes(attr)
                setDimanstions(data.dimension);
            }
        });
    };

    // get specifications
    const listOfSpecification = () => {
        Specification().then(data => {
            console.log("=======>",data)
            if (data.error) {
                console.log({ ...values, error: data.error });
            } else {
                setSpecification(generateSelectOptionsForSpecification(data));
            }
        });
    };
    const generateSelectOptionsForSpecification = (data) => {
        console.log("data====>",data)
        let result = []
        data.map((v, i)=>{
            result.push({id:v._id, value: v.manufacturerName, label: v.manufacturerName})
        })
        return result;
    }
    
    // get manufacturers
    const listOfManufacter = () => {
        getManufacturers().then(data => {
            if (data.error) {
                console.log({ ...values, error: data.error });
            } else {
                setManufactures(data);
            }
        });
    };
    
    // category select show sub catagery
    const handleCategory = (e) => {
        const subcategory = [];
        getSubCategory(e.target.value).then(data =>{
            if (data.error) {
                console.log({ ...values, error: data.error });
            } else {
                data.map((v, i)=>{
                    if(e.target.value == v.subcategory){
                        subcategory.push({value: v._id, label: v.name, sub:v.subcategory});
                    }
                })
                setSubcategories(subcategory);
            }
        });
    }  
    
    const handleAttributes = (e, index) => {
        getDimanstions(e.target.value).then(data =>{
            if (data.error) {
                console.log({ ...values, error: data.error });
            } else {
                setDimanstions(generateSelectOptions(data.dimension));
            }
        });
        filterSelectedAttributes(e.target.value, index)
    }

    const generateNewAttributeSet = (index) => {
        let attr = setOfAttributes
        attr[index+1] = []
        attr[index+1] = attributess.filter(item => !filteredAttributes.includes(item._id))
        setSetOfAttributes(attr)
    }
        
    const generateNewImageSet = (index) => {
        let img = setOfImages
        img[index+1] = []
        setSetOfImages(img)
    }
    const generateSelectOptions = (data) => {
        let result = []
        data.map((v, i)=>{
            result.push({value: v, label: v})
        })
        return result;
    }

    const filterSelectedAttributes = (value, index) => {
        if(value) {
            let temp = []
            temp = [...temp, ...filteredAttributes]
            temp[index] = value
            setFilteredAttributes(temp)
        }
    }

    const {
        fields: attributeFields,  // it use attribute 
        append: attributeAppend,
        remove: attributeRemove
    } = useFieldArray({ control, name: "attribute" });

    const {
        fields: imageFields, // image
        append: imageAppend,
        remove: imageRemove
    } = useFieldArray({ control, name: "image" });

    useEffect(() => {
        init(match.params.productId);
        listOfSpecification();
        listOfManufacter();
        listOfAttributes();
    }, []);

    const clickSubmit = (data) => {
        console.log("product update.....", data);
        updateProduct(match.params.productId, data).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: ''
                });
                NotificationManager.success('Product has been Update successfully!');
                setTimeout(function(){                
                    setValues({
                        ...values,
                        redirectToProfile:true  
                    })
                },1000)
            }
        });
    };

    const SelectBox = React.forwardRef(({ onChange, onBlur, options, isMulti, name }, ref ) => (
        <Select isMulti={isMulti} ref={ref} onBlur={onBlur} onChange={onChange} options={options} />
    ));

    const newPostForm = () => (
    <form onSubmit={handleSubmit(clickSubmit)}> 
        <div className="white-box">
            <div className="row">
                <h3>Product Information</h3><hr></hr>
                <div className="col-lg-12">
                    <div className="form-group col-lg-6">
                       <h6><b>Product Name <span style={{color:'red'}}>*</span></b></h6>
                       <input type="text" className="form-control"  {...register("name", { required: false })}  defaultValue={name}  />
                    </div>
                    <div className="form-group col-lg-6">
                        <h6><b>Brand Name</b></h6>
                        <input type="text" className="form-control" placeholder='Enter brand name' {...register("brand", { required: false })} defaultValue={brand}/>
                    </div> 
                    <div className="form-group col-lg-6">
                        <h6><b> Manufacturer </b></h6>
                        <select className="form-control" placeholder='select manufactures'  {...register("manufactures", { required: false })} defaultValue={manuf}> 
                            {manufactures &&
                                manufactures.map((s, i) => (
                                    <>
                                    {!s.deletedAt && s.status == 1 ?(
                                        manuf == s._id ?(
                                            <option key={i} value={s._id}>
                                                {s.manufacturerName }
                                            </option>
                                        ):null
                                        
                                    ):null}
                                    </>
                                ))
                            }
                            {manufactures &&
                                manufactures.map((s, i) => (
                                    <>
                                    {!s.deletedAt && s.status == 1 ?(
                                        manuf != s._id ?(
                                            <option key={i} value={s._id}>
                                                {s.manufacturerName }
                                            </option>
                                        ):null    
                                    ):null}
                                    </>
                                ))
                            }  
                        </select>
                    </div> 
                    <div className="form-group col-lg-6">
                        <h6><b> Category</b></h6>
                        <select className="form-control" {...register("category", { required: false })} onChange={handleCategory} defaultValue={cate}>
                            {categories &&
                                categories.map((c, i) => (
                                <>
                                {!c.deletedAt && c.status == 1 ?(
                                    cate == c._id ?(
                                        <option key={i} value={c._id}>
                                            {c.name }
                                            </option>
                                    ):null
                                    
                                ):null}
                                </>
                            ))}
                            {categories &&
                                categories.map((c, i) => (
                                    <>
                                        {!c.deletedAt && !c.subcategory && c.status == 1 ?(
                                        <option key={i} value={c._id}>
                                            {c.name }
                                        </option>
                                        ):null}
                                    </>
                                ))}
                        </select>
                    </div>
                    <div className="form-group col-lg-6">
                        <h6><b> Sub Category </b></h6>
                        <select className="form-control" {...register("subcategory", { required: false })} defaultValue={sub} >
                            {subcategories &&
                                subcategories.map((c, i) => (
                                    <>
                                    {!c.deletedAt && c.status == 1 ?(
                                        sub == c._id ?(
                                            <option key={i} value={c._id}>
                                                {c.name }
                                            </option>
                                        ):null
                                        
                                    ):null}
                                    </>
                                ))
                            }
                            {subcategories &&
                                subcategories.map((s, i) => (
                                    <>
                                    {s.sub ?(
                                        <option key={i} value={s.value}>
                                            {s.label}
                                        </option>
                                    ):null}
                                    </>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <h3>Product Details</h3><hr></hr>
                <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <h6><b> Price <span style={{color:'red'}}>*</span></b></h6>
                            <input  type="number" placeholder='Enter price ' className="form-control" {...register("price", { required: false })} defaultValue={price} />
                        </div>
                        <div className="form-group col-lg-6">
                            <h6><b> Shipping</b></h6>
                            <select className="form-control" {...register("shipping", { required: false })} defaultValue={shipping} >
                               {shipping === 'Yes'?(
                                   <>
                                    <option>{shipping}</option>
                                    <option defaultValue="No">No</option>
                                    </>
                               ):(
                                   <>
                                        <option>{shipping}</option>
                                        <option defaultValue="Yes">Yes</option>

                                   </>
                               )}
                            
                            </select>
                        </div>
                        <div className="form-group col-lg-6">
                            <h6><b> product type</b></h6>
                            <select  className="form-control" {...register("type", { required: false })}>
                                {/* <option>{type}</option> */}
                                {type === 'New Arrivale'?(
                                   <>
                                    <option>{type}</option>
                                    <option value="Normal">Normal </option>
                                    <option value="Comming soon">Comming soon </option>
                                    </>
                                  ):type === "Normal"?(
                                   <>
                                        <option>{type}</option>
                                        <option value="New Arrivale">New Arrivale</option>
                                        <option value="Comming soon">Comming soon </option>

                                   </>
                                ):(
                                    <>
                                        <option>{type}</option>
                                        <option value="New Arrivale">New Arrivale</option>
                                        <option value="Normal">Normal </option>
                                    </>
                                )
                               }
                                
                            </select>
                        </div>
                        <div className="form-group col-lg-6">
                            <h6><b> Quantity</b></h6>
                            <input  type="number" placeholder='Enter quantity' className="form-control" {...register("quantity", { required: false })} defaultValue={quantity} />
                        </div> 
                        {/* <div className="form-group col-lg-6">
                            <h6><b> Discount in Percentage</b></h6>
                            <input  type="number" placeholder='Enter discount' className="form-control" {...register("discount", { required: false })} defaultValue={discount} />
                        </div>  */}
                </div>
            </div>
       </div>
       <div className="white-box">
            <div className="row">
                <div className="row">
                    <div className='col-lg-12'>
                        <h3> Add Specification </h3><hr></hr>
                        <div className='col-lg-10'>
                            <Controller
                                name="specification"
                                control={control}
                                render={({ field }) =>
                                    <SelectBox {...field} 
                                        isMulti='true' 
                                        defaultValue={specification}
                                        options={specifications}
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <div className='col-lg-12'>
                    <h3> Add Attribute </h3><hr></hr>
                    {attributeFields.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <div className='col-lg-5'>
                                    <h6>Attribute name</h6>
                                    <select className="form-control" {...register(`attribute.${index}.Ids`, { required: false })}  onChange={handleAttributes} defaultValue={attribute}>
                                        <option>Please select...</option>
                                        {attributess &&
                                            attributess.map((a, i) => (
                                                <>
                                                {!a.deletedAt && a.status == 1 ?(
                                                    (item.Id == a._id) ?(
                                                        <option key={i} value={a._id} selected="selected">
                                                            {a.attributeName } 
                                                        </option>
                                                    ):(
                                                        <option key={i} value={a._id}>
                                                            {a.attributeName }
                                                        </option>
                                                    )    
                                                ):null}
                                                </>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='col-lg-5'>
                                    <h6>Attribute value</h6>
                                    <Controller
                                        name={`attribute.${index}.Values`}
                                        control={control}
                                        render={({ field }) =><Select {...field}  isMulti='true' options={dimanstions}/>}
                                    />
                                </div>
                                <div className='col-lg-2'>
                                    <h6> <br></br></h6>
                                    <button type="button" className="btn btn-danger" onClick={() => attributeRemove(index)}> - </button>
                                    {(attributeFields.length - 1) == index? (
                                        <button type="button" className="btn btn-info" onClick={() => { attributeAppend(); generateNewAttributeSet(index); }}> + </button>
                                    ):null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <div className='col-lg-12'>
                    <h3> Add Image </h3><hr></hr>
                    {imageFields.map((item, index) => {
                        return (
                        <div key={item.id}>
                            <div className='col-lg-5'>
                                <h6>Color name</h6>
                                <input type="text" className="form-control" placeholder='Enter Color name'  {...register(`image.${index}.colors`, { required: false })} defaultValue={image}/>
                            </div>
                            <div className='col-lg-5'>
                            <h6> Photos</h6>
                            <input type="file" className="form-control" placeholder='Enter Color name'  {...register(`image.${index}.pic`, { required: false })} />
                                {/* <Controller render={({ field }) => <input {...field} />} name={`image.${index}.pic`} control={control} /> */}
                            </div>
                            <div className='col-lg-2'>
                            <h6> <br></br></h6>
                                <button type="button" className="btn btn-danger" onClick={() => imageRemove(index)}> - </button>
                                {(imageFields.length - 1) == index? (
                                    <button type="button" className="btn btn-info" onClick={() => { imageAppend(); generateNewImageSet(index); }}> + </button>
                                ):null}
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <h3>Product Description</h3>
                <div className="form-group col-lg-8">
                    <h6><b> Description</b></h6>
                    <textarea  rows="4" className="form-control"{...register("description", { required: false })} defaultValue={description} />
                </div>
    
                <div className="form-group col-lg-9">
                    <button  className="btn btn-info btn-md" style={{float: 'right', borderRadius:'7px'}} type="submit"> Submit </button>
                </div>
            </div>
        </div>
    </form>
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            return <Redirect to="/admin/productlist" />;
        }
    };

    return (
        <div id="wrapper">
        <AdminHeader />
        <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                    <ToastContainer />
                    {/* <NotificationContainer/> */}
                    {redirectUser()}
                    {newPostForm()}   
                </div>
            </div>
    </div>
            
    );
};

export default UpdateProduct;
