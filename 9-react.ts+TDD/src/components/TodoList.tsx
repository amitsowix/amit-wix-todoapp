import React, {FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss'
import {Classes} from 'jss';
import Button from './Button';
import Input from './Input';
import TodoItem from './TodoItem'
import ServerAPI from '../helpers/serverapi'
import { TodoItemDTO, TodoListDTO } from '../../../common/interfaces';
import { v4 as uuidv4 } from 'uuid';


const TodoList: FC = (): JSX.Element => {

    const [todoList, setTodoList] = useState<TodoListDTO>({});
    const [isInEditMode, setEditMode] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    const classes: Classes = useStyles();

    const getTodoList: () => void = async () => {
        try {
            const todoList: TodoListDTO = await ServerAPI.getTodoItemsList();
            setTodoList(todoList);
            setShowError(false);
        }
        catch (e){
            setShowError(true);
        }
    }

    const addNewItem = async (text: string) => {
        const id = uuidv4();
        const newItem: TodoItemDTO = {
            text,
            id,
            isChecked: false
        }
        const newList = {...todoList};
        newList[id] = newItem;
        setTodoList(newList);
        try {
            await ServerAPI.addTodoItem(newItem);
            setShowError(false);
        }
        catch (e) {
            setShowError(true);
            const oldList = {...newList};
            delete oldList[id];
            setTodoList(oldList);
        }
    }

    const editTodoItem =  async (updatedItem: TodoItemDTO) => {
        const oldItem = {...todoList[updatedItem.id]}
        const newList = {...todoList};
        newList[updatedItem.id] = updatedItem;
        setTodoList(newList);
        try {
            await ServerAPI.editTodoItem(updatedItem.id, updatedItem);
            setShowError(false);
        }
        catch (e){
            setShowError(true);
            const oldList = {...newList};
            oldList[updatedItem.id] = oldItem
            setTodoList(oldList);
        }
    }

    const deleteTodoItem = async (id: string) => {
        const newList = {...todoList};
        const deletedItem = newList[id];
        delete newList[id];
        setTodoList(newList);
        try {
            await ServerAPI.deleteTodoItem(id);
            setShowError(false);
        }
        catch (e){
            setShowError(true);
            const oldList = {...newList};
            oldList[id] = deletedItem;
            setTodoList(oldList);
        }
    }
    
    useEffect(getTodoList, []);

    return (
        <div className = {classes.appBodyContainer}>
            <div className={classes.newItemContainer}>
                <Button onClick={()=>setEditMode(!isInEditMode)}/>
                {isInEditMode ? <Input name={'add-new-item'} onInputSubmit={addNewItem} /> : null}
            </div>
            {showError ? <div className={classes.error}>Error Connecting to DB</div> : null}
            <ul data-hook={'list-container'} className={classes.listContainer}>
                {Object.values(todoList).map((item: TodoItemDTO) : JSX.Element => {
                    return <TodoItem 
                        key={item.id} id={item.id} 
                        text={item.text} 
                        isChecked={item.isChecked} 
                        editTodoItem={editTodoItem} 
                        deleteTodoItem={deleteTodoItem}
                    />
                })}
            </ul>
        </div>
    )            
}

const useStyles : () => Classes = createUseStyles({
    appBodyContainer: {
        padding: "50px 70px"
    },
    newItemContainer: {
        display: "flex",
        alignItems: "flex-end"
    },
    icon: {
        height: "30px",
        marginLeft: "10px",
        cursor: "pointer"
    },
    listContainer: { 
        height: "400px" 
    },
    error: {
        color: 'red',
    }
});

export default TodoList;