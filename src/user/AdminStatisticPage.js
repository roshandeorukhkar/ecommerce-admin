import React from 'react';
import AdminStatistics from './AdminStatistics';
import AdminFooter from './AdminFooter' ;
import AdminStatisticProductGraph from './AdminStatisticProductGraph';
import AdminStatisticTransactionGraph from './AdminStatisticTransactionGraph';
;


const AdminStatisticPage = () =>{
    return(
        <>
        <div className="page-wrapper">
            <div className="container-fluid">
                <h2 className='font-bold'>Statics</h2>
                <div className='white-box'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <h4 className='box-title'>Store Performances
                            <a className='fa-pull-right'>View Details</a>
                        </h4>
                        <hr/>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                <h3 className='box-title'>This Week</h3>
                                <div className="progress progress-md">
                                    <div className="progress-bar progress-bar-info" style={{width: '75%'}} role="progressbar">75%</div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                <h4 className='box-title'>Indicators</h4>
                                <div className='col-lg-4 col-md-4 col-sm-4'>
                                    <div className='indicators-box'  >
                                        <div className='row'>
                                        <div className='col-xs-8'>
                                        <div className='indicators-title' >Message Responce
                                        </div>
                                        </div>
                                        <div className='col-xs-4'>
                                            <button className='btn btn-block btn-info' >10/10</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-4'>
                                    <div className='indicators-box'  >
                                        <div className='row'>
                                        <div className='col-xs-8'>
                                        <div className='indicators-title' >Message Replied
                                        </div>
                                        </div>
                                        <div className='col-xs-4'>
                                            <button className='btn btn-block btn-primary' >10/10</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-4'>
                                    <div className='indicators-box'  >
                                        <div className='row'>
                                        <div className='col-xs-8'>
                                            <div className='indicators-title' >Regular Order
                                            </div>
                                        </div>
                                        <div className='col-xs-4'>
                                            <button className='btn btn-block btn-success' >10/10</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-4'>
                                    <div className='indicators-box'  >
                                        <div className='row'>
                                            <div className='col-xs-8'>
                                                <div className='indicators-title' >Store Verified
                                                </div>
                                            </div>
                                        <div className='col-xs-4'>
                                            <button className='btn btn-block btn-warning' >10/10</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-4'>
                                    <div className='indicators-box'  >
                                        <div className='row'>
                                            <div className='col-xs-8'>
                                                <div className='indicators-title' >Store Pinalty
                                                </div>
                                            </div>
                                        <div className='col-xs-4'>
                                            <button className='btn btn-block btn-danger' >10/10</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div className='white-box'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <h4 className='box-title'>Product Data
                                <a className='fa-pull-right'>Help</a>
                            </h4>
                            <hr/>
                            <div className='row'>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <div className='col-lg-3 col-md-3 col-sm-3'>
                                        <div className='p-10'>
                                            <span>Product Viewed</span>
                                            <h2 className='font-bold'>500 <span className='font-light font-15'>10%</span></h2>
                                        </div>
                                        <div className='p-10'>
                                            <span>Success Transaction</span>
                                            <h2 className='font-bold'>5 <span className='font-light font-15'>10%</span></h2>
                                        </div>
                                        <div className='p-10'>
                                            <span>Conversion Rate</span>
                                            <h2 className='font-bold'>25 <span className='font-light font-15'>12%</span></h2>
                                        </div>
                                        <div className='p-10'>
                                            <span>Sold Product</span>
                                            <h2 className='font-bold'>10 <span className='font-light font-15'>12%</span></h2>
                                        </div>
                                    </div>
                                    <div className='col-lg-9 col-md-9 col-sm-9'>
                                       <AdminStatisticProductGraph />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="white-box user-table">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h4 className="box-title">Latest order</h4>
                                </div>
                                <div className="col-sm-6">
                                    <select className="custom-select">
                                        <option >Sort the list by</option>
                                        <option value="1">Daily orders</option>
                                        <option value="2">Weekly orders</option>
                                        <option value="3">Monthly orders</option>
                                        <option value="4">Yearly orders</option>
                                    </select>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="checkbox checkbox-info">
                                                    <input id="c1" type="checkbox" />
                                                    <label htmlFor="c1"></label>
                                                </div>
                                            </th>
                                            <th>Items</th>
                                            <th>Quantity</th>
                                            <th>Date</th>
                                            <th>Location</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="checkbox checkbox-info">
                                                    <input id="c2" type="checkbox"/>
                                                    <label htmlFor="c2"></label>
                                                </div>
                                            </td>
                                            <td>
                                                <img src="/assets/plugins/images/p1.png" alt="product" width="60" height="60"/>
                                                <a href="#" className="p-l-25 text-link">Mobile</a>
                                            </td>
                                            <td>Daniel Kristeen</td>
                                            <td>Texas, US</td>
                                            <td>1</td>
                                            <td>
                                                <a href="#" title='Edit' className="btn btn-block btn-info font-16"><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                                <a href="#" title='Delete' className="btn btn-block btn-danger font-16"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="checkbox checkbox-info">
                                                    <input id="c3" type="checkbox"/>
                                                    <label htmlFor="c3"></label>
                                                </div>
                                            </td>
                                            <td>
                                                <img src="/assets/plugins/images/p2.png" alt="product" width="60" height="60"/>
                                                <a href="#" className="p-l-25 text-link">Headphone</a>
                                            </td>
                                            <td>Hanna Gover</td>
                                            <td>Los Angeles, US</td>
                                            <td>2</td>
                                            <td>
                                                <a href="#" type='Edit'  className="btn btn-block btn-info font-16"><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                                <a href="#" type='Delete' className="btn btn-block btn-danger font-16"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="checkbox checkbox-info">
                                                    <input id="c4" type="checkbox"/>
                                                    <label htmlFor="c4"></label>
                                                </div>
                                            </td>
                                            <td>
                                                <img src="/assets/plugins/images/p3.png" alt="product" width="60" height="60"/>
                                                <a href="#" className="p-l-25 text-link">Earphone</a>
                                            </td>
                                            <td>Jeffery Brown</td>
                                            <td>Houston, US</td>
                                            <td>3</td>
                                            <td>
                                                <a href="#" type='Edit' className="btn btn-block btn-info font-16"><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                                <a href="#" type="Delete" className="btn btn-block btn-danger font-16"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="checkbox checkbox-info">
                                                    <input id="c5" type="checkbox"/>
                                                    <label htmlFor="c5"></label>
                                                </div>
                                            </td>
                                            <td>
                                                <img src="/assets/plugins/images/p4.png" alt="product" width="60" height="60"/>
                                                <a href="#" className="p-l-25 text-link">Laptop</a>
                                            </td>
                                            <td>Elliot Dugteren</td>
                                            <td>San Antonio, US</td>
                                            <td>1</td>
                                            <td>
                                                <a href="#" type='Edit' className="btn btn-block btn-info font-16"><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                                <a href="#" type='Delete' className="btn btn-block btn-danger font-16"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <ul className="pagination">
                                <li><a>Previous</a></li>
                                <li className="active"> <a href="#">1</a> </li>
                                <li> <a href="#">2</a> </li>
                                <li> <a href="#">3</a> </li>
                                <li> <a href="#">4</a> </li>
                                <li> <a href="#">5</a> </li>
                                <li> <a href="#">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='white-box'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <h4 className='box-title'>Transaction Data
                                <a className='fa-pull-right'>Help</a>
                            </h4>
                            <hr/>
                            <div className='row'>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <div className='col-lg-3 col-md-3 col-sm-3'>
                                        <h6>Total Transaction
                                        </h6>
                                        <h3 className='font-bold'>5</h3>
                                        <div className="white-box text-center">
                                            <input data-plugin="knob" datawidth="150" dataheight="150" datamin="-25000" datadisplayprevious="true" datamax="25000" datastep="1000" defaultValue="10000" datafgcolor="#2b2b2b" />
                                            <h6 className="text-muted m-t-10">5-digit values, step 1000</h6> </div>
                                    </div>
                                    <div className='col-lg-9 col-md-9 col-sm-9'>
                                       <AdminStatisticTransactionGraph />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                 {/* Box */}
                 <div className='row'>
                     <div className='col-md-4 col-sm-12'>
                         <div className='white-box bg-primary color-box'>
                             <i className='fa fa-credit-card'></i><br/>
                             <span>Income</span>
                             <h2 className='text-white font-bold'><i className='fa fa-rupee'></i> 12000</h2>
                             <a className='text-white'>View Details
                                {'      '}<i className='icon-arrow-right'></i></a>
                         </div>
                     </div>
                     <div className='col-md-4 col-sm-12'>
                     <div className='white-box bg-danger color-box'>
                             <i className='fa fa-file'></i><br/>
                             <span>Refund</span>
                             <h2 className='text-white font-bold'><i className='fa fa-rupee'></i> 100</h2>
                             <a className='text-white'>View Details  {'      '}<i className='icon-arrow-right'></i></a>
                         </div>
                     </div>
                     <div className='col-md-4 col-sm-12'>
                     <div className='white-box bg-success color-box'>
                             <i className='fa fa-file'></i><br/>
                             <span>Top Ads Charges</span><br/>
                             <h2 className='text-white font-bold'> You haven't used</h2>
                             <a className='text-white'>Try Now {'      '}<i className='icon-arrow-right'></i></a>
                         </div>
                     </div>
                 </div>


            </div>
       <AdminFooter /> 
    </div>
    </>
    )

}

export default AdminStatisticPage;