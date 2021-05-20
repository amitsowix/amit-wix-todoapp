import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from 'cookie-parser';
import redis from 'redis';


const app: Application = express();


app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, '../client/dist')));


const client: redis.RedisClient = redis.createClient(process.env.REDIS_URL || "");

app.use(express.json());


let currentUserId: string;



interface TodoItem {
    id: string;
    isChecked: boolean;
    text: string;
}

interface TodoItemsList {
    [key: string] : TodoItem
}

app.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies?.todoAppUserId){
        currentUserId = uuidv4();
        res.cookie("todoAppUserId", currentUserId);
    }
    else{
        currentUserId = req.cookies.todoAppUserId;
    }
    next();
})

app.get('/api/todoItemsList', (req: Request, res: Response) => {
    client.get(currentUserId, (err: Error | null, data: string | null) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        if (!data){
            res.status(200).send({});
        }
        else{
            res.status(200).send(data);
        }
    });
})

app.post('/api/addTodoItem', (req: Request, res: Response) => {
    const itemToAdd: TodoItem = req.body.data;
    client.get(currentUserId, (err: Error | null, data: string | null)=>{
        if (err) res.sendStatus(500);
        const updatedData: TodoItemsList = data ? JSON.parse(data) : {};
        updatedData[itemToAdd.id] = itemToAdd;
        client.set(currentUserId, JSON.stringify(updatedData));
        res.sendStatus(200);
    });
})

app.delete('/api/deleteTodoItem/:itemId', (req: Request, res: Response) => {
    client.get(currentUserId, (err: Error | null, data: string | null) => {
        if (err) res.sendStatus(500);
        if (data){
            const updatedData: TodoItemsList = JSON.parse(data);
            delete updatedData[req.params.itemId];
            client.set(currentUserId, JSON.stringify(updatedData));
            res.sendStatus(200);
        }
    })
})

app.post('/api/editTodoItem/:itemId', (req: Request, res: Response) => {
    client.get(currentUserId, (err: Error | null, data: string | null) => {
        if (err) res.sendStatus(500);
        if (data){
            const updatedData: TodoItemsList = JSON.parse(data);
            updatedData[req.params.itemId] = req.body.data;
            client.set(currentUserId, JSON.stringify(updatedData));
            res.sendStatus(200);
        }
    })
})

const PORT: Number = 3000;
app.listen(process.env.PORT || PORT, () => {
})