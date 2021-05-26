import path from 'path';
import express, { Application, Request, Response } from "express";
import cookieParser from 'cookie-parser';
import {authMiddleware} from './middleware';
import {TodoListDTO, TodoItemDTO} from "../common/interfaces";
import todoDao from "./tododao";
require('dotenv').config();


const app: Application = express();

app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, '../8-react.ts/build')));
app.use(express.json());
app.use(authMiddleware);

app.get('/api/todoItemsList', async (req: Request, res: Response<TodoListDTO | Error>) => {
    const currentUserId: string = res.locals.currentUserId;
    try{
        const data = await todoDao.getTodos(currentUserId);
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

app.post('/api/addTodoItem', async (req: Request<TodoItemDTO>, res: Response) => {
    const currentUserId: string = res.locals.currentUserId;
    const itemToAdd: TodoItemDTO = req.body.data;
    try {
        const data = await todoDao.getTodos(currentUserId);
        data[itemToAdd.id] = itemToAdd;
        todoDao.setTodoItem(currentUserId, data);
        res.sendStatus(200);
    }
    catch(err) {
        res.status(500).send(err);
    }
})

app.delete('/api/deleteTodoItem/:id', async (req: Request<TodoItemDTO>, res: Response) => {
    const currentUserId: string = res.locals.currentUserId;
    try {
        const data = await todoDao.getTodos(currentUserId);
        delete data[req.params.id];
        todoDao.setTodoItem(currentUserId, data);
        res.sendStatus(200);
    }
    catch(err) {
        res.status(500).send(err);
    }
})

app.post('/api/editTodoItem/:id', async (req: Request<TodoItemDTO>, res: Response) => {
    const currentUserId: string = res.locals.currentUserId;
    try {
        const data = await todoDao.getTodos(currentUserId);
        data[req.params.id] = req.body.data;
        todoDao.setTodoItem(currentUserId, data);
        res.sendStatus(200);
    }
    catch(err) {
        res.status(500).send(err);
    }
})

const PORT: Number = 3000;
app.listen(process.env.PORT || PORT, () => {
    console.log("Server Running..")
})