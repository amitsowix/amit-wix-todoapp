import axios, {AxiosResponse} from "axios";
import {ServerTodoItem} from "./interfaces"

const handleError = (error: Error) => {
    console.log(error);
    throw error;
}

export class ServerAPI {

    async getTodoItemsList() {
        try{
            const res: AxiosResponse = await axios.get('/api/todoItemsList');
            return res.data;
        }
        catch(error) {
            handleError(error);
        }
    }

    addTodoItem(todoItem: ServerTodoItem) {
        axios.post('/api/addTodoItem', { data: todoItem })
            .then(function (response: AxiosResponse) {
                if (response.status !== 200){
                    handleError(new Error("Server Error"));
                }
            })
            .catch(function (error) {
                handleError(error);
            });
    }

    deleteTodoItem(id: string) {
        axios.delete('api/deleteTodoItem/' + id)
            .then(function (response: AxiosResponse) {
                if (response.status !== 200){
                    handleError(new Error("Server Error"));
                }
            })
            .catch(function (error) {
                handleError(error);
            });
    }

    editTodoItem(id: string, updatedTodoItem: ServerTodoItem) {
        axios.post('/api/editTodoItem/' + id, { data: updatedTodoItem })
            .then(function (response: AxiosResponse) {
                if (response.status !== 200){
                    handleError(new Error("Server Error"));
                }
            })
            .catch(function (error) {
                handleError(error);
            });
    }
}

export default new ServerAPI();
