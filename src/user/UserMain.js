import React, { useState, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
const AdminMain = (props) => {
    return (
        isAuthenticated() ? (
            <Redirect
                to={{
                    pathname: "/dashboard",
                    state: { from: props.location }
                }}
            />
        ) : (
            <Redirect
                to={{
                    pathname: "/signin",
                    state: { from: props.location }
                }}
            />
        )
    )
};

export default AdminMain;