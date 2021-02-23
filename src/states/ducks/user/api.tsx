import apiClient from '../../../ApiClient/Client'
export const registeruser = (payload) => {
    let url = '/api/user/register'
    return apiClient.request(url, 'post', payload)
}

export const loginUser = (payload) => {
    let url = '/api/user/login'
    return apiClient.request(url, 'post', payload)
}