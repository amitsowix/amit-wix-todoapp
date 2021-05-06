import {createElement, getElementByData, removeChildren, appendChildren, insertBefore, addEventListener} from "./modules/dom.js";
import { v4 as uuidv4 } from 'uuid';
import { createStyleSheet } from "./modules/jss.js";
import { ServerAPI } from "./modules/serverApi.js";

const styles = createStyleSheet().classes;

const addNewItemContainerElement = getElementByData("new-item-container");
const addNewItemButton = getElementByData("new-item-button");
const todoListContainerElement = getElementByData("list-container");
const appHeader = getElementByData("app-header");
const appFooter = getElementByData("app-footer");
const addIcon = getElementByData("add-icon");
const appBodyContainer = getElementByData("app-body-container");

appHeader.className = styles.appHeader;
appFooter.className = styles.appFooter;
addIcon.className = styles.addIcon;
appBodyContainer.className = styles.appBodyContainer;
addNewItemContainerElement.className = styles.newItemContainer;
addNewItemButton.className = styles.newItemButton;
todoListContainerElement.className = styles.listContainer;

const serverApi = new ServerAPI();

let todoListItems = {};
let isAddNewItemInputPromptShowing = false;


const onAddNewItemClick = () => {
    isAddNewItemInputPromptShowing ? hideNewItemInputPrompt() : showNewItemInputPrompt();
}

const hideNewItemInputPrompt = () => {
    const inputPromptElement = getElementByData('new-item-input');
    const submitButton = getElementByData('new-item-submit');
    removeChildren(addNewItemContainerElement, [inputPromptElement, submitButton]);
    isAddNewItemInputPromptShowing = false;
}

const showNewItemInputPrompt = () => {
    createAddNewItemInputPrompt();
    isAddNewItemInputPromptShowing = true;
}

const onToggleCheckbox = (todoItemTextElement, checkboxElement, todoItemContainer) => {
    todoItemTextElement.className = checkboxElement.checked ?  styles.todoItemTextChecked : styles.todoItemText;
    todoListItems[todoItemContainer.id].isChecked = checkboxElement.checked ? true : false;
    serverApi.editTodoItem(todoItemContainer.id, todoListItems[todoItemContainer.id]);
}

const createCheckboxElement = (todoItemTextElement, todoItemContainer, isChecked) => {
    const checkboxElement = createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.className = styles.checkbox;
    checkboxElement.checked = isChecked;
    addEventListener(checkboxElement, 'click', () => onToggleCheckbox(todoItemTextElement, checkboxElement, todoItemContainer));
    return checkboxElement;
}

const createTodoItemContainer = () => {
    const todoItemContainer = createElement('div');
    todoItemContainer.className = styles.todoItem;
    return todoItemContainer;
}

const createTodoItemTextElement = (newItemText, isChecked) => {
    const todoItemTextElement = createElement('div');
    todoItemTextElement.className = isChecked ? styles.todoItemTextChecked : styles.todoItemText;
    todoItemTextElement.innerText = newItemText;
    return todoItemTextElement;
}

const setActionsEventListeners = (elements) => {
    addEventListener(elements.deleteIcon, 'click', () => removeTodoItem(elements));
    addEventListener(elements.editIcon, 'click', () => editTodoItem(elements));
}

const onEditItemSubmit = (elements) => {
    const newValue = elements.inputPromptElement.value;
    if (newValue !== ""){
        elements.todoItemTextElement.innerText = newValue;
        todoListItems[elements.todoItemContainer.id].text = newValue;
        serverApi.editTodoItem(elements.todoItemContainer.id, todoListItems[elements.todoItemContainer.id]);
        removeEditItemInputPrompt(elements);
    }
}

const removeEditItemInputPrompt = (elements) => {
    removeChildren(elements.todoActionsContainer, [elements.inputPromptElement, elements.submitButton]);
    elements.todoItemContainer.isInEditMode = false;
}

