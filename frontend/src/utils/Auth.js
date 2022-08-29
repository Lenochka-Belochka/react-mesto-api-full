export const BASE_URL = 'https://mesto.back.project.nomoredomains.sbs';

const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const getJson = (response) => {
    if (response.ok) {
        return response.json();
    }
    throw new Error({ status: response.status });
}

export const registration = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email, password })
    })
        .then(getJson)
};

export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email, password })
    })
        .then(getJson)
};

export const checkTokenValidity = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            ...HEADERS,
            'Authorization': `Bearer ${token}`
        }
    })
        .then(getJson)
}