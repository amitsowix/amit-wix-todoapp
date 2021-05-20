import { setStyles } from "./helpers/jss";
import { getElements } from "./helpers/dom";
import { ElementsObject } from "./helpers/interfaces";
import { TodoItemsList } from "./components/TodoItemsList"


const elements: ElementsObject = getElements();
setStyles(elements);

elements.loader.style.display = "none";
elements.appContainer.style.display = "block";
const todoItemsList = new TodoItemsList(elements);
todoItemsList.init();
