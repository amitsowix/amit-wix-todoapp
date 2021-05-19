import { styles } from "../helpers/jss";

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

    constructor(id: string, text: string, isChecked: Boolean) {
        this.id = id;
        this.text = text;
        this.isChecked = isChecked;
        this.isInEditMode = false;
        this.createElements();
    }

    createTodoItemContainer: Function = () => {
        this.todoItemContainer = document.createElement('div');
        this.todoItemContainer.className = styles.classes.todoItem;
    }


    onToggleCheckbox: Function = () => {
        this.textElement.className = this.checkbox.checked ? styles.classes.todoItemTextChecked : styles.classes.todoItemText;
        //UPDATELIST
    }

    createCheckbox: Function = () => {
        this.checkbox = document.createElement('input');
        this.checkbox.type = 'checkbox';
        this.checkbox.checked = this.isChecked ? true : false;
        this.checkbox.className = styles.classes.checkbox;
        this.checkbox.addEventListener('click', () => this.onToggleCheckbox());
    }

    createTextElement: Function = () => {
        this.textElement = document.createElement('div');
        this.textElement.innerText = this.text;
        this.textElement.className = this.checkbox.checked ? styles.classes.todoItemTextChecked : styles.classes.todoItemText;
    }

    createEditIcon: Function = () => {
        this.editIcon = document.createElement('img');
        this.editIcon.className = styles.classes.icon;
        this.editIcon.src = "./edit.png";
    }

    createEditInput: Function = () => {
        this.editInput = document.createElement('input');
        this.editInput.className = styles.classes.input;
        this.submitButton = document.createElement('div');
        this.submitButton.innerText = "GO";
        this.submitButton.className = styles.classes.submitButton;
    }

    createDeleteIcon: Function = () => {
        this.deleteIcon = document.createElement('img');
        this.deleteIcon.className = styles.classes.icon;
        this.deleteIcon.src = "./delete.png";
    }

    createActionsContainer: Function = () => {
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

    showEditInput: Function = () => {
        this.editInput.style.display = 'block';
        this.submitButton.style.display = 'block';
        this.isInEditMode = true;
        this.editInput.focus();
    }
    
    hideEditInput: Function = () => {
        this.editInput.style.display = 'none';
        this.submitButton.style.display = 'none';
        this.isInEditMode = false;
    }   

    onEditInputSubmit: Function = () => {
        this.textElement.innerText = this.editInput.value;
        this.editInput.value = "";
        this.hideEditInput();
        //UPDATELIST
    }

    setEditEvents: Function = () => {
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

    setDeleteEvents: Function = () => {
        this.deleteIcon.addEventListener('click', () => {
            //DELETEITEM
        })
    }

    createElements: Function = () => {
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