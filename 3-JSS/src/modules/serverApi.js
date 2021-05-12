const axios = require('axios');


export class ServerAPI {

    async getTodoItemsList() {
        try{
            const res = await axios.get('/api/todoItemsList');
            return res.data;
        }
        catch(error) {
            console.log(error);
            throw new Error(error);
        }
    }

    addTodoItem(todoItem) {
        axios.post('/api/addTodoItem', { data: todoItem })
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
                throw new Error(error);
            });
    }

    deleteTodoItem(id) {
        axios.delete('api/deleteTodoItem/' + id)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
                throw new Error(error);
            });
    }

    editTodoItem(id, updatedTodoItem) {
        axios.post('/api/editTodoItem/' + id, { data: updatedTodoItem })
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
                throw new Error(error);
            });
    }
}

export default new ServerAPI();
