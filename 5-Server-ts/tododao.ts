import redis, {RedisClient} from 'redis';
import { addEmitHelpers, Type } from 'typescript';
import {TodoListDTO} from "../common/interfaces";

const client: RedisClient = redis.createClient(process.env.REDIS_URL || "");

const promisify = <Type> (f: (callback: (err: Error | null, result: Type | null) => void) => void) : () => Promise<Type>  => {
    return () => {
        return new Promise(async (resolve, reject) => {
            const callback = (err: Error | null, result: Type | null) => {
                if (err){
                    reject(err);
                }
                else if (result){
                    resolve(result);
                }
            }
            f.call(this, callback);
        })
    }
}

export class TodoDao {

    getTodos = (userId: string) => {
        return promisify<TodoListDTO>((callback: (err: Error | null, result: TodoListDTO | null) => void) : void => {
            client.get(userId, (err: Error | null, data: string | null) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                const response: TodoListDTO = JSON.parse(data || "{}");
                callback(null, response);
            });
        })();
    }
    
    setTodoItem = (userId: string, data: TodoListDTO) => {
        const stringifiedData: string = JSON.stringify(data);
        return promisify<boolean>((callback: (err: Error | null, result: boolean | null) => void) : void => {
            try {
                client.set(userId, stringifiedData);
                callback(null, true);
            }
            catch (err){
                console.log(err);
                callback(err, null);
            }
        })();
    }
}


export default new TodoDao();

