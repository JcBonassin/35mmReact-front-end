import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    getUser,
    getById,
    update,
    delete: _delete,
    createPhoto,
    imageUpload,
    getPhotos,
    removePhoto
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('http://localhost:3000/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:3000/users/${id}`, requestOptions).then(handleResponse);
}

function getUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`http://localhost:3000/profile`, requestOptions).then(handleResponse);
    
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:3000/sign_up`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    console.log(requestOptions)
    return fetch(`http://localhost:3000/users/${user.id}`, requestOptions).then(handleResponse);
}

function imageUpload(formData) {
    const requestOptions = {
        method: 'POST',
        body: formData
    };
    console.log(requestOptions)
    return fetch('https://api.cloudinary.com/v1_1/dkx9idbpe/image/upload', requestOptions).then(handleResponse);
}



function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://localhost:3000/users/${id}`, requestOptions).then(handleResponse);
}


function createPhoto(formData) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: formData
    };
    console.log(requestOptions)
    return fetch('http://localhost:3000/photos', requestOptions).then(handleCreation)
     
}

function getPhotos() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch('http://localhost:3000/photos', requestOptions).then(handleCreation)
}


function removePhoto(photo) {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader(),
      };
      return fetch(`http://localhost:3000/photos/${photo.id}`, requestOptions)

    }


function handleResponse(response) {
    // console.log(response)
    return response.json().then(res => {
        if (res.status === 500 ) {

            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            
            const error = (res && res.error) || response.res.error;
            // console.log(error)
            return Promise.reject(error);
        }    
     return res
    })    
}

function handleCreation(response) {
    // console.log(response)
    return response.json()  
}



