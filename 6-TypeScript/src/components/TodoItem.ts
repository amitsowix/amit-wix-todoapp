import { styles } from "../helpers/jss";
import serverApi from "../helpers/serverapi";

export class TodoItem {

    id: string;
    text: string;
    isChecked: Boolean;
    todoItemContainer: HTMLElement;
    checkbox: HTMLInputElement;
    textElement: HTMLElement;
    actionsContainer: HTMLElement;
    editIcon: HTMLImageElement;
    deleteIcon: HTMLImageElement;
    isInEditMode: Boolean;
    editInput: HTMLInputElement;
    submitButton: HTMLElement;
    deleteItemFromList: (todoItem: HTMLElement) => void;

    constructor(id: string, text: string, isChecked: Boolean, deleteItemFromList: (todoItem: HTMLElement) => void) {
        this.id = id;
        this.text = text;
        this.isChecked = isChecked;
        this.isInEditMode = false;
        this.deleteItemFromList = deleteItemFromList;
        this.createElements();
    }

    createTodoItemContainer = (): void => {
        this.todoItemContainer = document.createElement('div');
        this.todoItemContainer.className = styles.classes.todoItem;
    }

    updateTodoItem = (): void => {
        serverApi.editTodoItem(this.id, {id: this.id, text: this.text, isChecked: this.isChecked});
    }


    onToggleCheckbox = (): void => {
        this.textElement.className = this.checkbox.checked ? styles.classes.todoItemTextChecked : styles.classes.todoItemText;
        this.isChecked = this.checkbox.checked;
        this.updateTodoItem();
    }

    createCheckbox = (): void => {
        this.checkbox = document.createElement('input');
        this.checkbox.type = 'checkbox';
        this.checkbox.checked = this.isChecked ? true : false;
        this.checkbox.className = styles.classes.checkbox;
        this.checkbox.addEventListener('click', () => this.onToggleCheckbox());
    }

    createTextElement = (): void => {
        this.textElement = document.createElement('div');
        this.textElement.innerText = this.text;
        this.textElement.className = this.checkbox.checked ? styles.classes.todoItemTextChecked : styles.classes.todoItemText;
    }

    createEditIcon = (): void => {
        this.editIcon = document.createElement('img');
        this.editIcon.className = styles.classes.icon;
        this.editIcon.src = "./edit.png";
    }

    createEditInput = (): void => {
        this.editInput = document.createElement('input');
        this.editInput.className = styles.classes.input;
        this.submitButton = document.createElement('div');
        this.submitButton.innerText = "GO";
        this.submitButton.className = styles.classes.submitButton;
    }

    createDeleteIcon = (): void => {
        this.deleteIcon = document.createElement('img');
        this.deleteIcon.className = styles.classes.icon;
        this.deleteIcon.src = "./delete.png";
    }

    createActionsContainer = (): void => {
        this.actionsContainer = document.createElement('div');
        this.actionsContainer.className = styles.classes.actionsContainer;
        this.createDeleteIcon();
        this.createEditIcon();
        this.createEditInput();
        this.actionsContainer.appendChild(this.editIcon);
        this.actionsContainer.appendChild(this.editInput);
        this.actionsContainer.appendChild(this.submitButton);
        this.actionsContainer.appendChild(this.deleteIcon);
    }

    showEditInput = (): void => {
        this.editInput.style.display = 'block';
        this.submitButton.style.display = 'block';
        this.isInEditMode = true;
        this.editInput.focus();
    }
    
    hideEditInput = (): void => {
        this.editInput.style.display = 'none';
        this.submitButton.style.display = 'none';
        this.isInEditMode = false;
    }   

    onEditInputSubmit = (): void => {
        this.textElement.innerText = this.editInput.value;
        this.text = this.editInput.value;
        this.editInput.value = "";
        this.hideEditInput();
        this.updateTodoItem();
    }

    setEditEvents = (): void => {
        this.editIcon.addEventListener('click', () => {
            this.isInEditMode ? this.hideEditInput() : this.showEditInput();
        })
        this.editInput.addEventListener('keyup', (event) => {
            if (event.key === "Enter" && this.editInput.value !== ""){
                this.onEditInputSubmit();
            }
        })
        this.submitButton.addEventListener('click', () => {
            if (this.editInput.value !== ""){
                this.onEditInputSubmit();
            }
        })
    }

    setDeleteEvents = (): void => {
        this.deleteIcon.addEventListener('click', () => {
            serverApi.deleteTodoItem(this.id);
            this.deleteItemFromList(this.todoItemContainer);
        })
    }

    createElements = (): void => {
        this.createTodoItemContainer();
        this.createCheckbox();
        this.createTextElement();
        this.createActionsContainer();
        this.setEditEvents();
        this.setDeleteEvents();
        this.todoItemContainer.appendChild(this.checkbox);
        this.todoItemContainer.appendChild(this.textElement);
        this.todoItemContainer.appendChild(this.actionsContainer);
    }
}