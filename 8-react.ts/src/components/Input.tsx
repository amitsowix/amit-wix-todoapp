import React, {FC, useState} from 'react';
import {createUseStyles} from 'react-jss'
import {Classes} from 'jss';

interface InputProps {
    onInputSubmit: (text: string) => void;
}

const Input: FC<InputProps> = (props) : JSX.Element => {
    const classes: Classes = useStyles();

    const [inputValue, setInputValue] = useState("");

    const submitInput = (): void => {
        props.onInputSubmit(inputValue)
        setInputValue("");
    }

    return (
        <div className = {classes.inputContainer}>
            <input 
            value = {inputValue}
            autoFocus
            className={classes.input} 
            onChange={(event) => setInputValue(event.target.value)} 
            onSubmit={()=>{
                if (inputValue !== ""){
                    submitInput();
                }}}
            onKeyDown= {(event) => {
                if (event.key === "Enter" && inputValue !== ""){
                    submitInput();
                }}}
            />
            <div className={classes.submitButton} onClick={()=>props.onInputSubmit(inputValue)}>
                GO
            </div>
        </div>
    )            
}

const useStyles: () => Classes = createUseStyles({
    input: {
        marginLeft: "10px",
        outline: "none",
        border: "none",
        borderBottom: "1px solid gray"
    },
    
    submitButton: {
        marginLeft: "10px",
        border: "1px solid gray",
        padding: "6px",
        borderRadius: "5px",
        cursor: "pointer"
    },

    inputContainer: {
        display: "flex"
    }
});

export default Input;