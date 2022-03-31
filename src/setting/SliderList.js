import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Switch } from '@mui/material';
import FormMainTitle from "../common/FormMainTitle";
import DataTableComponent from "../common/DataTableComponent";
import { sliderList } from "./ApiSetting";

const SliderList = () => {
  const [sliderArray, setSliderArray] = useState([]);
  const [checkParams, setCheckParams] = useState(false);


  const list = () => {
    sliderList().then((data) => {
      console.log("----",data);
      setSliderArray(data.result);
    })
  }

  useEffect(() =>{
    list();
  },[])

  const deleteSlider = (id) =>{
    console.log(id)
  }

  //Store List component
  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "image",
      text: "Slider Image",
    },
    {
      dataField: "createdAt",
      text: "Date",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
    },
    {
      dataField: "action",
      text: "Action",
    },
  ];

  const getDate = (date) => {
    const newDate = date.split('T')[0];
    const DATE = newDate.split('-');
    return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
}

const getButtons = (imgId) => {
  return (
      <div>
          <Link to={`/admin/storemanagement/edit/${imgId}`} className='btn btn-outline btn-info m-5' onClick={() => setCheckParams(!checkParams)} aria-label='Edit' ><i className='fa fa-pencil font-15'></i></Link>
          <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => deleteSlider(imgId)}><i className='fa fa-trash-o font-15'></i></button>
      </div>
  )
};
const getSwitch = (storeStatus) => {
  return (
      <Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "primary" }} color='primary' checked />
  )
};

  const getImage = (path) =>{
    return(
      <img src={`../slider-images/${path}`} alt="footer-logo" width="100" height="70"></img>
    )
  }

  const SlidersLists = [] ;
  sliderArray.forEach((item)=>{
    console.log(item);
    item['id'] = item._id
    item['image'] = getImage(item.image)
    item['createdAt'] = getDate(item.createdAt)
    item['status'] =getSwitch(item.status)
    item['action'] = getButtons(item._id)
    SlidersLists.push(item);
  })


  return (
    <div className="page-wrapper">
      <div className="container-fluid"> <FormMainTitle title="Slider Management" btnName="Add Slider" btnLink="/admin/create/slider" />
       
        <div className="white-box">
          <div className="col-12">
            <DataTableComponent
              keyField="id"
              title="Slider List"
              tableHeading={columns}
              tableList={SlidersLists}
              onClick=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderList;
