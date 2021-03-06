
export interface ElementsObject {
    addNewItemContainerElement: HTMLElement;
    addNewItemButton: HTMLElement;
    todoListContainerElement: HTMLElement;
    appHeader: HTMLElement;
    appFooter: HTMLElement;
    addIcon: HTMLElement;
    appBodyContainer: HTMLElement;
    appContainer: HTMLElement;
    loader: HTMLElement;
    addNewItemInput: HTMLInputElement;
    submitAddNewItem: HTMLElement;
}

export interface TodoItemDTO {
    id: string,
    text: string,
    isChecked: boolean,
}

export interface TodoItem {
    id: String;
    text: String;
    isChecked: Boolean;
    todoItemContainer: HTMLElement;
    checkbox: HTMLInputElement;
    textElement: HTMLElement;
    actionsContainer: HTMLElement;
    editIcon: HTMLImageElement;
    deleteIcon: HTMLImageElement;
    isInEditMode: Boolean;
    editInput: HTMLInputElement;
    submitButton: HTMLElement;
}

export interface TodoList {
    [key: string] : TodoItem
}

export interface TodoListDTO {
    [key: string] : TodoItemDTO
}

export type UUID = string;

export interface AuthJson {
    currentUserId: UUID;
}
