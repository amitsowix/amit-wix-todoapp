import path from 'path';
import express, { Application, Request, Response } from "express";
import cookieParser from 'cookie-parser';
import {authMiddleware} from './middleware';
import {TodoListDTO, TodoItemDTO} from "../common/interfaces";
import todoDao from "./tododao";

const app: Application = express();

app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, '../6-TypeScript/dist')));
app.use(express.json());
app.use(authMiddleware);

app.get('/api/todoItemsList', (req: Request<void>, res: Response<TodoListDTO | Error>) => {
    const currentUserId: string = res.locals.currentUserId;
    todoDao.getTodos(currentUserId).then((data) => {
        res.status(200).send(data);
    }).catch((err: Error) => {
        res.status(500).send(err);
    })
})

app.post('/api/addTodoItem', (req: Request<TodoItemDTO>, res: Response<void | Error>) => {
    const currentUserId: string = res.locals.currentUserId;
    const itemToAdd: TodoItemDTO = req.body.data;
    todoDao.getTodos(currentUserId).then((data) => {
        data[itemToAdd.id] = itemToAdd;
        todoDao.setTodoItem(currentUserId, data);
        res.sendStatus(200);
    }).catch((err: Error) => {
        res.status(500).send(err);
    })
})

app.delete('/api/deleteTodoItem/:id', (req: Request<TodoItemDTO>, res: Response<void | Error>) => {
    const currentUserId: string = res.locals.currentUserId;
    todoDao.getTodos(currentUserId).then((data) => {
        delete data[req.params.id];
        todoDao.setTodoItem(currentUserId, data);
        res.sendStatus(200);
    }).catch((err: Error) => {
        res.status(500).send(err);
    })
})

app.post('/api/editTodoItem/:id', (req: Request<TodoItemDTO>, res: Response<void | Error>) => {
    const currentUserId: string = res.locals.currentUserId;
    todoDao.getTodos(currentUserId).then((data) => {
        data[req.params.id] = req.body.data;
        todoDao.setTodoItem(currentUserId, data);
        res.sendStatus(200);
    }).catch((err: Error) => {
        res.status(500).send(err);
    })
})

const PORT: Number = 3000;
app.listen(process.env.PORT || PORT, () => {
    console.log("Server Running..")
})