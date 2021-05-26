import axios, {AxiosResponse} from "axios";
import {TodoItemDTO, TodoListDTO} from "../../../common/interfaces"

const handleError = (error: Error) => {
    console.log(error);
    throw error;
}

export class ServerAPI {

    async getTodoItemsList() {
        try{
            const res: AxiosResponse<TodoListDTO> = await axios.get('/api/todoItemsList');
            return res.data;
        }
        catch(error) {
            handleError(error);
        }
    }

    async addTodoItem(todoItem: TodoItemDTO) {
        try{
            const res: AxiosResponse<void> = await axios.post('/api/addTodoItem', { data: todoItem })
            if (res.status !== 200){
                handleError(new Error("Server Error"));
            }
        }
        catch(error) {
            handleError(error);
        }
    }

    async deleteTodoItem(id: string) {
        try{
            const res: AxiosResponse<void> = await axios.delete('api/deleteTodoItem/' + id);
            if (res.status !== 200){
                handleError(new Error("Server Error"));
            }
        }
        catch(error) {
            handleError(error);
        }
    }

    async editTodoItem(id: string, updatedTodoItem: TodoItemDTO) {
        try{
            const res: AxiosResponse<void> = await axios.post('/api/editTodoItem/' + id, { data: updatedTodoItem });
            if (res.status !== 200){
                handleError(new Error("Server Error"));
            }
        }
        catch(error) {
            handleError(error);
        }
    }
}

export default new ServerAPI();
