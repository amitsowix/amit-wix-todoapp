const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let todoItemsList = {};

app.get('/api/todoItemsList', (req, res) => {
    res.send(todoItemsList);
})
  
app.post('/api/addTodoItem', (req, res) => {
    const itemToAdd = req.body.data;
    todoItemsList[itemToAdd.id] = itemToAdd;
    res.sendStatus(200);
})

app.delete('/api/deleteTodoItem/:itemId', (req, res) => {
    delete todoItemsList[req.params.itemId];
    res.sendStatus(200);
})

app.post('/api/editTodoItem/:itemId', (req, res) => {
    todoItemsList[req.params.itemId] = req.body.data;
    res.sendStatus(200);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

