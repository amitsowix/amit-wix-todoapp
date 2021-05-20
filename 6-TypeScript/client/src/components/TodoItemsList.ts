import { ElementsObject, ServerTodoItem, TodoList } from "../helpers/interfaces";
import { TodoItem } from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import serverAPI from "../helpers/serverapi";
export class TodoItemsList {

    todoListContainerElement: HTMLElement;
    addNewItemButton: HTMLElement;
    addNewItemInput: HTMLInputElement;
    submitAddNewItemButton: HTMLElement;
    isAddNewItemInputShowing: Boolean = false;

    constructor(elements: ElementsObject) {
        this.todoListContainerElement = elements.todoListContainerElement;
        this.addNewItemButton = elements.addNewItemButton;
        this.addNewItemInput = elements.addNewItemInput;
        this.submitAddNewItemButton = elements.submitAddNewItem;
    }

    init: Function = async () => {
        this.setAddNewItemEvents();
        await this.createListFromServer();
    }

    createListFromServer: Function = async () => {
        const todoItems: TodoList = await serverAPI.getTodoItemsList();
        for (const [id, item] of Object.entries(todoItems)){
            this.onAddNewItemSubmit(item);
        }
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

    deleteItemFromList: Function = (todoItem: HTMLElement) => {
        this.todoListContainerElement.removeChild(todoItem);
    }

    onAddNewItemSubmit: Function = (itemFromServer: ServerTodoItem) => {
        let id, isChecked, text;
        if (itemFromServer){
            id = itemFromServer.id;
            text = itemFromServer.text;
            isChecked = itemFromServer.isChecked;
        }
        else{
            id = uuidv4();
            text = this.addNewItemInput.value;
            isChecked = false;
        }
        const todoItem: TodoItem = new TodoItem(id, text, isChecked, this.deleteItemFromList);
        this.todoListContainerElement.insertBefore(todoItem.todoItemContainer, this.todoListContainerElement.firstChild);
        if (!itemFromServer){
            const newTodoItem: ServerTodoItem = {id, text: this.addNewItemInput.value, isChecked: false};
            serverAPI.addTodoItem(newTodoItem);
        }
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