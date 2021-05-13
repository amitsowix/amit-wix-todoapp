const axios = require('axios');


const handleError = (error) => {
    console.log(error);
    throw error;
}

export class ServerAPI {


    async getTodoItemsList() {
        try{
            const res = await axios.get('/api/todoItemsList');
            return res.data;
        }
        catch(error) {
            handleError(error);
        }
    }

    addTodoItem(todoItem) {
        axios.post('/api/addTodoItem', { data: todoItem })
            .then(function (response) {
            })
            .catch(function (error) {
                handleError(error);
            });
    }

    deleteTodoItem(id) {
        axios.delete('api/deleteTodoItem/' + id)
            .then(function (response) {
            })
            .catch(function (error) {
                handleError(error);
            });
    }

    editTodoItem(id, updatedTodoItem) {
        axios.post('/api/editTodoItem/' + id, { data: updatedTodoItem })
            .then(function (response) {
            })
            .catch(function (error) {
                handleError(error);
            });
    }
}

export default new ServerAPI();
