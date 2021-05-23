import redis, {RedisClient} from 'redis';
import {TodoListDTO} from "../common/interfaces";

const client: RedisClient = redis.createClient(process.env.REDIS_URL || "");


export class TodoDao {
    getTodos = (userId: string) => {
        return new Promise<TodoListDTO>((resolve, reject) => {
            client.get(userId, (err: Error | null, data: string | null) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                const response: TodoListDTO = JSON.parse(data || "{}");
                resolve(response);
            });
        })
    }
    
    setTodoItem = (userId: string, data: TodoListDTO) => {
        const stringifiedData: string = JSON.stringify(data);
        return new Promise<boolean>((resolve, reject) => {
            try {
                client.set(userId, stringifiedData);
                resolve(true);
            }
            catch (err){
                console.log(err);
                reject(err);
            }
        })
    }
}


export default new TodoDao();

