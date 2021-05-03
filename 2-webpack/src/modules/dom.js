

export const getElementByData = (selector) => {
    return document.querySelector(`[data-hook=${selector}]`);
}

export const createElement = (type) => {
    return document.createElement(type);
}

export const removeChildren = (parentElement, childElements) => {
    for (const child of childElements){
        parentElement.removeChild(child);
    }
}

export const appendChildren = (parentElement, childElements) => {
    for (const child of childElements){
        parentElement.appendChild(child);
    }
}

export const insertBefore = (parentElement, newDivs, insertBefore) => {
    for (const newDiv of newDivs){
        parentElement.insertBefore(newDiv, insertBefore);
    }
}

export const addEventListener = (element, type, callback, options) => {
    element.addEventListener(type, callback, options);
} 