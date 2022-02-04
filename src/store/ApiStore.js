import {API} from '../config';

export const addStoreData = data => {
    console.log("hh",data);
    return fetch(`${API}/addStoreData`,{
                method : 'post',
                headers : {
                   Accept : "application/json",
                   'content-type' : 'application/json' 
                },
                body : JSON.stringify(data)
    }).then(responce =>{
        console.log(responce);
    }).catch(error =>{
        console.log(error);
    });
}