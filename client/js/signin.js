import axios from 'axios';
import { getToken, onHasLoggedIn } from './authentication/auth';


const _name = document.querySelector('#login-name');
const _password = document.querySelector('#login-password');
const _confirm = document.querySelector('#login-button');

let auth = null;


window.addEventListener('load', setupLogin);


function setupLogin() {
    auth = getToken();
    if(auth) {
        onHasLoggedIn();
    }

    setupControls();
}

function setupControls() {
    _confirm.addEventListener('click', onLoginClick);
    _name.addEventListener('input', onInputChange);
    _password.addEventListener('input', onInputChange);
}

function onLoginClick() {
    axios.post('/api/authentication/signin', {
        username: _name.value,
        password: _password.value
    })

    .then(result => {
        if(!result.data) throw Error('Something went wrong. No data property.');
        if(!result.data.success) throw Error('Something went wrong. No success property');

        localStorage.setItem('auth-token', result.data.authToken);
        onHasLoggedIn();
    })

    .catch(err => {
        console.log(err)
        alert('Incorrect credentials');
    });
}

function onInputChange() {
    if(!_name.value || !_password.value) {
        _confirm.disabled = true;
    }
    else {
        _confirm.disabled = false;
    }
}