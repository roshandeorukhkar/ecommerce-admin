import React from "react";
import AdminLayout from '../core/AdminLayout';
import UserList from "./UserList";

const UserManagemnt = (props) =>{
    return(
        <>
          <AdminLayout data={props}>
              <UserList {...props}/>
         </AdminLayout>
        </>
    );
}
export default UserManagemnt;