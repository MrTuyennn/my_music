import axios, { Method } from 'axios';
import { API } from '../configs/index'

export interface Action {
    type: string;
    payload?: any;
}

class ApiClient {
    static shared: ApiClient = ApiClient.getShared();

    static getShared() {
        if (ApiClient.shared) {
            return ApiClient.shared;
        }
        ApiClient.shared = new ApiClient();
        return ApiClient.shared;
    }
    client = axios.create({
        baseURL: API,
        timeout: 10000,
        headers: {
            Accept: 'application/json',
        }
    });

    // Set JSON Web Token in Client to be included in all calls
    setToken = (token: any) => {
        this.client.defaults.headers.Authorization = `Bearer ${token}`;
    };

    setPartnerId = (value: string) => {
        this.client.defaults.headers.partnerid = value;
    };

    request = async (
        restComponent: string,
        method: Method = 'get',
        params = {},
    ) => {
        console.log('aaaaa', restComponent, method, params);

        switch (method) {
            case 'get':
                return this.client.get(restComponent, params);
            case 'post':
                return this.client.post(restComponent, params);
            case 'put':
                return this.client.put(restComponent, params);
            case 'delete':
                return this.client.delete(restComponent, params);
            default:
                break;
        }
    };
}

let apiClient = ApiClient.getShared();

export default apiClient;
