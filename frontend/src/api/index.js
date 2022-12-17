import axios from "axios";
export async function requestAxios(server, method, uri, data = null) {
    const token = null;
  
    try {
        if (!uri) {
            console.error('fonction de api requiere uri')
            return
        }
        var url = server + uri
        var headers = {'Content-Type': 'application/json'}
        let request
        method = method.toLowerCase()
        
        if (token) {
            headers['Authorization'] = 'Bearer '+token;
        }

        if(method === 'get' || method === 'delete') {
            var conf = {method,headers}
        
            if(data === null){
                conf.url= url
            } else {
                conf.url= url+'?'+data
            }
            request = await axios(conf);
        } else if(method === 'post' || method === 'put') {
            if(data === null) {
                data = {}
            }
            let options = {
                headers: headers
            }
            request = await axios[method](url, data, options);
        } else {
            return 'cette methode n\'est pas prise en compte par l\'api'
        }
        return request.data;
    } catch(error){
        if(error.response === undefined){
            console.error('offline')
            return
        } else {
            return error.response.data
        }
    }
}