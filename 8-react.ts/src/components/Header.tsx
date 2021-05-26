import {FC} from 'react';
import {createUseStyles} from 'react-jss'
import {Classes} from 'jss';

const Header: FC = () => {
    const classes = useStyles();
    return (
        <div className = {classes.appHeader}>
            {'Welcome to the most AMAZING\n(written in React.ts) Todo App EVERRRRR!'}
        </div>
    )            
}

const useStyles: () => Classes = createUseStyles({
    appHeader: {
        height: "30%",
        background: "indianred",
        borderBottomLeftRadius: "50%",
        borderBottomRightRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "47px",
        textAlign: "center",
        lineHeight: "70px",
        whiteSpace: 'break-spaces'
    }
});

export default Header;