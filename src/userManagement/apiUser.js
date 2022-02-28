import { API } from '../config';

/*get user */
export const getUser = () => {
    return fetch(`${API}/userManagement`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
// delete user
export const deleteUser = (userId) => {
    return fetch(`${API}/userManagement/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getUsers = userId => {
    return fetch(`${API}/userManagement/${userId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createUser = async (users) => {
    try {
        const response = await fetch(`${API}/userManagement/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              //  Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(users)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
export const updateUser = (userId, users) => {
    return fetch(`${API}/userManagement/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(users)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};







