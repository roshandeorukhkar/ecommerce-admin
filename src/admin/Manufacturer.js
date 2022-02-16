import React from 'react';
import ManageManufacturer from "./ManageManufacturer";

const Manufacturer = () => {

    return (
        <>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ManageManufacturer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default Manufacturer;