import {createElement, getElementByData, removeChildren, appendChildren, insertBefore, addEventListener} from "./modules/dom.js";
import {getFromLocalStorage, setInLocalStorage} from './modules/localstorage.js';
import { v4 as uuidv4 } from 'uuid';
import { createStyleSheet } from "./modules/jss.js";

createStyleSheet();

const addNewItemContainerElement = getElementByData("new-item-container");
const addNewItemButton = getElementByData("new-item-button");
const todoListContainerElement = getElementByData("list-container");

let todoListItems = [];
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

const onCheckboxCheck = (todoItemTextElement, checkboxElement, todoItemContainer) => {
    if (checkboxElement.checked){
        todoItemTextElement.className = "todo-item-text-checked";
        todoListItems = todoListItems.map(item => {
            if (item.id === todoItemContainer.id){
                item.isChecked = true;
            }
            return item;
        })
    }
    else{
        todoItemTextElement.className = "todo-item-text";
        todoListItems = todoListItems.map(item => {
            if (item.id === todoItemContainer.id){
                item.isChecked = false;
            }
            return item;
        })
    }
    setInLocalStorage("todoList", todoListItems);
}

const createCheckboxElement = (todoItemTextElement, todoItemContainer, isChecked) => {
    const checkboxElement = createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.className = 'checkbox';
    checkboxElement.checked = isChecked;
    addEventListener(checkboxElement, 'click', () => onCheckboxCheck(todoItemTextElement, checkboxElement, todoItemContainer));
    return checkboxElement;
}

const createTodoItemContainer = () => {
    const todoItemContainer = createElement('div');
    todoItemContainer.className = "todo-item";
    return todoItemContainer;
}

const createTodoItemTextElement = (newItemText, isChecked) => {
    const todoItemTextElement = createElement('div');
    todoItemTextElement.className = isChecked ? "todo-item-text-checked" : "todo-item-text";
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
        todoListItems = todoListItems.map(item => {
            if (item.id.toString() === elements.todoItemContainer.id){
                item.text = newValue;
            }
            return item;
        })
        setInLocalStorage("todoList", todoListItems);
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
    todoListItems = todoListItems.filter(item => item.id !== elements.todoItemContainer.id);
    setInLocalStorage("todoList", todoListItems);
}

const createTodoActionsContainer = (todoItemContainer, todoItemTextElement) => {
    const todoActionsContainer = createElement('div');
    todoActionsContainer.className = 'actions-container';
    const editIcon = createElement('img');
    editIcon.src = './assets/edit.png';
    editIcon.className = 'icon';
    const deleteIcon = createElement('img');
    deleteIcon.src = './assets/delete.png';
    deleteIcon.className = 'icon';
    setActionsEventListeners({todoItemContainer, deleteIcon, editIcon, todoItemTextElement, todoActionsContainer});
    appendChildren(todoActionsContainer, [editIcon, deleteIcon]);
    return todoActionsContainer;
}

const onAddNewItemInputSubmit = (newItemText, isChecked) => {
    if (newItemText !== ""){
        const todoItemContainer = createTodoItemContainer();
        const todoItemTextElement = createTodoItemTextElement(newItemText, isChecked);
        const checkboxElement = createCheckboxElement(todoItemTextElement, todoItemContainer, isChecked);
        const todoActionsContainer = createTodoActionsContainer(todoItemContainer, todoItemTextElement);
        appendChildren(todoItemContainer, [checkboxElement, todoItemTextElement, todoActionsContainer]);
        insertBefore(todoListContainerElement, [todoItemContainer], todoListContainerElement.firstChild);
        const id = uuidv4();
        todoItemContainer.id = id;
        todoListItems.push({id, text: newItemText, isChecked});
        setInLocalStorage("todoList", todoListItems);
    }
}

const createAddNewItemInputPrompt = () => {
    const {inputPromptElement, submitButton} = createInputPromptElements();
    inputPromptElement.setAttribute('data-hook', 'new-item-input');
    submitButton.setAttribute('data-hook', 'new-item-submit');
    appendChildren(addNewItemContainerElement, [inputPromptElement, submitButton]);
    addEventListener(inputPromptElement, 'keyup', (event) => {
        if (event.key === "Enter"){
            onAddNewItemInputSubmit(inputPromptElement.value, false);
            inputPromptElement.value = "";
        }
    })
    addEventListener(submitButton, 'click', () => {
        onAddNewItemInputSubmit(inputPromptElement.value, false);
        inputPromptElement.value = "";
    })
    inputPromptElement.focus();
}


const createInputPromptElements = () => {
    const inputPromptElement = createElement('input');
    const submitButton = createElement('div');
    submitButton.className = "submit-button";
    submitButton.innerText = "GO!";
    inputPromptElement.className = "input";
    return {inputPromptElement, submitButton};
}


addEventListener(addNewItemButton, 'click', onAddNewItemClick);

const importedTodoListItems = getFromLocalStorage("todoList");
for (const item of importedTodoListItems){
    onAddNewItemInputSubmit(item.text, item.isChecked);
}    





