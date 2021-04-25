
//Get elements from DOM
const listContainer = document.querySelector("[data-hook='list-container']");
const addItemButton = document.querySelector("[data-hook='new-item-button']");
const addNewItemContainer = document.querySelector("[data-hook='new-item-container']");

//"setState"
let isEditMode = false;
let isAddNewItemInputShowing = false;


//Functions and Event Listeners
addItemButton.addEventListener('click', () => {
    isAddNewItemInputShowing ? removeInput() : showInputPrompt();
})

const createInputPrompt = (isMainInput) => {
    const input = document.createElement('input');
    const submitButton = document.createElement('div');
    submitButton.className = "submit";
    submitButton.innerText = "GO!";
    input.className = "input";
    if (isMainInput){
        addNewItemContainer.appendChild(input);
        addNewItemContainer.appendChild(submitButton);
        submitButton.addEventListener('click', () => {
            sumbitNewItemInput(input.value);
        })
        input.addEventListener('keyup', (event) => {
            if (event.key === "Enter"){
                sumbitNewItemInput(input.value);
            }
        })
        input.focus();
    }
    else{
        return {input, submitButton};
    }
}

const sumbitNewItemInput = (submitValue) => {
    if (submitValue !== ""){
        addNewItem(submitValue);
        removeInput();
    }
}

const showInputPrompt = () => {
    createInputPrompt(true);
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

const submitEditItemInput = (input, todoTextElement, actionsContainer, submitButton) => {
    if (input.value !== ""){
        todoTextElement.innerText = input.value;
        actionsContainer.removeChild(input);
        actionsContainer.removeChild(submitButton);
        isEditMode = false;
    }
}

const setActions = (actionsContainer, editTodo, deleteTodo, newTodoItem, todoTextElement) => {
    editTodo.addEventListener('click', () => {
        if (!isEditMode){
            isEditMode = true;
            const {input, submitButton} = createInputPrompt();
            input.value = todoTextElement.innerText;
            actionsContainer.insertBefore(input, actionsContainer.children[1]);
            actionsContainer.insertBefore(submitButton, actionsContainer.children[2]);
            input.focus();
            submitButton.addEventListener('click', () => {
                submitEditItemInput(input, todoTextElement, actionsContainer, submitButton);
            })
            input.addEventListener('keyup', (event)=>{
                if (event.key === "Enter"){
                    submitEditItemInput(input, todoTextElement, actionsContainer, submitButton);
                }
            })
        }
    })
    deleteTodo.addEventListener('click', () => {
        deleteItem(newTodoItem);
    })
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
    setActions(actionsContainer, editTodo, deleteTodo, newTodoItem, todoTextElement);
    return actionsContainer;
}   

const setCheckboxElement = (todoTextElement) => {
    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.className = 'checkbox';
    checkboxElement.addEventListener('click', () => {
        todoTextElement.className =  checkboxElement.checked ? "todo-text-checked" : "todo-text";
    });
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

const removeInput = () => {
    addNewItemContainer.removeChild(addNewItemContainer.children[1]);
    addNewItemContainer.removeChild(addNewItemContainer.children[1]);
    isAddNewItemInputShowing = false;
}

const deleteItem = (itemToDelete) => {
    listContainer.removeChild(itemToDelete);
    isEditMode = false;
}