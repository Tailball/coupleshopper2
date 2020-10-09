import axios from 'axios';


export function getToken() {
    return localStorage.getItem('auth-token');
}

export function onHasLoggedIn() {
    location.replace('shoppinglists.html');
}

export function onHasNotLoggedIn() {
    location.replace('index.html');
}

export function checkValidToken(token) {
    axios.post('/api/authentication/checkvalidtoken', {
        validToken: token
    })
    .then(result => {
        if(!result.data.success) onInvalidToken();
        else console.log('Current token is still valid!');
    })
    .catch(err => {
        onInvalidToken();
    })
}

function onInvalidToken() {
    localStorage.removeItem('auth-token');
    onHasNotLoggedIn();
}