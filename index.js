

let listContainer = document.getElementsByClassName("todo-list")[0];
let addItemButton = document.getElementsByClassName("new-item")[0];
let addNewItemContainer = document.getElementsByClassName("new-item-container")[0];
let isEditMode = false;
let isAddNewItemInputShowing = false;

addItemButton.addEventListener('click', function() {
    if (isAddNewItemInputShowing){
        removeInput();
    }
    else{
        let input = document.createElement('input');
        let submitButton = document.createElement('div');
        submitButton.className = "submit";
        submitButton.innerText = "GO!";
        input.className = "input";
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
})

let addNewItem = function(name){
    let newTodoItem = document.createElement('li');
    newTodoItem.className = "list-item";
    let todoText = document.createElement('div');
    todoText.innerText = name; 
    todoText.className = "todo-text";
    let actionsContainer = document.createElement('div');
    actionsContainer.className = 'actions-container';
    let editTodo = document.createElement('img');
    editTodo.src = 'assets/edit.png';
    editTodo.className = 'edit-btn';
    editTodo.addEventListener('click', function(){
        if (!isEditMode){
            isEditMode = true;
            let input = document.createElement('input');
            input.className = "input";
            let submitButton = document.createElement('div');
            submitButton.className = "submit";
            submitButton.innerText = "GO!";
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
    let deleteTodo = document.createElement('img');
    deleteTodo.className = 'delete-btn';
    deleteTodo.src = 'assets/delete.png';
    deleteTodo.addEventListener('click', function(){
        deleteItem(newTodoItem);
    })
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
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
}