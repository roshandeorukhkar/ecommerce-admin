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