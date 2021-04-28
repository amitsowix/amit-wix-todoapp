

export const setInLocalStorage = (key, value) => {
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
}

export const getFromLocalStorage = (key) => {
    return JSON.parse(window.localStorage.getItem(key));
}

