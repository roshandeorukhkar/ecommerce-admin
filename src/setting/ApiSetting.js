import {API} from '../config';

export const saveSlider = data => {
    return fetch(`${API}/saveSlider`,{
        method: 'POST',
        "headers" : {
            Accept: 'application/json',
         },
         body :data
    }).then(response => {
        return response.json();
    }).catch(error =>
        console.log("error",error)
    );
}

export const sliderList = data => {
    return fetch(`${API}/sliderList`,{
        method: 'GET',
    }).then(response => {
        return response.json();
    }).catch(error =>
        console.log("error",error)
    );
}

export const deleteSlider = id => {
    return fetch(`${API}/deleteSlider/${id}` , {
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