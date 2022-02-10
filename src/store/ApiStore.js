import {API} from '../config';

export const addStoreData = data => {
    return fetch(`${API}/addStoreData`,{
                method : 'POST',
                headers : {
                   Accept : "application/json",
                   'content-type' : 'application/json' 
                },
                body : JSON.stringify(data)
    }) .then(response => {
        return response.json();
    }).catch(error =>
        console.log("error",error)
    );
}