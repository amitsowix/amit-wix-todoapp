import jss from 'jss';
import global from 'jss-plugin-global';

jss.use(global());

export const createStyleSheet = () =>{
    const styleSheet = jss
    .createStyleSheet({
        '@global': {
            body: {
                margin: "0px",
                "font-family": "sans-serif"
            },
        
            ".app-header": {
                height: "30%",
                background: "violet",
                "border-bottom-right-radius": "50%",
                "border-bottom-left-radius": "50%",
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                color: "white",
                "font-size": "47px",
                "text-align": "center",
                "line-height": "70px"
            },
            
            ".app-footer": {
                height: "10%",
                background: "purple",
                color: "white",
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                position: "absolute",
                bottom: "0px",
                width: "100%"
            },
            
            ".new-item-button": {
                "align-items": "center",
                background: 'pink',
                display: "flex",
                width: "108px",
                padding: "15px",
                "justify-content": "space-between",
                "border-radius": "5px",
                color: "white",
                "font-size": "17px",
                cursor: "pointer"
            }, 
            
            ".add-icon": {
                height: "30px",
                filter: "brightness(0) invert(1)"
            }, 
            
            ".app-body-container": {
                padding: "50px 70px"
            },
            
            ".new-item-container": {
                display: "flex",
                "align-items": "flex-end"
            },
            
            ".input": {
                "margin-left": "10px",
                outline: "none",
                border: "none",
                "border-bottom": "1px solid gray"
            },
            
            ".submit-button": {
                "margin-left": "10px",
                border: "1px solid gray",
                padding: "6px",
                "border-radius": "5px",
                cursor: "pointer"
            },
            
            ".icon": {
                height: "30px",
                "margin-left": "10px",
                cursor: "pointer"
            },
            
            ".todo-item": {
                display: "flex",
                "align-items": "flex-end",
                "margin-top": "30px"
            },
            
            ".todo-item-text": {
                "margin-left": "10px",
                "font-size": "20px" 
            },
            ".todo-item-text-checked": {
              "margin-left": "10px",
              "font-size": "20px",
              "text-decoration": "line-through"
            },
            ".checkbox": { 
                height: "20px", 
                width: "20px" 
            },
            ".list-container": { 
                overflow: "scroll", 
                height: "44%" 
            },
            ".actions-container": { 
                display: "flex" 
            }
        }
    })
    .attach();
}

