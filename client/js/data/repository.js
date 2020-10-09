import axios from 'axios';
import { checkValidToken } from '../authentication/auth';


let currentToken;


const createHeaders = () => ({
    headers: { 
        'auth-token': currentToken
    }
});


export const setToken = (token) => {
    currentToken = token;
    checkValidToken(currentToken);
}


export const getShoppingLists = () => {
    return new Promise((resolve, reject) => {

        axios.get('/api/shoppinglists', createHeaders())

        .then(result => {
            if(result.data.success) {
                resolve(result.data.data);
            }
            else {
                reject(result.data.reason);
            }
        })

        .catch(err => {
            reject(err.message);
        });

    });
}

export const getShoppingList = id => {
    return new Promise((resolve, reject) => {

        axios.get('/api/shoppinglists/' + id, createHeaders())

        .then(result => {
            if(result.data.success) {
                resolve(result.data.data);
            }
            else {
                reject(result.data.reason);
            }
        })

        .catch(err => {
            reject(err.message);
        })

    });
}


export const addShoppingList = (name, description) => {
    return new Promise((resolve, reject) => {

        axios.post('/api/shoppinglists/create', { name, description }, createHeaders())

            .then(data => {
                resolve(data);
            })

            .catch(err => {
                console.log(err);
                reject();
            });

    });
}

export const editShoppingList = (_id, name, description, shoppingItems) => {
    const postData = {
        id: _id,
        list: {
            name,
            description,
            shoppingItems
        }
    };

    return new Promise((resolve, reject) => {

        axios.post('/api/shoppinglists/update', postData, createHeaders())

            .then(data => {
                resolve(data)
            })

            .catch(err => {
                reject(err);
            });

    });
}

export const deleteShoppingList = id => {
    return new Promise((resolve, reject) => {

        axios.post('/api/shoppinglists/delete', { id }, createHeaders())

            .then(data => {
                resolve(data);
            })

            .catch(err => {
                reject(err);
            })

    });
}