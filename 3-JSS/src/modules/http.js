import {config} from '../config.js'


export class HttpClient {


    get(path, callback) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                callback(JSON.parse(request.response));
            }
        }
        request.open("GET", config.server + path);
        request.send();
    }


    post(path, body){
        const request = new XMLHttpRequest();
        request.open("POST", config.server + path);
        request.setRequestHeader("Content-Type", 'application/json');
        let requestBody = JSON.stringify({
            data: body
        })
        request.send(requestBody);
    }
}