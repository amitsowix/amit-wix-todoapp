
//Get elements from DOM
let listContainer = document.getElementsByClassName("todo-list")[0];
let addItemButton = document.getElementsByClassName("new-item")[0];
let addNewItemContainer = document.getElementsByClassName("new-item-container")[0];

//"setState"
let isEditMode = false;
let isAddNewItemInputShowing = false;


//Functions and Event Listeners
addItemButton.addEventListener('click', function() {
    if (isAddNewItemInputShowing){
        removeInput();
    }
    else{
        showInputPrompt();
    }
})

let createInput = function(){
    let input = document.createElement('input');
    let submitButton = document.createElement('div');
    submitButton.className = "submit";
    submitButton.innerText = "GO!";
    input.className = "input";
    return [input, submitButton];
}

let showInputPrompt = function(){
    let [input, submitButton] = createInput();
    addNewItemContainer.appendChild(input);
    addNewItemContainer.appendChild(submitButton);
    submitButton.addEventListener('click', function(){
        if (input.value !== ""){
            addNewItem(input.value);
            removeInput();
        }
    })
    isAddNewItemInputShowing = true;
}

let createNewItemElements = function(){
    let newTodoItem = document.createElement('li');
    let todoText = document.createElement('div');
    let actionsContainer = document.createElement('div');
    let editTodo = document.createElement('img');
    let deleteTodo = document.createElement('img');
    let checkbox = document.createElement('input');
    return [newTodoItem, todoText, actionsContainer, editTodo, deleteTodo, checkbox];
}

let addNewItem = function(name){
    //Create Elements
    let [newTodoItem, todoText, actionsContainer, editTodo, deleteTodo, checkbox] = createNewItemElements();
    todoText.innerText = name; 
    checkbox.type = 'checkbox';
    //Add Classes
    newTodoItem.className = "list-item";
    todoText.className = "todo-text";
    actionsContainer.className = 'actions-container';
    editTodo.className = 'edit-btn';
    deleteTodo.className = 'delete-btn';
    checkbox.className = 'checkbox';
    //Set Icons
    editTodo.src = 'assets/edit.png';
    deleteTodo.src = 'assets/delete.png';
    //Set Event listeners
    editTodo.addEventListener('click', function(){
        if (!isEditMode){
            isEditMode = true;
            let [input, submitButton] = createInput();
            actionsContainer.insertBefore(input, actionsContainer.children[1]);
            actionsContainer.insertBefore(submitButton, actionsContainer.children[2]);
            submitButton.addEventListener('click', function(){
                if (input.value !== ""){
                    todoText.innerText = input.value;
                    actionsContainer.removeChild(input);
                    actionsContainer.removeChild(submitButton);
                    isEditMode = false;
                }
            })
        }
    })
    deleteTodo.addEventListener('click', function(){
        deleteItem(newTodoItem);
    })
    //Append all
    newTodoItem.appendChild(checkbox);
    newTodoItem.appendChild(todoText);
    actionsContainer.appendChild(editTodo);
    actionsContainer.appendChild(deleteTodo);    
    newTodoItem.appendChild(actionsContainer);
    listContainer.appendChild(newTodoItem);
}

let removeInput = function(){
    addNewItemContainer.removeChild(addNewItemContainer.children[1]);
    addNewItemContainer.removeChild(addNewItemContainer.children[1]);
    isAddNewItemInputShowing = false;
}

let deleteItem = function(itemToDelete) {
    listContainer.removeChild(itemToDelete);
    isEditMode = false;
}