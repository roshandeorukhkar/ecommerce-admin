import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

const RoleList = (props) => {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("100%");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(false);
  const [printBtn, setPrintBtn] = useState(false);
  const [viewColumnBtn, setViewColumnBtn] = useState(false);
  const [filterBtn, setFilterBtn] = useState(false);

  const [list, setList] = useState(props.tableList);
  const [check, setCheck] = useState(true);


  useEffect(() => {
    setList(props.tableList);
  }, [props]);
  const getDate = (date) => {
    const newDate = date.split('T')[0];
    const dt = newDate.split('-');
    return dt[2] + '-' + dt[1] + '-' + dt[0];
  }

  const columns = [
    { name: "User Id", options: { filterOptions: { fullWidth: true } } },
    "Role",
    "Access Module",
    "Date",
    "Status",
    "Action"
  ];

  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 15, 100],
  };
  var listData = [];
  var i = 0;
  const data = [];
  
  list.map((ele, key) => {
    if (ele.isDelete != true) {
      listData[i] = [
        ele.assingTo,
        ele.roleName,
        ele.accessModuleId,
        getDate(ele.createdDate),
        <Switch name="checkedA"
          inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "primary" }}
          color='primary'
          onClick={() => setCheck(!check)}
        />,
        <div>
          <Link to={`/rolemanagement/edit/${ele._id}`} className='btn btn-outline btn-info m-5' aria-label='Edit' onClick={props.onClick} ><i className='fa fa-pencil font-15'></i></Link>
          <Link to={`/rolemanagement/delete/${ele._id}`} className='btn btn-outline btn-info m-5' aria-label='Delete' onClick={props.onClick}><i className='fa fa-trash-o font-15'></i></Link>
        </div>
      ]
      data.push(listData[i]);
      i++;
    }
  }
  )

  const getMuiTheme = () => createTheme({
    components: {
      MuiTableHead : {
        MuiTableRow : { 
          MuiTableCell : {
            styleOverrides : {
              head: {
                fontSize : "16px",
                backgroundColor : "black"
              }
            }
          }
        }
      }
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: "16px",
          }
        }
      },
      MuiSvgIcon : {
        styleOverrides : {
          root: {
            fontSize : "20px",
          }
        }
      },
      MuiInput : {
        styleOverrides : {
          input  : {
            fontSize : "16px",
          }
        }
      },
      MuiTablePagination : {
        styleOverrides : {
          displayedRows   : {
            fontSize : "1.825rem" 
          }
        }
      },
      MuiButtonBase : {
        styleOverrides : {
          root : {
            fontSize : "1.875rem" 
          }
        }
      },
      MuiTablePagination : {
        styleOverrides :{
          selectLabel  : {
            fontSize : "1.825rem" 
          }
        }
      }
    }
  })
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={props.title}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default RoleList;