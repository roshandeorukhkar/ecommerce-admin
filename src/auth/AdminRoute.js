import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ component: Component, ...rest }) => {
    const { user, token, modules } = isAuthenticated();
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <Component 
                    {...props} 
                    user={user}
                    modules={modules}
                    token={token}
                    />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
};

export default AdminRoute;
