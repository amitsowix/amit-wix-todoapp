
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());


const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

let currentUserId;

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../3-JSS/src/index.html'));
});

app.get('/main.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../3-JSS/dist/main.js'));
});

app.get('/add.png', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../3-JSS/src/assets/add.png'));
});

app.get('/delete.png', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../3-JSS/src/assets/delete.png'));
});

app.get('/edit.png', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../3-JSS/src/assets/edit.png'));
});

app.use((req, res, next) => {
    if (!req.cookies?.todoAppUserId){
        currentUserId = uuidv4();
        res.cookie("todoAppUserId", currentUserId);
    }
    else{
        currentUserId = req.cookies.todoAppUserId;
    }
    next();
})

app.get('/api/todoItemsList', (req, res) => {
    client.get(currentUserId, (err, data)=>{
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.send(data);
    });
})
  
app.post('/api/addTodoItem', (req, res) => {
    const itemToAdd = req.body.data;
    client.get(currentUserId, (err, data)=>{
        if (err) res.sendStatus(500);
        const updatedData = data ? JSON.parse(data) : {};
        updatedData[itemToAdd.id] = itemToAdd;
        client.set(currentUserId, JSON.stringify(updatedData));
        res.sendStatus(200);
    });
})

app.delete('/api/deleteTodoItem/:itemId', (req, res) => {
    client.get(currentUserId, (err, data) => {
        if (err) res.sendStatus(500);
        const updatedData = JSON.parse(data);
        delete updatedData[req.params.itemId];
        client.set(currentUserId, JSON.stringify(updatedData));
        res.sendStatus(200);
    })
})

app.post('/api/editTodoItem/:itemId', (req, res) => {
    client.get(currentUserId, (err, data) => {
        if (err) res.sendStatus(500);
        const updatedData = JSON.parse(data);
        updatedData[req.params.itemId] = req.body.data;
        client.set(currentUserId, JSON.stringify(updatedData));
        res.sendStatus(200);
    })
})

const port = 3000;
app.listen(process.env.PORT || port, () => {
})

