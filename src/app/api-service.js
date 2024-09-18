import axios from "axios";

const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
})

class ApiSevice {

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, data = {}, config = {}) {
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.post(requestUrl, data, config);
    }

    put(url, data = {}, config = {}) {
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.put(requestUrl, data, config);
    }

    delete(url, config = {}) {
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.delete(requestUrl, config);
    }
    
    get(url, config = {}) {
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.get(requestUrl, config);
    }
}

export default ApiSevice;