import { ElementsObject } from "../../../common/interfaces";


export const getElementByData = (selector: string): HTMLElement => {
    return document.querySelector(`[data-hook=${selector}]`);
}


export const getInputElementByData = (selector: string): HTMLInputElement => {
    return document.querySelector(`[data-hook=${selector}]`);
}

export const getElements = () : ElementsObject => {
    return {
        addNewItemContainerElement: getElementByData("new-item-container"),
        addNewItemButton: getElementByData("new-item-button"),
        todoListContainerElement: getElementByData("list-container"),
        appHeader: getElementByData("app-header"),
        appFooter: getElementByData("app-footer"),
        addIcon: getElementByData("add-icon"),
        appBodyContainer: getElementByData("app-body-container"),
        appContainer: getElementByData("app-container"),
        loader: getElementByData("loader"),
        addNewItemInput: getInputElementByData("add-new-item-input"),
        submitAddNewItem: getElementByData("submit-add-new-item")
    }
}