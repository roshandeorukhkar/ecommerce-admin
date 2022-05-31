import { API } from '../config';

export const adminsignin = admin => {
    return fetch(`${API}/usersignin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify(admin)
    })
        // .then(response => {
        //     return response.json();
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        
}

export const addUserRole = admin => {
    return fetch(`${API}/addUserRole`, {
        method : 'POST',
        headers : {
            Accept : 'application/json',
            'Content-Type' :'application/json'
        },
        body: JSON.stringify(admin)
    }).then(response => {
            return response.json();
        }).catch(err => {
                console.log(err);
            });
}


