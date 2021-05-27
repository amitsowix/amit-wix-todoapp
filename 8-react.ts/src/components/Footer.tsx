import React, {FC} from 'react';
import {createUseStyles} from 'react-jss'
import {Classes} from 'jss';

const Footer: FC = (): JSX.Element => {
    const classes: Classes = useStyles();
    return (
        <div className={classes.appFooter}>
            Created by Amit for Wix.com. All rights reserved ©
        </div>
    )            
}

const useStyles: () => Classes = createUseStyles({
    appFooter: {
        height: "10%",
        background: "darkred",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "0px",
        width: "100%"
    }
});

export default Footer;