const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors());

let todoItemsList = {};

app.get('/todoItemsList', (req, res) => {
    res.send(JSON.stringify(todoItemsList));
})
  
app.post('/todoItemsList', (req, res) => {
    todoItemsList = req.body.data;
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

