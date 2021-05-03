

export const setInLocalStorage = (key, value) => {
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
}

export const getFromLocalStorage = (key) => {
    let response = window.localStorage.getItem(key);
    return response ? JSON.parse(response) : [];
}