const addEditItemInputPrompt = (elements) => {
    const {inputPromptElement, submitButton} = createInputPromptElements();
    elements = {...elements, inputPromptElement, submitButton};
    insertBefore(elements.todoActionsContainer, [elements.inputPromptElement, elements.submitButton], elements.deleteIcon);
    elements.inputPromptElement.focus();
    elements.inputPromptElement.value = elements.todoItemTextElement.innerText;
    elements.todoItemContainer.isInEditMode = true;
    addEventListener(elements.submitButton, 'click', () => onEditItemSubmit(elements));
    addEventListener(elements.inputPromptElement, 'keyup', (event) => {
        if (event.key === "Enter"){
            onEditItemSubmit(elements);
        }
    })
}

const editTodoItem = (elements) => {
    elements.todoItemContainer.isInEditMode ? null : addEditItemInputPrompt(elements);
}

const removeTodoItem = (elements) => {
    removeChildren(todoListContainerElement, [elements.todoItemContainer]);
    delete todoListItems[elements.todoItemContainer.id];
    serverApi.deleteTodoItem(elements.todoItemContainer.id);
}

const createTodoActionsContainer = (todoItemContainer, todoItemTextElement) => {
    const todoActionsContainer = createElement('div');
    todoActionsContainer.className = styles.actionsContainer;
    const editIcon = createElement('img');
    editIcon.src = './assets/edit.png';
    editIcon.className = styles.icon;
    const deleteIcon = createElement('img');
    deleteIcon.src = './assets/delete.png';
    deleteIcon.className = styles.icon;
    setActionsEventListeners({todoItemContainer, deleteIcon, editIcon, todoItemTextElement, todoActionsContainer});
    appendChildren(todoActionsContainer, [editIcon, deleteIcon]);
    return todoActionsContainer;
}

const onAddNewItemInputSubmit = (newItemText, isChecked, id) => {
    if (newItemText !== ""){
        const todoItemContainer = createTodoItemContainer();
        const todoItemTextElement = createTodoItemTextElement(newItemText, isChecked);
        const checkboxElement = createCheckboxElement(todoItemTextElement, todoItemContainer, isChecked);
        const todoActionsContainer = createTodoActionsContainer(todoItemContainer, todoItemTextElement);
        appendChildren(todoItemContainer, [checkboxElement, todoItemTextElement, todoActionsContainer]);
        insertBefore(todoListContainerElement, [todoItemContainer], todoListContainerElement.firstChild);
        if (!id){
            id = uuidv4();
            serverApi.addTodoItem({text: newItemText, isChecked, id});
        }
        todoItemContainer.id = id;
        todoListItems[id] = {text: newItemText, isChecked, id};
    }
}

const createAddNewItemInputPrompt = () => {
    const {inputPromptElement, submitButton} = createInputPromptElements();
    inputPromptElement.setAttribute('data-hook', 'new-item-input');
    submitButton.setAttribute('data-hook', 'new-item-submit');
    appendChildren(addNewItemContainerElement, [inputPromptElement, submitButton]);
    addEventListener(inputPromptElement, 'keyup', (event) => {
        if (event.key === "Enter"){
            onAddNewItemInputSubmit(inputPromptElement.value, false, false);
            inputPromptElement.value = "";
        }
    })
    addEventListener(submitButton, 'click', () => {
        onAddNewItemInputSubmit(inputPromptElement.value, false, false);
        inputPromptElement.value = "";
    })
    inputPromptElement.focus();
}


const createInputPromptElements = () => {
    const inputPromptElement = createElement('input');
    const submitButton = createElement('div');
    submitButton.className = styles.submitButton;
    submitButton.innerText = "GO!";
    inputPromptElement.className = styles.input;
    return {inputPromptElement, submitButton};
}

const createTodoItemsFromServer = (importedTodoListItems) => {
    for (const [id, item] of Object.entries(importedTodoListItems)){
        onAddNewItemInputSubmit(item.text, item.isChecked, item.id);
    }   
}

const initApp = () => {
    addEventListener(addNewItemButton, 'click', onAddNewItemClick);
    serverApi.getTodoItemsList(createTodoItemsFromServer);
}

initApp();

