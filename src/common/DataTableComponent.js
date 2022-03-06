import React, { useState, useEffect, memo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

const { SearchBar  } = Search;

const { ExportCSVButton } = CSVExport;

/*
export const productsGenerator = quantity => {
    const items = [];
    for (let i = 0; i < quantity; i++) {
      items.push({ id: i, name: `Item name ${i}`, price: 2100 + i });
    }
    return items;
};

const products = productsGenerator(50);

const columns = [{
    dataField: 'id',
    text: 'Product ID',
    sort: true
  }, {
    dataField: 'name',
    text: 'Product Name',
    sort: true
  }, {
    dataField: 'price',
    text: 'Product Price'
  }];
  */
 
const DataTableComponent = (props) => {
    return (       
        <ToolkitProvider
            keyField={ props.keyField }
            data={ props.tableList }
            columns={ props.tableHeading }
            search                                       
            >
            {
                props => (
                <div>
                    <div className='float-left'>
                        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                    </div>
                    <div className='float-right'>
                        <SearchBar { ...props.searchProps }/>
                    </div>
                    <BootstrapTable
                    striped
                    hover
                    condensed
                    bordered={ false }
                    pagination={ paginationFactory({ sizePerPage: 10 }) }
                    { ...props.baseProps }
                    selectRow={ { mode: 'checkbox' } }
                    />
                </div>
                )
            }
      </ToolkitProvider>
    )
}

export default memo(DataTableComponent);;