import {create, Jss, StyleSheet} from 'jss'
import camelCase from 'jss-plugin-camel-case';
import global from 'jss-plugin-global'
import { ElementsObject } from './interfaces';


const jss: Jss = create();
jss.use(camelCase(), global());


export const setStyles: Function = (elements: ElementsObject) => {
    elements.appHeader.className = styles.classes.appHeader;
    elements.appFooter.className = styles.classes.appFooter;
    elements.addIcon.className = styles.classes.addIcon;
    elements.appBodyContainer.className = styles.classes.appBodyContainer;
    elements.addNewItemContainerElement.className = styles.classes.newItemContainer;
    elements.addNewItemButton.className = styles.classes.newItemButton;
    elements.todoListContainerElement.className = styles.classes.listContainer;
    elements.addNewItemInput.className = styles.classes.input;
    elements.submitAddNewItem.className = styles.classes.submitButton;
}   

export const styles: StyleSheet = jss.createStyleSheet({
        '@global': {
            body: {
                margin: "0px",
                fontFamily: "sans-serif"
            },
        },
            appHeader: {
                height: "30%",
                background: "lightblue",
                borderBottomLeftRadius: "50%",
                borderBottomRightRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: "47px",
                textAlign: "center",
                lineHeight: "70px"
            },
            
           appFooter: {
                height: "10%",
                background: "midnightblue",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: "0px",
                width: "100%"
            },
            
            newItemButton: {
                alignItems: "center",
                background: 'lightsteelblue',
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
            
            appBodyContainer: {
                padding: "50px 70px"
            },
            
            newItemContainer: {
                display: "flex",
                alignItems: "flex-end"
            },
            
            input: {
                marginLeft: "10px",
                outline: "none",
                border: "none",
                borderBottom: "1px solid gray",
                display: "none"
            },
            
            submitButton: {
                marginLeft: "10px",
                border: "1px solid gray",
                padding: "6px",
                borderRadius: "5px",
                cursor: "pointer",
                display: "none"
            },
            
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
    })
    .attach();

