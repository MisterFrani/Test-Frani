import {requestAxios} from "../api";

const uri = process.env.REACT_URL_API || 'http://localhost:8080'

async function getAvailable(datetime) {
    let request = await requestAxios(uri, 'get', `/api/1337/available?datetime=${datetime}`);
    return request;
}

export { getAvailable }