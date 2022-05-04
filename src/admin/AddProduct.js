import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createProduct, getCategories, getAttributes, Specification, getManufacturers , getDimanstions, getSubCategory  } from './apiAdmin';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Redirect } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from "react-hook-form"; // user for 
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    const AddProduct = () => {
    // use for  validition
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            dimanstions: {},
            attribute: [{ Id: "", Values: "" }],
            specification: [{ }],
            image: [{ colors: "", pic: "" }]
        }
      });
      const [data, setData] = useState({
        loading: false,
        disable :false
    });
      const {
        fields: attributeFields,  // it use attribute 
        append: attributeAppend,
        remove: attributeRemove
      } = useFieldArray({ control, name: "attribute" });

      const {
        fields: specificationFields, // specification
        append: specificationAppend,
        remove: specificationRemove
      } = useFieldArray({ control, name: "specification" });

      const {
        fields: imageFields, // image
        append: imageAppend,
        remove: imageRemove
      } = useFieldArray({ control, name: "image" });

    const [values, setValues] = useState({
        error: '',
        redirectToProfile: false,
        formData : new FormData()
    });
    

    const { name, error, redirectToProfile,formData } = values;
    const [attributess , setAttributess] = useState([]);
    const [dimanstions , setDimanstions] = useState(null);
    const [subcategories , setSubcategories] = useState(null);
    const [categories , setCategories] = useState([]);
    const [specifications , setSpecification] = useState([]);
    const [manufactures , setManufactures] = useState([]);
    const { user, token } = isAuthenticated();

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;
    // get categories 
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues( data.error);
            } else {
                setCategories(data);
            }
        });
    };
    // get attributes
    const listOfAttributes = () => {
        getAttributes().then(data => {
           // console.log("data",data)
            if (data.error) {
                console.log({ ...values, error: data.error });
            } else {
               // console.log(data[0])
                setAttributess(data);
                
                setDimanstions(data.dimension);
            }
        });
    };
    // get specifications
    const listOfSpecification = () => {
        Specification().then(data => {
            if (data.error) {
                console.log({ ...values, error: data.error });
            } else {
                setSpecification(data);
            }
        });
    };
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

    const handleAttributes = (e) => {
        getDimanstions(e.target.value).then(data =>{
            if (data.error) {
                console.log({ ...values, error: data.error });
            } else {
               
                setDimanstions(generateSelectOptions(data.dimension));
            }

        });
    } 
    // category select show sub catagery
    const handleCategory = (e) => {
        const subcategory = [];
        getSubCategory(e.target.value).then(data =>{
            //console.log(e.target.value, "category id ................")
              if (data.error) {
                  console.log({ ...values, error: data.error });
              } else {
                data.map((v, i)=>{
                    if(e.target.value == v.subcategory){
                        subcategory.push({value: v._id, label: v.name, sub:v.subcategory});
                    }
                    // subcategory.push({value: v._id, label: v.name, sub:v.subcategory});
                })
               // console.log(subcategory, "abced")
                setSubcategories(subcategory);
              }
          });
      }   

    const generateSelectOptions = (data) => {
        let result = []
        data.map((v, i)=>{
            result.push({value: v, label: v})
        })
        return result;
    }

    useEffect(() => {
        init();
        listOfAttributes();
        listOfSpecification();
        listOfManufacter();
        setValues({
            ...values,
            formData : new FormData(),
          });
    }, []);

    const clickSubmit = (data) => {
        setData({ loading: true ,disable : true });
         formData.set("attribute",JSON.stringify(data.attribute));
         formData.set("brand",data.brand);
         formData.set("category",data.category);
         formData.set("subcategory",data.subcategory);
         formData.set("description",data.description);
         formData.set("dimanstions",data.dimanstions);
         formData.set("discount",data.discount);
         formData.set("manufactures",data.manufactures);
         formData.set("name",data.name);
         formData.set("price",data.price);
         formData.set("quantity",data.quantity);
         formData.set("shipping",data.shipping);
         formData.set("specification",JSON.stringify(data.specification));
         formData.set("type",data.type);
         data.image.map((img , i) => {
            formData.set(`color${i}`,img.colors);
            formData.set(`imgLength` , data.image.length);
            formData.set(`colorImgLength${i}`,img.pic.length);
            formData.set(`images${i}`,img.pic);
            Array.from(img.pic).forEach((file , cnt) =>{
                formData.set(`images${i}${cnt}`, file);
            })
        })
        createProduct(token, formData).then(data => {
            console.log("hello",data)
            if (data.error) {
                setData({ loading: false ,disable : false });
                setValues({ ...values, error: data.error });
            } 
            else {
                setValues({
                    ...values,
                    redirectToProfile: false
                });
                toast.success('Added successfully!', {
                    autoClose:600,
                    onClose: () => {
                        setValues({
                            ...values,
                            redirectToProfile: true
                        })
                    }
                })
                // NotificationManager.success('Product has been added successfully!');
                // setTimeout(function(){                
                //     setValues({
                //         ...values,
                //         redirectToProfile:true  
                //     })
                // },1000)
            }
        });
    };

    const SelectBox = React.forwardRef(({ onChange, onBlur, options, isMulti, name }, ref ) => (
          <Select isMulti={isMulti} ref={ref} onBlur={onBlur} onChange={onChange} options={options} />
      ));
    
    const newPostForm = () => (
    <>
        <form onSubmit={handleSubmit(clickSubmit)}> 
         <div className="white-box">
            <div className="row">
                <h3>Product Information</h3><hr></hr>
                <div className="col-lg-12">
                    <div className="form-group col-lg-6">
                        <h6><b>Product Name <span style={{color:'red'}}>*</span></b></h6>
                        <input type="text" className="form-control" placeholder='Enter product name' {...register("name", { required: true })} />
                        {errors.name && <span className='text-danger'>Product name is required</span>}
                    </div>
                    <div className="form-group col-lg-6">
                        <h6><b>Brand Name</b></h6>
                        <input type="text" className="form-control" placeholder='Enter brand name' {...register("brand", { required: true })}/>
                        {errors.brand && <span className='text-danger'>Brand name is required</span>}
                    </div> 
                    <div className="form-group col-lg-6">
                        <h6><b> Manufacturer </b></h6>
                        <select className="form-control" placeholder='select manufactures'  {...register("manufactures", { required: true })}> 
                            <option value="">Please select</option>
                            {manufactures &&
                                manufactures.map((s, i) => (
                                    <>
                                    {!s.deletedAt && s.status == 1 ?(
                                        <option key={i} value={s._id}>
                                            {s.manufacturerName }
                                        </option>
                                    ):null}
                                </>
                                ))} 
                        </select>
                        {errors.manufactures && <span className='text-danger'>Select manufactures name </span>}
                    </div> 
                    <div className="form-group col-lg-6">
                            <h6><b> Category</b></h6>
                            <select className="form-control" {...register("category", { required: true })} onChange={handleCategory}>
                                <option value="">Please select</option>
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
                            {errors.category && <span className='text-danger'>Select category </span>}

                    </div>
                    <div className="form-group col-lg-6">
                            <h6><b> Sub Category </b></h6>
                            <select className="form-control" {...register("subcategory", { required: true })}  >
                                <option value="">Please select</option>
                                {subcategories &&
                                    subcategories.map((s, i) => (
                                        <>
                                        {s.sub ?(
                                            <option key={i} value={s.value}>
                                                {s.label}
                                            </option>
                                        ):null}
                                        </>
                                    ))}
                            </select>
                            {errors.subcategory && <span className='text-danger'>Select subcategory </span>}

                    </div>
                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <h3>Product Details</h3><hr></hr>
                <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <h6><b> Price </b></h6>
                            <input  type="number" placeholder='Enter price ' className="form-control" {...register("price", { required: true })} />
                            {errors.price && <span className='text-danger'>Enter Price </span>}

                        </div>
                        <div className="form-group col-lg-6">
                            <h6><b> Shipping</b></h6>
                            <select className="form-control" {...register("shipping", { required: true })}>
                                <option value="">Please select</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                            {errors.shipping && <span className='text-danger'>Select shipping </span>}

                        </div>
                        <div className="form-group col-lg-6">
                            <h6><b> product type</b></h6>
                            <select  className="form-control" {...register("type", { required: true })}>
                                <option value="">Please select</option>
                                <option value="New Arrivale">New Arrivale</option>
                                <option value="Normal">Normal </option>
                                <option value="Comming soon">Comming soon </option>
                            </select>
                            {errors.type && <span className='text-danger'>Select Type </span>}
                        </div>
                        <div className="form-group col-lg-6">
                            <h6><b> Quantity</b></h6>
                            <input  type="number" placeholder='Enter quantity' className="form-control" {...register("quantity", { required: true })} />
                            {errors.quantity && <span className='text-danger'>Enter Quantity  </span>}
                        </div> 
                        <div className="form-group col-lg-6">
                            <h6><b> Discount in Percentage</b></h6>
                            <input  type="number" placeholder='Enter discount' className="form-control" {...register("discount", { required: true })} />
                            {errors.discount && <span className='text-danger'>Enter Discount  </span>}
                        </div> 
                </div>
            </div>
        </div>
        <div className="white-box">
            <div className="row">
                <div className="row">
                    <div className='col-lg-12'>
                        <h3> Add Specification </h3><hr></hr>
                        {specificationFields.map((item, index) => {
                            return (
                            <div key={item.id}>
                                <div className='col-lg-7'>
                                <select  className="form-control" {...register(`specification.${index}`, { required: false })}>
                                <option value="">Please select</option>
                                {specifications &&
                                    specifications.map((s, i) => (
                                        <option key={i} value={s._id}>
                                            {s.manufacturerName }{" ( "}{s.specification_type}{" )"}
                                        </option>
                                    ))}
                            </select>

                                </div>
                                <div className='col-lg-2'>
                                    <button type="button" className="btn btn-info" onClick={() => { specificationAppend(); }}> + </button>
                                    <button type="button" className="btn btn-danger" onClick={() => specificationRemove(index)}> - </button>
                                </div>
                            </div>
                            );
                        })}
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
                                    <select className="form-control" {...register(`attribute.${index}.Id`, { required: false })}  onChange={handleAttributes} >
                                            <option value="">Please select</option>
                                                {attributess &&
                                                    attributess.map((a, i) => (
                                                        <>
                                                        {!a.deletedAt ?(
                                                            <option key={i} value={a._id} >
                                                                {a.attributeName }
                                                            </option>
                                                            ):null}
                                                        </>
                                                    ))}
                                    </select>
                                </div>
                                <div className='col-lg-5'>
                                <h6>Attribute value</h6>
                                    <Controller
                                        name={`attribute.${index}.Values`}
                                        control={control}
                                        render={({ field }) =><SelectBox {...field} isMulti='true' options={dimanstions}/>}
                                    />
                                </div>
                                <div className='col-lg-2'>
                                <h6> <br></br></h6>
                                    <button type="button" className="btn btn-info" onClick={() => { attributeAppend(); }}> + </button>
                                    <button type="button" className="btn btn-danger" onClick={() => attributeRemove(index)}> - </button>
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
                                        <input type="text" className="form-control" placeholder='Enter Color name'  {...register(`image.${index}.colors`, { required: false })} />
                                </div>
                                <div className='col-lg-5'>
                                <h6> Photos</h6>
                                <input type="file" className="form-control" placeholder='Enter Color name' accept='image/*'  {...register(`image.${index}.pic`, { required: false })} multiple />
                                    {/* <Controller render={({ field }) => <input {...field} />} name={`image.${index}.pic`} control={control} /> */}
                                </div>
                                <div className='col-lg-2'>
                                <h6> <br></br></h6>
                                    <button type="button" className="btn btn-info" onClick={() => { imageAppend(); }}> + </button>
                                    <button type="button" className="btn btn-danger" onClick={() => imageRemove(index)}> - </button>
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
                    <div className="form-group col-lg-9">
                        <h6><b> Description</b></h6>
                        <textarea  rows="4" className="form-control"{...register("description", { required: true })} />
                        {errors.description && <span className='text-danger'>Enter description  </span>}
                    </div>
                    {showLoading(data.loading)}
                    <div className="form-group col-lg-9">
                        <button  className="btn btn-info btn-md" style={{float: 'right', borderRadius:'7px'}} type="submit" disabled={data.disable}> Submit </button>
                    </div>
            </div>
        </div>

        </form>
    </>
   
    );

    const redirectUser = () => {
        if(redirectToProfile) {
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

export default AddProduct;
