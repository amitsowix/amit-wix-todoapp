import { styles } from "./helpers/jss";
import { getElementByData, getInputElementByData } from "./helpers/dom";
import { ElementsObject } from "./helpers/interfaces";
import { TodoItemsList } from "./components/TodoItemsList"


const elements: ElementsObject = {
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
};


const setStyles: Function = () => {
    elements.appHeader.className = styles.classes.appHeader;
    elements.appFooter.className = styles.classes.appFooter;
    elements.addIcon.className = styles.classes.addIcon;
    elements.appBodyContainer.className = styles.classes.appBodyContainer;
    elements.addNewItemContainerElement.className = styles.classes.newItemContainer;
    elements.addNewItemButton.className = styles.classes.newItemButton;
    elements.todoListContainerElement.className = styles.classes.listContainer;
    elements.addNewItemInput.className = styles.classes.input;
    elements.submitAddNewItem.className = styles.classes.submitButton;
}   

const initTodoList: Function = () => {
    const todoItemsList = new TodoItemsList(elements);
    todoItemsList.init();
}
    

setStyles();
initTodoList();