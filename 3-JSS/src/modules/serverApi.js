const axios = require('axios');


export class ServerAPI {

    getTodoItemsList(callback) {
        axios.get('/api/todoItemsList')
            .then(function (response) {
                callback(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    addTodoItem(todoItem) {
        axios.post('/api/addTodoItem', { data: todoItem })
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteTodoItem(id) {
        axios.delete('api/deleteTodoItem/' + id)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    editTodoItem(id, updatedTodoItem) {
        axios.post('/api/editTodoItem/' + id, { data: updatedTodoItem })
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default new ServerAPI();
