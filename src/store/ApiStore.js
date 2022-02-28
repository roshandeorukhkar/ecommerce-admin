import {API} from '../config';

export const addStoreData = data => {
    return fetch(`${API}/addStoreData`,{
                "method" : 'POST',
                "headers" : {
                   "Accept" : "application/json",
                   "content-type" : 'application/json' 
                },
                body : JSON.stringify(data)
    }) .then(response => {
        return response.json();
    }).catch(error =>
        console.log("error",error)
    );
}

export const storeList = data => {
    return  fetch(`${API}/getStoreList`,{
        "headers" : {
            "accept" : "application/json",
            "content-type" : "application/json"
        },
    }).then(response => {
        return response.json();
    }).catch(error =>
            console.log("error",error)
        );
}

export const getStoreDataById = data => {
    return  fetch(`${API}/getStoreDataById/${data.storeId}`,{
        "headers" : {
            "accept" : "application/json",
            "content-type" : "application/json"
        },
    }).then(response => {
        return response.json();
    }).catch(error =>
            console.log("error",error)
        );
}

export const deleteStore = data =>{
    console.log(data);
    return  fetch(`${API}/deleteStoreData/${data}`,{
        "headers" : {
            "accept" : "application/json",
            "content-type" : "application/json"
        },
    }).then(response => {
        return response.json();
    }).catch(error =>
            console.log("error",error)
        );
}

export const addUserRoleData = data => {
    return fetch(`${API}/addUserRoleData`,{
        method : "POST",
        "headers" : {
            "accept" : "application/json",
            "content-type" : "application/json"
        },
        body : JSON.stringify(data),
    }).then(responce => {
        return responce.json();
    }).catch(error =>
         console.log("Error" , error) 
        )
}

export const getUserRoleListData = data => {
    return fetch(`${API}/getUserRoleListData`,{
        headers : {
            accept : "application/json",
            "content-type" : "application/json"
        }
    }).then(responce => {
        return responce.json();
    }).catch(error => 
        console.log("Error is : " ,error))
}

export const getUserRoleByIdData = data =>{
    return fetch(`${API}/getUserRoleByIdData/${data.roleId}`,{
        headers : {
            accept : "application/json",
            "content-type" : "appliction/json"
        }
    }).then(responce => {
        return responce.json();
    }).catch(error =>
        console.log("Error is :", error)
        )
} 

export const deleteUserRole = data =>{
    return  fetch(`${API}/deleteUserRoleData/${data}`,{
        "headers" : {
            "accept" : "application/json",
            "content-type" : "application/json"
        },
    }).then(response => {
        return response.json();
    }).catch(error =>
            console.log("error",error)
        );
}
