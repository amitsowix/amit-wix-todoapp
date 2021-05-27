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

    const [todoListDTO, setTodoListDTO] = useState<TodoListDTO>({});
    const [isInEditMode, setEditMode] = useState<boolean>(false);

    const classes: Classes = useStyles();

    const getTodoList: () => void = async () => {
        const todoList: TodoListDTO | undefined = await ServerAPI.getTodoItemsList();
        setTodoListDTO(todoList || {});
    }

    const addNewItem = (text: string): void => {
        const id = uuidv4();
        const newItem: TodoItemDTO = {
            text,
            id,
            isChecked: false
        }
        const newList = {...todoListDTO};
        newList[id] = newItem;
        setTodoListDTO(newList);
        ServerAPI.addTodoItem(newItem);
    }

    const editTodoItem = (updatedItem: TodoItemDTO): void => {
        const newList = {...todoListDTO};
        newList[updatedItem.id] = updatedItem;
        setTodoListDTO(newList);
        ServerAPI.editTodoItem(updatedItem.id, updatedItem);
    }

    const deleteTodoItem = (id: string): void => {
        const newList = {...todoListDTO};
        delete newList[id];
        setTodoListDTO(newList);
        ServerAPI.deleteTodoItem(id);
    }
    
    useEffect(getTodoList, []);

    return (
        <div className = {classes.appBodyContainer}>
            <div className={classes.newItemContainer}>
                <Button onClick={()=>setEditMode(!isInEditMode)}/>
                {isInEditMode ? <Input onInputSubmit={addNewItem} /> : null}
            </div>
            <ul className={classes.listContainer}>
                {Object.values(todoListDTO).map((item: TodoItemDTO) : JSX.Element => {
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
    }
});

export default TodoList;