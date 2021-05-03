import apiClient from '../../../ApiClient/Client'
export const registeruser = (payload) => {
    let url = '/api/users/register'
    return apiClient.request(url, 'post', payload)
}

export const loginUser = (payload) => {
    let url = '/api/users/login'
    return apiClient.request(url, 'post', payload)
}

export const changePassword = (payload) => {
    let url = '/api/users/change-password'
    return apiClient.request(url, 'post', payload)
}