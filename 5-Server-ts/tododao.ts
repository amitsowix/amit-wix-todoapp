import redis, {RedisClient} from 'redis';
import {TodoListDTO} from "../common/interfaces";

const client: RedisClient = redis.createClient(process.env.REDIS_URL || "");

type Callback<Type> = (result: Type, err: Error | null) => void;
type PromisableFunction<Type> = (callback: Callback<Type>) => void;

const promisify = <Type> (f: PromisableFunction<Type>) : () => Promise<Type>  => {
    return () => {
        return new Promise(async (resolve, reject) => {
            const callback = (result: Type, err: Error | null) => err ? reject(err) : resolve(result);
            f.call(this, callback);
        })
    }
}

export class TodoDao {

    getTodos = (userId: string) => {
        return promisify<TodoListDTO>((callback: Callback<TodoListDTO>) : void => {
            client.get(userId, (err: Error | null, data: string | null) => {
                const response: TodoListDTO = JSON.parse(data || "{}");
                if (err) {
                    console.log(err);
                    callback(response, err);
                }
                callback(response, null);
            });
        })();
    }
    
    setTodoItem = (userId: string, data: TodoListDTO) => {
        const stringifiedData: string = JSON.stringify(data);
        return promisify<boolean>((callback: Callback<boolean>) : void => {
            try {
                client.set(userId, stringifiedData);
                callback(true, null);
            }
            catch (err){
                console.log(err);
                callback(false, err);
            }
        })();
    }
}


export default new TodoDao();

