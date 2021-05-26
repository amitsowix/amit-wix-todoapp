import {FC} from 'react';
import {createUseStyles} from 'react-jss'
import {Classes} from 'jss';
import addIcon from "../assets/add.png";

interface ButtonProps {
    onClick: () => void;
}

const Button: FC<ButtonProps> = (props) : JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.newItemButton} onClick={props.onClick}>
            <img alt="" src={addIcon} className={classes.addIcon}/>
            <div>New Item</div>
        </div>
    )            
}

const useStyles: () => Classes = createUseStyles({
    newItemButton: {
        alignItems: "center",
        background: 'orangered',
        display: "flex",
        width: "108px",
        padding: "15px",
        justifyContent: "space-between",
        borderRadius: "5px",
        color: "white",
        fontSize: "17px",
        cursor: "pointer"
    }, 
    
    addIcon: {
        height: "30px",
        filter: "brightness(0) invert(1)"
    }, 
});

export default Button