/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom.js */ \"./src/modules/dom.js\");\n/* harmony import */ var _modules_localstorage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/localstorage.js */ \"./src/modules/localstorage.js\");\n\n\n\nconst addNewItemContainerElement = (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.getElementByData)(\"new-item-container\");\nconst addNewItemButton = (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.getElementByData)(\"new-item-button\");\nconst todoListContainerElement = (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.getElementByData)(\"list-container\");\n\n\nlet todoListItems = [];\nlet ID = 0;\nlet isAddNewItemInputPromptShowing = false;\n\nconst onAddNewItemClick = () => {\n    isAddNewItemInputPromptShowing ? hideNewItemInputPrompt() : showNewItemInputPrompt();\n}\n\nconst hideNewItemInputPrompt = () => {\n    const inputPromptElement = addNewItemContainerElement.children[1];\n    const submitButton = addNewItemContainerElement.children[2];\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeChildren)(addNewItemContainerElement, [inputPromptElement, submitButton]);\n    isAddNewItemInputPromptShowing = false;\n}\n\nconst showNewItemInputPrompt = () => {\n    createAddNewItemInputPrompt();\n    isAddNewItemInputPromptShowing = true;\n}\n\nconst onCheckboxCheck = (todoItemTextElement, checkboxElement, todoItemContainer) => {\n    if (checkboxElement.checked){\n        todoItemTextElement.className = \"todo-item-text-checked\";\n        todoListItems = todoListItems.map(item => {\n            if (item.id.toString() === todoItemContainer.id){\n                item.isChecked = true;\n            }\n            return item;\n        })\n    }\n    else{\n        todoItemTextElement.className = \"todo-item-text\";\n        todoListItems = todoListItems.map(item => {\n            if (item.id.toString() === todoItemContainer.id){\n                item.isChecked = false;\n            }\n            return item;\n        })\n    }\n    (0,_modules_localstorage_js__WEBPACK_IMPORTED_MODULE_1__.setInLocalStorage)(\"todoList\", todoListItems);\n}\n\nconst createCheckboxElement = (todoItemTextElement, todoItemContainer, isChecked) => {\n    const checkboxElement = (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input');\n    checkboxElement.type = 'checkbox';\n    checkboxElement.className = 'checkbox';\n    checkboxElement.checked = isChecked;\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(checkboxElement, 'click', () => onCheckboxCheck(todoItemTextElement, checkboxElement, todoItemContainer));\n    return checkboxElement;\n}\n\nconst createTodoItemContainer = () => {\n    const todoItemContainer = (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div');\n    todoItemContainer.className = \"todo-item\";\n    return todoItemContainer;\n}\n\nconst createTodoItemTextElement = (newItemText, isChecked) => {\n    const todoItemTextElement = (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div');\n    todoItemTextElement.className = isChecked ? \"todo-item-text-checked\" : \"todo-item-text\";\n    todoItemTextElement.innerText = newItemText;\n    return todoItemTextElement;\n}\n\nconst setActionsEventListeners = (elements) => {\n    ;(0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(elements.deleteIcon, 'click', () => removeTodoItem(elements));\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(elements.editIcon, 'click', () => editTodoItem(elements));\n}\n\nconst onEditItemSubmit = (elements, newValue) => {\n    if (newValue !== \"\"){\n        elements.todoItemTextElement.innerText = newValue;\n        todoListItems = todoListItems.map(item => {\n            if (item.id.toString() === elements.todoItemContainer.id){\n                item.text = newValue;\n            }\n            return item;\n        })\n        ;(0,_modules_localstorage_js__WEBPACK_IMPORTED_MODULE_1__.setInLocalStorage)(\"todoList\", todoListItems);\n        removeEditItemInputPrompt(elements);\n    }\n}\n\nconst removeEditItemInputPrompt = (elements) => {\n    ;(0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeChildren)(elements.todoActionsContainer, [elements.todoActionsContainer.children[1], elements.todoActionsContainer.children[2]]);\n    elements.todoItemContainer.isInEditMode = false;\n}\n\nconst addEditItemInputPrompt = (elements) => {\n    const {inputPromptElement, submitButton} = createInputPromptElements();\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore)(elements.todoActionsContainer, [inputPromptElement, submitButton], elements.deleteIcon);\n    inputPromptElement.focus();\n    inputPromptElement.value = elements.todoItemTextElement.innerText;\n    elements.todoItemContainer.isInEditMode = true;\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(submitButton, 'click', () => onEditItemSubmit(elements, inputPromptElement.value));\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(inputPromptElement, 'keyup', (event) => {\n        if (event.key === \"Enter\"){\n            onEditItemSubmit(elements, inputPromptElement.value);\n        }\n    })\n}\n\nconst editTodoItem = (elements) => {\n    elements.todoItemContainer.isInEditMode ? removeEditItemInputPrompt(elements) : addEditItemInputPrompt(elements);\n}\n\nconst removeTodoItem = (elements) => {\n    ;(0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeChildren)(todoListContainerElement, [elements.todoItemContainer]);\n    todoListItems = todoListItems.filter(item => item.id.toString() !== elements.todoItemContainer.id);\n    (0,_modules_localstorage_js__WEBPACK_IMPORTED_MODULE_1__.setInLocalStorage)(\"todoList\", todoListItems);\n}\n\nconst createTodoActionsContainer = (todoItemContainer, todoItemTextElement) => {\n    const todoActionsContainer = (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div');\n    todoActionsContainer.className = 'actions-container';\n    const editIcon = (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('img');\n    editIcon.src = '../src/assets/edit.png';\n    editIcon.className = 'icon';\n    const deleteIcon = (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('img');\n    deleteIcon.src = '../src/assets/delete.png';\n    deleteIcon.className = 'icon';\n    setActionsEventListeners({todoItemContainer, deleteIcon, editIcon, todoItemTextElement, todoActionsContainer});\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChildren)(todoActionsContainer, [editIcon, deleteIcon]);\n    return todoActionsContainer;\n}\n\nconst onAddNewItemInputSubmit = (newItemText, isChecked) => {\n    const todoItemContainer = createTodoItemContainer();\n    const todoItemTextElement = createTodoItemTextElement(newItemText, isChecked);\n    const checkboxElement = createCheckboxElement(todoItemTextElement, todoItemContainer, isChecked);\n    const todoActionsContainer = createTodoActionsContainer(todoItemContainer, todoItemTextElement);\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChildren)(todoItemContainer, [checkboxElement, todoItemTextElement, todoActionsContainer]);\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore)(todoListContainerElement, [todoItemContainer], todoListContainerElement.children[0]);\n    ID++;\n    todoItemContainer.id = ID;\n    todoListItems.push({id: ID, text: newItemText, isChecked});\n    (0,_modules_localstorage_js__WEBPACK_IMPORTED_MODULE_1__.setInLocalStorage)(\"todoList\", todoListItems);\n}\n\nconst createAddNewItemInputPrompt = () =>{\n    const {inputPromptElement, submitButton} = createInputPromptElements();\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChildren)(addNewItemContainerElement, [inputPromptElement, submitButton]);\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(inputPromptElement, 'keyup', (event) => {\n        if (event.key === \"Enter\"){\n            onAddNewItemInputSubmit(inputPromptElement.value, false);\n            inputPromptElement.value = \"\";\n        }\n    })\n    ;(0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(submitButton, 'click', () => {\n        onAddNewItemInputSubmit(inputPromptElement.value, false);\n        inputPromptElement.value = \"\";\n    })\n    inputPromptElement.focus();\n}\n\n\nconst createInputPromptElements = () => {\n    const inputPromptElement = (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input');\n    const submitButton = (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div');\n    submitButton.className = \"submit-button\";\n    submitButton.innerText = \"GO!\";\n    inputPromptElement.className = \"input\";\n    return {inputPromptElement, submitButton};\n}\n\n;(0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(addNewItemButton, 'click', onAddNewItemClick);\n\n\nconst importedTodoListItems = (0,_modules_localstorage_js__WEBPACK_IMPORTED_MODULE_1__.getFromLocalStorage)(\"todoList\");\nfor (const item of importedTodoListItems){\n    onAddNewItemInputSubmit(item.text, item.isChecked);\n}\n\n\n\n//# sourceURL=webpack://amit-todo-app-webpack/./src/index.js?");

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getElementByData\": () => (/* binding */ getElementByData),\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"removeChildren\": () => (/* binding */ removeChildren),\n/* harmony export */   \"appendChildren\": () => (/* binding */ appendChildren),\n/* harmony export */   \"insertBefore\": () => (/* binding */ insertBefore),\n/* harmony export */   \"addEventListener\": () => (/* binding */ addEventListener)\n/* harmony export */ });\n\n\nconst getElementByData = (selector) => {\n    return document.querySelector(`[data-hook=${selector}]`);\n}\n\nconst createElement = (type) => {\n    return document.createElement(type);\n}\n\nconst removeChildren = (parentElement, childElements) => {\n    for (const child of childElements){\n        parentElement.removeChild(child);\n    }\n}\n\nconst appendChildren = (parentElement, childElements) => {\n    for (const child of childElements){\n        parentElement.appendChild(child);\n    }\n}\n\nconst insertBefore = (parentElement, newDivs, insertBefore) => {\n    for (const newDiv of newDivs){\n        parentElement.insertBefore(newDiv, insertBefore);\n    }\n}\n\nconst addEventListener = (element, type, callback) => {\n    element.addEventListener(type, callback);\n} \n\n//# sourceURL=webpack://amit-todo-app-webpack/./src/modules/dom.js?");

/***/ }),

/***/ "./src/modules/localstorage.js":
/*!*************************************!*\
  !*** ./src/modules/localstorage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setInLocalStorage\": () => (/* binding */ setInLocalStorage),\n/* harmony export */   \"getFromLocalStorage\": () => (/* binding */ getFromLocalStorage)\n/* harmony export */ });\n\n\nconst setInLocalStorage = (key, value) => {\n    value = JSON.stringify(value);\n    window.localStorage.setItem(key, value);\n}\n\nconst getFromLocalStorage = (key) => {\n    return JSON.parse(window.localStorage.getItem(key));\n}\n\n\n\n//# sourceURL=webpack://amit-todo-app-webpack/./src/modules/localstorage.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;