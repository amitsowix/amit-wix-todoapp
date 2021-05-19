import { ElementsObject, TodoList } from "../helpers/interfaces";
import { TodoItem } from "./TodoItem";
import { v4 as uuidv4 } from "uuid";

export class TodoItemsList {

    todoListContainerElement: HTMLElement;
    addNewItemButton: HTMLElement;
    addNewItemInput: HTMLInputElement;
    submitAddNewItemButton: HTMLElement;
    isAddNewItemInputShowing: Boolean = false;
    todoList: TodoList = {};

    constructor(elements: ElementsObject) {
        this.todoListContainerElement = elements.todoListContainerElement;
        this.addNewItemButton = elements.addNewItemButton;
        this.addNewItemInput = elements.addNewItemInput;
        this.submitAddNewItemButton = elements.submitAddNewItem;
    }

    init: Function = () => {
        this.setAddNewItemEvents();
    }

    hideAddNewItemInput: Function = () => {
        this.addNewItemInput.style.display = 'none';
        this.submitAddNewItemButton.style.display = 'none';
        this.isAddNewItemInputShowing = false;
    }

    showAddNewItemInput: Function = () => {
        this.addNewItemInput.style.display = 'block';
        this.submitAddNewItemButton.style.display = 'block';
        this.isAddNewItemInputShowing = true;
        this.addNewItemInput.focus();
    }

    onAddNewItemClick: Function = () => {
        this.isAddNewItemInputShowing ? this.hideAddNewItemInput() : this.showAddNewItemInput();
    }

    onAddNewItemSubmit: Function = () => {
        const id = uuidv4();
        const todoItem = new TodoItem(id, this.addNewItemInput.value, false);
        this.todoList[id] = todoItem;
        this.todoListContainerElement.insertBefore(todoItem.todoItemContainer, this.todoListContainerElement.firstChild);
        this.addNewItemInput.value = "";
    }

    setAddNewItemEvents: Function = () => {
        this.addNewItemInput.addEventListener('keyup', (event) => {
            if (event.key === "Enter" && this.addNewItemInput.value !== "")
                this.onAddNewItemSubmit();
        })
        this.submitAddNewItemButton.addEventListener('click', () => {
            if (this.addNewItemInput.value !== "")
                this.onAddNewItemSubmit();
        })
        this.addNewItemButton.addEventListener('click', () => this.onAddNewItemClick());
    }



}   