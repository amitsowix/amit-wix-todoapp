

//Get elements from DOM

const getElementByData = (selector) => document.querySelector(`[data-hook=${selector}]`);

const listContainer = getElementByData("list-container");
const addItemButton = getElementByData("new-item-button");
const addNewItemContainer = getElementByData('new-item-container');

//"setState"
let isEditMode = false;
let isAddNewItemInputShowing = false;


//Functions and Event Listeners
addItemButton.addEventListener('click', () => isAddNewItemInputShowing ? hideInputPrompt() : showInputPrompt());

const createInputPrompt = () => {
    const input = document.createElement('input');
    const submitButton = document.createElement('div');
    submitButton.className = "submit";
    submitButton.innerText = "GO!";
    input.className = "input";
    return {input, submitButton};
}

const sumbitNewItemInput = (input) => {
    if (input.value !== ""){
        addNewItem(input.value);
        input.value = "";
        input.focus();
    }
}

const createAddNewItemPrompt = () => {
    let {input, submitButton} = createInputPrompt();
    addNewItemContainer.appendChild(input);
    addNewItemContainer.appendChild(submitButton);
    submitButton.addEventListener('click', () => sumbitNewItemInput(input));
    input.addEventListener('keyup', (event) => {
        if (event.key === "Enter"){
            sumbitNewItemInput(input);
        }
    })
    input.focus();
}

const showInputPrompt = () => {
    createAddNewItemPrompt();
    isAddNewItemInputShowing = true;
}

const setTodoItem = () => {
    const newTodoItem = document.createElement('li');
    newTodoItem.className = "list-item";
    return newTodoItem;
}

const setTodoItemText = (todoText) => {
    const todoTextElement = document.createElement('div');
    todoTextElement.innerText = todoText; 
    todoTextElement.className = "todo-text";
    return todoTextElement;
}

const submitEditItemInput = (input, submitButton, actionElements) => {
    if (input.value !== ""){
        actionElements.todoTextElement.innerText = input.value;
        actionElements.actionsContainer.removeChild(input);
        actionElements.actionsContainer.removeChild(submitButton);
        isEditMode = false;
    }
}

const setActions = (actionElements) => {
    actionElements.editTodo.addEventListener('click', () => {
        if (!isEditMode){
            isEditMode = true;
            const {input, submitButton} = createInputPrompt();
            input.value = actionElements.todoTextElement.innerText;
            actionElements.actionsContainer.insertBefore(input, actionElements.deleteTodo);
            actionElements.actionsContainer.insertBefore(submitButton,actionElements.deleteTodo);
            input.focus();
            submitButton.addEventListener('click', () => submitEditItemInput(input, submitButton, actionElements));
            input.addEventListener('keyup', (event) => {
                if (event.key === "Enter"){
                    submitEditItemInput(input, submitButton, actionElements);
                }
            })
        }
    })
    actionElements.deleteTodo.addEventListener('click', () => deleteItem(actionElements.newTodoItem));
}

const setActionsContainer = (todoTextElement, newTodoItem) => {
    const actionsContainer = document.createElement('div');
    const editTodo = document.createElement('img');
    const deleteTodo = document.createElement('img');
    actionsContainer.className = 'actions-container';
    editTodo.className = 'edit-btn';
    deleteTodo.className = 'delete-btn';
    editTodo.src = 'assets/edit.png';
    deleteTodo.src = 'assets/delete.png';
    actionsContainer.appendChild(editTodo);
    actionsContainer.appendChild(deleteTodo);
    let actionElements = {actionsContainer, editTodo, deleteTodo, newTodoItem, todoTextElement}  
    setActions(actionElements);
    return actionsContainer;
}   

const setCheckboxElement = (todoTextElement) => {
    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.className = 'checkbox';
    checkboxElement.addEventListener('click', () => todoTextElement.className =  checkboxElement.checked ? "todo-text-checked" : "todo-text");
    return checkboxElement;
}

const addNewItem = (todoText) => {
    //Create Elements
    const newTodoItem = setTodoItem();
    const todoTextElement = setTodoItemText(todoText);
    const actionsContainer = setActionsContainer(todoTextElement, newTodoItem);
    const checkboxElement = setCheckboxElement(todoTextElement);
    newTodoItem.appendChild(checkboxElement);
    newTodoItem.appendChild(todoTextElement);  
    newTodoItem.appendChild(actionsContainer);
    listContainer.appendChild(newTodoItem);
}

const hideInputPrompt = () => {
    addNewItemContainer.removeChild(addNewItemContainer.children[1]);
    addNewItemContainer.removeChild(addNewItemContainer.children[1]);
    isAddNewItemInputShowing = false;
}

const deleteItem = (itemToDelete) => {
    listContainer.removeChild(itemToDelete);
    isEditMode = false;
}