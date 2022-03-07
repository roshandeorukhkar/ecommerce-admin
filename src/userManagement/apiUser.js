import { API } from '../config';

/*get user */
export const getUser = () => {
    return fetch(`${API}/users`, {
        method: 'GET',
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
// delete user
export const deleteUser = (userId) => {
    return fetch(`${API}/users/${userId}`, {
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
    return fetch(`${API}/users/${userId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createUser = async (users) => {
    try {
        const response = await fetch(`${API}/users/signup`, {
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
    return fetch(`${API}/users/${userId}`, {
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







