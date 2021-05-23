import { ElementsObject, TodoItemDTO, TodoListDTO } from "../../../common/interfaces";
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

    init = async (): Promise<boolean> => {
        return new Promise(async (resolve) => {
            this.setAddNewItemEvents();
            await this.createListFromServer();
            resolve(true);
        })
    }

    createListFromServer = async (): Promise<boolean> => {
        return new Promise(async (resolve) => {
            const todoItems: TodoListDTO = await serverAPI.getTodoItemsList();
            for (const [id, item] of Object.entries(todoItems)){
                this.onAddNewItemSubmit(item);
            }
            resolve(true);
        })
    }

    hideAddNewItemInput = (): void => {
        this.addNewItemInput.style.display = 'none';
        this.submitAddNewItemButton.style.display = 'none';
        this.isAddNewItemInputShowing = false;
    }

    showAddNewItemInput = (): void => {
        this.addNewItemInput.style.display = 'block';
        this.submitAddNewItemButton.style.display = 'block';
        this.isAddNewItemInputShowing = true;
        this.addNewItemInput.focus();
    }

    onAddNewItemClick = (): void => {
        this.isAddNewItemInputShowing ? this.hideAddNewItemInput() : this.showAddNewItemInput();
    }

    deleteItemFromList = (todoItem: HTMLElement): void => {
        this.todoListContainerElement.removeChild(todoItem);
    }

    onAddNewItemSubmit = (itemFromServer: TodoItemDTO): void => {
        const id = itemFromServer?.id || uuidv4();
        const text = itemFromServer?.text || this.addNewItemInput.value;
        const isChecked = itemFromServer?.isChecked || false;
        const todoItem: TodoItem = new TodoItem(id, text, isChecked, this.deleteItemFromList);
        this.todoListContainerElement.insertBefore(todoItem.todoItemContainer, this.todoListContainerElement.firstChild);
        if (!itemFromServer){
            const newTodoItem: TodoItemDTO = {id, text: this.addNewItemInput.value, isChecked: false};
            serverAPI.addTodoItem(newTodoItem);
        }
        this.addNewItemInput.value = "";
    }

    setAddNewItemEvents = () : void => {
        this.addNewItemInput.addEventListener('keyup', (event) => {
            if (event.key === "Enter" && this.addNewItemInput.value !== "")
                this.onAddNewItemSubmit(null);
        })
        this.submitAddNewItemButton.addEventListener('click', () => {
            if (this.addNewItemInput.value !== "")
                this.onAddNewItemSubmit(null);
        })
        this.addNewItemButton.addEventListener('click', () => this.onAddNewItemClick());
    }

}   