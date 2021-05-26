import {FC, useState} from 'react';
import {createUseStyles} from 'react-jss'
import {Classes} from 'jss';
import {TodoItemDTO, UUID} from "../../../common/interfaces";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import Input from "./Input";

interface TodoItemProps {
    id: UUID;
    text: string;
    isChecked: boolean;
    editTodoItem: (item: TodoItemDTO) => void;
    deleteTodoItem: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = (props) : JSX.Element => {
    const classes: Classes = useStyles();

    const [text, setText] = useState(props.text);
    const [isChecked, setIsChecked] = useState(props.isChecked);
    const [isInEditMode, setEditMode] = useState(false);

    return (
        <div className={classes.todoItem}>
            <input 
                type={'checkbox'} 
                className={classes.checkbox}
                onChange={(event)=>{
                    setIsChecked(event.target.checked);
                    props.editTodoItem({id: props.id, text, isChecked: event.target.checked});
                }} 
                checked={isChecked}/>
            <div className={isChecked ? classes.todoItemTextChecked : classes.todoItemText}>
                {text}
            </div>
            <img src={editIcon} className={classes.icon} onClick={()=>setEditMode(!isInEditMode)}/>
            {isInEditMode ? <Input onInputSubmit={(newValue)=>{
                setText(newValue);
                setEditMode(false);
                props.editTodoItem({id: props.id, text: newValue, isChecked});
            }}/> : null}
            <img src={deleteIcon} className={classes.icon} onClick={()=>{props.deleteTodoItem(props.id)}}/>
        </div>
    )            
}

const useStyles: () => Classes = createUseStyles({
    icon: {
        height: "30px",
        marginLeft: "10px",
        cursor: "pointer"
    },
    
    todoItem: {
        display: "flex",
        alignItems: "flex-end",
        marginTop: "30px"
    },
    
    todoItemText: {
        marginLeft: "10px",
        fontSize: "20px" 
    },
    todoItemTextChecked :{
        marginLeft: "10px",
        fontSize: "20px",
        textDecoration: "line-through"
    },
    checkbox: { 
        height: "20px", 
        width: "20px" 
    },
    listContainer: { 
        overflow: "scroll", 
        height: "44%" 
    },
    actionsContainer: { 
        display: "flex" 
    }
});

export default TodoItem;