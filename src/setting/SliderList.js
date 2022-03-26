import React from "react";
import FormMainTitle from "../common/FormMainTitle";
import DataTableComponent from "../common/DataTableComponent";

const SliderList = () => {
  const storeListArray = [];
  //Store List component
  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
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

  return (
    <div className="page-wrapper">
      <div className="container-fluid"> <FormMainTitle title="Slider Management" btnName="Add Slider" btnLink="/admin/create/slider" />
       
        <div className="white-box">
          <div className="col-12">
            <DataTableComponent
              keyField="id"
              title="Slider List"
              tableHeading={columns}
              tableList={storeListArray}
              onClick=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderList;
