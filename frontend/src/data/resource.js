import {requestAxios} from "../api";

const uri = process.env.REACT_URL_API || 'http://localhost:8080'

async function getAvailable(id, datetime) {
    let request = await requestAxios(uri, 'get', `/resource/${id}/available?datetime=${datetime}`);
    return request;
}

export { getAvailable }